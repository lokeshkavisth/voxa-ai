import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-dashed">
      <div className="container mx-auto flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Voxa.ai</h2>
          <p className="text-sm text-muted-foreground">
            Transforming professional growth with AI-driven coaching and
            insights.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/insights"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Industry Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/assessments"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Assessments
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/cover-letter"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Cover Letter
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/onboarding"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/lokeshkavisth/voxa-ai"
                className="text-muted-foreground transition-colors hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://x.com/lokeshkavisth"
                className="text-muted-foreground transition-colors hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com/in/lokeshkavisth"
                className="text-muted-foreground transition-colors hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Voxa.ai, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
