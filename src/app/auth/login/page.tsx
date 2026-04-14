"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Mascot from "@/components/ui/Mascot";
import { useAuthStore } from "@/stores/useAuthStore";
import { ApiError } from "@/lib/api";

type Tab = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuthStore();

  const [tab, setTab] = useState<Tab>("login");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (tab === "login") {
        await login(username, password);
      } else {
        await signup(username, name, password);
      }
      router.push("/");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("서버에 연결할 수 없습니다.");
      }
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
        {/* 마스코트 */}
        <div className="flex justify-center mb-6">
          <Mascot mood="happy" size="lg" message="환영합니다!" />
        </div>

        {/* 타이틀 */}
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

        {/* 탭 */}
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

        {/* 에러 메시지 */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-4 bg-error/10 text-error rounded-xl text-center text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              아이디
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="영문, 숫자, 밑줄 (3자 이상)"
              required
              minLength={3}
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
              placeholder={tab === "signup" ? "8자 이상" : "비밀번호 입력"}
              required
              minLength={tab === "signup" ? 8 : 1}
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

        {/* 추가 정보 */}
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
    </div>
  );
}
