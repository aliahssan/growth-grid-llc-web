type RateRecord = {
  hits: number;
  reset: number;
};

const WINDOW = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
const MAX = Number(process.env.RATE_LIMIT_MAX ?? 10);

type RateLimitGlobal = typeof globalThis & {
  __rateLimitStore?: Map<string, RateRecord>;
};

const globalWithStore = globalThis as RateLimitGlobal;
const globalStore =
  globalWithStore.__rateLimitStore ?? new Map<string, RateRecord>();

if (!globalWithStore.__rateLimitStore) {
  globalWithStore.__rateLimitStore = globalStore;
}

export function rateLimit(key: string, limit = MAX, windowMs = WINDOW) {
  const now = Date.now();
  const record = globalStore.get(key);

  if (!record || record.reset < now) {
    globalStore.set(key, { hits: 1, reset: now + windowMs });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (record.hits >= limit) {
    return { success: false, remaining: 0, reset: record.reset };
  }

  record.hits += 1;
  return { success: true, remaining: limit - record.hits, reset: record.reset };
}

