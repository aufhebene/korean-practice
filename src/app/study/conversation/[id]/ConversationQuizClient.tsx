"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, CheckCircle, XCircle, RotateCcw, BookOpen } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import SpeakButton from "@/components/ui/SpeakButton";
import { getScenarioById, type ConversationScenario } from "@/data/conversation";
import { useAuthStore } from "@/stores/useAuthStore";
import { submitStudySession, type StudySessionItem } from "@/lib/firestore";

export default function ConversationQuizPage() {
  const params = useParams();
  const scenarioId = params.id as string;
  const [scenario, setScenario] = useState<ConversationScenario | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showKeyExpressions, setShowKeyExpressions] = useState(false);
  const [results, setResults] = useState<StudySessionItem[]>([]);
  const uid = useAuthStore((s) => s.user?.uid);

  useEffect(() => {
    const foundScenario = getScenarioById(scenarioId);
    if (foundScenario) {
      setScenario(foundScenario);
      // Shuffle the words for the first question
      const shuffled = [...foundScenario.sentences[0].words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
    }
  }, [scenarioId]);

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>시나리오를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const currentSentence = scenario.sentences[currentIndex];
  const progress = ((currentIndex + 1) / scenario.sentences.length) * 100;
  const userAnswer = selectedWords.join(" ");
  const isCorrect = userAnswer === currentSentence.korean;

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
    const shuffled = [...currentSentence.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
  };

  const handleCheck = () => {
    setShowResult(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setResults((prev) => [...prev, { itemId: `${scenarioId}:${currentIndex}`, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentIndex < scenario.sentences.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedWords([]);
      const shuffled = [...scenario.sentences[nextIndex].words].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setShowResult(false);
    } else {
      setIsComplete(true);
      if (uid) {
        submitStudySession(uid, {
          quizType: "conversation",
          score: results.filter((r) => r.correct).length,
          total: scenario.sentences.length,
          items: results,
        }).catch(() => {});
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/study/conversation" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <span className="font-medium text-foreground">{scenario.title}</span>
            <Link href="/" className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-foreground" />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-xs text-muted text-center mt-2">
            {currentIndex + 1} / {scenario.sentences.length}
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
              {/* English Sentence */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p className="text-sm text-muted mb-2">다음 문장을 한국어로 만들어보세요</p>
                <p className="text-xl font-bold text-foreground">
                  &quot;{currentSentence.english}&quot;
                </p>
                {showResult && (
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="text-muted">정답:</span>
                    <span className="font-medium text-foreground">{currentSentence.korean}</span>
                    <SpeakButton text={currentSentence.korean} size="sm" variant="ghost" />
                  </div>
                )}
                {currentSentence.notes && (
                  <p className="text-xs text-blue-600 mt-2 bg-blue-50 px-3 py-1 rounded-lg inline-block">
                    💡 {currentSentence.notes}
                  </p>
                )}
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
                          ? currentSentence.korean.split(" ")[index] === word
                            ? "bg-success text-white"
                            : "bg-error text-white"
                          : "bg-blue-500 text-white"
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
                          정답: <span className="font-bold">{currentSentence.korean}</span>
                        </p>
                      )}
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
                      disabled={showResult}
                      className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-medium text-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
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
                      disabled={availableWords.length > 0}
                    >
                      확인하기
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleNext} size="lg" className="w-full">
                    {currentIndex < scenario.sentences.length - 1 ? "다음 문제" : "결과 보기"}
                  </Button>
                )}
              </div>
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
                회화 학습 완료!
              </h2>
              <p className="text-muted mb-8">
                {scenario.sentences.length}문장 중 {correctCount}문장을 맞혔어요
              </p>

              <div className="w-full max-w-xs space-y-4">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl font-bold text-blue-500 mb-1">
                    {Math.round((correctCount / scenario.sentences.length) * 100)}%
                  </div>
                  <p className="text-sm text-muted">정답률</p>
                </div>

                {/* Key Expressions */}
                {scenario.keyExpressions && scenario.keyExpressions.length > 0 && (
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left">
                    <button
                      onClick={() => setShowKeyExpressions(!showKeyExpressions)}
                      className="w-full flex items-center justify-between font-medium text-foreground"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        핵심 표현
                      </span>
                      <span>{showKeyExpressions ? "▲" : "▼"}</span>
                    </button>
                    {showKeyExpressions && (
                      <div className="mt-3 space-y-2">
                        {scenario.keyExpressions.map((expr, idx) => (
                          <div key={idx} className="text-sm">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-primary">{expr.korean}</p>
                              <SpeakButton text={expr.korean} size="sm" variant="ghost" />
                            </div>
                            <p className="text-muted">{expr.english}</p>
                            <p className="text-xs text-gray-400">{expr.usage}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Cultural Notes */}
                {scenario.culturalNotes && (
                  <div className="bg-amber-50 rounded-xl p-3 text-left text-sm">
                    <p className="font-medium text-amber-800 mb-1">🇰🇷 문화 팁</p>
                    <p className="text-amber-700">{scenario.culturalNotes}</p>
                  </div>
                )}

                <Link
                  href="/study/conversation"
                  className="block w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-medium text-center hover:bg-blue-600 transition-colors"
                >
                  다른 시나리오 학습하기
                </Link>
                <Link
                  href="/"
                  className="block w-full bg-gray-100 text-foreground py-3 px-6 rounded-xl font-medium text-center hover:bg-gray-200 transition-colors"
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
