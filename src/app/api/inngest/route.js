"use server";

import { inngest } from "@/inngest/client";
import { updateIndustryInsights } from "@/inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  // signingKey: process.env.INNGEST_SIGNING_KEY,
  functions: [updateIndustryInsights],
});
