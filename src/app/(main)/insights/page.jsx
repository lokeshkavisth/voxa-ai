"use server";

import { checkUser, getUserOnboardingStatus } from "@/actions/user-actions";
import { redirect } from "next/navigation";

import { getIndustryInsights } from "@/actions/dashboard-actions";
import SalaryChart from "@/components/salary-chart";
import SkillsList from "@/components/skills-list";
import StatCard from "@/components/stat-card";
import TrendsList from "@/components/trends-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BriefcaseBusiness, TrendingUp } from "lucide-react";

const Dashboard = async () => {
  await checkUser();
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const dashboardData = await getIndustryInsights();

  return (
    <div>
      <div className="mb-6 space-y-4">
        <h1 className="text-3xl font-bold ">Industry Insights</h1>
        <Badge variant="secondary">
          Last Updated: {new Date(dashboardData.updatedAt).toLocaleDateString()}
        </Badge>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Salary Ranges Across Career Levels</CardTitle>
            <p className="text-sm text-muted-foreground">
              Salary range comparison across entry, mid, and senior-level roles.
            </p>
          </CardHeader>
          <CardContent>
            <SalaryChart salaryRanges={dashboardData.salaryRanges} />
          </CardContent>
        </Card>
        <StatCard
          title="Industry Growth"
          value={`${dashboardData.growthRate}%`}
          description="Annual growth rate"
          icon={<TrendingUp className="size-4" />}
        />
        <StatCard
          title="Demand Level"
          value={dashboardData.demandLevel}
          description="Current market demand"
          icon={<BriefcaseBusiness className="size-4" />}
        />
        <StatCard
          title="Market Outlook"
          value={dashboardData.marketOutlook}
          description="Future prospects"
          icon={
            dashboardData.marketOutlook === "POSITIVE" ? (
              <TrendingUp className="size-4 text-green-500" />
            ) : dashboardData.marketOutlook === "NETURAL" ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingUp className="size-4 text-red-500" />
            )
          }
        />
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Top Skills</CardTitle>
            <Brain className="size-4" />
          </CardHeader>
          <CardContent>
            <SkillsList skills={dashboardData.topSkills} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Key Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendsList trends={dashboardData.keyTrends} />
          </CardContent>
        </Card>
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillsList skills={dashboardData.recommendedSkills} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
