"use server";

import { promptToGenImprovementTip, promptToGenMCQs } from "@/data/prompts";
import { auth } from "@clerk/nextjs/server";
import { generateAiResponse } from "./ai-actions";
import prisma from "@/lib/prisma";

export async function generateMCQs({
  skills,
  length = 5,
  level = "INTERMEDIATE",
  quizType,
}) {
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
      skills: skills || existingUser.skills,
    };

    const prompt = promptToGenMCQs(data);
    const { questions } = await generateAiResponse(prompt);

    console.log("ai questions", questions);
    return questions;
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
    const { questions, selectedAnswers } = data;

    const calculateResults = questions.map((item, idx) => ({
      ...item,
      selectedAnswer: selectedAnswers[idx],
      isCorrect: item.correctAnswer === selectedAnswers[idx],
    }));

    const wrongAnswers = calculateResults.filter(
      (question) => !question.isCorrect
    );

    if (wrongAnswers.length > 0) {
      try {
        const data = {
          totalQuestions: questions.length,
          correctAnswers: questions.length - wrongAnswers.length,
          wrongAnswers,
        };

        const prompt = promptToGenImprovementTip(data);
        const { improvementTip } = await generateAiResponse(prompt);

        console.log("ai improvement tip", improvementTip);
      } catch (error) {
        console.error("Error generating improvement tip:", error.message);
        throw new Error("Failed to generate improvement tip");
      }
    }

    const assessment = await prisma.assessment.create({
      data: {
        userId: existingUser.id,
        quizScore: questions.length - wrongAnswers.length,
        questions,
        category: existingUser.industry,
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving results:", error.message);
    throw new Error("Failed to save results");
  }
}
