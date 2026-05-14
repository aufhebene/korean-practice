/**
 * FCM 푸시 알림 유틸 (네이티브 전용).
 * - 권한 요청 → 토큰 발급 → Firestore에 저장 → foreground/background 이벤트 핸들러
 * - 웹에선 모두 no-op
 *
 * Firestore 스키마:
 *   users/{uid}.fcmTokens.{android|ios|web} = { token, updatedAt }
 *
 * Server에서 푸시 발송 시 위 필드를 읽어 사용. (admin SDK / Cloud Functions 작업은 별도)
 */

export type PushPlatform = "android" | "ios";

async function getModule() {
  if (typeof window === "undefined") return null;
  const { Capacitor } = await import("@capacitor/core");
  if (!Capacitor.isNativePlatform()) return null;
  const platform = Capacitor.getPlatform();
  if (platform !== "android" && platform !== "ios") return null;
  const pn = await import("@capacitor/push-notifications");
  return { PushNotifications: pn.PushNotifications, platform: platform as PushPlatform };
}

export async function isPushSupported(): Promise<boolean> {
  return (await getModule()) !== null;
}

export async function requestPushPermission(): Promise<boolean> {
  const mod = await getModule();
  if (!mod) return false;
  try {
    const r = await mod.PushNotifications.requestPermissions();
    return r.receive === "granted";
  } catch (err) {
    console.warn("[push] 권한 요청 실패", err);
    return false;
  }
}

/**
 * 푸시 등록을 시작합니다.
 * - 권한이 없으면 먼저 요청
 * - 토큰을 받으면 Firestore `users/{uid}.fcmTokens.{platform}`에 저장
 * - foreground/background 이벤트 리스너 등록
 *
 * 반환값: cleanup 함수 (이벤트 리스너 제거)
 */
export async function registerPush(uid: string): Promise<() => void> {
  const mod = await getModule();
  if (!mod) return () => {};

  const { PushNotifications, platform } = mod;

  // 권한 확인 / 요청
  let perm = await PushNotifications.checkPermissions();
  if (perm.receive === "prompt" || perm.receive === "prompt-with-rationale") {
    perm = await PushNotifications.requestPermissions();
  }
  if (perm.receive !== "granted") {
    console.warn("[push] 권한 거부됨");
    return () => {};
  }

  // 이벤트 리스너 등록 (register() 호출 전에 먼저 부착해야 토큰을 놓치지 않음)
  const handles: { remove: () => Promise<void> }[] = [];

  const onRegistration = await PushNotifications.addListener(
    "registration",
    async (token) => {
      try {
        const { doc, updateDoc, serverTimestamp } = await import(
          "firebase/firestore"
        );
        const { getDb } = await import("./firebase");
        await updateDoc(doc(getDb(), "users", uid), {
          [`fcmTokens.${platform}`]: {
            token: token.value,
            updatedAt: serverTimestamp(),
          },
        });
      } catch (err) {
        console.error("[push] 토큰 저장 실패", err);
      }
    },
  );
  handles.push(onRegistration);

  const onError = await PushNotifications.addListener(
    "registrationError",
    (err) => {
      console.error("[push] 등록 오류", err);
    },
  );
  handles.push(onError);

  // foreground 수신 (앱이 켜진 상태에서 도착)
  const onReceived = await PushNotifications.addListener(
    "pushNotificationReceived",
    (notification) => {
      console.log("[push] foreground 수신", notification);
      // TODO: 앱 내 토스트/배지 표시 등 (필요 시)
    },
  );
  handles.push(onReceived);

  // 사용자가 알림을 탭했을 때 (background → foreground)
  const onAction = await PushNotifications.addListener(
    "pushNotificationActionPerformed",
    (action) => {
      console.log("[push] 탭 처리", action);
      // TODO: notification.data.route 같은 deep link로 이동
    },
  );
  handles.push(onAction);

  // 등록 시작 → onRegistration이 토큰을 받음
  try {
    await PushNotifications.register();
  } catch (err) {
    console.error("[push] register 실패", err);
  }

  return () => {
    for (const h of handles) {
      void h.remove();
    }
  };
}

/** 로그아웃 시 리스너 정리. (Firestore의 토큰은 다음 로그인 사용자가 덮어쓰거나 청소) */
export async function unregisterPushListeners(): Promise<void> {
  const mod = await getModule();
  if (!mod) return;
  try {
    await mod.PushNotifications.removeAllListeners();
  } catch (err) {
    console.warn("[push] 리스너 정리 실패", err);
  }
}
