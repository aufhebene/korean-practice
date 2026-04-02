"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import Mascot from "@/components/ui/Mascot";
import Button from "@/components/ui/Button";

// 어휘 퀴즈 데이터
const vocabularyQuizzes = [
  {
    id: 1,
    korean: "사랑",
    pronunciation: "sarang",
    correctAnswer: "Love",
    options: ["Love", "Hate", "Friend", "Family"],
    example: "나는 너를 사랑해요.",
  },
  {
    id: 2,
    korean: "행복",
    pronunciation: "haengbok",
    correctAnswer: "Happiness",
    options: ["Sadness", "Happiness", "Anger", "Fear"],
    example: "행복한 하루 보내세요.",
  },
  {
    id: 3,
    korean: "친구",
    pronunciation: "chingu",
    correctAnswer: "Friend",
    options: ["Enemy", "Teacher", "Friend", "Parent"],
    example: "그는 내 친구예요.",
  },
  {
    id: 4,
    korean: "음식",
    pronunciation: "eumsik",
    correctAnswer: "Food",
    options: ["Water", "Food", "Drink", "Fruit"],
    example: "한국 음식이 맛있어요.",
  },
  {
    id: 5,
    korean: "학교",
    pronunciation: "hakgyo",
    correctAnswer: "School",
    options: ["Home", "Office", "School", "Hospital"],
    example: "학교에 가요.",
  },
];

export default function VocabularyStudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuiz = vocabularyQuizzes[currentIndex];
  const progress = ((currentIndex + 1) / vocabularyQuizzes.length) * 100;
  const isCorrect = selectedAnswer === currentQuiz?.correctAnswer;

  const handleSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === currentQuiz.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < vocabularyQuizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return "bg-white border-gray-200 hover:border-primary hover:bg-primary/5";
    }
    if (option === currentQuiz.correctAnswer) {
      return "bg-success text-white border-success";
    }
    if (option === selectedAnswer && option !== currentQuiz.correctAnswer) {
      return "bg-error text-white border-error";
    }
    return "bg-gray-100 border-gray-200 opacity-50";
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
            <span className="font-medium text-foreground">어휘 학습</span>
            <Link href="/" className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-foreground" />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted text-center mt-2">
            {currentIndex + 1} / {vocabularyQuizzes.length}
          </p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 max-w-lg mx-auto w-full p-4">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              {/* Mascot */}
              <div className="flex justify-center py-4">
                <Mascot
                  mood={showResult ? (isCorrect ? "excited" : "sad") : "thinking"}
                  size="sm"
                  message="이 단어의 뜻은?"
                />
              </div>

              {/* Word Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <p className="text-4xl font-bold text-foreground mb-2">
                  {currentQuiz.korean}
                </p>
                <p className="text-muted text-sm">{currentQuiz.pronunciation}</p>
                <p className="text-muted text-xs mt-4 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                  예: {currentQuiz.example}
                </p>
              </div>

              {/* Result Feedback */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      isCorrect ? "bg-success/10" : "bg-error/10"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <XCircle className="w-6 h-6 text-error" />
                    )}
                    <div>
                      <p className={`font-medium ${isCorrect ? "text-success" : "text-error"}`}>
                        {isCorrect ? "정답입니다!" : "틀렸어요"}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-muted">
                          정답: <span className="font-bold">{currentQuiz.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Options */}
              <div className="grid grid-cols-2 gap-3">
                {currentQuiz.options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleSelect(option)}
                    disabled={showResult}
                    className={`p-4 rounded-xl border-2 font-medium text-lg transition-colors ${getOptionStyle(option)}`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              {showResult && (
                <Button onClick={handleNext} size="lg" className="w-full">
                  {currentIndex < vocabularyQuizzes.length - 1 ? "다음 문제" : "결과 보기"}
                </Button>
              )}
            </motion.div>
          ) : (
            /* Completion Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full py-12 text-center"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                어휘 학습 완료!
              </h2>
              <p className="text-muted mb-8">
                {vocabularyQuizzes.length}문제 중 {correctCount}문제를 맞혔어요
              </p>

              <div className="w-full max-w-xs space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-emerald-500 mb-1">
                    {Math.round((correctCount / vocabularyQuizzes.length) * 100)}%
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
