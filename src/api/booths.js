import { useEffect, useState } from "react";
import lionLogo from "../features/Onboarding/assets/lion-logo.svg";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://127.0.0.1:8000/api";

let cachedBooths = null;
let pendingRequest = null;

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
        return cachedBooths;
      })
      .catch((error) => {
        pendingRequest = null;
        throw error;
      });
  }

  return pendingRequest;
}

export function useBooths() {
  const [booths, setBooths] = useState(cachedBooths ?? []);
  const [isLoading, setIsLoading] = useState(cachedBooths === null);
  const [error, setError] = useState(null);

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
