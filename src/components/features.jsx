import { FileTextIcon, Pen, TrendingUp, Users } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    name: "AI Resume Builder",
    description:
      "Craft a professional resume in minutes with AI-powered suggestions tailored to your career goals.",
    icon: FileTextIcon,
  },
  {
    name: "Smart Cover Letters",
    description:
      "Generate tailored cover letters instantly, customized for each job application with AI assistance.",
    icon: Pen,
  },
  {
    name: "AI Interview Prep",
    description:
      "Sharpen your interview skills with realistic practice questions and personalized AI feedback.",
    icon: Users,
  },
  {
    name: "Industry Insights",
    description:
      "Stay ahead with data on in-demand skills, top-paying roles, salary ranges, and market trends.",
    icon: TrendingUp,
  },
];

export default function Features() {
  return (
    <section className="container mx-auto space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Powerful Tools for Career Growth
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          {/* Discover how Amane Soft can transform your business with our
          innovative technologies. */}
          Unlock the tools and insights you need to accelerate your career, from
          AI-powered resume building to real-time industry trends and
          personalized feedback.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <Card
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-background p-8"
          >
            <div className="flex items-center gap-4">
              <feature.icon className="h-8 w-8" />
              <h3 className="font-bold">{feature.name}</h3>
            </div>
            <p className="mt-2 text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
