import { create } from "zustand";
import type { StudySession, DailyStudySummary } from "@/types";

interface StudyState {
  // 오늘의 학습 요약
  dailySummary: DailyStudySummary;
  setDailySummary: (summary: DailyStudySummary) => void;

  // 현재 학습 세션
  session: StudySession | null;
  startSession: (summary: DailyStudySummary) => void;
  nextQuestion: () => void;
  recordAnswer: (correct: boolean) => void;
  endSession: () => void;

  // 연속 학습
  streak: number;
  updateStreak: (streak: number) => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  dailySummary: {
    newWords: 0,
    reviewWords: 0,
    retryWords: 0,
    estimatedMinutes: 0,
  },

  setDailySummary: (summary) => set({ dailySummary: summary }),

  session: null,

  startSession: (summary) =>
    set({
      session: {
        newWords: summary.newWords,
        reviewWords: summary.reviewWords,
        retryWords: summary.retryWords,
        totalQuestions:
          summary.newWords + summary.reviewWords + summary.retryWords,
        currentIndex: 0,
        correctAnswers: 0,
      },
    }),

  nextQuestion: () =>
    set((state) => {
      if (!state.session) return state;
      return {
        session: {
          ...state.session,
          currentIndex: state.session.currentIndex + 1,
        },
      };
    }),

  recordAnswer: (correct) =>
    set((state) => {
      if (!state.session) return state;
      return {
        session: {
          ...state.session,
          correctAnswers: state.session.correctAnswers + (correct ? 1 : 0),
        },
      };
    }),

  endSession: () => set({ session: null }),

  streak: 0,
  updateStreak: (streak) => set({ streak }),
}));
