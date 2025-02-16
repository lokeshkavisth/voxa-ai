import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CoverLetter = () => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl">This Feature is Under Development.</h2>
      <p>
        We are currently building a smart cover letter feature. <br /> This
        feature will generate a cover letter for you based on the job
        description and your resume. <br /> Please check back later for this
        feature.
      </p>
      <Button>
        <Link href="/">Explore other features</Link>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default CoverLetter;
