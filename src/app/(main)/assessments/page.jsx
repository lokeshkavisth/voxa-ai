import PerformanceChart from "@/components/performance-chart";
import { QuizPreferencesForm } from "@/components/quiz-preferences-form";
import { RecentQuizzes } from "@/components/recent-quizzes";
import StatCard from "@/components/stat-card";
import { BriefcaseBusiness, TrendingUp } from "lucide-react";

const Assessments = () => {
  const dashboardData = {
    growthRate: "78%",
    demandLevel: 150,
    marketOutlook: "85%",
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-8">Assessments Insight</h1>
        <QuizPreferencesForm />
      </div>
      <div className="grid gap-8 grid-cols-3">
        <PerformanceChart className="col-span-3" />
        <StatCard
          title="Average Score"
          value={`${dashboardData.growthRate}%`}
          description="Average score"
          icon={<TrendingUp className="size-4" />}
          className={"col-span-3 sm:col-span-1"}
        />
        <StatCard
          title="Total Questions"
          value={dashboardData.demandLevel}
          description="Total questions"
          icon={<BriefcaseBusiness className="size-4" />}
          className={"col-span-3 sm:col-span-1"}
        />
        <StatCard
          title="Recent Score"
          value={dashboardData.marketOutlook}
          description="Future prospects"
          className={"col-span-3 sm:col-span-1"}
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
        <RecentQuizzes className="col-span-3" />
      </div>
    </div>
  );
};

export default Assessments;
