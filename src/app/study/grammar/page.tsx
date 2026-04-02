"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import Mascot from "@/components/ui/Mascot";
import Button from "@/components/ui/Button";

// 문법 퀴즈 데이터
const grammarQuizzes = [
  {
    id: 1,
    sentence: "나[blank] 학교에 갑니다",
    hint: "주어를 나타내는 조사",
    correctAnswer: "는",
    options: ["는", "를", "에", "와"],
    explanation: "'는/은'은 주어를 나타내는 조사입니다.",
  },
  {
    id: 2,
    sentence: "사과[blank] 먹어요",
    hint: "목적어를 나타내는 조사",
    correctAnswer: "를",
    options: ["가", "를", "은", "에서"],
    explanation: "'를/을'은 목적어를 나타내는 조사입니다.",
  },
  {
    id: 3,
    sentence: "도서관[blank] 공부해요",
    hint: "장소를 나타내는 조사",
    correctAnswer: "에서",
    options: ["에서", "를", "이", "와"],
    explanation: "'에서'는 행동이 일어나는 장소를 나타냅니다.",
  },
  {
    id: 4,
    sentence: "친구[blank] 같이 갔어요",
    hint: "함께를 나타내는 조사",
    correctAnswer: "와",
    options: ["는", "를", "에", "와"],
    explanation: "'와/과'는 '함께'의 의미를 나타냅니다.",
  },
  {
    id: 5,
    sentence: "내일 학교[blank] 가요",
    hint: "방향/목적지를 나타내는 조사",
    correctAnswer: "에",
    options: ["에서", "를", "에", "은"],
    explanation: "'에'는 방향이나 목적지를 나타냅니다.",
  },
];

export default function GrammarStudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuiz = grammarQuizzes[currentIndex];
  const progress = ((currentIndex + 1) / grammarQuizzes.length) * 100;
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
    if (currentIndex < grammarQuizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const renderSentence = () => {
    const parts = currentQuiz.sentence.split("[blank]");
    return (
      <p className="text-2xl font-medium text-foreground">
        {parts[0]}
        <span className="inline-block min-w-[50px] mx-1 px-3 py-1 border-b-2 border-purple-500 text-purple-600 font-bold">
          {selectedAnswer || "___"}
        </span>
        {parts[1]}
      </p>
    );
  };

  const getOptionStyle = (option: string) => {
    if (!showResult) {
      return "bg-white border-gray-200 hover:border-purple-500 hover:bg-purple-50";
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
            <span className="font-medium text-foreground">문법 학습</span>
            <Link href="/" className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-foreground" />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted text-center mt-2">
            {currentIndex + 1} / {grammarQuizzes.length}
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
                  message="올바른 조사를 선택하세요"
                />
              </div>

              {/* Sentence Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                {renderSentence()}
                <p className="text-muted text-sm mt-4">
                  💡 힌트: {currentQuiz.hint}
                </p>
              </div>

              {/* Result Feedback */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl ${isCorrect ? "bg-success/10" : "bg-error/10"}`}
                  >
                    <div className="flex items-center gap-3">
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
                    </div>
                    <p className="text-sm text-muted mt-3 bg-white/50 p-3 rounded-lg">
                      📝 {currentQuiz.explanation}
                    </p>
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
                    className={`p-4 rounded-xl border-2 font-bold text-xl transition-colors ${getOptionStyle(option)}`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {/* Next Button */}
              {showResult && (
                <Button onClick={handleNext} size="lg" className="w-full">
                  {currentIndex < grammarQuizzes.length - 1 ? "다음 문제" : "결과 보기"}
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
                문법 학습 완료!
              </h2>
              <p className="text-muted mb-8">
                {grammarQuizzes.length}문제 중 {correctCount}문제를 맞혔어요
              </p>

              <div className="w-full max-w-xs space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-purple-500 mb-1">
                    {Math.round((correctCount / grammarQuizzes.length) * 100)}%
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
