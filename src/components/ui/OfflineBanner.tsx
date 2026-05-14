"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useNetworkStore } from "@/stores/useNetworkStore";

/**
 * 오프라인 상태일 때 화면 상단에 안내 배너를 표시합니다.
 * Firestore는 persistent cache 덕분에 오프라인에서도 read/write가 큐잉되며,
 * 온라인 복귀 시 자동으로 동기화됩니다.
 */
export default function OfflineBanner() {
  const connected = useNetworkStore((s) => s.connected);

  return (
    <AnimatePresence>
      {!connected && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-40 bg-amber-50 border-b border-amber-200 px-4 pt-safe pb-2 flex items-center gap-2 text-sm text-amber-800"
          role="status"
          aria-live="polite"
        >
          <WifiOff className="w-4 h-4 shrink-0" />
          <span className="flex-1">
            오프라인 상태입니다. 학습 기록은 캐시되어 연결 시 자동 동기화됩니다.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
