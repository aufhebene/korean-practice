"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, CheckCircle, XCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import Mascot from "@/components/ui/Mascot";
import Button from "@/components/ui/Button";
import SpeakButton from "@/components/ui/SpeakButton";
import { vocabularyData, generateQuizOptions } from "@/data/vocabulary";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  getReviewDueVocabularyIds,
  submitStudySession,
  type StudySessionItem,
} from "@/lib/firestore";
import type { Vocabulary } from "@/types";

const MAX_PER_SESSION = 10;

type LoadingState = "loading" | "ready" | "empty" | "unauth";

export default function ReviewPage() {
  const uid = useAuthStore((s) => s.user?.uid);
  const isAuthLoading = useAuthStore((s) => s.isLoading);

  const [state, setState] = useState<LoadingState>("loading");
  const [quizWords, setQuizWords] = useState<Vocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [results, setResults] = useState<StudySessionItem[]>([]);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!uid) {
      setState("unauth");
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const dueIds = await getReviewDueVocabularyIds(uid);
        if (cancelled) return;
        if (dueIds.length === 0) {
          setState("empty");
          return;
        }
        const idSet = new Set(dueIds);
        const words = vocabularyData
          .filter((v) => idSet.has(v.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, MAX_PER_SESSION);
        setQuizWords(words);
        if (words.length > 0) {
          setOptions(generateQuizOptions(words[0]));
        }
        setState("ready");
      } catch (err) {
        console.error("[review] 로드 실패", err);
        setState("empty");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [uid, isAuthLoading]);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">복습 단어를 불러오는 중...</p>
      </div>
    );
  }

  if (state === "unauth") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            로그인이 필요합니다
          </h2>
          <p className="text-muted mb-6">복습 기능은 학습 기록이 있어야 사용할 수 있어요</p>
          <Link href="/auth/login">
            <Button>로그인하기</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            오늘 복습할 단어가 없어요
          </h2>
          <p className="text-muted mb-6">
            새 단어를 학습하면 자동으로 복습 일정이 잡혀요. 어휘 학습으로 넘어가볼까요?
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/study/vocabulary">
              <Button className="w-full">어휘 학습 시작</Button>
            </Link>
            <Link href="/" className="text-sm text-muted py-2">
              홈으로
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuiz = quizWords[currentIndex];
  const progress =
    quizWords.length > 0 ? ((currentIndex + 1) / quizWords.length) * 100 : 0;
  const isCorrect = selectedAnswer === currentQuiz?.meanings.en;

  const handleSelect = (answer: string) => {
    if (showResult || !currentQuiz) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    const correct = answer === currentQuiz.meanings.en;
    if (correct) setCorrectCount((p) => p + 1);
    setResults((prev) => [...prev, { itemId: currentQuiz.id, correct }]);
  };

  const handleNext = () => {
    if (currentIndex < quizWords.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setSelectedAnswer(null);
      setShowResult(false);
      setOptions(generateQuizOptions(quizWords[next]));
    } else {
      setIsComplete(true);
      if (uid) {
        submitStudySession(uid, {
          quizType: "vocabulary",
          score: results.filter((r) => r.correct).length,
          total: quizWords.length,
          items: results,
        }).catch(() => {});
      }
    }
  };

  const optionStyle = (option: string) => {
    if (!showResult) return "bg-white border-gray-200 hover:border-primary hover:bg-primary/5";
    if (option === currentQuiz?.meanings.en) return "bg-success text-white border-success";
    if (option === selectedAnswer && option !== currentQuiz?.meanings.en)
      return "bg-error text-white border-error";
    return "bg-gray-100 border-gray-200 opacity-50";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <span className="font-medium text-foreground flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              오늘의 복습
            </span>
            <Link href="/" className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-foreground" />
            </Link>
          </div>

          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted text-center mt-2">
            {currentIndex + 1} / {quizWords.length}
          </p>
        </div>
      </header>

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
              <div className="flex justify-center py-4">
                <Mascot
                  mood={showResult ? (isCorrect ? "excited" : "sad") : "thinking"}
                  size="sm"
                  message="다시 만난 단어! 뜻을 기억해요?"
                />
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <p className="text-4xl font-bold text-foreground">{currentQuiz.korean}</p>
                  <SpeakButton text={currentQuiz.korean} size="md" />
                </div>
                <p className="text-muted text-sm">{currentQuiz.pronunciation}</p>
                <div className="mt-4 inline-flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                  <p className="text-muted text-xs">예: {currentQuiz.examples[0]}</p>
                  <SpeakButton text={currentQuiz.examples[0]} size="sm" variant="ghost" />
                </div>
              </div>

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
                          정답: <span className="font-bold">{currentQuiz.meanings.en}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-2 gap-3">
                {options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    onClick={() => handleSelect(option)}
                    disabled={showResult}
                    className={`p-4 rounded-xl border-2 font-medium text-lg transition-colors ${optionStyle(option)}`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>

              {showResult && (
                <Button onClick={handleNext} size="lg" className="w-full">
                  {currentIndex < quizWords.length - 1 ? "다음 문제" : "결과 보기"}
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full py-12 text-center"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">복습 완료!</h2>
              <p className="text-muted mb-8">
                {quizWords.length}문제 중 {correctCount}문제 정답
              </p>

              <div className="w-full max-w-xs space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-amber-500 mb-1">
                    {Math.round((correctCount / quizWords.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted">정답률</p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/study/review"
                    className="flex-1 border-2 border-gray-200 py-3 px-6 rounded-xl font-medium text-center hover:bg-gray-50 transition-colors"
                  >
                    한 번 더
                  </Link>
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
