"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Settings, BarChart3, Trophy, HelpCircle, LogOut, User, Flame, Star, BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { getStudySessions, getStats, type StudySessionResponse, type UserStats } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, isLoading, logout, loadProfile } = useAuthStore();
  const [sessions, setSessions] = useState<StudySessionResponse[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (token) {
      getStudySessions(token).then(setSessions).catch(() => {});
      getStats(token).then(setStats).catch(() => {});
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">로딩 중...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            로그인이 필요합니다
          </h2>
          <p className="text-muted mb-6">
            프로필을 보려면 로그인해주세요
          </p>
          <Link href="/auth/login">
            <Button>로그인하기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  const profileStats = {
    streak: stats?.streak ?? 0,
    accuracy: stats?.accuracy ?? 0,
    wordsLearned: stats?.total_studied ?? 0,
    mastered: stats?.mastered ?? 0,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="font-bold text-lg text-foreground">프로필</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg text-foreground">
                {user.name}
              </h2>
              <p className="text-sm text-muted">@{user.username}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <Flame className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{profileStats.streak}</p>
            <p className="text-xs text-muted">연속 학습</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{profileStats.accuracy}%</p>
            <p className="text-xs text-muted">정답률</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <BookOpen className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{profileStats.wordsLearned}</p>
            <p className="text-xs text-muted">학습한 단어</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{profileStats.mastered}</p>
            <p className="text-xs text-muted">마스터한 단어</p>
          </div>
        </motion.div>

        {/* Recent Study Sessions */}
        {sessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6"
          >
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted" />
              최근 학습
            </h3>
            <div className="space-y-3">
              {sessions.slice(0, 5).map((s) => {
                const quizLabel = { vocabulary: "어휘", grammar: "문법", listening: "듣기", conversation: "회화" }[s.quiz_type] ?? s.quiz_type;
                const pct = s.total > 0 ? Math.round((s.score / s.total) * 100) : 0;
                const date = new Date(s.completed_at);
                return (
                  <div key={s.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {quizLabel}
                      </span>
                      <span className="text-muted">
                        {s.score}/{s.total}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${pct >= 80 ? "text-success" : pct >= 50 ? "text-amber-500" : "text-error"}`}>
                        {pct}%
                      </span>
                      <span className="text-xs text-muted">
                        {date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Menu List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <Link
            href="/profile/settings"
            className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <Settings className="w-5 h-5 text-muted" />
            <span className="flex-1 text-foreground">설정</span>
            <span className="text-muted">&rarr;</span>
          </Link>

          <Link
            href="/stats"
            className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <BarChart3 className="w-5 h-5 text-muted" />
            <span className="flex-1 text-foreground">상세 통계</span>
            <span className="text-muted">&rarr;</span>
          </Link>

          <Link
            href="/help"
            className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <HelpCircle className="w-5 h-5 text-muted" />
            <span className="flex-1 text-foreground">도움말</span>
            <span className="text-muted">&rarr;</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors text-left"
          >
            <LogOut className="w-5 h-5 text-error" />
            <span className="flex-1 text-error">로그아웃</span>
          </button>
        </motion.div>

        {/* App Version */}
        <p className="text-center text-xs text-muted mt-8">
          Korean Practice v0.1.0
        </p>
      </div>
    </div>
  );
}
