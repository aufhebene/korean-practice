import {
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  limit as fsLimit,
  runTransaction,
  Timestamp,
  type DocumentReference,
  type Transaction,
} from "firebase/firestore";
import { getDb } from "./firebase";
import {
  bumpStreak,
  categorizeItemId,
  isMastered,
  nextReviewDate,
  ymdUTC,
} from "./srs";

// --- Types ---

export type QuizType =
  | "vocabulary"
  | "grammar"
  | "listening"
  | "conversation";

export interface UserDoc {
  email: string;
  name: string;
  createdAt: Timestamp;
  lastLogin: Timestamp | null;
  streak: {
    current: number;
    lastStudyDate: string | null;
  };
  progress: {
    lessonsCompleted: number;
    vocabularyMastered: number;
    grammarPointsLearned: number;
  };
  stats: {
    totalAttempts: number;
    totalCorrect: number;
    totalSessions: number;
  };
  reminder?: {
    enabled: boolean;
    hour: number; // 0-23
    minute: number; // 0-59
  };
  fcmTokens?: {
    android?: { token: string; updatedAt: Timestamp };
    ios?: { token: string; updatedAt: Timestamp };
    web?: { token: string; updatedAt: Timestamp };
  };
}

export interface ReminderSettings {
  enabled: boolean;
  hour: number;
  minute: number;
}

export interface UserStats {
  totalStudied: number;
  mastered: number;
  accuracy: number;
  streak: number;
  totalSessions: number;
}

export interface StudySessionDoc {
  id: string;
  quizType: QuizType;
  score: number;
  total: number;
  completedAt: Date;
}

export interface StudySessionItem {
  itemId: string;
  correct: boolean;
}

export interface StudySessionInput {
  quizType: QuizType;
  score: number;
  total: number;
  items: StudySessionItem[];
}

interface VocabularyProgressData {
  attempts: number;
  correct: number;
  lastPracticed: Timestamp;
  nextReview: Timestamp;
  mastered: boolean;
}

// --- Refs ---

function userRef(uid: string): DocumentReference {
  return doc(getDb(), "users", uid);
}

function vocabProgressRef(uid: string, itemId: string): DocumentReference {
  return doc(getDb(), "users", uid, "vocabularyProgress", itemId);
}

// --- User Profile ---

export async function ensureUserDoc(
  uid: string,
  email: string,
  name?: string,
): Promise<void> {
  const ref = userRef(uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { lastLogin: serverTimestamp() });
    return;
  }
  await setDoc(
    ref,
    {
      email,
      name: name ?? email.split("@")[0],
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      streak: { current: 0, lastStudyDate: null },
      progress: {
        lessonsCompleted: 0,
        vocabularyMastered: 0,
        grammarPointsLearned: 0,
      },
      stats: { totalAttempts: 0, totalCorrect: 0, totalSessions: 0 },
    },
    { merge: true },
  );
}

export async function getUserDoc(uid: string): Promise<UserDoc | null> {
  const snap = await getDoc(userRef(uid));
  if (!snap.exists()) return null;
  return snap.data() as UserDoc;
}

export async function updateUserName(uid: string, name: string): Promise<void> {
  await updateDoc(userRef(uid), { name });
}

export async function getReminderSettings(
  uid: string,
): Promise<ReminderSettings | null> {
  const snap = await getDoc(userRef(uid));
  if (!snap.exists()) return null;
  const data = snap.data() as UserDoc;
  return data.reminder ?? null;
}

export async function setReminderSettings(
  uid: string,
  settings: ReminderSettings,
): Promise<void> {
  await updateDoc(userRef(uid), { reminder: settings });
}

// --- Stats ---

export async function getStats(uid: string): Promise<UserStats> {
  const userSnap = await getDoc(userRef(uid));
  if (!userSnap.exists()) {
    return {
      totalStudied: 0,
      mastered: 0,
      accuracy: 0,
      streak: 0,
      totalSessions: 0,
    };
  }
  const u = userSnap.data() as UserDoc;
  const vocabSnap = await getDocs(
    collection(getDb(), "users", uid, "vocabularyProgress"),
  );
  const totalStudied = vocabSnap.size;
  const accuracy =
    u.stats.totalAttempts === 0
      ? 0
      : Math.round((u.stats.totalCorrect / u.stats.totalAttempts) * 100);
  return {
    totalStudied,
    mastered: u.progress.vocabularyMastered,
    accuracy,
    streak: u.streak.current,
    totalSessions: u.stats.totalSessions,
  };
}

// --- Sessions ---

