// 사용자
export interface User {
  id: string;
  email: string;
  name: string;
  nativeLanguage: string;
  koreanLevel: "beginner" | "intermediate" | "advanced";
  streak: number;
  totalPoints: number;
  lastStudyDate: Date | null;
}

// 어휘
export interface Vocabulary {
  id: string;
  korean: string;
  pronunciation: string;
  meanings: {
    en: string;
    ja?: string;
    zh?: string;
  };
  category: string;
  level: number;
  audioUrl?: string;
  examples: string[];
}

// 학습 진도
export interface UserProgress {
  id: string;
  vocabularyId: string;
  status: "new" | "learning" | "review" | "mastered";
  correctCount: number;
  incorrectCount: number;
  nextReviewDate: Date;
  lastStudiedAt: Date;
}

// 퀴즈 유형
export type QuizType =
  | "fill-blank" // 빈칸 채우기
  | "word-arrange" // 단어 조합
  | "listening" // 리스닝
  | "multiple-choice"; // 객관식

// 퀴즈 문제
export interface QuizQuestion {
  id: string;
  type: QuizType;
  vocabularyId: string;
  question: string;
  hint?: string;
  correctAnswer: string;
  options: string[];
  audioUrl?: string;
}

// 학습 세션
export interface StudySession {
  newWords: number;
  reviewWords: number;
  retryWords: number;
  totalQuestions: number;
  currentIndex: number;
  correctAnswers: number;
}

// 회화 시나리오
export interface Scenario {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  level: number;
  previewSentences: string[];
}

// 오늘의 학습 요약
export interface DailyStudySummary {
  newWords: number;
  reviewWords: number;
  retryWords: number;
  estimatedMinutes: number;
}
