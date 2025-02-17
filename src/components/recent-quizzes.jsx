import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

export function RecentQuizzes({ className, assessments = [] }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Recent Practice Sessions <Trophy className="size-4" />
        </CardTitle>
        <CardDescription>
          Your latest 5 quiz attempts. See how you can improve and reach your
          goals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {assessments.map((assessment) => (
            <li key={assessment.id} className="p-4 border rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-semibold capitalize">
                  {assessment.category}
                </h3>
                <span className="text-2xl font-bold">
                  {assessment.quizScore}%
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {new Date(assessment.createdAt).toLocaleDateString()}
              </p>

              <p className="mt-2 text-sm">
                <strong>Total Questions in Assessment:</strong>{" "}
                {assessment.questions.length}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                <strong>Improvement Tip:</strong> {assessment.improvementTip}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">
            Total Questions Practiced:{" "}
            {assessments.reduce(
              (total, assessment) => total + assessment.questions.length,
              0
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
