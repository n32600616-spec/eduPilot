// AI-ready abstraction. Replace these mock implementations with a secure backend
// that calls DeepSeek later. Never expose a DeepSeek API key in frontend code.

export async function generateExplanation(topic, level = "beginner") {
  return `Here is a ${level}-friendly explanation of ${topic}. This demo response is ready to be replaced by DeepSeek.`;
}

export async function generateQuiz(topic, difficulty = "adaptive", count = 10) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    topic,
    difficulty,
    question: `Demo question ${i + 1}: Which statement best describes ${topic}?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 1,
    explanation: `Demo explanation for ${topic}.`
  }));
}

export async function analyzePerformance(attempts) {
  return {
    summary: "Your recent practice suggests that targeted revision would help.",
    weakTopics: attempts?.length ? ["Parameters", "Return values"] : []
  };
}

export async function generatePractice(topic, difficulty = "adaptive") {
  return generateQuiz(topic, difficulty, 5);
}

export async function generateStudyPlan(goal, days) {
  return {
    goal,
    days,
    plan: ["Understand fundamentals", "Practice core concepts", "Take a diagnostic quiz", "Revise weak areas"]
  };
}