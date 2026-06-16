"use server";

import { generateAiResponse as generateResponse } from "@/lib/gemini-ai";

export async function generateAiResponse(prompt) {
  return generateResponse(prompt);
}
