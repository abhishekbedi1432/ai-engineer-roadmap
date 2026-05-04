export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LabConfig {
  starterCode: string;
  solutionCode: string;
  assertions: string;
  requiredPackages: string[];
  instructions: string;
  hints?: string[];
}

export interface LevelContent {
  id: number;
  title: string;
  description: string;
  estimatedHours: number;
  lesson: string;
  lab: LabConfig | null;
  quiz: QuizQuestion[];
  prerequisites?: number[];
}
