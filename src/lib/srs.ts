/**
 * Spaced Repetition System (SRS) 순수 함수 모음.
 * 기존 server/routers/progress.py:23-38, server/routers/users.py:48-76 로직을 클라이언트 이전.
 */

const ONE_DAY_MS = 86_400_000;

export function nextReviewDate(
  attempts: number,
  correct: number,
  now: Date = new Date(),
): Date {
  const rate = attempts === 0 ? 0 : correct / attempts;
  const days = rate > 0.8 ? 7 : rate > 0.6 ? 3 : 1;
  const d = new Date(now);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function isMastered(attempts: number, correct: number): boolean {
  return attempts >= 3 && correct / attempts > 0.8;
}

export function ymdUTC(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export interface StreakState {
  current: number;
  lastStudyDate: string | null;
}

export function bumpStreak(
  prev: StreakState,
  now: Date = new Date(),
): { current: number; lastStudyDate: string } {
  const today = ymdUTC(now);
  if (prev.lastStudyDate === today) {
    return { current: prev.current, lastStudyDate: today };
  }
  const yesterday = ymdUTC(new Date(now.getTime() - ONE_DAY_MS));
  if (prev.lastStudyDate === yesterday) {
    return { current: prev.current + 1, lastStudyDate: today };
  }
  return { current: 1, lastStudyDate: today };
}

/**
 * itemId prefix로 카테고리 판별. server/routers/progress.py:241-248과 동일.
 * - "v..." → vocabulary
 * - "g..." → grammar
 */
export function categorizeItemId(itemId: string): "vocabulary" | "grammar" | "other" {
  if (itemId.startsWith("v")) return "vocabulary";
  if (itemId.startsWith("g")) return "grammar";
  return "other";
}
