export const QUIZ_WEIGHT = 0.4;
export const LAB_WEIGHT = 0.6;
export const PASS_THRESHOLD = 70;

export function calculateTotalScore(quizScore: number, labScore: number): number {
  return Math.round(quizScore * QUIZ_WEIGHT + labScore * LAB_WEIGHT);
}

export function calculateQuizOnlyScore(quizScore: number): number {
  return Math.round(quizScore);
}

export function isPassed(totalScore: number): boolean {
  return totalScore >= PASS_THRESHOLD;
}
