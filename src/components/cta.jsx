import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="border-t">
      <div className="container mx-auto flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to Unlock Your Career Potential?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Take the first step with personalized AI coaching, expert interview
          prep, and valuable industry insights to boost your career.
        </p>
        <Button size="lg" className="mt-4 animate-bounce">
          <Link href="/insights">Get Started Now</Link>
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
