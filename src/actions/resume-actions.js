"use server";

import { promptToAnalyzeResume } from "@/data/prompts";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAiResponse } from "./ai-actions";

export const saveResume = async (resumeData) => {
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
    // check is resume already exists if exists replace else create new
    const resume = await prisma.resume.upsert({
      where: {
        userId: existingUser.id,
      },
      update: {
        content: resumeData,
      },
      create: {
        userId: existingUser.id,
        content: resumeData,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error.message);
    throw new Error("Failed to save resume");
  }
};

export const getResumeData = async () => {
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
    const resume = await prisma.resume.findUnique({
      where: {
        userId: existingUser.id,
      },
    });

    if (!resume) throw new Error("Resume not found");

    return resume;
  } catch (error) {
    console.error("Error getting resume data:", error.message);
    throw new Error("Failed to get resume data");
  }
};

export const analyzeResume = async (resumeData) => {
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
    if (!resumeData) {
      // get resumeData from database
      const resume = await prisma.resume.findUnique({
        where: {
          userId: existingUser.id,
        },
      });

      if (!resume) throw new Error("Resume not found in database");

      resumeData = resume;
    }

    const prompt = promptToAnalyzeResume(JSON.stringify(resumeData));
    const resumeAnalytics = await generateAiResponse(prompt);

    return resumeAnalytics;
  } catch (error) {
    console.error("Error analyzing resume:", error.message);
    throw new Error("Failed to analyze resume");
  }
};
