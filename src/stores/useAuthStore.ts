import { create } from "zustand";
import type { User as FirebaseUser } from "firebase/auth";
import { ensureUserDoc, getUserDoc, type UserDoc } from "@/lib/firestore";
import {
  clearAuthBackup,
  loadAuthBackup,
  saveAuthBackup,
} from "@/lib/authBackup";

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  doc: UserDoc | null;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  firestoreError: string | null;
  /** 콜드 스타트 시 Capacitor Preferences/localStorage에서 복원된 식별 정보. Firebase가 인증을 확정하기 전 UI 힌트용 */
  hydratedFromBackup: boolean;

  setFirebaseUser: (u: FirebaseUser | null) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string, name: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  reloadUserDoc: () => Promise<void>;
  clearFirestoreError: () => void;
  hydrateFromBackup: () => Promise<void>;
}

function describeFirestoreError(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    const code = String((err as { code: unknown }).code);
    if (code === "permission-denied") {
      return "Firestore 권한이 거부되었습니다. firestore.rules가 배포되지 않았거나 인증되지 않았습니다.";
    }
    if (code === "unavailable" || code === "failed-precondition") {
      return "Firestore에 연결할 수 없습니다. Firebase Console에서 Firestore Database가 생성되었는지 확인하세요.";
    }
    if (code === "unauthenticated") {
      return "인증되지 않았습니다. 다시 로그인해주세요.";
    }
    return `Firestore 오류 (${code})`;
  }
  if (err instanceof Error) return err.message;
  return "알 수 없는 Firestore 오류";
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  firestoreError: null,
  hydratedFromBackup: false,

  setFirebaseUser: async (fbUser) => {
    if (!fbUser) {
      set({ user: null, isLoading: false, firestoreError: null });
      void clearAuthBackup();
      return;
    }
    set({ isLoading: true });
    const email = fbUser.email ?? "";
    const fallbackName = fbUser.displayName ?? email.split("@")[0];

    // Firestore 실패가 로그인 자체를 막지 않도록 분리
    let userDoc: UserDoc | null = null;
    let firestoreError: string | null = null;
    try {
      await ensureUserDoc(fbUser.uid, email, fbUser.displayName ?? undefined);
      userDoc = await getUserDoc(fbUser.uid);
    } catch (err) {
      console.error("[auth] Firestore 동기화 실패", err);
      firestoreError = describeFirestoreError(err);
    }

    const finalName = userDoc?.name ?? fallbackName;
    set({
      user: {
        uid: fbUser.uid,
        email,
        name: finalName,
        doc: userDoc,
      },
      isLoading: false,
      firestoreError,
    });

    // OS 보안 저장소에 식별 정보 미러링 (다음 콜드 스타트 시 즉시 UI 복원용)
    void saveAuthBackup({ uid: fbUser.uid, email, name: finalName });
  },

  clearFirestoreError: () => set({ firestoreError: null }),

  hydrateFromBackup: async () => {
    if (get().user || get().hydratedFromBackup) return;
    const backup = await loadAuthBackup();
    if (!backup) {
      set({ hydratedFromBackup: true });
      return;
    }
    // Firebase가 아직 onAuthStateChanged를 호출하지 않은 상태에서만 미리 채움
    if (!get().user) {
      set({
        user: {
          uid: backup.uid,
          email: backup.email,
          name: backup.name,
          doc: null,
        },
        hydratedFromBackup: true,
      });
    } else {
      set({ hydratedFromBackup: true });
    }
  },

  signInEmail: async (email, password) => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const { getFirebaseAuth } = await import("@/lib/firebase");
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    // onAuthStateChanged가 setFirebaseUser를 호출
  },

  signUpEmail: async (email, password, name) => {
    const { createUserWithEmailAndPassword, updateProfile } = await import(
      "firebase/auth"
    );
    const { getFirebaseAuth } = await import("@/lib/firebase");
    const cred = await createUserWithEmailAndPassword(
      getFirebaseAuth(),
      email,
      password,
    );
    if (name) {
      await updateProfile(cred.user, { displayName: name });
    }
    // ensureUserDoc은 setFirebaseUser → onAuthStateChanged 흐름에서 처리
  },

  signInGoogle: async () => {
    const { Capacitor } = await import("@capacitor/core");
    const { GoogleAuthProvider } = await import("firebase/auth");
    const { getFirebaseAuth } = await import("@/lib/firebase");

    if (Capacitor.isNativePlatform()) {
      // 네이티브: 시스템 Google Sign-In 시트 → idToken → Firebase Web SDK로 sign-in
      const { FirebaseAuthentication } = await import(
        "@capacitor-firebase/authentication"
      );
      const result = await FirebaseAuthentication.signInWithGoogle({
        skipNativeAuth: true,
      });
      const idToken = result.credential?.idToken;
      if (!idToken) {
        throw new Error("Google idToken을 받지 못했습니다.");
      }
      const credential = GoogleAuthProvider.credential(idToken);
      const { signInWithCredential } = await import("firebase/auth");
      await signInWithCredential(getFirebaseAuth(), credential);
      return;
    }

    // 웹: 팝업 방식
    const { signInWithPopup } = await import("firebase/auth");
    await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
  },

  signOut: async () => {
    const { signOut } = await import("firebase/auth");
    const { getFirebaseAuth } = await import("@/lib/firebase");
    await signOut(getFirebaseAuth());

    // 네이티브 Google Sign-In 세션도 함께 정리 (다음 로그인 시 계정 선택 화면 표시)
    try {
      const { Capacitor } = await import("@capacitor/core");
      if (Capacitor.isNativePlatform()) {
        const { FirebaseAuthentication } = await import(
          "@capacitor-firebase/authentication"
        );
        await FirebaseAuthentication.signOut();
      }
    } catch (err) {
      console.warn("[auth] 네이티브 sign-out 정리 실패", err);
    }

    await clearAuthBackup();
    set({ user: null });
  },

  reloadUserDoc: async () => {
    const u = get().user;
    if (!u) return;
    try {
      const doc = await getUserDoc(u.uid);
      if (doc) {
        set({ user: { ...u, name: doc.name, doc }, firestoreError: null });
      }
    } catch (err) {
      console.error("[auth] reloadUserDoc 실패", err);
      set({ firestoreError: describeFirestoreError(err) });
    }
  },
}));
