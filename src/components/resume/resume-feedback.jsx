// "use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ResumeFeedback = ({ feedbackData }) => {
  return (
    <Card className="border border-dashed max-h-max">
      <CardHeader>
        <CardTitle>ATS Compatibility Score</CardTitle>
        <CardDescription>
          How well your resume performs with Applicant Tracking Systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Progress value={feedbackData.atsScore} className="w-full" />
          <span className="text-2xl font-bold">{feedbackData.atsScore}%</span>
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>Missing Keywords</CardTitle>
        <CardDescription>
          Important keywords that are not present in your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {feedbackData.missingKeywords.map((keyword, index) => (
            <Badge key={index} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>Weak Descriptions</CardTitle>
        <CardDescription>
          Sections that could be improved with more detail or clarity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple">
          {feedbackData.weakDescriptions.map((item, index) => (
            <AccordionItem key={index} value={`${item.section}-${item.title}`}>
              <AccordionTrigger>
                {item.section.charAt(0).toUpperCase() + item.section.slice(1)}:{" "}
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2">
                  {item.issues.map((issue, issueIndex) => (
                    <li key={issueIndex}>{issue}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>

      <CardHeader>
        <CardTitle>Unclear Titles</CardTitle>
        <CardDescription>
          Project or experience titles that may need clarification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {feedbackData.unclearTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </CardContent>

      <CardHeader>
        <CardTitle>Missing Skills</CardTitle>
        <CardDescription>
          Relevant skills that are not mentioned in your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {feedbackData.missingSkills.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>Improvement Suggestions</CardTitle>
        <CardDescription>
          Recommendations to enhance your resume
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">
          {feedbackData.improvementSuggestions}
        </p>
      </CardContent>
    </Card>
  );
};

export default ResumeFeedback;
