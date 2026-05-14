"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, Star, BookOpen, Trophy, Target, Calendar } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  getRecentStudySessions,
  getStats,
  type StudySessionDoc,
  type UserStats,
  type QuizType,
} from "@/lib/firestore";
import Button from "@/components/ui/Button";

const QUIZ_LABELS: Record<QuizType, string> = {
  vocabulary: "어휘",
  grammar: "문법",
  listening: "듣기",
  conversation: "회화",
};

const QUIZ_COLORS: Record<QuizType, string> = {
  vocabulary: "bg-purple-500",
  grammar: "bg-cyan-500",
  listening: "bg-amber-500",
  conversation: "bg-emerald-500",
};

const DAYS_WINDOW = 14;

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function StatsPage() {
  const { user, isLoading } = useAuthStore();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [sessions, setSessions] = useState<StudySessionDoc[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoadingData(false);
      return;
    }
    setLoadingData(true);
    Promise.all([
      getStats(user.uid).catch(() => null),
      getRecentStudySessions(user.uid, 50).catch(() => [] as StudySessionDoc[]),
    ])
      .then(([s, sess]) => {
        setStats(s);
        setSessions(sess);
      })
      .finally(() => setLoadingData(false));
  }, [user?.uid]);

  // 퀴즈 타입별 집계
  const byType = useMemo(() => {
    const acc: Record<QuizType, { sessions: number; score: number; total: number }> = {
      vocabulary: { sessions: 0, score: 0, total: 0 },
      grammar: { sessions: 0, score: 0, total: 0 },
      listening: { sessions: 0, score: 0, total: 0 },
      conversation: { sessions: 0, score: 0, total: 0 },
    };
    for (const s of sessions) {
      const bucket = acc[s.quizType];
      if (!bucket) continue;
      bucket.sessions += 1;
      bucket.score += s.score;
      bucket.total += s.total;
    }
    return acc;
  }, [sessions]);

  // 최근 N일 활동
  const dailyActivity = useMemo(() => {
    const today = new Date();
    const buckets: { date: string; label: string; count: number }[] = [];
    for (let i = DAYS_WINDOW - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      buckets.push({
        date: ymd(d),
        label: String(d.getDate()),
        count: 0,
      });
    }
    const idx = new Map(buckets.map((b, i) => [b.date, i]));
    for (const s of sessions) {
      const k = ymd(s.completedAt);
      const i = idx.get(k);
      if (i !== undefined) buckets[i].count += 1;
    }
    return buckets;
  }, [sessions]);

  const maxDaily = Math.max(1, ...dailyActivity.map((b) => b.count));

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
          <h2 className="text-2xl font-bold text-foreground mb-2">로그인이 필요합니다</h2>
          <p className="text-muted mb-6">통계를 보려면 로그인해주세요</p>
          <Link href="/auth/login">
            <Button>로그인하기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const kpis = [
    {
      icon: Flame,
      iconColor: "text-orange-500",
      label: "연속 학습",
      value: stats?.streak ?? 0,
      suffix: "일",
    },
    {
      icon: Star,
      iconColor: "text-amber-500",
      label: "정답률",
      value: stats?.accuracy ?? 0,
      suffix: "%",
    },
    {
      icon: BookOpen,
      iconColor: "text-emerald-500",
      label: "학습 항목",
      value: stats?.totalStudied ?? 0,
      suffix: "",
    },
    {
      icon: Trophy,
      iconColor: "text-purple-500",
      label: "마스터",
      value: stats?.mastered ?? 0,
      suffix: "",
    },
    {
      icon: Target,
      iconColor: "text-blue-500",
      label: "총 세션",
      value: stats?.totalSessions ?? 0,
      suffix: "",
    },
    {
      icon: Calendar,
      iconColor: "text-pink-500",
      label: "최근 50회",
      value: sessions.length,
      suffix: "",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="font-bold text-lg text-foreground">상세 통계</h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* KPI 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          {kpis.map((k) => {
            const Icon = k.icon;
            return (
              <div
                key={k.label}
                className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 text-center"
              >
                <Icon className={`w-5 h-5 ${k.iconColor} mx-auto mb-1.5`} />
                <p className="text-xl font-bold text-foreground leading-tight">
                  {k.value}
                  <span className="text-sm text-muted ml-0.5">{k.suffix}</span>
                </p>
                <p className="text-[10px] text-muted mt-0.5">{k.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* 14일 활동 차트 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-foreground mb-4">최근 14일 활동</h3>
          {loadingData ? (
            <p className="text-sm text-muted">불러오는 중...</p>
          ) : (
            <div className="flex items-end gap-1 h-32">
              {dailyActivity.map((b) => {
                const heightPct = b.count === 0 ? 4 : (b.count / maxDaily) * 100;
                return (
                  <div key={b.date} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t transition-all ${
                        b.count > 0 ? "bg-primary" : "bg-gray-200"
                      }`}
                      style={{ height: `${heightPct}%` }}
                      title={`${b.date}: ${b.count}회`}
                    />
                    <span className="text-[10px] text-muted">{b.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* 퀴즈 타입별 분석 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-foreground mb-4">퀴즈 유형별 분석</h3>
          {sessions.length === 0 && !loadingData ? (
            <p className="text-sm text-muted">아직 학습 기록이 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {(Object.keys(byType) as QuizType[]).map((type) => {
                const b = byType[type];
                const accuracy = b.total > 0 ? Math.round((b.score / b.total) * 100) : 0;
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${QUIZ_COLORS[type]}`} />
                        <span className="text-sm font-medium text-foreground">
                          {QUIZ_LABELS[type]}
                        </span>
                        <span className="text-xs text-muted">{b.sessions}회</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {accuracy}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${QUIZ_COLORS[type]} transition-all`}
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.section>

        {/* 최근 세션 목록 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-foreground mb-3">최근 학습 기록</h3>
          {sessions.length === 0 && !loadingData ? (
            <p className="text-sm text-muted">아직 학습 기록이 없습니다.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {sessions.map((s) => {
                const pct = s.total > 0 ? Math.round((s.score / s.total) * 100) : 0;
                const label = QUIZ_LABELS[s.quizType] ?? s.quizType;
                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between text-sm py-1.5"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium shrink-0">
                        {label}
                      </span>
                      <span className="text-muted shrink-0">
                        {s.score}/{s.total}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`font-bold ${
                          pct >= 80
                            ? "text-success"
                            : pct >= 50
                              ? "text-amber-500"
                              : "text-error"
                        }`}
                      >
                        {pct}%
                      </span>
                      <span className="text-xs text-muted">
                        {s.completedAt.toLocaleDateString("ko-KR", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
