"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function UserButton() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="w-10 h-10 bg-white/20 rounded-full animate-pulse" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition-colors"
      >
        로그인
      </Link>
    );
  }

  return (
    <Link href="/profile" className="block">
      <div className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
        <User className="w-5 h-5 text-white" />
      </div>
    </Link>
  );
}
