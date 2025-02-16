import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import {
  Zap,
  Brain,
  Settings,
  BarChart,
  Smartphone,
  HeadphonesIcon,
  RefreshCw,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div>
      <div className="mb-6 space-y-4">
        <h1 className="text-3xl font-bold ">About Us</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products */}
        <Card className="md:col-span-2 row-span-2">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>What sets us apart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: "SmartInsights",
                  description: "AI-powered industry insights",
                },
                {
                  name: "ResumeBoost",
                  description: "Optimized resume generation",
                },
                {
                  name: "SkillMatcher",
                  description: "Personalized skill recommendations",
                },
                {
                  name: "InterviewReady",
                  description: "Streamlined interview preparation",
                },
              ].map((product) => (
                <div key={product.name} className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="mt-6" variant="outline">
              <Link href={"/"}>
                Explore All Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Simple steps to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Sign up with your account</li>
              <li>Select your industry and skills</li>
              <li>Get AI-generated industry insights</li>
              <li>Customize your profile and resume</li>
              <li>Start applying and track your progress</li>
            </ol>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
            <CardDescription>What sets us apart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "Real-time collaboration",
                "AI-powered insights",
                "Customizable workflows",
                "Advanced analytics",
                "Cross-platform support",
                "24/7 customer support",
                "Regular updates",
                "Enterprise-grade security",
              ].map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Connect With Us</CardTitle>
            <CardDescription>Follow us on social media</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around">
              <Link
                href="https://twitter.com/streamline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <Link
                href="https://facebook.com/streamline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </Link>
              <Link
                href="https://instagram.com/streamline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </Link>
              <Link
                href="https://linkedin.com/company/streamline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg">
              At StreamLine, we're committed to revolutionizing the way teams
              work together. Our mission is to provide intuitive, powerful tools
              that enhance collaboration, boost productivity, and drive
              innovation across organizations of all sizes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
