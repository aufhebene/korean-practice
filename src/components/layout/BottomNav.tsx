"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, MessageCircle, PenTool, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "홈", match: (p: string) => p === "/" },
  {
    href: "/study/vocabulary",
    icon: BookOpen,
    label: "어휘",
    match: (p: string) => p.startsWith("/study/vocabulary"),
  },
  {
    href: "/study/conversation",
    icon: MessageCircle,
    label: "회화",
    match: (p: string) => p.startsWith("/study/conversation"),
  },
  {
    href: "/study/grammar",
    icon: PenTool,
    label: "문법",
    match: (p: string) => p.startsWith("/study/grammar"),
  },
  {
    href: "/profile",
    icon: User,
    label: "프로필",
    match: (p: string) => p.startsWith("/profile") || p.startsWith("/stats"),
  },
];

// BottomNav를 숨기는 페이지: 로그인, 회화 상세(전체화면 모드), 어휘 퀴즈 진행 중 등
const HIDDEN_PATTERNS: RegExp[] = [
  /^\/auth(\/|$)/,
  /^\/study\/conversation\/[^/]+$/, // 시나리오 상세 (예: /study/conversation/cafe)
];

export default function BottomNav() {
  const pathname = usePathname();
  const hidden = HIDDEN_PATTERNS.some((re) => re.test(pathname));

  // BottomNav가 보일 때만 body에 패딩 클래스 추가 (콘텐츠가 nav 뒤에 가려지지 않도록)
  useEffect(() => {
    if (hidden) return;
    document.body.classList.add("has-bottom-nav");
    return () => document.body.classList.remove("has-bottom-nav");
  }, [hidden]);

  if (hidden) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-100 pb-safe z-40">
      <div className="max-w-lg mx-auto px-4 py-2">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const isActive = item.match(pathname);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex flex-col items-center gap-1 px-3 py-2"
                >
                  <div className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/10 rounded-xl -m-1.5 p-4"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <Icon
                      className={`w-6 h-6 relative z-10 ${
                        isActive ? "text-primary" : "text-muted"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-primary" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
