export interface WeekPlan {
  week: number;
  title: string;
  levels: number[];
  goals: string[];
  hoursEstimate: number;
}

export const schedule: WeekPlan[] = [
  { week: 1, title: "Foundations", levels: [0, 1], goals: ["Complete mindset quiz", "Python data basics lab"], hoursEstimate: 7 },
  { week: 2, title: "Machine Learning", levels: [2], goals: ["Train sklearn classifier", "Understand train/test split"], hoursEstimate: 6 },
  { week: 3, title: "LLM APIs", levels: [3], goals: ["Master prompt templates", "JSON output validation"], hoursEstimate: 6 },
  { week: 4, title: "Search & Retrieval", levels: [4], goals: ["Implement TF-IDF search", "Cosine similarity ranking"], hoursEstimate: 6 },
  { week: 5, title: "RAG Pipelines", levels: [5], goals: ["Build end-to-end RAG", "Evaluate retrieval quality"], hoursEstimate: 8 },
  { week: 6, title: "Agents", levels: [6], goals: ["Build agent with tools", "Implement tool selection logic"], hoursEstimate: 8 },
  { week: 7, title: "Eval & Production", levels: [7, 8], goals: ["Build evaluator", "Complete production checklist"], hoursEstimate: 8 },
  { week: 8, title: "Capstone", levels: [9], goals: ["Complete capstone project", "Self-evaluate with rubric"], hoursEstimate: 10 },
];
