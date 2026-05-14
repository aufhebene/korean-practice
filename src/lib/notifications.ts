/**
 * 학습 스트릭 리마인더용 로컬 알림 유틸.
 * - 네이티브 (Capacitor): @capacitor/local-notifications 사용, 매일 같은 시간 반복
 * - 웹: 모든 함수가 no-op (웹 Notification API는 daily-repeat 스케줄을 OS 수준으로 못 함)
 *
 * 동적 import로 SSR/빌드 타임에 평가되지 않게 분리.
 */

const STREAK_REMINDER_ID = 1001;

export interface ReminderTime {
  hour: number; // 0-23
  minute: number; // 0-59
}

async function getModule() {
  if (typeof window === "undefined") return null;
  const { Capacitor } = await import("@capacitor/core");
  if (!Capacitor.isNativePlatform()) return null;
  const ln = await import("@capacitor/local-notifications");
  return ln.LocalNotifications;
}

/** 네이티브 환경 여부 */
export async function isNotificationSupported(): Promise<boolean> {
  return (await getModule()) !== null;
}

/** 권한 요청. 사용자가 허락했으면 true */
export async function requestNotificationPermission(): Promise<boolean> {
  const LN = await getModule();
  if (!LN) return false;
  try {
    const result = await LN.requestPermissions();
    return result.display === "granted";
  } catch (err) {
    console.warn("[notifications] 권한 요청 실패", err);
    return false;
  }
}

/** 현재 권한 상태 확인 */
export async function checkNotificationPermission(): Promise<
  "granted" | "denied" | "prompt" | "unsupported"
> {
  const LN = await getModule();
  if (!LN) return "unsupported";
  try {
    const r = await LN.checkPermissions();
    if (r.display === "granted") return "granted";
    if (r.display === "denied") return "denied";
    return "prompt";
  } catch {
    return "unsupported";
  }
}

/**
 * 매일 지정된 시간에 한 번 울리는 스트릭 리마인더 스케줄.
 * 기존 스케줄이 있으면 덮어쓴다.
 */
export async function scheduleStreakReminder(
  time: ReminderTime,
): Promise<boolean> {
  const LN = await getModule();
  if (!LN) return false;

  try {
    // 기존 알림 취소 후 재등록
    await LN.cancel({ notifications: [{ id: STREAK_REMINDER_ID }] });

    await LN.schedule({
      notifications: [
        {
          id: STREAK_REMINDER_ID,
          title: "오늘의 한국어 학습 시간이에요! 🐯",
          body: "잠깐만 시간 내서 스트릭을 이어가요.",
          schedule: {
            on: { hour: time.hour, minute: time.minute },
            allowWhileIdle: true,
          },
          smallIcon: "ic_launcher",
        },
      ],
    });
    return true;
  } catch (err) {
    console.warn("[notifications] 스케줄 등록 실패", err);
    return false;
  }
}

/** 스트릭 리마인더 취소 */
export async function cancelStreakReminder(): Promise<void> {
  const LN = await getModule();
  if (!LN) return;
  try {
    await LN.cancel({ notifications: [{ id: STREAK_REMINDER_ID }] });
  } catch (err) {
    console.warn("[notifications] 취소 실패", err);
  }
}
