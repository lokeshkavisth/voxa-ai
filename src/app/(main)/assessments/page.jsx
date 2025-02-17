import { getAssessments } from "@/actions/mock-practice";
import PerformanceChart from "@/components/performance-chart";
import { QuizPreferencesForm } from "@/components/quiz-preferences-form";
import { RecentQuizzes } from "@/components/recent-quizzes";
import StatCard from "@/components/stat-card";
import { Brain, TrendingDown, TrendingUp } from "lucide-react";

function calculateAverageScore(assessments) {
  if (!assessments || assessments.length === 0) return 0;

  const totalScore = assessments.reduce(
    (sum, assessment) => sum + (assessment.quizScore || 0),
    0
  );
  return totalScore / assessments.length;
}

function calculateTotalQuestions(assessments) {
  if (!assessments || assessments.length === 0) return 0;

  return assessments.reduce(
    (total, assessment) => total + (assessment.questions?.length || 0),
    0
  );
}

const Assessments = async () => {
  let assessments = [];

  try {
    assessments = (await getAssessments()) || [];
  } catch (error) {
    console.error("Error fetching assessments:", error);
    assessments = [];
  }

  const performanceData = assessments.length
    ? assessments.map((assessment) => ({
        date: assessment?.createdAt
          ? new Date(assessment.createdAt).toISOString().split("T")[0]
          : "N/A",
        score: assessment?.quizScore || 0,
      }))
    : [];

  const averageScore = calculateAverageScore(assessments);
  const totalQuestions = calculateTotalQuestions(assessments);
  const recentQuizScore = assessments.length
    ? assessments[0]?.quizScore || 0
    : 0;

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-8">Assessments Insight</h1>
        <QuizPreferencesForm />
      </div>
      <div className="grid gap-8 grid-cols-3">
        <PerformanceChart
          className="col-span-3"
          performanceData={performanceData}
        />
        <StatCard
          title="Average Score"
          value={`${averageScore}%`}
          description="Overall performance average."
          className={"col-span-3 sm:col-span-1"}
          icon={
            averageScore > 50 ? (
              <TrendingUp className="size-4 text-green-500" />
            ) : averageScore === 50 || averageScore === 0 ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4 text-red-500" />
            )
          }
        />
        <StatCard
          title="Total Questions"
          value={totalQuestions}
          description="Total questions attempted."
          icon={<Brain className="size-4" />}
          className={"col-span-3 sm:col-span-1"}
        />
        <StatCard
          title="Recent Score"
          value={recentQuizScore}
          description="Most recent quiz score."
          className={"col-span-3 sm:col-span-1"}
          icon={
            recentQuizScore > 50 ? (
              <TrendingUp className="size-4 text-green-500" />
            ) : recentQuizScore === 50 || recentQuizScore === 0 ? (
              <TrendingUp className="size-4" />
            ) : (
              <TrendingDown className="size-4 text-red-500" />
            )
          }
        />
        <RecentQuizzes
          className="col-span-3"
          assessments={assessments.slice(0, 5)}
        />
      </div>
    </div>
  );
};

export default Assessments;
