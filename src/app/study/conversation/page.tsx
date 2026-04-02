"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { conversationScenarios, conversationCategories } from "@/data/conversation";

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

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {conversationCategories.map((cat) => (
            <button
              key={cat.id}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap hover:border-primary hover:text-primary transition-colors"
            >
              {cat.icon} {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {conversationScenarios.map((scenario, index) => {
            const Icon = scenario.icon;

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
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
                            {scenario.sentences.length}문장
                          </span>
                        </div>

                        <p className="text-sm text-primary mt-2 italic">
                          &quot;{scenario.sentences[0]?.korean}&quot;
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
