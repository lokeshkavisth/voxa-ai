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
  "topic": "string",
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

export const promptToGenImprovementTip = (data, industry, subIndustry) => {
  const prompt = `  
  Analyze the user's quiz performance based on their wrong answers. Generate a single, personalized improvement tip that helps them strengthen their weak areas. The tip should focus on patterns in their mistakes, key concepts they struggle with, and actionable advice to improve. Keep it concise, practical, and encouraging. If they performed well overall but made a few mistakes, acknowledge their strength while suggesting areas to refine. If they struggled significantly, provide a motivating improvement plan.


Input Format (JSON):

${JSON.stringify(data)}


Expected Output (JSON):

{
  "improvementTip": "string"
}

Guidelines for Generating the Tip:

-Identify patterns in the user's wrong answers to understand the common areas they are struggling with.
- Adjust feedback based on performance:
- 80%+ correct: Congratulate the user on their strong performance, and suggest advanced topics or fine-tuning techniques to push them further.
- 50-80% correct: Recognize the effort and suggest targeted improvement in specific concepts that need attention. Encourage consistent practice.
- Below 50% correct: Acknowledge the struggle and emphasize the importance of mastering foundational concepts. Suggest easy-to-follow learning resources to strengthen weak areas.
- If most mistakes come from a specific category or concept, mention it explicitly and focus the improvement tip on that topic.
- The tone of the improvement tip should be motivational, practical, and actionable
—help the user feel empowered to improve, without discouragement.
`;

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
"improvementSuggestions": "string"
}

🔹 Resume Data:

${resumeData}

`;

  return prompt;
};

export const promptToGenCoverLetter = (
  jobRole,
  companyName,
  tone,
  jobDescription,
  length,
  user
) => {
  const prompt = `Generate a compelling and professionally formatted cover letter for a ${jobRole} position at ${companyName}, tailored to a "${tone}" tone. The letter should effectively highlight the candidate's qualifications while aligning with the company's needs. Ensure the letter is approximately ${length} words long.

Candidate Information:
Industry: ${user.industry}
Years of Experience: ${user.experience}
Key Skills: ${user.skills?.join(", ")}
Professional Background & Expertise: ${user.bio}
Job Description & Requirements:
${jobDescription}

Guidelines for the Cover Letter:
- Use a "${tone}" tone that matches the candidate’s personality and the industry’s expectations.
- Start with a strong opening that grabs attention and expresses enthusiasm for the role.
- Clearly highlight relevant skills, achievements, and experiences—especially those aligning with the job description.
- Demonstrate a deep understanding of the company’s mission, values, and needs, showing how the candidate can contribute effectively.
- Keep the letter concise (max 400 words) while ensuring it remains engaging and impactful.
- Use proper business letter formatting in Markdown, including a professional salutation, structured body, and a compelling closing statement.
- Incorporate quantifiable achievements or specific examples to showcase expertise and results.
- End with a persuasive and action-oriented closing statement, encouraging further discussion or an interview.

📌 Expected JSON Response Format:

{
"markdown": "string",
}


Format the final output in Markdown to ensure readability and professionalism.`;

  return prompt;
};
