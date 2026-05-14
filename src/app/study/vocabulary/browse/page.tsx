"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Trophy, BookOpen } from "lucide-react";
import Link from "next/link";
import SpeakButton from "@/components/ui/SpeakButton";
import { categories, vocabularyData } from "@/data/vocabulary";
import { useAuthStore } from "@/stores/useAuthStore";
import { getDb } from "@/lib/firebase";
import type { Vocabulary } from "@/types";

interface VocabProgressMap {
  [itemId: string]: {
    attempts: number;
    correct: number;
    mastered: boolean;
  };
}

export default function BrowseVocabularyPage() {
  const uid = useAuthStore((s) => s.user?.uid);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeLevel, setActiveLevel] = useState<number | "all">("all");
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState<VocabProgressMap>({});

  // Firestore에서 진도 로드 (로그인된 경우)
  useEffect(() => {
    if (!uid) {
      setProgress({});
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const { collection, getDocs } = await import("firebase/firestore");
        const snap = await getDocs(
          collection(getDb(), "users", uid, "vocabularyProgress"),
        );
        if (cancelled) return;
        const map: VocabProgressMap = {};
        snap.docs.forEach((d) => {
          const data = d.data() as { attempts: number; correct: number; mastered: boolean };
          if (d.id.startsWith("v")) {
            map[d.id] = {
              attempts: data.attempts,
              correct: data.correct,
              mastered: data.mastered,
            };
          }
        });
        setProgress(map);
      } catch (err) {
        console.warn("[browse] 진도 로드 실패", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [uid]);

  const filtered = useMemo(() => {
    let list: Vocabulary[] = vocabularyData;
    if (activeCategory !== "all") {
      list = list.filter((v) => v.category === activeCategory);
    }
    if (activeLevel !== "all") {
      list = list.filter((v) => v.level === activeLevel);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (v) =>
          v.korean.toLowerCase().includes(q) ||
          v.pronunciation.toLowerCase().includes(q) ||
          v.meanings.en.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeCategory, activeLevel, search]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/study/vocabulary" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="font-bold text-lg text-foreground flex-1">단어 둘러보기</h1>
            <span className="text-xs text-muted">{filtered.length}개</span>
          </div>

          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="한국어/발음/뜻으로 검색"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* 필터: 카테고리 */}
        <div className="max-w-lg mx-auto px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-muted"
              }`}
            >
              전체
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  activeCategory === c.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-muted"
                }`}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* 필터: 레벨 */}
        <div className="max-w-lg mx-auto px-4 pb-3 flex gap-2">
          {(["all", 1, 2, 3] as const).map((lv) => (
            <button
              key={String(lv)}
              onClick={() => setActiveLevel(lv)}
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                activeLevel === lv
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-muted"
              }`}
            >
              {lv === "all" ? "전체 레벨" : `Lv ${lv}`}
            </button>
          ))}
        </div>
      </header>

      {/* 단어 목록 */}
      <div className="max-w-lg mx-auto px-4 py-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {filtered.map((v, idx) => {
              const p = progress[v.id];
              return (
                <motion.li
                  key={v.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.01, 0.2) }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg font-bold text-foreground">
                          {v.korean}
                        </span>
                        <span className="text-xs text-muted">
                          [{v.pronunciation}]
                        </span>
                        {p?.mastered && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-full">
                            <Trophy className="w-3 h-3" />
                            마스터
                          </span>
                        )}
                        {p && !p.mastered && p.attempts > 0 && (
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            {Math.round((p.correct / p.attempts) * 100)}%
                            ({p.correct}/{p.attempts})
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted mt-1">{v.meanings.en}</p>
                      {v.examples[0] && (
                        <p className="text-xs text-foreground/70 mt-1 italic">
                          {v.examples[0]}
                        </p>
                      )}
                    </div>
                    <SpeakButton text={v.korean} size="sm" variant="ghost" />
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
