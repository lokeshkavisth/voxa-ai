import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// This would typically come from your backend or state management
const recentQuizzes = [
  {
    id: 1,
    date: "2023-05-20",
    score: 85,
    topic: "React Fundamentals",
    skills: ["reactjs", "javascript"],
  },
  {
    id: 2,
    date: "2023-05-18",
    score: 92,
    topic: "Next.js Routing",
    skills: ["nextjs", "reactjs"],
  },
  {
    id: 3,
    date: "2023-05-15",
    score: 78,
    topic: "Node.js Basics",
    skills: ["nodejs", "javascript"],
  },
];

export function RecentQuizzes({ className }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Recent Practice Sessions</CardTitle>
        <CardDescription>Your latest quiz attempts</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentQuizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{quiz.topic}</h3>
                <p className="text-sm text-muted-foreground">{quiz.date}</p>
                <div className="flex gap-1 mt-1">
                  {quiz.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{quiz.score}%</span>
                <p className="text-sm text-muted-foreground">Score</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
