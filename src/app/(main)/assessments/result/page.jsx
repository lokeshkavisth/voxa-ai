"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataContext } from "@/context/data-context";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const Result = () => {
  const { data } = useContext(DataContext);
  const result = data.results;

  const incorrectQuestions = result?.questions?.filter(
    (question) => !question.isCorrect
  );

  const getBadgeVariant = (score) => {
    if (score >= 80) {
      return badgeVariants.Success;
    }
    return badgeVariants.Secondary;
  };

  if (!result || result.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-lg font-medium text-gray-700">
          We didn't receive your assessment results. We apologize for the
          inconvenience.
        </p>
        <p className="text-center text-sm text-gray-500">
          If you want to take the assessment again, you can head back to the
          assessment page.
        </p>
        <Button className="mt-4" size="lg" asChild>
          <Link href={"/assessments"}>
            Take Assessment Again <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="">
          <CardHeader>
            <CardTitle>Assessment Result</CardTitle>
            <CardDescription>
              Completed on {new Date(result.createdAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{result.quizScore}%</p>
                <p className="text-sm text-muted-foreground">Total Score</p>
              </div>
              <Badge variant={getBadgeVariant(result.quizScore)}>
                {result.quizScore >= 80 ? "Passed" : "Needs Improvement"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Improvement Tip</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.improvementTip}</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Incorrect Answers</CardTitle>
            <CardDescription>
              Review the questions you got wrong
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {incorrectQuestions?.map((question, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    <div className="text-left">
                      <p className="font-medium">{question.question}</p>
                      <p className="text-sm text-muted-foreground">
                        {question.category} - {question.difficulty}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {question.codeSnippet && (
                        <SyntaxHighlighter
                          language="javascript"
                          style={tomorrow}
                        >
                          {question.codeSnippet}
                        </SyntaxHighlighter>
                      )}
                      <div>
                        <p className="font-medium">Your Answer:</p>
                        <p className="text-red-500">
                          {question.selectedAnswer}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Correct Answer:</p>
                        <p className="text-green-500">
                          {question.correctAnswer}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Explanation:</p>
                        <p>{question.explanation}</p>
                      </div>
                      <div>
                        <p className="font-medium">Tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {question?.tags?.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button size="lg">
          <Link href={"/assessments"}>Take me to the assessments</Link>
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Result;
