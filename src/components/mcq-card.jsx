"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "./ui/badge";
import { saveResults } from "@/actions/mock-practice";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function McqCard({ questions }) {
  const { toast } = useToast();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    questions[currentQuestionIndex].timeLimit
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prev) => [...prev, answer]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
      setTimeLeft(questions[currentQuestionIndex + 1].timeLimit);
    }
  };

  const mutation = useMutation({
    mutationFn: saveResults,
    onSuccess: (data) => {
      // console.log("success data ", data);
      toast({
        title: "Results saved successfully",
      });
      // Redirect or update the UI as needed
      router.push("/assessments");
    },
    onError: (error) => {
      // console.error("Mutation error:", error);

      toast({
        variant: "destructive",
        title: "Problem saving results",
        description: error.message,
      });
    },
  });

  const handleSubmitAnswer = async () => {
    if (selectedAnswers.length === 0) {
      toast.error(
        "Answering all questions is required. Please select an answer for each question."
      );
      return;
    }

    const data = {
      questions,
      selectedAnswers,
    };

    mutation.mutate(data);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <CardTitle>
              Question {currentQuestionIndex + 1}/{questions.length}
            </CardTitle>
            <Badge variant="outline">{currentQuestion.difficulty}</Badge>
          </div>
        </CardTitle>
        <CardDescription>
          Category: {currentQuestion.category} | Difficulty:{" "}
          {currentQuestion.difficulty} | Time Left: {timeLeft}s
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg font-semibold">{currentQuestion.question}</p>
          {currentQuestion.codeSnippet && (
            <SyntaxHighlighter language="javascript" style={tomorrow}>
              {currentQuestion.codeSnippet}
            </SyntaxHighlighter>
          )}
          <RadioGroup
            onValueChange={handleAnswerSelection}
            // value={selectedAnswers || undefined}
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex flex-wrap gap-2 mt-4">
            {currentQuestion.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setShowExplanation(!showExplanation)}
              className="mt-4"
              variant="outline"
            >
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </Button>
            {/* <Button onClick={handleSubmitAnswer}>Submit Quiz</Button> */}
            {selectedAnswers.length === questions.length ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Saving..." : "Submit Answers"}
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers.length === currentQuestionIndex}
              >
                Next Question
              </Button>
            )}
          </div>

          {showExplanation && (
            <div className="mt-4 rounded bg-muted p-2 text-sm">
              <p className="font-semibold mb-1">Explanation:</p>
              <p className="text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
