const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeResume = async (resumeText, jobTitle, jobDescription) => {
  try {
    const prompt = `
Job: ${jobTitle}
Description: ${jobDescription}

Resume:
${resumeText}

Return JSON:
{
  "score": number,
  "summary": string,
  "strengths": [],
  "weaknesses": []
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return JSON.parse(response.choices[0].message.content);

  } catch (e) {
    console.log("AI error:", e.message);
    return { score: 0, summary: "failed", strengths: [], weaknesses: [] };
  }
};

module.exports = { analyzeResume };