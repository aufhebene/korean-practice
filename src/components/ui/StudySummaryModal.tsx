"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, RotateCcw, Zap } from "lucide-react";
import Button from "./Button";
import type { DailyStudySummary } from "@/types";

interface StudySummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  summary: DailyStudySummary;
}

export default function StudySummaryModal({
  isOpen,
  onClose,
  onStart,
  summary,
}: StudySummaryModalProps) {
  const totalWords = summary.newWords + summary.reviewWords + summary.retryWords;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto bg-white rounded-3xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">오늘의 학습</h2>
                  <p className="text-white/80 text-sm mt-1">
                    총 {totalWords}개 단어 학습
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* New Words */}
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">새로운 단어</span>
                </div>
                <span className="text-2xl font-bold text-emerald-600">
                  {summary.newWords}개
                </span>
              </div>

              {/* Review Words */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">복습할 단어</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {summary.reviewWords}개
                </span>
              </div>

              {/* Retry Words */}
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">재도전 단어</span>
                </div>
                <span className="text-2xl font-bold text-amber-600">
                  {summary.retryWords}개
                </span>
              </div>

              {/* Estimated Time */}
              <p className="text-center text-muted text-sm">
                예상 학습 시간: 약 {summary.estimatedMinutes}분
              </p>

              {/* Start Button */}
              <Button onClick={onStart} size="lg" className="w-full">
                학습 시작하기
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
