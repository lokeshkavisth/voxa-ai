"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const FullScreenSpinner = ({ className = "size-6" }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <Spinner className={className} />
    </div>
  );
};

FullScreenSpinner.displayName = "FullScreenSpinner";

const Spinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin size-4", className)} />;
};

Spinner.displayName = "Spinner";

export { Spinner, FullScreenSpinner };
