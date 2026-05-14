"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, User } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ReminderSettings from "@/components/ui/ReminderSettings";
import { useAuthStore } from "@/stores/useAuthStore";
import { updateUserName } from "@/lib/firestore";

export default function SettingsPage() {
  const { user, isLoading, reloadUserDoc } = useAuthStore();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

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
          <Link href="/auth/login">
            <Button>로그인하기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const trimmed = name.trim();
  const dirty = trimmed !== user.name && trimmed.length > 0;

  const handleSave = async () => {
    if (!dirty) return;
    setSaving(true);
    setStatusMsg(null);
    try {
      await updateUserName(user.uid, trimmed);
      await reloadUserDoc();
      setStatusMsg("저장되었습니다.");
    } catch (err) {
      console.error("[settings] 이름 저장 실패", err);
      setStatusMsg("저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <h1 className="font-bold text-lg text-foreground">설정</h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* 계정 정보 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-muted" />
            <h2 className="font-bold text-foreground">계정</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                표시 이름
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                maxLength={32}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                이메일
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-muted"
              />
              <p className="text-xs text-muted mt-1">이메일은 변경할 수 없습니다.</p>
            </div>

            <Button
              onClick={handleSave}
              disabled={!dirty || saving}
              className="w-full flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "저장 중..." : "변경사항 저장"}
            </Button>

            {statusMsg && (
              <p className="text-xs text-muted text-center" aria-live="polite">
                {statusMsg}
              </p>
            )}
          </div>
        </motion.section>

        {/* 알림 설정 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ReminderSettings />
        </motion.section>
      </div>
    </div>
  );
}
