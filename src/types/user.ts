export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  createdAt: Date;
}

export interface LevelProgress {
  levelId: number;
  quizScore: number;
  labScore: number;
  totalScore: number;
  passed: boolean;
  quizAnswers: number[];
  labCode: string;
  completedAt: Date | null;
  attempts: number;
}

export interface LevelNotes {
  levelId: number;
  content: string;
  updatedAt: Date;
}
