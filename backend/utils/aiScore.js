export const getResumeScore = (resumeText, job) => {
  let score = 0;

  if (!resumeText) return 0;

  const text = resumeText.toLowerCase();

  const keywords = [
    "react",
    "node",
    "express",
    "javascript",
    "sql",
    "mongodb",
    "api",
    job?.title?.toLowerCase(),
    job?.company?.toLowerCase(),
  ];

  keywords.forEach((word) => {
    if (text.includes(word)) {
      score += 10;
    }
  });

  // bonus points
  if (text.length > 500) score += 10;

  return Math.min(score, 100);
};