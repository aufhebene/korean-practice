/**
 * 사용자 식별 정보(uid, email, name)를 OS 보안 저장소(Capacitor Preferences)에
 * 미러링하는 얇은 레이어. Firebase Auth는 이미 IndexedDB로 토큰을 영구 저장하지만,
 *
 *   1) 콜드 스타트 시 Firebase 초기화보다 먼저 UI에 "로그인됨" 상태를 보여줄 수 있고,
 *   2) IndexedDB가 손상되거나 비워진 경우에도 식별 정보가 남아 있어 재로그인 흐름을
 *      더 매끄럽게 안내할 수 있습니다.
 *
 * 토큰 자체는 저장하지 않습니다(Firebase가 관리). 보안 민감도가 낮은 식별 데이터만 저장.
 *
 * - 네이티브: @capacitor/preferences (Android: SharedPreferences, iOS: UserDefaults/Keychain)
 * - 웹: localStorage 폴백
 */

const KEY = "kp.auth.backup";

export interface AuthBackup {
  uid: string;
  email: string;
  name: string;
  savedAt: number;
}

async function getStorage() {
  if (typeof window === "undefined") return null;
  try {
    const { Capacitor } = await import("@capacitor/core");
    if (Capacitor.isNativePlatform()) {
      const { Preferences } = await import("@capacitor/preferences");
      return {
        async get(): Promise<string | null> {
          const r = await Preferences.get({ key: KEY });
          return r.value ?? null;
        },
        async set(value: string): Promise<void> {
          await Preferences.set({ key: KEY, value });
        },
        async remove(): Promise<void> {
          await Preferences.remove({ key: KEY });
        },
      };
    }
  } catch (err) {
    console.warn("[authBackup] Capacitor Preferences 실패, localStorage 폴백", err);
  }

  // 웹 폴백
  return {
    async get(): Promise<string | null> {
      try {
        return localStorage.getItem(KEY);
      } catch {
        return null;
      }
    },
    async set(value: string): Promise<void> {
      try {
        localStorage.setItem(KEY, value);
      } catch {
        /* quota / disabled */
      }
    },
    async remove(): Promise<void> {
      try {
        localStorage.removeItem(KEY);
      } catch {
        /* ignore */
      }
    },
  };
}

export async function saveAuthBackup(
  data: Omit<AuthBackup, "savedAt">,
): Promise<void> {
  const storage = await getStorage();
  if (!storage) return;
  const payload: AuthBackup = { ...data, savedAt: Date.now() };
  await storage.set(JSON.stringify(payload));
}

export async function loadAuthBackup(): Promise<AuthBackup | null> {
  const storage = await getStorage();
  if (!storage) return null;
  const raw = await storage.get();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as AuthBackup;
    if (
      typeof parsed.uid === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.name === "string"
    ) {
      return parsed;
    }
  } catch {
    /* corrupted */
  }
  return null;
}

export async function clearAuthBackup(): Promise<void> {
  const storage = await getStorage();
  if (!storage) return;
  await storage.remove();
}
