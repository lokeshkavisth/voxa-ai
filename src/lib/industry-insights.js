import prisma from "@/lib/prisma";
import { generateAiResponse } from "@/lib/gemini-ai";
import { promptToGenInsights } from "@/data/prompts";
import { normalizeInsightFields } from "@/lib/ai-utils";

export async function getOrCreateIndustryInsight(industry, subIndustry) {
  if (!industry || !subIndustry) {
    throw new Error("Industry and sub-industry are required");
  }

  const existing = await prisma.industryInsight.findUnique({
    where: {
      industry_subIndustry: { industry, subIndustry },
    },
  });

  if (existing) return existing;

  const prompt = promptToGenInsights(industry, subIndustry);
  const insights = await generateAiResponse(prompt);
  const normalized = normalizeInsightFields(insights);

  try {
    return await prisma.industryInsight.create({
      data: {
        industry,
        subIndustry,
        ...normalized,
      },
    });
  } catch (err) {
    if (err.code === "P2002") {
      return prisma.industryInsight.findUnique({
        where: {
          industry_subIndustry: { industry, subIndustry },
        },
      });
    }
    throw err;
  }
}

export async function updateIndustryInsightFromAi(industry, subIndustry, insights) {
  const normalized = normalizeInsightFields(insights);

  return prisma.industryInsight.update({
    where: {
      industry_subIndustry: { industry, subIndustry },
    },
    data: {
      ...normalized,
      updatedAt: new Date(),
    },
  });
}
