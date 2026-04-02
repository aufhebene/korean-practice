"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Coffee, ShoppingCart, Building2, Users, Plane } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";

// 회화 시나리오 데이터
const scenarios = [
  {
    id: "cafe",
    icon: Coffee,
    title: "카페에서 주문하기",
    description: "음료 주문, 결제, 포장/매장 표현",
    level: 1,
    sentences: 8,
    preview: "아이스 아메리카노 주세요",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "shopping",
    icon: ShoppingCart,
    title: "마트에서 장보기",
    description: "가격 묻기, 계산, 봉투 요청",
    level: 1,
    sentences: 10,
    preview: "이거 얼마예요?",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "office",
    icon: Building2,
    title: "회사에서 회의하기",
    description: "일정 조율, 의견 제시, 마무리",
    level: 3,
    sentences: 12,
    preview: "일정 조율이 필요합니다",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "friends",
    icon: Users,
    title: "친구와 약속잡기",
    description: "시간 정하기, 장소 정하기, 확인",
    level: 1,
    sentences: 8,
    preview: "주말에 시간 있어?",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "travel",
    icon: Plane,
    title: "공항에서",
    description: "체크인, 탑승, 입국심사",
    level: 2,
    sentences: 10,
    preview: "탑승권 보여주세요",
    gradient: "from-cyan-500 to-blue-500",
  },
];

const getLevelStars = (level: number) => {
  return "⭐".repeat(level) + "☆".repeat(3 - level);
};

const getLevelText = (level: number) => {
  if (level === 1) return "초급";
  if (level === 2) return "중급";
  return "고급";
};

export default function ConversationPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="font-bold text-lg text-foreground">회화 학습</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        <p className="text-muted mb-6">상황별 회화를 선택해서 학습하세요</p>

        <div className="space-y-4">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon;

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={`/study/conversation/${scenario.id}`}>
                  <Card hover className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${scenario.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">
                          {scenario.title}
                        </h3>
                        <p className="text-sm text-muted">{scenario.description}</p>

                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-amber-600">
                            {getLevelStars(scenario.level)} {getLevelText(scenario.level)}
                          </span>
                          <span className="text-xs text-muted">
                            {scenario.sentences}문장
                          </span>
                        </div>

                        <p className="text-sm text-primary mt-2 italic">
                          &quot;{scenario.preview}&quot;
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-muted" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
