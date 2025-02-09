"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { promptToGenInsights } from "@/data/prompts";
import { generateAiResponse } from "./ai-actions";

export async function getIndustryInsights() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  const industryInsight = await prisma.industryInsight.findUnique({
    where: {
      industry: existingUser.industry,
      subIndustry: existingUser.subIndustry,
    },
  });

  // If insights exist, return them
  if (industryInsight) return industryInsight;

  try {
    const prompt = promptToGenInsights(
      existingUser.industry,
      existingUser.subIndustry
    );
    const insights = await generateAiResponse(prompt);

    const newIndustryInsight = await prisma.industryInsight.create({
      data: {
        industry: existingUser.industry,
        subIndustry: existingUser.subIndustry,
        ...insights,
        demandLevel: insights.demandLevel.toUpperCase(),
        marketOutlook: insights.marketOutlook.toUpperCase(),
        nextUpdate: new Date(
          new Date().setHours(0, 0, 0, 0) + 7 * 24 * 60 * 60 * 1000
        ),
      },
    });

    return newIndustryInsight;
  } catch (err) {
    console.error("Error generating insights:", err.message);
    throw new Error(`Failed to generate industry insights: ${err.message}`);
  }
}
