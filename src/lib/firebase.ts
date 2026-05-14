import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  type Auth,
} from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  getFirestore,
  type Firestore,
} from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase는 SSR/빌드 시점에 사용할 수 없습니다.");
  }
  if (_app) return _app;
  _app = getApps().length ? getApp() : initializeApp(config);
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (_auth) return _auth;
  const auth = getAuth(getFirebaseApp());
  // IndexedDB persistence를 명시적으로 설정. 콜드 스타트 시에도 세션 복원이 빠르고
  // Capacitor WebView에서 안정적으로 동작. IndexedDB가 막힌 환경(시크릿 모드 등)에서는
  // browserLocalPersistence(localStorage)로 폴백.
  setPersistence(auth, indexedDBLocalPersistence).catch((err) => {
    console.warn(
      "[firebase] indexedDB persistence 실패, browserLocalPersistence로 폴백",
      err,
    );
    return setPersistence(auth, browserLocalPersistence).catch((err2) => {
      console.warn("[firebase] browserLocalPersistence도 실패", err2);
    });
  });
  _auth = auth;
  return _auth;
}

/**
 * Firestore 인스턴스. 첫 호출 시 IndexedDB persistent local cache로 초기화하므로
 * 오프라인 상태에서도 캐시된 문서 read/write가 가능하고, 온라인 복귀 시 자동 sync.
 *
 * - persistentSingleTabManager: 앱은 보통 단일 탭이므로 multi-tab 동기화 비용 회피
 * - persistence가 실패하는 환경(오래된 브라우저 등)은 in-memory로 폴백
 */
export function getDb(): Firestore {
  if (_db) return _db;
  const app = getFirebaseApp();
  try {
    _db = initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager({}),
      }),
    });
  } catch (err) {
    // initializeFirestore가 두 번째 호출 시 throw, 또는 persistence 미지원 환경
    console.warn("[firebase] persistent cache 초기화 실패, in-memory로 폴백", err);
    _db = getFirestore(app);
  }
  return _db;
}
