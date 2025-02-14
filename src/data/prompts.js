export const promptToGenInsights = (industry, subIndustry) => {
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

  return prompt;
};

export const promptToGenMCQs = ({
  length,
  quizType,
  level,
  industry,
  subIndustry,
  skills,
}) => {
  const prompt = `Generate ${length} ${quizType} ${level}-level ${industry} interview questions for a ${subIndustry} with expertise in the following technologies: ${skills}


Each question should:

 - Be real-world and practical.
 - Have four answer choices, with only one correct answer.
 - Include a detailed explanation of the correct answer.
 - Optionally contain a code snippet (if applicable).
 - Have a difficulty level (BEGINNER | INTERMEDIATE | ADVANCED).
 - Include a category (e.g., React.js, Databases).
 - Include hints to help the user.
 - Be tagged with relevant keywords for better organization.
 - Have a time limit (in seconds) for answering the question.


Return the response in JSON format only. No additional text or formatting, just this structure:  

{
  "questions": [
    {
      "question": "string",
      "category": "string",
      "difficulty": "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": "string",
      "explanation": "string",
      "timeLimit": number,
      "codeSnippet": "string",
      "hints": ["string"],
      "tags": ["string"]
    }
  ]
}
`;

  return prompt;
};

export const promptToGenImprovementTip = (data) => {
  const prompt = `Analyze the user's quiz performance based on their wrong answers. Generate a single, personalized improvement tip that helps them strengthen their weak areas. The tip should focus on patterns in their mistakes, key concepts they struggle with, and actionable advice to improve. Keep it concise, practical, and encouraging. If they performed well overall but made a few mistakes, acknowledge their strength while suggesting areas to refine. If they struggled significantly, provide a motivating improvement plan.

Input Format (JSON):

${data}


Expected Output (JSON):

{
  "improvementTip": "string"
}

Guidelines for Generating the Tip:
 - Identify patterns in the user's mistakes.

Adjust feedback based on performance:
- 80%+ correct: Encourage advanced learning.
- 50-80% correct: Suggest focused improvement.
- Below 50% correct: Provide fundamental learning advice.
- If most mistakes come from a specific category, mention it.
- Keep the tip motivational and actionable.`;

  return prompt;
};

export const promptToAnalyzeResume = (resumeData) => {
  const prompt = `You are an advanced Applicant Tracking System (ATS) that evaluates the content quality of resumes based on industry standards. Analyze the following resume and assess the effectiveness of its content in the following areas:

Keyword Optimization: Identify missing or weak keywords commonly used in resumes for this role.

Bullet Points & Descriptions: Evaluate if descriptions are too vague, too short, or missing important details.

Job Titles & Consistency: Detect any inconsistencies or unclear job titles.

Skills Alignment: Identify if important skills for this role are missing.

General Feedback: Provide specific suggestions for improving the descriptions.

⚠️ Do NOT analyze formatting, layout, or structure. Focus only on content quality.

📌 Expected JSON Response Format:

{
"atsScore": 0-100,
"missingKeywords": ["keyword1", "keyword2", ...],
"weakDescriptions": [
{
"section": "string",
"title": "string",
"issues": ["issue1", "issue2", "issue3"]
}
],
"unclearTitles": ["Title1", "Title2"],
"missingSkills": ["Skill1", "Skill2"],
"improvementSuggestions": "Detailed text feedback on how to improve descriptions."
}

🔹 Resume Data:

${resumeData}

`;

  return prompt;
};
