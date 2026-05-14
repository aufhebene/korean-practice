"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { getReminderSettings, setReminderSettings } from "@/lib/firestore";
import {
  cancelStreakReminder,
  checkNotificationPermission,
  isNotificationSupported,
  requestNotificationPermission,
  scheduleStreakReminder,
} from "@/lib/notifications";

const DEFAULT_HOUR = 20;
const DEFAULT_MINUTE = 0;

export default function ReminderSettings() {
  const uid = useAuthStore((s) => s.user?.uid);

  const [supported, setSupported] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [hour, setHour] = useState(DEFAULT_HOUR);
  const [minute, setMinute] = useState(DEFAULT_MINUTE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // 마운트 시: 네이티브 지원 여부 + Firestore에서 기존 설정 로드
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const sup = await isNotificationSupported();
      if (cancelled) return;
      setSupported(sup);

      if (uid) {
        try {
          const r = await getReminderSettings(uid);
          if (cancelled) return;
          if (r) {
            setEnabled(r.enabled);
            setHour(r.hour);
            setMinute(r.minute);
          }
        } catch (err) {
          console.warn("[reminder] 설정 로드 실패", err);
        }
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [uid]);

  const handleToggle = async (next: boolean) => {
    if (!uid) return;
    setSaving(true);
    setStatusMsg(null);

    try {
      if (next) {
        // 켤 때: 권한 요청 → 스케줄 등록
        const perm = await checkNotificationPermission();
        if (perm !== "granted") {
          const granted = await requestNotificationPermission();
          if (!granted) {
            setStatusMsg("알림 권한이 거부되었습니다. 시스템 설정에서 허용해주세요.");
            setSaving(false);
            return;
          }
        }
        const ok = await scheduleStreakReminder({ hour, minute });
        if (!ok) {
          setStatusMsg("알림 스케줄 등록에 실패했습니다.");
          setSaving(false);
          return;
        }
      } else {
        await cancelStreakReminder();
      }

      await setReminderSettings(uid, { enabled: next, hour, minute });
      setEnabled(next);
      setStatusMsg(next ? "리마인더가 설정되었습니다." : "리마인더가 해제되었습니다.");
    } catch (err) {
      console.error("[reminder] 토글 실패", err);
      setStatusMsg("설정 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const handleTimeChange = async (newHour: number, newMinute: number) => {
    setHour(newHour);
    setMinute(newMinute);
    if (!uid || !enabled) {
      // 토글이 꺼져있으면 OS 스케줄은 건드리지 않음, Firestore만 갱신
      if (uid) await setReminderSettings(uid, { enabled, hour: newHour, minute: newMinute });
      return;
    }
    setSaving(true);
    try {
      await scheduleStreakReminder({ hour: newHour, minute: newMinute });
      await setReminderSettings(uid, { enabled, hour: newHour, minute: newMinute });
      setStatusMsg("시간이 변경되었습니다.");
    } catch (err) {
      console.error("[reminder] 시간 변경 실패", err);
      setStatusMsg("시간 변경에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (!uid) return null;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {enabled ? (
            <Bell className="w-5 h-5 text-primary" />
          ) : (
            <BellOff className="w-5 h-5 text-muted" />
          )}
          <div>
            <h3 className="font-bold text-foreground">학습 리마인더</h3>
            <p className="text-xs text-muted">
              {supported
                ? "매일 같은 시간에 알림을 보내드려요"
                : "이 기능은 모바일 앱에서만 사용할 수 있어요"}
            </p>
          </div>
        </div>

        {/* Toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          disabled={!supported || loading || saving}
          onClick={() => handleToggle(!enabled)}
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
            enabled ? "bg-primary" : "bg-gray-200"
          } ${(!supported || loading || saving) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Time picker */}
      {supported && (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-muted shrink-0">알림 시간:</span>
          <select
            value={hour}
            onChange={(e) => handleTimeChange(Number(e.target.value), minute)}
            disabled={loading || saving}
            className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-sm font-medium focus:outline-none focus:border-primary"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {String(i).padStart(2, "0")}시
              </option>
            ))}
          </select>
          <select
            value={minute}
            onChange={(e) => handleTimeChange(hour, Number(e.target.value))}
            disabled={loading || saving}
            className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-sm font-medium focus:outline-none focus:border-primary"
          >
            {[0, 15, 30, 45].map((m) => (
              <option key={m} value={m}>
                {String(m).padStart(2, "0")}분
              </option>
            ))}
          </select>
        </div>
      )}

      {statusMsg && (
        <p className="text-xs text-muted mt-3" aria-live="polite">
          {statusMsg}
        </p>
      )}
    </div>
  );
}
