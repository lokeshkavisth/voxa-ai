export function parseAiJson(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Empty AI response");
  }

  const cleaned = text.replace(/```(?:json)?\n?/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("Failed to parse AI response as JSON");
  }
}

export function getNextInsightUpdateDate() {
  return new Date(
    new Date().setHours(0, 0, 0, 0) + 7 * 24 * 60 * 60 * 1000
  );
}

export function normalizeInsightFields(insights) {
  return {
    salaryRanges: insights.salaryRanges ?? [],
    growthRate: insights.growthRate ?? 0,
    demandLevel: String(insights.demandLevel ?? "MEDIUM").toUpperCase(),
    topSkills: insights.topSkills ?? [],
    marketOutlook: String(insights.marketOutlook ?? "NEUTRAL").toUpperCase(),
    keyTrends: insights.keyTrends ?? [],
    recommendedSkills: insights.recommendedSkills ?? [],
    nextUpdate: getNextInsightUpdateDate(),
  };
}
