"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  cancelStreakReminder,
  scheduleStreakReminder,
} from "@/lib/notifications";
import { registerPush, unregisterPushListeners } from "@/lib/push";

/**
 * 네이티브 환경에서만 동작하는 부트스트랩.
 * - StatusBar 색상/스타일 (브랜드 보라)
 * - 하드웨어 뒤로가기 버튼 (Android): 라우터 history pop, 최상단이면 앱 종료
 * - Keyboard show/hide: body에 keyboard-open 클래스 + --keyboard-height CSS 변수
 *
 * 웹 환경에서는 모든 호출이 no-op 입니다.
 */
export default function NativeBootstrap() {
  const router = useRouter();
  const pathname = usePathname();
  const reminder = useAuthStore((s) => s.user?.doc?.reminder);
  const uid = useAuthStore((s) => s.user?.uid);

  // 1) StatusBar 초기 설정 (마운트 시 한 번)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { Capacitor } = await import("@capacitor/core");
      if (!Capacitor.isNativePlatform()) return;

      try {
        const { StatusBar, Style } = await import("@capacitor/status-bar");
        if (cancelled) return;
        await StatusBar.setBackgroundColor({ color: "#a78bfa" });
        await StatusBar.setStyle({ style: Style.Dark }); // 흰색 아이콘 (어두운 배경 위)
        await StatusBar.setOverlaysWebView({ overlay: false });
      } catch (err) {
        console.warn("[native] StatusBar 설정 실패", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) Keyboard show/hide 리스너
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const { Capacitor } = await import("@capacitor/core");
      if (!Capacitor.isNativePlatform()) return;

      try {
        const { Keyboard } = await import("@capacitor/keyboard");
        const showHandle = await Keyboard.addListener(
          "keyboardWillShow",
          (info) => {
            document.body.classList.add("keyboard-open");
            document.body.style.setProperty(
              "--keyboard-height",
              `${info.keyboardHeight}px`,
            );
          },
        );
        const hideHandle = await Keyboard.addListener("keyboardWillHide", () => {
          document.body.classList.remove("keyboard-open");
          document.body.style.removeProperty("--keyboard-height");
        });
        cleanup = () => {
          void showHandle.remove();
          void hideHandle.remove();
        };
      } catch (err) {
        console.warn("[native] Keyboard 리스너 설정 실패", err);
      }
    })();
    return () => cleanup();
  }, []);

  // 3) 사용자 reminder 설정에 따라 OS 스케줄 자동 재적용
  //    (앱 재설치 / 새 기기 로그인 / OS가 스케줄을 정리한 경우 대응)
  useEffect(() => {
    if (!reminder) return;
    void (async () => {
      if (reminder.enabled) {
        await scheduleStreakReminder({
          hour: reminder.hour,
          minute: reminder.minute,
        });
      } else {
        await cancelStreakReminder();
      }
    })();
  }, [reminder]);

  // 4) 로그인된 네이티브 사용자에게 FCM 푸시 자동 등록 (토큰을 Firestore에 저장)
  useEffect(() => {
    if (!uid) return;
    let cleanup = () => {};
    void (async () => {
      cleanup = await registerPush(uid);
    })();
    return () => {
      cleanup();
      void unregisterPushListeners();
    };
  }, [uid]);

  // 5) 하드웨어 뒤로가기 (Android)
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const { Capacitor } = await import("@capacitor/core");
      if (!Capacitor.isNativePlatform()) return;

      try {
        const { App } = await import("@capacitor/app");
        const handle = await App.addListener("backButton", ({ canGoBack }) => {
          // 루트(/) 또는 로그인 화면이면 앱 종료
          if (pathname === "/" || pathname === "/auth/login" || !canGoBack) {
            void App.exitApp();
          } else {
            router.back();
          }
        });
        cleanup = () => {
          void handle.remove();
        };
      } catch (err) {
        console.warn("[native] BackButton 리스너 설정 실패", err);
      }
    })();
    return () => cleanup();
  }, [pathname, router]);

  return null;
}
