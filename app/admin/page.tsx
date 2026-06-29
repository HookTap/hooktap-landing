"use client";

import { useState, useEffect, useCallback } from "react";

interface Stats {
  users: number;
  devices: number;
  linkedDevices: number;
  webhooks: number;
  events: number;
  updatedAt: string;
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number | null;
  icon: string;
}) {
  return (
    <div className="bg-base-200 rounded-2xl p-6 flex flex-col gap-2">
      <span className="text-3xl">{icon}</span>
      <p className="text-4xl font-bold tabular-nums">
        {value === null ? (
          <span className="loading loading-dots loading-sm" />
        ) : (
          value.toLocaleString()
        )}
      </p>
      <p className="text-base-content/60 text-sm uppercase tracking-wider">{label}</p>
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [statsError, setStatsError] = useState("");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setStatsError("");
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to load stats");
      setStats(await res.json());
    } catch {
      setStatsError("Could not load stats. Check Firebase credentials.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Check auth state on mount
  useEffect(() => {
    fetch("/api/admin/stats").then((res) => {
      if (res.status === 401) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        res.json().then(setStats);
      }
    });
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setIsLoggedIn(true);
      fetchStats();
    } else {
      setLoginError("Wrong password");
    }
    setPassword("");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsLoggedIn(false);
    setStats(null);
  }

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="card bg-base-200 shadow-xl w-full max-w-sm">
          <div className="card-body gap-6">
            <div>
              <h1 className="text-2xl font-bold">HookTap Admin</h1>
              <p className="text-base-content/50 text-sm mt-1">Enter password to continue</p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {loginError && <p className="text-error text-sm">{loginError}</p>}
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">HookTap Admin</h1>
            {stats && (
              <p className="text-base-content/40 text-xs mt-1">
                Updated {new Date(stats.updatedAt).toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-ghost"
              onClick={fetchStats}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "↻ Refresh"
              )}
            </button>
            <button className="btn btn-sm btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {statsError && (
          <div className="alert alert-error mb-6">
            <span>{statsError}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard label="Registered Users" value={stats?.users ?? null} icon="👥" />
          <StatCard label="iOS Devices" value={stats?.devices ?? null} icon="📱" />
          <StatCard
            label="Linked Mac Devices"
            value={stats?.linkedDevices ?? null}
            icon="💻"
          />
          <StatCard label="Webhooks" value={stats?.webhooks ?? null} icon="🎣" />
          <StatCard label="Total Events" value={stats?.events ?? null} icon="📨" />
        </div>
      </div>
    </div>
  );
}
