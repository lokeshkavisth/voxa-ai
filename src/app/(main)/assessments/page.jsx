import { QuizPreferencesForm } from "@/components/quiz-preferences-form";
import { RecentQuizzes } from "@/components/recent-quizzes";

const Assessments = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Practice Quiz</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <QuizPreferencesForm />
        <RecentQuizzes />
      </div>
    </div>
  );
};

export default Assessments;
