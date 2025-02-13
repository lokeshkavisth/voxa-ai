import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            404 - Page Not Found
          </h1>
          <p className="max-w-[600px] text-muted-foreground">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-muted-foreground">Let's get you back on track.</p>
          <Button asChild>
            <Link href="/" className="flex items-center">
              Back to Home
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
