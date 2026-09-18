import { useEffect } from "react";
import { API_BASE, updateBoothStats } from "./booths";

const VISITOR_KEY = "uhheung-visitor-id";
const MIN_VIEW_MS = 1000;

function createVisitorId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function getVisitorId() {
  try {
    const saved = localStorage.getItem(VISITOR_KEY);
    if (saved) return saved;

    const id = createVisitorId();
    localStorage.setItem(VISITOR_KEY, id);
    return id;
  } catch {
    return createVisitorId();
  }
}

function sendView(boothId, durationMs) {
  fetch(`${API_BASE}/booths/${boothId}/views`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId: getVisitorId(), durationMs }),
    keepalive: true,
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((stats) => {
      if (stats) updateBoothStats(stats);
    })
    .catch(() => {});
}

export function useBoothView(boothId, enabled = true) {
  useEffect(() => {
    if (!enabled || !boothId) return;

    const startedAt = Date.now();
    let sent = false;

    const finish = () => {
      if (sent) return;
      sent = true;

      const durationMs = Date.now() - startedAt;
      if (durationMs >= MIN_VIEW_MS) sendView(boothId, durationMs);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") finish();
    };

    window.addEventListener("pagehide", finish);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pagehide", finish);
      document.removeEventListener("visibilitychange", handleVisibility);
      finish();
    };
  }, [boothId, enabled]);
}
