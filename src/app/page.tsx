"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, MessageCircle, Headphones, PenTool } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Mascot from "@/components/ui/Mascot";
import StreakBadge from "@/components/ui/StreakBadge";
import StudySummaryModal from "@/components/ui/StudySummaryModal";
import Card from "@/components/ui/Card";
import type { DailyStudySummary } from "@/types";

// 샘플 데이터
const mockSummary: DailyStudySummary = {
  newWords: 8,
  reviewWords: 15,
  retryWords: 4,
  estimatedMinutes: 10,
};

const features = [
  {
    icon: BookOpen,
    label: "어휘",
    description: "단어 학습",
    href: "/vocabulary",
    color: "bg-emerald-500",
  },
  {
    icon: MessageCircle,
    label: "회화",
    description: "상황별 대화",
    href: "/conversation",
    color: "bg-blue-500",
  },
  {
    icon: PenTool,
    label: "문법",
    description: "문법 연습",
    href: "/grammar",
    color: "bg-purple-500",
  },
  {
    icon: Headphones,
    label: "듣기",
    description: "리스닝 연습",
    href: "/listening",
    color: "bg-amber-500",
  },
];

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const streak = 12; // 임시 데이터

  const handleStartStudy = () => {
    setShowModal(false);
    // TODO: 학습 페이지로 이동
    window.location.href = "/study";
  };

  return (
    <main className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary-light p-6 pb-12 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-white text-2xl font-bold">Korean Practice</h1>
              <p className="text-white/80 text-sm mt-1">오늘도 한국어 공부 파이팅!</p>
            </div>
            <StreakBadge streak={streak} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 -mt-6 space-y-6">
        {/* Mascot Card */}
        <Card className="p-6 text-center">
          <Mascot mood="happy" size="lg" message="오늘도 열심히 해봐요!" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Button
              size="lg"
              onClick={() => setShowModal(true)}
              className="w-full max-w-xs"
            >
              오늘의 학습 시작하기
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </Card>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">학습 메뉴</h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link href={feature.href}>
                    <Card hover className="p-4 flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{feature.label}</p>
                        <p className="text-sm text-muted">{feature.description}</p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Progress Summary */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">학습 현황</h2>
          <Card className="p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-primary">42</p>
                <p className="text-sm text-muted">학습한 단어</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-success">28</p>
                <p className="text-sm text-muted">마스터</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">85%</p>
                <p className="text-sm text-muted">정답률</p>
              </div>
            </div>
          </Card>
        </section>
      </div>

      {/* Study Summary Modal */}
      <StudySummaryModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onStart={handleStartStudy}
        summary={mockSummary}
      />
    </main>
  );
}
