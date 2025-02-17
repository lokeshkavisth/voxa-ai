"use server";

import { promptToGenImprovementTip, promptToGenMCQs } from "@/data/prompts";
import { auth } from "@clerk/nextjs/server";
import { generateAiResponse } from "./ai-actions";
import prisma from "@/lib/prisma";

export async function generateMCQs({ skills, length, level, quizType }) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  // find the user
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const data = {
      length,
      quizType,
      level,
      industry: existingUser.industry,
      subIndustry: existingUser.subIndustry,
      skills,
    };

    const prompt = promptToGenMCQs(data);
    const { questions, topic } = await generateAiResponse(prompt);

    return { questions, topic };
  } catch (error) {
    console.error("Error generating MCQs:", error.message);
    throw new Error("Failed to generate MCQs");
  }
}

export async function saveResults(data) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  // find the user
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const { questions, selectedAnswers, topic } = data;

    const calculateResults = questions.map((item, idx) => ({
      ...item,
      selectedAnswer: selectedAnswers[idx],
      isCorrect: item.correctAnswer === selectedAnswers[idx],
    }));

    const wrongAnswers = calculateResults.filter(
      (question) => !question.isCorrect
    );

    let improvementTip = null;

    if (wrongAnswers.length > 0) {
      try {
        const data = {
          totalQuestions: questions.length,
          correctAnswers: questions.length - wrongAnswers.length,
          wrongAnswers,
          topic,
        };

        const prompt = promptToGenImprovementTip(
          data,
          existingUser.industry,
          existingUser.subIndustry
        );
        const tip = await generateAiResponse(prompt);
        improvementTip = tip.improvementTip;
      } catch (error) {
        console.error("Error generating improvement tip:", error.message);
        throw new Error("Failed to generate improvement tip");
      }
    }

    const assessment = await prisma.assessment.create({
      data: {
        userId: existingUser.id,
        quizScore:
          ((questions.length - wrongAnswers.length) / questions.length) * 100,
        questions: calculateResults,
        category: existingUser.industry,
        improvementTip,
        topic,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving results:", error.message);
    throw new Error("Failed to save results");
  }
}

export async function getAssessments() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  // find the user
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const assessments = await prisma.assessment.findMany({
      where: {
        userId: existingUser.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error.message);
    throw new Error("Failed to fetch assessments");
  }
}
