"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

// 시나리오별 회화 데이터
const scenarioData: Record<string, {
  title: string;
  sentences: {
    english: string;
    korean: string;
    words: string[];
  }[];
}> = {
  cafe: {
    title: "카페에서 주문하기",
    sentences: [
      {
        english: "I'd like an iced Americano, please.",
        korean: "아이스 아메리카노 주세요",
        words: ["주세요", "아이스", "아메리카노"],
      },
      {
        english: "For here or to go?",
        korean: "여기서 드시고 가세요 포장이에요",
        words: ["여기서", "드시고", "가세요", "포장이에요"],
      },
      {
        english: "For here, please.",
        korean: "여기서 먹을게요",
        words: ["먹을게요", "여기서"],
      },
      {
        english: "Can I pay by card?",
        korean: "카드로 계산할게요",
        words: ["계산할게요", "카드로"],
      },
    ],
  },
  shopping: {
    title: "마트에서 장보기",
    sentences: [
      {
        english: "How much is this?",
        korean: "이거 얼마예요",
        words: ["얼마예요", "이거"],
      },
      {
        english: "It's 5,000 won.",
        korean: "오천 원이에요",
        words: ["원이에요", "오천"],
      },
      {
        english: "Do you need a bag?",
        korean: "봉투 필요하세요",
        words: ["필요하세요", "봉투"],
      },
      {
        english: "Yes, please.",
        korean: "네 주세요",
        words: ["주세요", "네"],
      },
    ],
  },
  office: {
    title: "회사에서 회의하기",
    sentences: [
      {
        english: "We need to adjust the schedule.",
        korean: "일정 조율이 필요합니다",
        words: ["필요합니다", "일정", "조율이"],
      },
      {
        english: "I'll review it and get back to you.",
        korean: "검토 후 말씀드리겠습니다",
        words: ["말씀드리겠습니다", "검토", "후"],
      },
      {
        english: "Let's wrap up the meeting.",
        korean: "회의를 마무리하겠습니다",
        words: ["마무리하겠습니다", "회의를"],
      },
    ],
  },
  friends: {
    title: "친구와 약속잡기",
    sentences: [
      {
        english: "Are you free this weekend?",
        korean: "주말에 시간 있어",
        words: ["있어", "주말에", "시간"],
      },
      {
        english: "Where should we meet?",
        korean: "어디서 만날까",
        words: ["만날까", "어디서"],
      },
      {
        english: "Let's meet at the station.",
        korean: "역에서 만나자",
        words: ["만나자", "역에서"],
      },
    ],
  },
  travel: {
    title: "공항에서",
    sentences: [
      {
        english: "Please show me your boarding pass.",
        korean: "탑승권 보여주세요",
        words: ["보여주세요", "탑승권"],
      },
      {
        english: "Where is the gate?",
        korean: "게이트가 어디예요",
        words: ["어디예요", "게이트가"],
      },
      {
        english: "What is the purpose of your visit?",
        korean: "방문 목적이 뭐예요",
        words: ["뭐예요", "방문", "목적이"],
      },
    ],
  },
};

export default function ConversationQuizPage() {
  const params = useParams();
  const scenarioId = params.id as string;
  const scenario = scenarioData[scenarioId];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    scenario?.sentences[0]?.words || []
  );
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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
    setAvailableWords(currentSentence.words);
  };

  const handleCheck = () => {
    setShowResult(true);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < scenario.sentences.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedWords([]);
      setAvailableWords(scenario.sentences[nextIndex].words);
      setShowResult(false);
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
