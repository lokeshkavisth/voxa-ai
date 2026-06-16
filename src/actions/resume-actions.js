"use server";

import { promptToAnalyzeResume } from "@/data/prompts";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAiResponse } from "./ai-actions";
import resumeSchema from "@/lib/schemas/resume-schema";

export const saveResume = async (resumeData) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const parsed = resumeSchema.safeParse(resumeData);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message || "Invalid resume data");
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const resume = await prisma.resume.upsert({
      where: { userId: existingUser.id },
      update: { content: parsed.data },
      create: {
        userId: existingUser.id,
        content: parsed.data,
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

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const resume = await prisma.resume.findUnique({
      where: { userId: existingUser.id },
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

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    let content = resumeData;

    if (!content) {
      const resume = await prisma.resume.findUnique({
        where: { userId: existingUser.id },
      });

      if (!resume) throw new Error("Resume not found in database");

      content = resume.content;
    }

    const parsed = resumeSchema.safeParse(content);
    const payload = parsed.success ? parsed.data : content;

    const prompt = promptToAnalyzeResume(JSON.stringify(payload));
    const resumeAnalytics = await generateAiResponse(prompt);

    await prisma.resume.upsert({
      where: { userId: existingUser.id },
      update: {
        atsScore: resumeAnalytics.atsScore ?? null,
        feedback: JSON.stringify(resumeAnalytics),
      },
      create: {
        userId: existingUser.id,
        content: parsed.success ? parsed.data : {},
        atsScore: resumeAnalytics.atsScore ?? null,
        feedback: JSON.stringify(resumeAnalytics),
      },
    });

    revalidatePath("/resume");
    return resumeAnalytics;
  } catch (error) {
    console.error("Error analyzing resume:", error.message);
    throw new Error("Failed to analyze resume");
  }
};
