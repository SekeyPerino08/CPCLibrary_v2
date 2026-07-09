export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export type ApiError = {
  error?: string;
};

export async function apiFetch<T>(
  path: string,
  opts: {
    method?: string;
    body?: unknown;
    token?: string | null;
    signal?: AbortSignal;
  } = {},
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

  const res = await fetch(url, {
    method: opts.method ?? (opts.body ? "POST" : "GET"),
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal,
    credentials: "include",
  });

  const data = (await res.json().catch(() => null)) as T | ApiError | null;

  if (!res.ok) {
    const message = (data as ApiError)?.error ?? res.statusText;
    throw new Error(message);
  }

  return data as T;
}

