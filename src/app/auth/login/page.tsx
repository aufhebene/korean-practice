"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Mascot from "@/components/ui/Mascot";
import { useAuthStore } from "@/stores/useAuthStore";

type Tab = "login" | "signup";

const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "이메일 또는 비밀번호가 올바르지 않습니다.",
  "auth/invalid-email": "올바르지 않은 이메일 형식입니다.",
  "auth/user-not-found": "등록되지 않은 사용자입니다.",
  "auth/wrong-password": "비밀번호가 올바르지 않습니다.",
  "auth/email-already-in-use": "이미 가입된 이메일입니다.",
  "auth/weak-password": "비밀번호는 6자 이상이어야 합니다.",
  "auth/popup-closed-by-user": "로그인이 취소되었습니다.",
  "auth/popup-blocked": "팝업이 차단되었습니다. 브라우저 설정을 확인하세요.",
  "auth/network-request-failed": "네트워크 오류입니다. 연결을 확인하세요.",
  "auth/too-many-requests": "잠시 후 다시 시도해주세요.",
};

function getErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = (err as { code: string }).code;
    return FIREBASE_ERROR_MESSAGES[code] ?? `로그인 오류: ${code}`;
  }
  if (err instanceof Error) return err.message;
  return "알 수 없는 오류가 발생했습니다.";
}

export default function LoginPage() {
  const router = useRouter();
  const { signInEmail, signUpEmail, signInGoogle, user } = useAuthStore();

  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 로그인 성공 후 자동 리다이렉트
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await signInEmail(email, password);
      } else {
        await signUpEmail(email, password, name);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInGoogle();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex justify-center mb-6">
          <Mascot mood="happy" size="lg" message="환영합니다!" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Korean Practice
          </h1>
          <p className="text-muted">
            {tab === "login"
              ? "로그인하고 학습 기록을 저장하세요"
              : "계정을 만들고 학습을 시작하세요"}
          </p>
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => { setTab("login"); setError(""); }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
              tab === "login"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => { setTab("signup"); setError(""); }}
            className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
              tab === "signup"
                ? "bg-white text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            회원가입
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-4 bg-error/10 text-error rounded-xl text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-white"
            />
          </div>

          {tab === "signup" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium text-foreground mb-1.5">
                이름
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="표시될 이름"
                required={tab === "signup"}
                autoComplete="name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-white"
              />
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={tab === "signup" ? "6자 이상" : "비밀번호 입력"}
              required
              minLength={tab === "signup" ? 6 : 1}
              autoComplete={tab === "signup" ? "new-password" : "current-password"}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-white"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-primary to-primary-light text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "처리 중..."
              : tab === "login"
                ? "로그인"
                : "회원가입"}
          </motion.button>
        </form>

        {/* 구분선 + Google 로그인 (웹/네이티브 모두 지원) */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-muted">또는</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="w-full py-3 border-2 border-gray-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-medium text-foreground">Google로 계속하기</span>
        </motion.button>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted">
            {tab === "login" ? "계정이 없으신가요? " : "이미 계정이 있으신가요? "}
            <button
              onClick={() => { setTab(tab === "login" ? "signup" : "login"); setError(""); }}
              className="text-primary hover:underline font-medium"
            >
              {tab === "login" ? "회원가입" : "로그인"}
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            로그인 없이 둘러보기 →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
