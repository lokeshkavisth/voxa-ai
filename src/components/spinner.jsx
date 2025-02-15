"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const FullScreenSpinner = ({ className = "size-6" }) => {
  useEffect(() => {
    const disableKeys = (event) => {
      event.preventDefault();
    };

    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-red-50/20"
      role="dialog"
      aria-modal="true"
    >
      <Spinner className={className} />
      <span></span>
    </div>
  );
};

FullScreenSpinner.displayName = "FullScreenSpinner";

const Spinner = ({ className }) => {
  return <Loader2 className={cn("animate-spin size-4", className)} />;
};

Spinner.displayName = "Spinner";

export { Spinner, FullScreenSpinner };
