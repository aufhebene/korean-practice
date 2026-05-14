"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, MessageCircle, Headphones, PenTool, ChevronRight, Sparkles, RotateCcw, Zap } from "lucide-react";
import Link from "next/link";
import Mascot from "@/components/ui/Mascot";
import StreakBadge from "@/components/ui/StreakBadge";
import Card from "@/components/ui/Card";
import UserButton from "@/components/ui/UserButton";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  getModuleCounts,
  getStats,
  type ModuleCounts,
  type UserStats,
} from "@/lib/firestore";
import { vocabularyData } from "@/data/vocabulary";
import { grammarData } from "@/data/grammar";
import { listeningData } from "@/data/listening";
import { conversationScenarios } from "@/data/conversation";
import { LucideIcon } from "lucide-react";

type QuizStats = { new: number; review: number; retry: number };
type ConversationStats = { scenarios: number };

interface StudyModule {
  id: "vocabulary" | "grammar" | "listening" | "conversation";
  icon: LucideIcon;
  label: string;
  description: string;
  href: string;
  color: string;
  gradient: string;
  stats: QuizStats | ConversationStats;
}

// 타입 가드
function isQuizStats(stats: QuizStats | ConversationStats): stats is QuizStats {
  return "new" in stats;
}

// 정적 콘텐츠 총 개수 (한 번만 계산)
const TOTALS = {
  vocabulary: vocabularyData.length,
  grammar: grammarData.length,
  listening: listeningData.length,
  conversation: conversationScenarios.length,
};

function buildModules(counts: ModuleCounts | null): StudyModule[] {
  return [
    {
      id: "vocabulary",
      icon: BookOpen,
      label: "어휘 학습",
      description: "단어 암기 및 의미 학습",
      href: "/study/vocabulary",
      color: "bg-emerald-500",
      gradient: "from-emerald-500 to-teal-500",
      stats: counts?.vocabulary ?? { new: TOTALS.vocabulary, review: 0, retry: 0 },
    },
    {
      id: "grammar",
      icon: PenTool,
      label: "문법 학습",
      description: "문법 패턴 및 조사 학습",
      href: "/study/grammar",
      color: "bg-purple-500",
      gradient: "from-purple-500 to-indigo-500",
      stats: counts?.grammar ?? { new: TOTALS.grammar, review: 0, retry: 0 },
    },
    {
      id: "conversation",
      icon: MessageCircle,
      label: "회화 학습",
      description: "상황별 대화 표현 학습",
      href: "/study/conversation",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-cyan-500",
      stats: { scenarios: TOTALS.conversation },
    },
    {
      id: "listening",
      icon: Headphones,
      label: "듣기 학습",
      description: "발음 및 청취 학습",
      href: "/study/listening",
      color: "bg-amber-500",
      gradient: "from-amber-500 to-orange-500",
      stats: counts?.listening ?? { new: TOTALS.listening, review: 0, retry: 0 },
    },
  ];
}

export default function HomePage() {
  const uid = useAuthStore((s) => s.user?.uid);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [moduleCounts, setModuleCounts] = useState<ModuleCounts | null>(null);

  useEffect(() => {
    if (!uid) {
      setStats(null);
      setModuleCounts(null);
      return;
    }
    getStats(uid).then(setStats).catch(() => {});
    getModuleCounts(uid, {
      vocabulary: TOTALS.vocabulary,
      grammar: TOTALS.grammar,
      listening: TOTALS.listening,
    })
      .then(setModuleCounts)
      .catch(() => {});
  }, [uid]);

  const modules = buildModules(moduleCounts);
  const streak = stats?.streak ?? 0;
  const totalStudied = stats?.totalStudied ?? 0;
  const mastered = stats?.mastered ?? 0;
  const accuracy = stats?.accuracy ?? 0;
  const totalReviewDue =
    (moduleCounts?.vocabulary.review ?? 0) +
    (moduleCounts?.grammar.review ?? 0) +
    (moduleCounts?.listening.review ?? 0);

  return (
    <main className="min-h-screen pb-8">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary-light p-6 pb-16 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-white text-2xl font-bold">Korean Practice</h1>
              <p className="text-white/80 text-sm mt-1">오늘도 한국어 공부 파이팅!</p>
            </div>
            <div className="flex items-center gap-3">
              <StreakBadge streak={streak} />
              <UserButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 -mt-10 space-y-6">
        {/* Mascot Card */}
        <Card className="p-6 text-center">
          <Mascot mood="happy" size="md" message="무엇을 공부할까요?" />
        </Card>

        {/* 복습 CTA — 오늘 복습 대상이 있을 때만 표시 */}
        {totalReviewDue > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/study/review">
              <Card hover className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">오늘의 복습</h3>
                    <p className="text-sm text-muted">
                      복습할 단어가 <span className="font-bold text-amber-600">{totalReviewDue}개</span> 있어요
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted" />
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* Module Cards */}
        <section className="space-y-3">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={module.href}>
                  <Card hover className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${module.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-lg">
                          {module.label}
                        </h3>
                        <p className="text-sm text-muted">{module.description}</p>

                        {/* Stats */}
                        {isQuizStats(module.stats) ? (
                          <div className="flex gap-3 mt-2">
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                              <Sparkles className="w-3 h-3" />
                              새 {module.stats.new}개
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              <RotateCcw className="w-3 h-3" />
                              복습 {module.stats.review}개
                            </span>
                            {module.stats.retry > 0 && (
                              <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                <Zap className="w-3 h-3" />
                                재도전 {module.stats.retry}개
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="flex gap-3 mt-2">
                            <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              <MessageCircle className="w-3 h-3" />
                              {module.stats.scenarios}개 시나리오
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-muted" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </section>

        {/* 사전식 단어 둘러보기 진입 */}
        <Link
          href="/study/vocabulary/browse"
          className="flex items-center justify-between py-3 px-4 bg-white rounded-2xl border border-gray-100 text-sm text-foreground hover:bg-gray-50"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted" />
            전체 단어 둘러보기 ({TOTALS.vocabulary}개)
          </span>
          <ChevronRight className="w-4 h-4 text-muted" />
        </Link>

        {/* Progress Summary */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">전체 학습 현황</h2>
          <Card className="p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">{totalStudied}</p>
                <p className="text-sm text-muted">학습한 단어</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-success">{mastered}</p>
                <p className="text-sm text-muted">마스터</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">{accuracy}%</p>
                <p className="text-sm text-muted">정답률</p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
