"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Mascot from "@/components/ui/Mascot";
import WordOption from "./WordOption";
import Button from "@/components/ui/Button";

interface FillBlankQuizProps {
  question: string;
  hint: string;
  correctAnswer: string;
  options: string[];
  mascotMessage?: string;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export default function FillBlankQuiz({
  question,
  hint,
  correctAnswer,
  options,
  mascotMessage = "이 문장을 완성해보세요!",
  onAnswer,
  onNext,
}: FillBlankQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isCorrect = selectedAnswer === correctAnswer;

  const handleSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    onAnswer(answer === correctAnswer);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    onNext();
  };

  // 문장에서 빈칸 부분을 렌더링
  const renderQuestion = () => {
    const parts = question.split("[blank]");
    return (
      <p className="text-xl font-medium text-center">
        {parts[0]}
        <span className="inline-block min-w-[80px] mx-1 px-3 py-1 border-b-2 border-primary text-primary font-bold">
          {selectedAnswer || "____"}
        </span>
        {parts[1]}
      </p>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mascot */}
      <div className="flex justify-center py-6">
        <Mascot
          mood={showResult ? (isCorrect ? "excited" : "sad") : "neutral"}
          message={mascotMessage}
        />
      </div>

      {/* Question */}
      <div className="flex-1 px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {renderQuestion()}

          {/* Hint */}
          <p className="text-muted text-center mt-4 text-sm">
            💡 힌트: {hint}
          </p>
        </div>

        {/* Result Feedback */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
                isCorrect ? "bg-success/10" : "bg-error/10"
              }`}
            >
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <XCircle className="w-6 h-6 text-error" />
              )}
              <div>
                <p
                  className={`font-medium ${
                    isCorrect ? "text-success" : "text-error"
                  }`}
                >
                  {isCorrect ? "정답입니다!" : "틀렸어요"}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-muted">
                    정답: <span className="font-bold">{correctAnswer}</span>
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Options */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => (
            <WordOption
              key={option}
              word={option}
              onClick={() => handleSelect(option)}
              disabled={showResult}
              selected={selectedAnswer === option}
              correct={
                showResult
                  ? option === correctAnswer
                    ? true
                    : selectedAnswer === option
                    ? false
                    : null
                  : null
              }
            />
          ))}
        </div>

        {showResult && (
          <Button onClick={handleNext} size="lg" className="w-full">
            다음 문제
          </Button>
        )}
      </div>
    </div>
  );
}
