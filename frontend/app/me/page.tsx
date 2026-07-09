"use client";

import { useEffect, useState } from "react";
import { getMe, type UserMeResponse, logout } from "@/lib/auth";

export default function MePage() {
  const [me, setMe] = useState<UserMeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await getMe();
        if (!cancelled) setMe(data);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Failed to load profile";
        if (!cancelled) setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900">My Profile</h1>
        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="h-10 rounded-lg bg-white border border-zinc-200 px-3 text-zinc-900 hover:bg-zinc-100"
        >
          Logout
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white border border-zinc-200 rounded-xl p-6">
        {loading ? (
          <div className="text-zinc-600">Loading...</div>
        ) : error ? (
          <div className="text-red-600 text-sm">{error}</div>
        ) : me ? (
          <div className="space-y-2 text-sm text-zinc-800">
            <div>
              <span className="text-zinc-500">Name: </span>
              <span className="font-medium">{me.name}</span>
            </div>
            <div>
              <span className="text-zinc-500">Email: </span>
              <span className="font-medium">{me.email}</span>
            </div>
            <div>
              <span className="text-zinc-500">Role: </span>
              <span className="font-medium">{me.role}</span>
            </div>
            {me.department ? (
              <div>
                <span className="text-zinc-500">Department: </span>
                <span className="font-medium">{me.department}</span>
              </div>
            ) : null}
            {me.yearSection ? (
              <div>
                <span className="text-zinc-500">Year/Section: </span>
                <span className="font-medium">{me.yearSection}</span>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="text-zinc-600">No profile loaded.</div>
        )}
      </div>
    </div>
  );
}

