"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAiResponse } from "./ai-actions";
import { promptToGenCoverLetter } from "@/data/prompts";

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  const { jobRole, companyName, tone, jobDescription, length } = data;

  if (!userId) throw new Error("Unauthorized");

  if (!jobRole || !companyName || !jobDescription || !tone || !length) {
    throw new Error("Missing required fields");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
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
    return markdown;
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}
