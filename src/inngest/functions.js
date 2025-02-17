// "use server";

import prisma from "@/lib/prisma";
import { model } from "@/config/gemini";
import { inngest } from "./client";

export const updateIndustryInsights = inngest.createFunction(
  {
    id: "update-industry-insights",
  },
  // { event: "test/update.industry" },
  {
    cron: "0 0 * * 0",
  },
  async ({ step }) => {
    // fetch all industries
    const industries = await step.run("fetch-industries", async () => {
      return await prisma.industryInsight.findMany({
        select: { industry: true, subIndustry: true },
      });
    });

    // update all industries

    for (const { industry, subIndustry } of industries) {
      const prompt = `
          Analyze the current state of the ${subIndustry} in ${industry} industry and providing insights strictly in the following JSON format without any additional notes or explanations:

    {
        "salaryRanges": [{ "role": "string", "min": number, "max": number, "median": number, "location": "string" }],
        "growthRate": number, // Percentage value (e.g., 7.5)
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
          return await model.generateContent(input);
        },
        { prompt }
      );

      // console.log("inngest response: ", res);
    }
  }
);
