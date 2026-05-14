"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Volume2, CheckCircle, XCircle, RotateCcw, PlayCircle } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import {
  getRandomListening,
  listeningCategories,
  getLevelName,
  type ListeningQuiz
} from "@/data/listening";
import { useAuthStore } from "@/stores/useAuthStore";
import { submitStudySession, type StudySessionItem } from "@/lib/firestore";
import { speakKorean } from "@/lib/tts";

const QUIZ_COUNT = 10;

export default function ListeningStudyPage() {
  const [quizItems, setQuizItems] = useState<ListeningQuiz[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasListened, setHasListened] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [results, setResults] = useState<StudySessionItem[]>([]);
  const uid = useAuthStore((s) => s.user?.uid);

  // 퀴즈 시작
  const startQuiz = (level?: number) => {
    const items = getRandomListening(QUIZ_COUNT, level);
    setQuizItems(items);
    if (items.length > 0) {
      const shuffled = [...items[0].words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
    }
    setSelectedLevel(level || null);
    setIsStarted(true);
  };

  const currentQuiz = quizItems[currentIndex];
  const progress = quizItems.length > 0 ? ((currentIndex + 1) / quizItems.length) * 100 : 0;
  const isCorrect = currentQuiz
    ? selectedWords.length === currentQuiz.correctOrder.length &&
      selectedWords.every((word, idx) => word === currentQuiz.correctOrder[idx])
    : false;

  // 음성 재생 (네이티브 Capacitor TTS, 웹은 Web Speech API fallback)
  const playAudio = async (rate: number = 0.8) => {
    if (!currentQuiz) return;
    try {
      await speakKorean(currentQuiz.transcript, { rate });
      setHasListened(true);
      setPlayCount((prev) => prev + 1);
    } catch (err) {
      console.warn("[TTS]", err);
      alert("음성 합성을 사용할 수 없습니다.");
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
    if (!currentQuiz) return;
    setSelectedWords([]);
    const shuffled = [...currentQuiz.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
  };

  const handleCheck = () => {
    setShowResult(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    if (currentQuiz) {
      setResults((prev) => [...prev, { itemId: currentQuiz.id, correct: isCorrect }]);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizItems.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedWords([]);
      const shuffled = [...quizItems[nextIndex].words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setShowResult(false);
      setHasListened(false);
      setPlayCount(0);
    } else {
      setIsComplete(true);
      if (uid) {
        submitStudySession(uid, {
          quizType: "listening",
          score: results.filter((r) => r.correct).length,
          total: quizItems.length,
          items: results,
        }).catch(() => {});
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    return listeningCategories.find((c) => c.id === category)?.icon || "🎧";
  };

  // 시작 화면
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
          <div className="max-w-lg mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <h1 className="font-bold text-lg text-foreground">듣기 학습</h1>
            </div>
          </div>
        </header>

        {/* Level Selection */}
        <div className="max-w-lg mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎧</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">듣기 연습</h2>
            <p className="text-muted">난이도를 선택하세요</p>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startQuiz(1)}
              className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-left hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">초급</h3>
                  <p className="text-sm text-muted">짧고 간단한 문장</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startQuiz(2)}
              className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-left hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">⭐⭐</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">중급</h3>
                  <p className="text-sm text-muted">일상 대화 수준의 문장</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startQuiz(3)}
              className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-left hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">⭐⭐⭐</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">고급</h3>
                  <p className="text-sm text-muted">복잡하고 긴 문장</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => startQuiz()}
              className="w-full p-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg text-white text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">랜덤 도전</h3>
                  <p className="text-sm text-white/80">모든 난이도 섞어서 도전</p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  if (quizItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <span className="font-medium text-foreground">
              듣기 학습 {selectedLevel ? `(${getLevelName(selectedLevel)})` : "(랜덤)"}
            </span>
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
            {currentIndex + 1} / {quizItems.length}
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
              {/* Quiz Info */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  {getCategoryIcon(currentQuiz.category)} {listeningCategories.find(c => c.id === currentQuiz.category)?.name}
                </span>
                <span className="text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                  {"⭐".repeat(currentQuiz.level)}
                </span>
              </div>

              {/* Listen Button */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <p className="text-muted mb-6">잘 듣고 문장을 완성하세요</p>

                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playAudio(0.8)}
                    className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Volume2 className="w-10 h-10 text-white" />
                  </motion.button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => playAudio(0.5)}
                    className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    🐢 느리게
                  </button>
                  <button
                    onClick={() => playAudio(0.8)}
                    className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    🎯 보통
                  </button>
                  <button
                    onClick={() => playAudio(1.0)}
                    className="text-xs px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    🐇 빠르게
                  </button>
                </div>

                <p className="text-sm text-muted mt-4">
                  {hasListened
                    ? `${playCount}번 들었어요. 다시 들으려면 클릭하세요`
                    : "클릭해서 들어보세요"}
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
                    className={`p-4 rounded-xl ${
                      isCorrect ? "bg-success/10" : "bg-error/10"
                    }`}
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
                        <p className="text-sm text-muted">
                          정답: <span className="font-bold">{currentQuiz.transcript}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted mt-2 bg-white/50 px-3 py-2 rounded-lg">
                      🇺🇸 {currentQuiz.translation}
                    </p>
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
                      {currentIndex < quizItems.length - 1 ? "다음 문제" : "결과 보기"}
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
                {quizItems.length}문제 중 {correctCount}문제를 맞혔어요
              </p>

              <div className="w-full max-w-xs space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-amber-500 mb-1">
                    {Math.round((correctCount / quizItems.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted">정답률</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsStarted(false);
                      setCurrentIndex(0);
                      setCorrectCount(0);
                      setIsComplete(false);
                      setSelectedWords([]);
                      setHasListened(false);
                      setPlayCount(0);
                    }}
                    className="flex-1"
                  >
                    다시 학습
                  </Button>
                  <Link
                    href="/"
                    className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-medium text-center hover:bg-primary/90 transition-colors"
                  >
                    홈으로
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
