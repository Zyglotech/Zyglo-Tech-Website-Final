'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Plus, Minus } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface CreditTransaction {
  id: string;
  type: string;
  credits: number;
  amount: number | null;
  status: string;
  planLabel: string | null;
  createdAt: string;
}

interface DealerInvoice {
  id: string;
  invoiceNumber: string;
  currency: string;
  total: number;
  createdAt: string;
}

interface AdminUserDetail {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  addressLine1: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  isAdmin: boolean;
  createdAt: string;
  creditWallet: { balance: number } | null;
  creditTransactions: CreditTransaction[];
  dealerInvoices: DealerInvoice[];
}

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [delta, setDelta] = useState('');
  const [reason, setReason] = useState('');
  const [adjusting, setAdjusting] = useState<'add' | 'deduct' | null>(null);
  const [adjustError, setAdjustError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    const { ok, data, error: err } = await safeFetchJson<{ user: AdminUserDetail }>(`/api/admin/users/${id}`);
    setLoading(false);
    if (!ok || !data) {
      setError(err ?? 'Could not load this user.');
      return;
    }
    setUser(data.user);
  }, [id]);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  async function adjustCredits(direction: 'add' | 'deduct') {
    const amount = Math.abs(Math.round(Number(delta)));
    if (!Number.isFinite(amount) || amount <= 0) {
      setAdjustError('Enter a positive whole number of credits.');
      return;
    }
    setAdjusting(direction);
    setAdjustError(null);

    const { ok, data, error: err } = await safeFetchJson<{ balance: number }>(`/api/admin/users/${id}/credits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta: direction === 'add' ? amount : -amount, reason }),
    });

    setAdjusting(null);
    if (!ok || !data) {
      setAdjustError(err ?? 'Could not adjust credits.');
      return;
    }
    setDelta('');
    setReason('');
    fetchUser();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#060B17' }}>
        <Spinner className="h-8 w-8 text-cyan-400" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4" style={{ background: '#060B17' }}>
        <p className="text-[14px] text-red-400">{error ?? 'User not found.'}</p>
        <Link href="/dashboard/admin/users" className="text-[13px] text-cyan-400 hover:underline">← Back to Users</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <Link href="/dashboard/admin/users" className="flex items-center gap-2 text-[13px] font-medium text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Users
        </Link>

        <div className="mt-4 flex items-center gap-2">
          <h1 className="text-[28px] font-black text-white sm:text-[32px]">
            {user.name || user.companyName || 'Unnamed user'}
          </h1>
          {user.isAdmin && <ShieldCheck className="h-5 w-5 text-cyan-400" />}
        </div>
        <p className="mt-1 text-[14px] text-slate-400">
          {user.email} {user.phone ? `· +91 ${user.phone}` : ''}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6">
            <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">Wallet Balance</p>
            <p className="mt-2 text-[32px] font-black text-white">
              {(user.creditWallet?.balance ?? 0).toLocaleString('en-US')} <span className="text-[15px] font-medium text-slate-500">credits</span>
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6">
            <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-500">Address</p>
            <p className="mt-2 text-[13.5px] text-slate-300">
              {user.addressLine1 || '—'}
              {user.city ? `, ${user.city}` : ''} {user.postalCode ?? ''}
              <br />
              {user.state}{user.state && user.country ? ', ' : ''}{user.country}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6">
          <p className="text-[12px] font-bold uppercase tracking-widest text-slate-500">Adjust Credits</p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Amount</label>
              <input
                type="number"
                min={1}
                value={delta}
                onChange={(e) => setDelta(e.target.value)}
                placeholder="e.g. 100"
                className="w-32 rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-2.5 text-[14px] text-white outline-none focus:border-cyan-400/40"
              />
            </div>
            <div className="min-w-[220px] flex-1">
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Reason (optional)</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Goodwill credit for support issue"
                className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-2.5 text-[14px] text-white outline-none focus:border-cyan-400/40"
              />
            </div>
            <button
              type="button"
              onClick={() => adjustCredits('add')}
              disabled={adjusting !== null}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13.5px] font-bold text-[#060B17] disabled:opacity-60"
              style={{ background: '#06CCE8' }}>
              {adjusting === 'add' ? <Spinner className="h-4 w-4" /> : <Plus className="h-4 w-4" />} Add
            </button>
            <button
              type="button"
              onClick={() => adjustCredits('deduct')}
              disabled={adjusting !== null}
              className="flex items-center gap-1.5 rounded-xl border border-red-400/30 px-4 py-2.5 text-[13.5px] font-bold text-red-400 disabled:opacity-60">
              {adjusting === 'deduct' ? <Spinner className="h-4 w-4" /> : <Minus className="h-4 w-4" />} Deduct
            </button>
          </div>
          {adjustError && <p className="mt-3 text-[12.5px] text-red-400">{adjustError}</p>}
        </div>

        <h2 className="mt-10 text-[18px] font-black text-white">Transaction History</h2>
        <div className="mt-4 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: '#0B1424' }}>
          {user.creditTransactions.length === 0 ? (
            <p className="p-6 text-[13px] text-slate-500">No transactions yet.</p>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {user.creditTransactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-[13px] font-semibold text-white">
                      {t.planLabel ?? (t.type === 'topup' ? 'Credit top-up' : 'Credit usage')}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(t.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })} · {t.status}
                    </p>
                  </div>
                  <p className="text-[13px] font-bold text-white">
                    {t.type === 'topup' ? '+' : '−'}{t.credits.toLocaleString('en-US')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {user.dealerInvoices.length > 0 && (
          <>
            <h2 className="mt-10 text-[18px] font-black text-white">Dealer Invoices Created</h2>
            <div className="mt-4 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: '#0B1424' }}>
              <div className="divide-y divide-white/[0.04]">
                {user.dealerInvoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between px-5 py-3.5">
                    <p className="text-[13px] text-slate-300">{inv.invoiceNumber}</p>
                    <p className="text-[13px] font-bold text-white">
                      {inv.currency === 'USD' ? '$' : inv.currency + ' '}{inv.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
