"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => email.trim().length > 3 && password.length > 0, [email, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      router.replace("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-zinc-900">Login</h1>
        <p className="text-sm text-zinc-600 mt-1">Use your library account.</p>

        {error ? <div className="mt-4 text-sm text-red-600">{error}</div> : null}

        <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-zinc-700">Email</span>
            <input
              className="border border-zinc-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-zinc-700">Password</span>
            <input
              className="border border-zinc-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-zinc-900/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>

          <button
            disabled={!canSubmit || loading}
            className="mt-2 h-11 rounded-lg bg-zinc-900 text-white disabled:opacity-60"
            type="submit"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

