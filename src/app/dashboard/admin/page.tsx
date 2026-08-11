'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Users, Wallet, TrendingUp, FileText, ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface Stats {
  userCount: number;
  creditsOutstanding: number;
  paidTopupCount: number;
  totalRevenueInr: number;
  totalRevenueUsd: number;
  dealerInvoiceCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    const { ok, data, error: err } = await safeFetchJson<Stats>('/api/admin/stats');
    setLoading(false);
    if (!ok || !data) {
      setError(err ?? 'Could not load admin stats.');
      return;
    }
    setStats(data);
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

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
                <p className="mt-1 text-[13px] text-slate-400">View every user, their wallet balance, and adjust credits.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-cyan-400" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
