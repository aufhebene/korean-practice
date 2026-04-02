"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Volume2, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

// 듣기 퀴즈 데이터 (실제로는 오디오 파일이 필요하지만, 여기서는 텍스트로 시뮬레이션)
const listeningQuizzes = [
  {
    id: 1,
    transcript: "오늘 날씨가 좋아요",
    words: ["좋아요", "오늘", "날씨가"],
    correctOrder: ["오늘", "날씨가", "좋아요"],
  },
  {
    id: 2,
    transcript: "저는 학생이에요",
    words: ["학생이에요", "저는"],
    correctOrder: ["저는", "학생이에요"],
  },
  {
    id: 3,
    transcript: "한국어를 공부해요",
    words: ["공부해요", "한국어를"],
    correctOrder: ["한국어를", "공부해요"],
  },
  {
    id: 4,
    transcript: "내일 만나요",
    words: ["만나요", "내일"],
    correctOrder: ["내일", "만나요"],
  },
  {
    id: 5,
    transcript: "커피 한 잔 주세요",
    words: ["주세요", "커피", "잔", "한"],
    correctOrder: ["커피", "한", "잔", "주세요"],
  },
];

export default function ListeningStudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    listeningQuizzes[0].words
  );
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasListened, setHasListened] = useState(false);

  const currentQuiz = listeningQuizzes[currentIndex];
  const progress = ((currentIndex + 1) / listeningQuizzes.length) * 100;
  const isCorrect =
    selectedWords.length === currentQuiz.correctOrder.length &&
    selectedWords.every((word, idx) => word === currentQuiz.correctOrder[idx]);

  // 음성 재생 (Web Speech API 사용)
  const playAudio = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentQuiz.transcript);
      utterance.lang = "ko-KR";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      setHasListened(true);
    } else {
      alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
      setHasListened(true);
    }
  };

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
    setAvailableWords(currentQuiz.words);
  };

  const handleCheck = () => {
    setShowResult(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < listeningQuizzes.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedWords([]);
      setAvailableWords(listeningQuizzes[nextIndex].words);
      setShowResult(false);
      setHasListened(false);
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
            <span className="font-medium text-foreground">듣기 학습</span>
            <Link href="/" className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-foreground" />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted text-center mt-2">
            {currentIndex + 1} / {listeningQuizzes.length}
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
              {/* Listen Button */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <p className="text-muted mb-6">잘 듣고 문장을 완성하세요</p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={playAudio}
                  className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg mx-auto"
                >
                  <Volume2 className="w-10 h-10 text-white" />
                </motion.button>

                <p className="text-sm text-muted mt-4">
                  {hasListened ? "다시 들으려면 클릭하세요" : "클릭해서 들어보세요"}
                </p>
              </div>

              {/* Answer Area */}
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
                          ? currentQuiz.correctOrder[index] === word
                            ? "bg-success text-white"
                            : "bg-error text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {word}
                    </motion.button>
                  ))}
                </AnimatePresence>
                {selectedWords.length === 0 && (
                  <p className="text-muted text-center w-full py-4">
                    들은 내용을 순서대로 조합하세요
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
                      <p className="text-sm text-muted">
                        정답: <span className="font-bold">{currentQuiz.transcript}</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Available Words */}
              <div className="flex flex-wrap gap-2 justify-center">
                <AnimatePresence mode="popLayout">
                  {availableWords.map((word, index) => (
                    <motion.button
                      key={`${word}-avail-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => handleWordClick(word)}
                      disabled={showResult || !hasListened}
                      className={`px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-medium text-lg transition-colors ${
                        hasListened
                          ? "hover:border-amber-500 hover:bg-amber-50"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      {word}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {!hasListened && (
                <p className="text-center text-sm text-muted">
                  먼저 음성을 들어주세요
                </p>
              )}

              {/* Actions */}
              {hasListened && (
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
                        disabled={availableWords.length > 0}
                      >
                        확인하기
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleNext} size="lg" className="w-full">
                      {currentIndex < listeningQuizzes.length - 1 ? "다음 문제" : "결과 보기"}
                    </Button>
                  )}
                </div>
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
                듣기 학습 완료!
              </h2>
              <p className="text-muted mb-8">
                {listeningQuizzes.length}문제 중 {correctCount}문제를 맞혔어요
              </p>

              <div className="w-full max-w-xs space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-amber-500 mb-1">
                    {Math.round((correctCount / listeningQuizzes.length) * 100)}%
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
