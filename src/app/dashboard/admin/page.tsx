'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Users, Wallet, TrendingUp, FileText, ArrowRight, Minus, Plus } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface Stats {
  userCount: number;
  creditsOutstanding: number;
  paidTopupCount: number;
  totalRevenueInr: number;
  totalRevenueUsd: number;
  dealerInvoiceCount: number;
  pendingApprovalCount: number;
}

interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  companyName: string | null;
  creditWallet: { balance: number } | null;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [busyUserId, setBusyUserId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<Record<string, string>>({});

  const fetchStats = useCallback(async () => {
    const { ok, data, error: err } = await safeFetchJson<Stats>('/api/admin/stats');
    setLoading(false);
    if (!ok || !data) {
      setError(err ?? 'Could not load admin stats.');
      return;
    }
    setStats(data);
  }, []);

  const fetchUsers = useCallback(async () => {
    const { ok, data } = await safeFetchJson<{ users: AdminUser[] }>('/api/admin/users');
    setUsersLoading(false);
    if (ok && data) {
      setUsers([...data.users].sort((a, b) => (b.creditWallet?.balance ?? 0) - (a.creditWallet?.balance ?? 0)));
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);
  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  async function adjustCredits(userId: string, direction: 'add' | 'deduct') {
    const raw = amounts[userId];
    const amount = Math.abs(Math.round(Number(raw)));
    if (!Number.isFinite(amount) || amount <= 0) {
      setRowError((prev) => ({ ...prev, [userId]: 'Enter a whole number' }));
      return;
    }
    setBusyUserId(userId);
    setRowError((prev) => ({ ...prev, [userId]: '' }));

    const { ok, data, error: err } = await safeFetchJson<{ balance: number }>(`/api/admin/users/${userId}/credits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta: direction === 'add' ? amount : -amount }),
    });

    setBusyUserId(null);
    if (!ok || !data) {
      setRowError((prev) => ({ ...prev, [userId]: err ?? 'Failed' }));
      return;
    }
    setAmounts((prev) => ({ ...prev, [userId]: '' }));
    setUsers((prev) =>
      prev
        .map((u) => (u.id === userId ? { ...u, creditWallet: { balance: data.balance } } : u))
        .sort((a, b) => (b.creditWallet?.balance ?? 0) - (a.creditWallet?.balance ?? 0))
    );
  }

  const cards = stats
    ? [
        { label: 'Total Users', value: stats.userCount.toLocaleString('en-US'), icon: Users },
        { label: 'Credits Outstanding', value: stats.creditsOutstanding.toLocaleString('en-US'), icon: Wallet },
        {
          label: 'Total Revenue',
          value: `$${stats.totalRevenueUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          sub: `₹${stats.totalRevenueInr.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} · ${stats.paidTopupCount} purchases`,
          icon: TrendingUp,
        },
        { label: 'Dealer Invoices Created', value: stats.dealerInvoiceCount.toLocaleString('en-US'), icon: FileText },
      ]
    : [];

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <h1 className="text-[28px] font-black text-white sm:text-[32px]">Admin Dashboard</h1>
        <p className="mt-2 text-[14px] text-slate-400">Users, credits, and platform activity.</p>

        {loading ? (
          <div className="mt-8 flex items-center gap-2 text-slate-500">
            <Spinner className="h-5 w-5" /> <span className="text-[13px]">Loading...</span>
          </div>
        ) : error ? (
          <p className="mt-8 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">{error}</p>
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((c) => (
                <div key={c.label} className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-5">
                  <div className="flex items-center gap-2 text-slate-500">
                    <c.icon className="h-4 w-4" />
                    <p className="text-[11.5px] font-semibold uppercase tracking-wider">{c.label}</p>
                  </div>
                  <p className="mt-2 text-[24px] font-black text-white">{c.value}</p>
                  {c.sub && <p className="mt-0.5 text-[11.5px] text-slate-500">{c.sub}</p>}
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/admin/users"
              className="mt-8 flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-[#0B1424] p-6 transition hover:border-cyan-400/40">
              <div>
                <p className="text-[16px] font-bold text-white">Manage Users</p>
                <p className="mt-1 text-[13px] text-slate-400">View every user, approve accounts, and adjust credits.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-cyan-400" />
            </Link>

            {stats && stats.pendingApprovalCount > 0 && (
              <Link
                href="/dashboard/admin/users?status=pending"
                className="mt-4 flex items-center justify-between rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 transition hover:border-amber-400/40">
                <div>
                  <p className="text-[16px] font-bold text-amber-300">
                    {stats.pendingApprovalCount} account{stats.pendingApprovalCount === 1 ? '' : 's'} awaiting approval
                  </p>
                  <p className="mt-1 text-[13px] text-amber-200/70">New sign-ups can&apos;t access the dashboard until approved.</p>
                </div>
                <ArrowRight className="h-5 w-5 text-amber-400" />
              </Link>
            )}

            {/* All users — quick credit adjust */}
            <h2 className="mt-10 text-[16px] font-bold text-white">All Users — Credits</h2>
            <p className="mt-1 text-[13px] text-slate-400">Sorted by balance. Deduct or add credits without leaving this page.</p>
            <div className="mt-4 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: '#0B1424' }}>
              {usersLoading ? (
                <div className="flex items-center gap-2 p-6 text-[13px] text-slate-500">
                  <Spinner className="h-4 w-4" /> Loading users...
                </div>
              ) : users.length === 0 ? (
                <p className="p-6 text-[13.5px] text-slate-500">No users found.</p>
              ) : (
                <div className="divide-y divide-white/[0.04]">
                  {users.map((u) => (
                    <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
                      <Link href={`/dashboard/admin/users/${u.id}`} className="min-w-0 flex-1 hover:opacity-80">
                        <p className="truncate text-[13.5px] font-semibold text-white">
                          {u.name || u.companyName || 'Unnamed user'}
                        </p>
                        <p className="truncate text-[11.5px] text-slate-500">{u.email}</p>
                      </Link>
                      <p className="text-[13.5px] font-bold text-white shrink-0">
                        {(u.creditWallet?.balance ?? 0).toLocaleString('en-US')} <span className="font-normal text-slate-500">credits</span>
                      </p>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <input
                          type="number"
                          min={1}
                          value={amounts[u.id] ?? ''}
                          onChange={(e) => setAmounts((prev) => ({ ...prev, [u.id]: e.target.value }))}
                          placeholder="0"
                          className="w-16 rounded-lg border border-white/10 bg-[#0F1C32] px-2 py-1.5 text-[12.5px] text-white outline-none focus:border-cyan-400/40"
                        />
                        <button
                          type="button"
                          onClick={() => adjustCredits(u.id, 'deduct')}
                          disabled={busyUserId === u.id}
                          aria-label={`Deduct credits from ${u.name || u.email}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-400/30 text-red-400 transition hover:bg-red-400/10 disabled:opacity-50">
                          {busyUserId === u.id ? <Spinner className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustCredits(u.id, 'add')}
                          disabled={busyUserId === u.id}
                          aria-label={`Add credits to ${u.name || u.email}`}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-[#060B17] transition disabled:opacity-50"
                          style={{ background: '#06CCE8' }}>
                          {busyUserId === u.id ? <Spinner className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                      {rowError[u.id] && (
                        <p className="w-full text-[11.5px] text-red-400">{rowError[u.id]}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
