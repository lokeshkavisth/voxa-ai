"use client";

import { saveResults } from "@/actions/mock-practice";
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
import { DataContext } from "@/context/data-context";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "./ui/badge";

export default function McqCard({ questions, topic }) {
  const { toast } = useToast();
  const router = useRouter();
  const { setData } = useContext(DataContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    questions?.[currentQuestionIndex]?.timeLimit || 0
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setShowExplanation(false);
      setTimeLeft(questions?.[currentQuestionIndex + 1]?.timeLimit || 0);
    }
  };

  const mutation = useMutation({
    mutationFn: saveResults,
    onSuccess: (data) => {
      toast({
        title: "Answers saved successfully!",
        description:
          "You have successfully saved your answers. Redirecting you to the result page.",
      });
      setData({ results: data });
      router.push("/assessments/result");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: error?.message || "There was a problem with your request.",
      });
    },
  });

  const handleSubmitAnswer = () => {
    if (selectedAnswers.length < questions.length) {
      toast({
        variant: "destructive",
        title: "All questions are required.",
        description: "Please answer all questions to proceed.",
      });
      return;
    }

    mutation.mutate({ questions, selectedAnswers, topic });
  };

  const currentQuestion = questions?.[currentQuestionIndex];

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-lg font-medium text-gray-700">
          It looks like there are no questions available for this assessment at
          the moment. We're sorry for the inconvenience.
        </p>
        <p className="text-center text-sm text-gray-500">
          If you want to take another assessment or try a different one, you can
          head back to the assessment page.
        </p>
        <Button className="mt-4" size="lg" asChild>
          <Link href={"/assessments"}>
            Go to Assessments <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

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
