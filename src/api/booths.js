import { useEffect, useState } from "react";
import lionLogo from "../features/Onboarding/assets/lion-logo.svg";

export const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000/api";

const STALE_MS = 60 * 1000;

let cachedBooths = null;
let cachedAt = 0;
let pendingRequest = null;
const listeners = new Set();
const detailCache = new Map();
const detailRequests = new Map();

function normalizeBooth(booth) {
  return {
    ...booth,
    serviceimage: booth.serviceimage ?? lionLogo,
  };
}

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
        cachedBooths = data.items.map(normalizeBooth);
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

function loadBoothDetail(boothId) {
  if (detailCache.has(boothId)) {
    return Promise.resolve(detailCache.get(boothId));
  }

  if (!detailRequests.has(boothId)) {
    const request = fetch(`${API_BASE}/booths/${boothId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`부스 상세 정보를 불러오지 못했습니다. (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        const booth = normalizeBooth(data);
        detailCache.set(boothId, booth);
        return booth;
      })
      .finally(() => {
        detailRequests.delete(boothId);
      });

    detailRequests.set(boothId, request);
  }

  return detailRequests.get(boothId);
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

export function useBoothDetail(boothId, fallbackBooth = null) {
  const normalizedBoothId = Number(boothId);
  const [loadedBooth, setLoadedBooth] = useState(
    () => detailCache.get(normalizedBoothId) ?? null,
  );
  const [requestError, setRequestError] = useState(null);

  const cachedDetail = detailCache.get(normalizedBoothId) ?? null;
  const currentLoadedBooth =
    loadedBooth?.id === normalizedBoothId ? loadedBooth : null;
  const currentError =
    requestError?.boothId === normalizedBoothId ? requestError.error : null;
  const detailBooth = currentLoadedBooth ?? cachedDetail;

  useEffect(() => {
    if (!Number.isInteger(normalizedBoothId) || normalizedBoothId <= 0) return;

    let ignore = false;

    loadBoothDetail(normalizedBoothId)
      .then((booth) => {
        if (!ignore) setLoadedBooth(booth);
      })
      .catch((error) => {
        if (!ignore) {
          setRequestError({ boothId: normalizedBoothId, error });
        }
      });

    return () => {
      ignore = true;
    };
  }, [normalizedBoothId]);

  return {
    booth: detailBooth ?? fallbackBooth,
    isLoading: !detailBooth && !fallbackBooth && !currentError,
    error: currentError,
  };
}
