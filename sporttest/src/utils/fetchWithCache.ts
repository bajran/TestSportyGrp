type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const memoryCache = new Map<string, CacheEntry<any>>();
const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour

export const fetchWithCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> => {
  const cached = memoryCache.get(key);

  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fetcher();
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
  });

  return data;
};
