"use client";

import { useEffect } from "react";
import {
  useNetworkStore,
  type ConnectionType,
} from "@/stores/useNetworkStore";

/**
 * 네트워크 상태를 구독해서 useNetworkStore에 반영.
 * - 네이티브 (Capacitor): @capacitor/network 플러그인
 * - 웹: navigator.onLine + online/offline 이벤트
 */
export default function NetworkProvider() {
  const setStatus = useNetworkStore((s) => s.setStatus);

  useEffect(() => {
    let cleanup = () => {};

    (async () => {
      const { Capacitor } = await import("@capacitor/core");

      if (Capacitor.isNativePlatform()) {
        try {
          const { Network } = await import("@capacitor/network");
          const initial = await Network.getStatus();
          setStatus({
            connected: initial.connected,
            connectionType: initial.connectionType as ConnectionType,
          });
          const handle = await Network.addListener(
            "networkStatusChange",
            (status) => {
              setStatus({
                connected: status.connected,
                connectionType: status.connectionType as ConnectionType,
              });
            },
          );
          cleanup = () => {
            void handle.remove();
          };
          return;
        } catch (err) {
          console.warn("[network] Capacitor Network 실패, 웹 폴백 사용", err);
        }
      }

      // 웹 폴백
      const updateFromBrowser = () => {
        setStatus({
          connected: typeof navigator !== "undefined" ? navigator.onLine : true,
          connectionType: "unknown",
        });
      };
      updateFromBrowser();
      window.addEventListener("online", updateFromBrowser);
      window.addEventListener("offline", updateFromBrowser);
      cleanup = () => {
        window.removeEventListener("online", updateFromBrowser);
        window.removeEventListener("offline", updateFromBrowser);
      };
    })();

    return () => cleanup();
  }, [setStatus]);

  return null;
}
