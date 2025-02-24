import { z } from "zod";

export const coverLetterSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  jobRole: z.string().min(1, { message: "Job role is required" }),
  jobDescription: z.string().min(10, {
    message: "Job description must be at least 10 characters long",
  }),
  tone: z.enum(
    [
      "formal",
      "enthusiastic",
      "creative",
      "concise",
      "persuasive",
      "warm & personal",
    ],
    {
      required_error: "Please select a tone for your cover letter",
    }
  ),
  length: z.enum(["short", "standard", "detailed"], {
    required_error: "Please select a length for your cover letter",
  }),
});
