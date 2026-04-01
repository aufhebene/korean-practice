"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import FillBlankQuiz from "@/components/quiz/FillBlankQuiz";
import WordArrangeQuiz from "@/components/quiz/WordArrangeQuiz";

// 샘플 퀴즈 데이터
const quizzes = [
  {
    type: "fill-blank" as const,
    question: "네, 아까 친구랑 [blank] 먹었어요",
    hint: "I had lunch",
    correctAnswer: "점심",
    options: ["점심", "저녁", "아침", "밥을"],
    mascotMessage: "밥 먹었어요?",
  },
  {
    type: "word-arrange" as const,
    englishSentence: "I go to school every day",
    literalTranslation: "나는 매일 학교에 갑니다",
    naturalTranslation: "저는 매일 학교에 다녀요",
    correctOrder: ["나는", "매일", "학교에", "갑니다"],
    shuffledWords: ["갑니다", "학교에", "나는", "매일"],
  },
  {
    type: "fill-blank" as const,
    question: "오늘 날씨가 정말 [blank]",
    hint: "The weather is really nice",
    correctAnswer: "좋아요",
    options: ["좋아요", "나빠요", "추워요", "더워요"],
    mascotMessage: "날씨 어때요?",
  },
  {
    type: "word-arrange" as const,
    englishSentence: "I like coffee",
    literalTranslation: "나는 커피를 좋아합니다",
    naturalTranslation: "저는 커피를 좋아해요",
    correctOrder: ["나는", "커피를", "좋아해요"],
    shuffledWords: ["좋아해요", "나는", "커피를"],
  },
];

export default function StudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuiz = quizzes[currentIndex];
  const progress = ((currentIndex + 1) / quizzes.length) * 100;

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <span className="text-sm font-medium text-muted">
              {currentIndex + 1} / {quizzes.length}
            </span>
            <Link href="/" className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-foreground" />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary-light"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* Quiz Content */}
      <div className="flex-1 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="h-full"
            >
              {currentQuiz.type === "fill-blank" ? (
                <FillBlankQuiz
                  question={currentQuiz.question}
                  hint={currentQuiz.hint}
                  correctAnswer={currentQuiz.correctAnswer}
                  options={currentQuiz.options}
                  mascotMessage={currentQuiz.mascotMessage}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                />
              ) : (
                <WordArrangeQuiz
                  englishSentence={currentQuiz.englishSentence}
                  literalTranslation={currentQuiz.literalTranslation}
                  naturalTranslation={currentQuiz.naturalTranslation}
                  correctOrder={currentQuiz.correctOrder}
                  shuffledWords={currentQuiz.shuffledWords}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full p-8 text-center"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                학습 완료!
              </h2>
              <p className="text-muted mb-8">
                {quizzes.length}문제 중 {correctCount}문제를 맞혔어요
              </p>

              <div className="w-full max-w-xs space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-primary mb-1">
                    {Math.round((correctCount / quizzes.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted">정답률</p>
                </div>

                <Link
                  href="/"
                  className="block w-full bg-primary text-white py-3 px-6 rounded-xl font-medium text-center hover:bg-primary/90 transition-colors"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
