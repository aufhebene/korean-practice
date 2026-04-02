"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Mascot from "@/components/ui/Mascot";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm"
    >
      {/* 마스코트 */}
      <div className="flex justify-center mb-6">
        <Mascot mood="happy" size="lg" message="환영합니다!" />
      </div>

      {/* 타이틀 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Korean Practice
        </h1>
        <p className="text-muted">
          로그인하고 학습 기록을 저장하세요
        </p>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 p-4 bg-error/10 text-error rounded-xl text-center text-sm"
        >
          {error === "OAuthAccountNotLinked"
            ? "이미 다른 방법으로 가입된 이메일입니다."
            : "로그인 중 오류가 발생했습니다."}
        </motion.div>
      )}

      {/* 로그인 버튼 */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl font-medium text-foreground hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Google로 계속하기</span>
        </motion.button>
      </div>

      {/* 추가 정보 */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted">
          로그인하면{" "}
          <span className="text-primary cursor-pointer hover:underline">
            이용약관
          </span>
          과{" "}
          <span className="text-primary cursor-pointer hover:underline">
            개인정보처리방침
          </span>
          에 동의하게 됩니다.
        </p>
      </div>

      {/* 로그인 없이 계속 */}
      <div className="mt-6 text-center">
        <a
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          로그인 없이 둘러보기 →
        </a>
      </div>
    </motion.div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full max-w-sm">
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 bg-gray-100 rounded-full animate-pulse" />
      </div>
      <div className="text-center mb-8">
        <div className="h-10 bg-gray-100 rounded mb-2 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4 mx-auto" />
      </div>
      <div className="h-14 bg-gray-100 rounded-2xl animate-pulse" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-4">
      <Suspense fallback={<LoadingFallback />}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
