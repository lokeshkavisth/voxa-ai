-- DropIndex
DROP INDEX IF EXISTS "IndustryInsight_industry_key";

-- CreateIndex
CREATE UNIQUE INDEX "IndustryInsight_industry_subIndustry_key" ON "IndustryInsight"("industry", "subIndustry");
