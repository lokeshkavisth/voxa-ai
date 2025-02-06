"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite-preview-02-05",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateAIinsights = async (industry, subIndustry) => {
  const prompt = `
          Analyze the current state of the ${subIndustry} in ${industry} industry and providing insights strictly in the following JSON format without any additional notes or explanations:

    {
        "salaryRanges": [{ "role": "string", "min": number, "max": number, "median": number, "location": "string" }],
        "growthRate": number, // Percentage value (e.g., 7.5)
        "demandLevel": "HIGH" | "MEDIUM" | "LOW",
        "topSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
        "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
        "keyTrends": ["trend1", "trend2", "trend3", "trend4", "trend5"],
        "recommendedSkills": ["skill1", "skill2", "skill3", "skill4", "skill5"]
    }

  REQUIREMENTS:
    - Return ONLY the JSON output—no additional text, explanations, or markdown formatting.
    - Include salary ranges for at least 5 common roles.
    - Growth rate must be expressed as a percentage.
    - Provide at least 5 skills and 5 key industry trends.
        `;

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
  const textResponse = result.response.text();

  const formatedText = textResponse.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(formatedText);
};
