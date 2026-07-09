"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe, type UserMeResponse, logout } from "@/lib/auth";
import { getToken } from "@/lib/auth";

export default function Home() {
  const router = useRouter();
  const [me, setMe] = useState<UserMeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const token = getToken();
        if (!token) {
          router.replace("/login");
          return;
        }

        setLoading(true);
        const data = await getMe();
        if (!cancelled) setMe(data);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load profile";
        if (!cancelled) {
          setError(message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">Library Portal</h1>
            <p className="text-sm text-zinc-600">Protected dashboard shell</p>
          </div>

          <button
            className="h-10 rounded-lg bg-white border border-zinc-200 px-3 text-zinc-900 hover:bg-zinc-100"
            onClick={() => {
              logout();
              router.replace("/login");
            }}
          >
            Logout
          </button>
        </div>

        {loading ? <div className="mt-6 text-zinc-600">Loading...</div> : null}
        {error ? <div className="mt-6 text-red-600 text-sm">{error}</div> : null}

        {me ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1 bg-white border border-zinc-200 rounded-xl p-4">
              <div className="text-sm text-zinc-600">Signed in as</div>
              <div className="mt-1 font-medium text-zinc-900">{me.name}</div>
              <div className="mt-1 text-sm text-zinc-600">{me.email}</div>
              <div className="mt-3 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-800">
                {me.role}
              </div>
              <div className="mt-4">
                <button
                  className="w-full h-10 rounded-lg bg-zinc-900 text-white"
                  onClick={() => router.push("/me")}
                >
                  View profile
                </button>
              </div>
            </div>

            <div className="md:col-span-2 bg-white border border-zinc-200 rounded-xl p-4">
              <h2 className="text-lg font-semibold text-zinc-900">Next UI milestones</h2>
              <ul className="mt-3 text-sm text-zinc-700 list-disc pl-5 space-y-1">
                <li>Auth-driven role layouts (Student / Faculty / Librarian)</li>
                <li>Physical book browsing/search</li>
                <li>Borrow request workflow UI</li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

