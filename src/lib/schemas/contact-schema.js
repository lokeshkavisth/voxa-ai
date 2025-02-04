import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{10,15}$/.test(val), {
      message: "Invalid phone number",
    }),
  linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  x: z.string().url("Invalid X URL").optional(),
  portfolio: z.string().url("Invalid portfolio URL").optional(),
});
