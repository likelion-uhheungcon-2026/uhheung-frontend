import { useEffect, useState } from "react";
import lionLogo from "../features/Onboarding/assets/lion-logo.svg";

export const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000/api";

const STALE_MS = 60 * 1000;

let cachedBooths = null;
let cachedAt = 0;
let pendingRequest = null;
const listeners = new Set();

function loadBooths() {
  if (!pendingRequest) {
    pendingRequest = fetch(`${API_BASE}/booths?size=100&detail=1&sort=id`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`부스 정보를 불러오지 못했습니다. (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        cachedBooths = data.items.map((booth) => ({
          ...booth,
          serviceimage: booth.serviceimage ?? lionLogo,
        }));
        cachedAt = Date.now();
        pendingRequest = null;
        listeners.forEach((listener) => listener(cachedBooths));
        return cachedBooths;
      })
      .catch((error) => {
        pendingRequest = null;
        throw error;
      });
  }

  return pendingRequest;
}

export function updateBoothStats(stats) {
  if (!cachedBooths) return;

  cachedBooths = cachedBooths.map((booth) =>
    booth.id === stats.boothId
      ? {
          ...booth,
          viewCount: stats.viewCount,
          recentViewCount: stats.recentViewCount,
          visitorCount: stats.visitorCount,
          totalDurationMs: stats.totalDurationMs,
          avgDurationMs: stats.avgDurationMs,
        }
      : booth,
  );

  listeners.forEach((listener) => listener(cachedBooths));
}

export function useBooths() {
  const [booths, setBooths] = useState(cachedBooths ?? []);
  const [isLoading, setIsLoading] = useState(cachedBooths === null);
  const [error, setError] = useState(null);

  useEffect(() => {
    listeners.add(setBooths);

    if (cachedBooths && Date.now() - cachedAt > STALE_MS) {
      loadBooths().catch(() => {});
    }

    return () => {
      listeners.delete(setBooths);
    };
  }, []);

  useEffect(() => {
    if (cachedBooths) return;

    let ignore = false;

    loadBooths()
      .then((result) => {
        if (ignore) return;
        setBooths(result);
        setIsLoading(false);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err);
        setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  return { booths, isLoading, error };
}
