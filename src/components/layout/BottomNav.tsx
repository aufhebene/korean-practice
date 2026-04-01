"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, MessageCircle, PenTool, Headphones, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/dashboard", icon: BookOpen, label: "어휘" },
  { href: "/conversation", icon: MessageCircle, label: "회화" },
  { href: "/grammar", icon: PenTool, label: "문법" },
  { href: "/listening", icon: Headphones, label: "듣기" },
  { href: "/profile", icon: User, label: "프로필" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe">
      <div className="max-w-lg mx-auto px-4 py-2">
        <ul className="flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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
