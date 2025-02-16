import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container mx-auto min-h-[700px] flex flex-col items-center justify-center space-y-8 text-center">
      <div className="space-y-4">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-full mb-10"
        >
          <Link href="/https://github.com/lokeshkavisth/voxa-ai">
            <Star className="text-amber-500" />
            Star us on Github
          </Link>
        </Button>
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Unlock Potential with
          <br />
          AI Guidance
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Unlock your career potential with personalized coaching, targeted
          interview strategies, and AI-driven insights to accelerate your
          success.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg">
          <Link href="/insights">Unlock My Potential</Link>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" size="lg">
          <Link href="/about">See How It Works</Link>
        </Button>
      </div>
    </section>
  );
}
