import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Lightbulb, FileText, Mail, Mic } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900">About Voxa.ai</h1>
      <p className="mt-4 text-gray-600 text-lg">
        Unlock the tools and insights you need to accelerate your career, from
        AI-powered resume building to real-time industry trends and personalized
        feedback.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <Card className="shadow-lg col-span-2">
          <CardContent className="p-6 flex flex-col items-center">
            <FileText className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold">AI Resume Builder</h2>
            <p className="text-gray-500 text-sm mt-2">
              Craft a professional resume in minutes with AI-powered suggestions
              tailored to your career goals.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6 flex flex-col items-center">
            <Mail className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold">Smart Cover Letters</h2>
            <p className="text-gray-500 text-sm mt-2">
              Generate tailored cover letters instantly, customized for each job
              application with AI assistance.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6 flex flex-col items-center">
            <Mic className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold">AI Interview Prep</h2>
            <p className="text-gray-500 text-sm mt-2">
              Sharpen your interview skills with realistic practice questions
              and personalized AI feedback.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg col-span-2">
          <CardContent className="p-6 flex flex-col items-center">
            <Lightbulb className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold">Industry Insights</h2>
            <p className="text-gray-500 text-sm mt-2">
              Stay ahead with data on in-demand skills, top-paying roles, salary
              ranges, and market trends.
            </p>
          </CardContent>
        </Card>
      </div>

      <Button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
        Learn More
      </Button>
    </div>
  );
}
