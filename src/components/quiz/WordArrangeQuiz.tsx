"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";

interface WordArrangeQuizProps {
  englishSentence: string;
  literalTranslation: string;
  naturalTranslation: string;
  correctOrder: string[];
  shuffledWords: string[];
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export default function WordArrangeQuiz({
  englishSentence,
  literalTranslation,
  naturalTranslation,
  correctOrder,
  shuffledWords,
  onAnswer,
  onNext,
}: WordArrangeQuizProps) {
  const [availableWords, setAvailableWords] = useState(shuffledWords);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const isCorrect =
    selectedWords.length === correctOrder.length &&
    selectedWords.every((word, index) => word === correctOrder[index]);

  const handleWordClick = (word: string) => {
    if (showResult) return;
    setAvailableWords(availableWords.filter((w) => w !== word));
    setSelectedWords([...selectedWords, word]);
  };

  const handleRemoveWord = (index: number) => {
    if (showResult) return;
    const word = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const handleReset = () => {
    setSelectedWords([]);
    setAvailableWords(shuffledWords);
  };

  const handleCheck = () => {
    setShowResult(true);
    onAnswer(isCorrect);
  };

  const handleNext = () => {
    setSelectedWords([]);
    setAvailableWords(shuffledWords);
    setShowResult(false);
    onNext();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Question */}
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-muted mb-2">다음 문장을 한국어로 만들어보세요</p>
          <p className="text-xl font-bold text-foreground mb-4">
            &quot;{englishSentence}&quot;
          </p>

          <div className="space-y-2 text-sm">
            <p className="text-muted">
              <span className="font-medium">직역:</span> {literalTranslation}
            </p>
            <p className="text-muted">
              <span className="font-medium">의역:</span> {naturalTranslation}
            </p>
          </div>
        </div>
      </div>

      {/* Answer Area */}
      <div className="flex-1 px-4">
        <div className="bg-gray-50 rounded-2xl p-4 min-h-[80px] flex flex-wrap gap-2 items-start">
          <AnimatePresence mode="popLayout">
            {selectedWords.map((word, index) => (
              <motion.button
                key={`${word}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => handleRemoveWord(index)}
                disabled={showResult}
                className={`px-4 py-2 rounded-xl font-medium text-lg ${
                  showResult
                    ? correctOrder[index] === word
                      ? "bg-success text-white"
                      : "bg-error text-white"
                    : "bg-primary text-white"
                }`}
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
          {selectedWords.length === 0 && (
            <p className="text-muted text-center w-full py-4">
              아래 단어를 클릭해서 문장을 완성하세요
            </p>
          )}
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
                    정답: <span className="font-bold">{correctOrder.join(" ")}</span>
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Available Words */}
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          <AnimatePresence mode="popLayout">
            {availableWords.map((word, index) => (
              <motion.button
                key={`${word}-avail-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => handleWordClick(word)}
                disabled={showResult}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-medium text-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {word}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {!showResult ? (
            <>
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1"
                disabled={selectedWords.length === 0}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                다시하기
              </Button>
              <Button
                onClick={handleCheck}
                className="flex-1"
                disabled={selectedWords.length !== correctOrder.length}
              >
                확인하기
              </Button>
            </>
          ) : (
            <Button onClick={handleNext} size="lg" className="w-full">
              다음 문제
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
