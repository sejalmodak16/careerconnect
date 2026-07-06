export const scoreResume = (text) => {
  let score = 0;

  if (text.includes("React")) score += 20;
  if (text.includes("Node")) score += 20;
  if (text.includes("SQL")) score += 20;
  if (text.includes("Project")) score += 20;
  if (text.length > 500) score += 20;

  return score;
};