function getNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

export function getViewCount(booth) {
  return getNumber(booth.viewCount);
}

export function getTotalDurationMs(booth) {
  return getNumber(booth.totalDurationMs);
}

export function compareBoothsByName(a, b) {
  return (
    String(a.name ?? "").localeCompare(String(b.name ?? ""), "ko") ||
    a.id - b.id
  );
}

export function compareBoothsByPopularity(a, b) {
  return getViewCount(b) - getViewCount(a) || a.id - b.id;
}

export function compareBoothsByRecommendation(a, b) {
  return getViewCount(a) - getViewCount(b) || b.id - a.id;
}

export function compareBoothsByViewingTime(a, b) {
  return getTotalDurationMs(b) - getTotalDurationMs(a) || a.id - b.id;
}

export function getFirstBooth(booths, comparator) {
  if (booths.length === 0) return null;
  return booths.reduce((first, booth) =>
    comparator(booth, first) < 0 ? booth : first,
  );
}