export async function getRecentStudySessions(
  uid: string,
  limit: number = 50,
): Promise<StudySessionDoc[]> {
  const q = query(
    collection(getDb(), "users", uid, "studySessions"),
    orderBy("completedAt", "desc"),
    fsLimit(limit),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      quizType: data.quizType as QuizType,
      score: data.score as number,
      total: data.total as number,
      completedAt: (data.completedAt as Timestamp).toDate(),
    };
  });
}

// --- Submit Session (transaction) ---

export async function submitStudySession(
  uid: string,
  input: StudySessionInput,
): Promise<void> {
  if (input.items.length === 0) {
    return;
  }
  const now = new Date();
  const todayStr = ymdUTC(now);

  // 중복 itemId가 있으면 합쳐서 처리
  const itemDeltas = new Map<string, { attempts: number; correct: number }>();
  for (const it of input.items) {
    const cur = itemDeltas.get(it.itemId) ?? { attempts: 0, correct: 0 };
    cur.attempts += 1;
    if (it.correct) cur.correct += 1;
    itemDeltas.set(it.itemId, cur);
  }
  const itemIds = Array.from(itemDeltas.keys());

  await runTransaction(getDb(), async (tx: Transaction) => {
    // 1. 모든 read를 먼저 수행 (Firestore transaction 규칙)
    const userSnap = await tx.get(userRef(uid));
    if (!userSnap.exists()) {
      throw new Error("user 문서가 없습니다. ensureUserDoc을 먼저 호출하세요.");
    }
    const u = userSnap.data() as UserDoc;

    const vocabRefs = itemIds.map((id) => vocabProgressRef(uid, id));
    const vocabSnaps = await Promise.all(vocabRefs.map((r) => tx.get(r)));

    // 2. 각 item의 새 상태 계산
    let vocabMasteredDelta = 0;
    let grammarMasteredDelta = 0;
    const newItemStates: { ref: DocumentReference; data: VocabularyProgressData }[] = [];

    for (let i = 0; i < itemIds.length; i++) {
      const itemId = itemIds[i];
      const delta = itemDeltas.get(itemId)!;
      const snap = vocabSnaps[i];
      const prev = snap.exists() ? (snap.data() as VocabularyProgressData) : null;

      const attempts = (prev?.attempts ?? 0) + delta.attempts;
      const correct = (prev?.correct ?? 0) + delta.correct;
      const wasMastered = prev?.mastered ?? false;
      const nowMastered = isMastered(attempts, correct);

      if (!wasMastered && nowMastered) {
        const cat = categorizeItemId(itemId);
        if (cat === "vocabulary") vocabMasteredDelta += 1;
        else if (cat === "grammar") grammarMasteredDelta += 1;
      }

      newItemStates.push({
        ref: vocabRefs[i],
        data: {
          attempts,
          correct,
          lastPracticed: Timestamp.fromDate(now),
          nextReview: Timestamp.fromDate(nextReviewDate(attempts, correct, now)),
          mastered: nowMastered,
        },
      });
    }

    // 3. streak 계산
    const newStreak = bumpStreak(
      { current: u.streak.current, lastStudyDate: u.streak.lastStudyDate },
      now,
    );
    const isNewStudyDay = u.streak.lastStudyDate !== todayStr;

    // 4. 전체 score 합계
    const totalAttemptsAdded = input.items.length;
    const totalCorrectAdded = input.items.filter((it) => it.correct).length;

    // 5. 모든 write
    for (const { ref, data } of newItemStates) {
      tx.set(ref, data, { merge: true });
    }

    tx.update(userRef(uid), {
      lastLogin: serverTimestamp(),
      streak: {
        current: newStreak.current,
        lastStudyDate: newStreak.lastStudyDate,
      },
      "progress.vocabularyMastered":
        u.progress.vocabularyMastered + vocabMasteredDelta,
      "progress.grammarPointsLearned":
        u.progress.grammarPointsLearned + grammarMasteredDelta,
      "stats.totalAttempts": u.stats.totalAttempts + totalAttemptsAdded,
      "stats.totalCorrect": u.stats.totalCorrect + totalCorrectAdded,
      "stats.totalSessions": u.stats.totalSessions + (isNewStudyDay ? 1 : 0),
    });

    const newSessionRef = doc(
      collection(getDb(), "users", uid, "studySessions"),
    );
    tx.set(newSessionRef, {
      quizType: input.quizType,
      score: input.score,
      total: input.total,
      completedAt: Timestamp.fromDate(now),
      completedDate: todayStr,
      items: input.items,
    });
  });
}
