"use client";

import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setFirebaseUser = useAuthStore((s) => s.setFirebaseUser);
  const hydrateFromBackup = useAuthStore((s) => s.hydrateFromBackup);
  const firestoreError = useAuthStore((s) => s.firestoreError);
  const clearFirestoreError = useAuthStore((s) => s.clearFirestoreError);

  useEffect(() => {
    let unsub = () => {};
    let cancelled = false;
    (async () => {
      // Firebase 초기화 전에 OS 보안 저장소에서 식별 정보를 즉시 로드해 UI 깜빡임 방지
      await hydrateFromBackup();
      const { onAuthStateChanged } = await import("firebase/auth");
      const { getFirebaseAuth } = await import("@/lib/firebase");
      if (cancelled) return;
      unsub = onAuthStateChanged(getFirebaseAuth(), (u) => {
        void setFirebaseUser(u);
      });
    })();
    return () => {
      cancelled = true;
      unsub();
    };
  }, [setFirebaseUser, hydrateFromBackup]);

  return (
    <>
      {firestoreError && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-50 border-b border-red-200 px-4 pt-safe pb-3 text-sm text-red-800 flex items-start gap-3">
          <span className="font-bold shrink-0 pt-3">⚠️ Firestore</span>
          <span className="flex-1 pt-3">{firestoreError}</span>
          <button
            onClick={clearFirestoreError}
            className="text-red-600 hover:text-red-800 font-bold shrink-0 pt-3"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
      )}
      {children}
    </>
  );
}
