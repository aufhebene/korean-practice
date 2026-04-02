"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowLeft, Settings, BarChart3, Trophy, HelpCircle, LogOut, User, Flame, Star, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">로딩 중...</p>
      </div>
    );
  }

  if (!session) {
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
    signOut({ callbackUrl: "/" });
  };

  // 임시 통계 데이터 (추후 DB에서 가져올 예정)
  const stats = {
    streak: 0,
    totalXp: 0,
    wordsLearned: 0,
    achievements: 0,
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
            {/* Avatar */}
            <div className="relative">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h2 className="font-bold text-lg text-foreground">
                {session.user?.name || "사용자"}
              </h2>
              <p className="text-sm text-muted">{session.user?.email}</p>
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
            <p className="text-2xl font-bold text-foreground">{stats.streak}</p>
            <p className="text-xs text-muted">연속 학습</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <Star className="w-6 h-6 text-amber-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{stats.totalXp}</p>
            <p className="text-xs text-muted">총 XP</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <BookOpen className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{stats.wordsLearned}</p>
            <p className="text-xs text-muted">학습한 단어</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{stats.achievements}</p>
            <p className="text-xs text-muted">획득 업적</p>
          </div>
        </motion.div>

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
            <span className="text-muted">→</span>
          </Link>

          <Link
            href="/stats"
            className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <BarChart3 className="w-5 h-5 text-muted" />
            <span className="flex-1 text-foreground">상세 통계</span>
            <span className="text-muted">→</span>
          </Link>

          <Link
            href="/achievements"
            className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <Trophy className="w-5 h-5 text-muted" />
            <span className="flex-1 text-foreground">업적 목록</span>
            <span className="text-muted">→</span>
          </Link>

          <Link
            href="/help"
            className="flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <HelpCircle className="w-5 h-5 text-muted" />
            <span className="flex-1 text-foreground">도움말</span>
            <span className="text-muted">→</span>
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
