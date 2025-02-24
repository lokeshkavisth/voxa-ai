"use server";

import { model } from "@/config/gemini";

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateAiResponse = async (prompt) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'Analyze the current state of the tech industry and provide insights in ONLY the following JSON format without any additional notes or explanations:\n          {\n            "salaryRanges": [\n              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }\n            ],\n            "growthRate": number,\n            "demandLevel": "High" | "Medium" | "Low",\n            "topSkills": ["skill1", "skill2"],\n            "marketOutlook": "Positive" | "Neutral" | "Negative",\n            "keyTrends": ["trend1", "trend2"],\n            "recommendedSkills": ["skill1", "skill2"]\n          }\n          \n          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.\n          Include at least 5 common roles for salary ranges.\n          Growth rate should be a percentage.\n          Include at least 5 skills and trends.',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "salaryRanges": [\n    { "role": "Software Engineer", "min": 80000, "max": 180000, "median": 120000, "location": "Remote/US" },\n    { "role": "Data Scientist", "min": 90000, "max": 200000, "median": 135000, "location": "Remote/US" },\n    { "role": "Data Analyst", "min": 65000, "max": 140000, "median": 95000, "location": "Remote/US" },\n    { "role": "UX/UI Designer", "min": 70000, "max": 160000, "median": 110000, "location": "Remote/US" },\n    { "role": "DevOps Engineer", "min": 95000, "max": 195000, "median": 140000, "location": "Remote/US" },\n    { "role": "Project Manager", "min": 75000, "max": 175000, "median": 125000, "location": "Remote/US" }\n  ],\n  "growthRate": 15,\n  "demandLevel": "High",\n  "topSkills": ["Python", "JavaScript", "Cloud Computing", "SQL", "Machine Learning"],\n  "marketOutlook": "Positive",\n  "keyTrends": ["Artificial Intelligence", "Cloud Computing", "Cybersecurity", "Data Analytics", "Low-Code/No-Code"],\n  "recommendedSkills": ["Cloud Computing", "Data Analytics", "Cybersecurity", "AI/ML", "Agile Methodologies"]\n}\n```',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  console.log(result);
  const textResponse = result.response.text();

  const formatedText = textResponse.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(formatedText);
};
