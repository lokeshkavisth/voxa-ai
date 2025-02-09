import { z } from "zod";

export const mcqSchema = z.object({
  quizType: z.enum(["multiple-choice"]),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  totalQuestions: z.enum(["5", "10", "15", "20", "25"]),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
});
