import prisma from "@/lib/prisma";
import { model } from "@/config/gemini";
import { inngest } from "./client";
import { parseAiJson } from "@/lib/ai-utils";
import { updateIndustryInsightFromAi } from "@/lib/industry-insights";

export const updateIndustryInsights = inngest.createFunction(
  {
    id: "update-industry-insights",
  },
  {
    cron: "0 0 * * 0",
  },
  async ({ step }) => {
    const industries = await step.run("fetch-industries", async () => {
      return await prisma.industryInsight.findMany({
        select: { industry: true, subIndustry: true },
      });
    });

    for (const { industry, subIndustry } of industries) {
      await step.run(`refresh-${industry}-${subIndustry}`, async () => {
        const prompt = `
          Analyze the current state of the ${subIndustry} in ${industry} industry and providing insights strictly in the following JSON format without any additional notes or explanations:

    {
        "salaryRanges": [{ "role": "string", "min": number, "max": number, "median": number, "location": "string" }],
        "growthRate": number,
        "demandLevel": "HIGH" | "MEDIUM" | "LOW",
        "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
        "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
        "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
        "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"]
    }

  REQUIREMENTS:
    - Return ONLY the JSON output—no additional text, explanations, or markdown formatting.
    - Include salary ranges for at least 5 common roles.
    - Growth rate must be expressed as a percentage.
    - Provide at least 5 skills and 5 key industry trends.
        `;

        const res = await step.ai.wrap(
          "gemini",
          async (input) => {
            return await model.generateContent(input.prompt);
          },
          { prompt }
        );

        const textResponse = res.response.text();
        const insights = parseAiJson(textResponse);
        await updateIndustryInsightFromAi(industry, subIndustry, insights);
      });
    }
  }
);
