"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAiResponse } from "./ai-actions";
import { promptToGenCoverLetter } from "@/data/prompts";
import { coverLetterSchema } from "@/lib/schemas/cover-letter-schema";

export async function generateCoverLetter(data) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const parsed = coverLetterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message || "Invalid cover letter data");
  }

  const { jobRole, companyName, tone, jobDescription, length } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  try {
    const prompt = promptToGenCoverLetter(
      jobRole,
      companyName,
      tone,
      jobDescription,
      length,
      existingUser
    );

    const { markdown } = await generateAiResponse(prompt);

    await prisma.coverLetter.upsert({
      where: { userId: existingUser.id },
      update: {
        content: markdown,
        jobDescription,
        companyName,
        jobTitle: jobRole,
        status: "DRAFT",
      },
      create: {
        userId: existingUser.id,
        content: markdown,
        jobDescription,
        companyName,
        jobTitle: jobRole,
        status: "DRAFT",
      },
    });

    revalidatePath("/cover-letter");
    return markdown;
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}

export async function getCoverLetter() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  return prisma.coverLetter.findUnique({
    where: { userId: existingUser.id },
  });
}
