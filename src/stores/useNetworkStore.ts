import { create } from "zustand";

export type ConnectionType =
  | "wifi"
  | "cellular"
  | "ethernet"
  | "unknown"
  | "none";

interface NetworkState {
  connected: boolean;
  connectionType: ConnectionType;
  /** 마지막으로 오프라인이었던 시각 (사용자에게 "X분 전 끊김" 같은 표현용) */
  lastDisconnectedAt: number | null;
  setStatus: (s: { connected: boolean; connectionType?: ConnectionType }) => void;
}

export const useNetworkStore = create<NetworkState>((set, get) => ({
  // 초기에는 "온라인"으로 가정 (잘못된 false negative보다 안전)
  connected: true,
  connectionType: "unknown",
  lastDisconnectedAt: null,
  setStatus: ({ connected, connectionType }) => {
    const wasConnected = get().connected;
    set({
      connected,
      connectionType: connectionType ?? get().connectionType,
      lastDisconnectedAt:
        wasConnected && !connected ? Date.now() : get().lastDisconnectedAt,
    });
  },
}));
