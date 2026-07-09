import { apiFetch } from "./api";

const TOKEN_KEY = "cpc_token";

export type UserRole = "STUDENT" | "FACULTY" | "LIBRARIAN";

export type UserMeResponse = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string | null;
  yearSection?: string | null;
  isActive?: boolean;
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (!token) localStorage.removeItem(TOKEN_KEY);
  else localStorage.setItem(TOKEN_KEY, token);

  // Also set a cookie so middleware can protect routes.
  // Note: for same-origin deployments you may want to align domain/secure flags.
  document.cookie = `cpc_token=${encodeURIComponent(token ?? "")}; path=/; Max-Age=${token ? 60 * 60 * 24 * 7 : 0}`;
}


export async function login(params: { email: string; password: string }) {
  const res = await apiFetch<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: params,
  });
  if (!res?.token) throw new Error("Missing token in login response");
  setToken(res.token);
  return res;
}

export async function getMe() {
  return apiFetch<UserMeResponse>("/api/auth/me", {
    token: getToken(),
    method: "GET",
  });
}

export function logout() {
  setToken(null);
}

