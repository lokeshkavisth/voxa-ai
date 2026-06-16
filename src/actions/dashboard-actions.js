"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateIndustryInsight } from "@/lib/industry-insights";

export async function getIndustryInsights() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser) throw new Error("User not found");

  if (!existingUser.industry || !existingUser.subIndustry) {
    throw new Error("Complete onboarding to view industry insights");
  }

  try {
    return await getOrCreateIndustryInsight(
      existingUser.industry,
      existingUser.subIndustry
    );
  } catch (err) {
    console.error("Error generating insights:", err.message);
    throw new Error(`Failed to generate industry insights: ${err.message}`);
  }
}
