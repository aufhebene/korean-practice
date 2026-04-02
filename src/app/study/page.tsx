"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// /study 접근 시 홈으로 리다이렉트
export default function StudyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted">리다이렉트 중...</p>
    </div>
  );
}
