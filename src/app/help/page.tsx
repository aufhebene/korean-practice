"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  PenTool,
  MessageCircle,
  Headphones,
  Bell,
  Volume2,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { openExternal } from "@/lib/external";

interface FaqItem {
  q: string;
  a: string;
}

const studyModes = [
  {
    icon: BookOpen,
    title: "어휘 학습",
    description:
      "단어의 의미를 영어 보기 중에서 선택하는 4지선다 퀴즈입니다. 한 세션에 10문제가 출제되며, 발음 버튼으로 한국어 소리를 들을 수 있습니다.",
  },
  {
    icon: PenTool,
    title: "문법 학습",
    description:
      "조사 / 어미 / 표현으로 분류된 문법 패턴을 빈칸 채우기로 익힙니다. 각 항목마다 한국어·영어 설명과 예문이 함께 제공됩니다.",
  },
  {
    icon: MessageCircle,
    title: "회화 학습",
    description:
      "카페 주문, 길 찾기, 비즈니스 통화 같은 실제 상황별 시나리오를 단어 카드 배열로 학습합니다. 문화 노트와 핵심 표현이 포함되어 있습니다.",
  },
  {
    icon: Headphones,
    title: "리스닝 학습",
    description:
      "TTS로 읽어주는 한국어 문장을 듣고, 흩어진 단어 카드를 올바른 순서로 배열합니다.",
  },
];

const features = [
  {
    icon: Bell,
    title: "학습 리마인더",
    description:
      "매일 같은 시간에 알림을 받아 스트릭을 이어갈 수 있어요. 프로필 → 설정에서 켜고 끌 수 있습니다. (모바일 앱 한정)",
  },
  {
    icon: Volume2,
    title: "한국어 발음",
    description:
      "어휘·회화·리스닝 화면의 스피커 버튼을 누르면 한국어 음성을 들을 수 있습니다. 모바일은 시스템 TTS, 웹은 브라우저 음성을 사용합니다.",
  },
];

const faqs: FaqItem[] = [
  {
    q: "스트릭은 어떻게 계산되나요?",
    a: "하루에 한 번이라도 학습 세션을 완료하면 스트릭이 +1 됩니다. 자정(UTC 기준)을 기준으로 하루가 바뀌고, 하루를 건너뛰면 0으로 초기화됩니다.",
  },
  {
    q: "단어가 '마스터'되는 기준은 무엇인가요?",
    a: "한 단어를 여러 번 풀어 정답률이 충분히 높아지면 mastered 상태가 됩니다. 자세한 알고리즘은 간격 반복(SRS)에 기반합니다.",
  },
  {
    q: "오프라인 상태에서도 사용할 수 있나요?",
    a: "네. 어휘·문법·회화·리스닝 콘텐츠는 앱에 내장되어 오프라인에서 그대로 동작합니다. 학습 기록은 로컬 캐시에 저장된 후, 인터넷 연결 시 자동으로 동기화됩니다.",
  },
  {
    q: "여러 기기에서 같은 계정을 쓸 수 있나요?",
    a: "Google 또는 이메일 계정으로 로그인하면 학습 기록·통계·설정이 클라우드(Firestore)에 저장되어 모든 기기에서 동기화됩니다.",
  },
  {
    q: "데이터를 삭제하려면 어떻게 하나요?",
    a: "현재 앱 내 삭제 기능은 미제공입니다. 필요한 경우 아래 문의 채널로 연락해주세요.",
  },
];

export default function HelpPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="font-bold text-lg text-foreground">도움말</h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* 인트로 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-5"
        >
          <h2 className="font-bold text-lg text-foreground mb-1">
            Korean Practice에 오신 것을 환영합니다 🐯
          </h2>
          <p className="text-sm text-foreground/80">
            게임처럼 한국어를 익혀보세요. 매일 조금씩 학습하면 스트릭이 쌓이고,
            자주 틀린 단어는 자동으로 다시 출제됩니다.
          </p>
        </motion.section>

        {/* 학습 모드 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="font-bold text-foreground mb-4">학습 모드</h2>
          <div className="space-y-4">
            {studyModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div key={mode.title} className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm">
                      {mode.title}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{mode.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* 추가 기능 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="font-bold text-foreground mb-4">기능</h2>
          <div className="space-y-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm">
                      {f.title}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="font-bold text-foreground mb-3">자주 묻는 질문</h2>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, idx) => {
              const open = openIdx === idx;
              return (
                <div key={faq.q} className="py-3">
                  <button
                    onClick={() => setOpenIdx(open ? null : idx)}
                    className="w-full flex items-start justify-between text-left gap-3"
                  >
                    <span className="text-sm font-medium text-foreground flex-1">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted shrink-0 mt-0.5 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-xs text-muted overflow-hidden mt-2"
                      >
                        {faq.a}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* 외부 링크 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h2 className="font-bold text-foreground mb-3">기타</h2>
          <button
            type="button"
            onClick={() => openExternal("https://github.com/aufhebene/korean-practice")}
            className="w-full flex items-center justify-between py-2 text-sm text-foreground hover:text-primary"
          >
            <span>GitHub 저장소</span>
            <ExternalLink className="w-4 h-4 text-muted" />
          </button>
        </motion.section>

        <p className="text-center text-xs text-muted">Korean Practice v0.1.0</p>
      </div>
    </div>
  );
}
