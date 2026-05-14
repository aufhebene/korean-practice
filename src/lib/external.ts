/**
 * 외부 URL을 적절한 방식으로 엽니다.
 * - 네이티브 (Capacitor): Capacitor Browser 플러그인 (in-app SafariViewController/Custom Tab)
 * - 웹: window.open(url, "_blank")
 *
 * 동적 import로 SSR/빌드 타임에 평가되지 않도록 분리.
 */
export async function openExternal(url: string): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    const { Capacitor } = await import("@capacitor/core");
    if (Capacitor.isNativePlatform()) {
      const { Browser } = await import("@capacitor/browser");
      await Browser.open({
        url,
        presentationStyle: "popover",
        toolbarColor: "#a78bfa",
      });
      return;
    }
  } catch (err) {
    console.warn("[external] Capacitor Browser 실패, 웹 폴백 사용", err);
  }

  // 웹 폴백
  window.open(url, "_blank", "noopener,noreferrer");
}
