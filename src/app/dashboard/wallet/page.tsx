'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Zap, Clock, CheckCircle2, XCircle, Wallet } from 'lucide-react';
import { customRecharge, creditsForAmount, formatUsd, getTierById, DEFAULT_TIER_ID } from '@/data/credit-plans';
import { CreditTierPicker } from '@/components/CreditTierPicker';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface Transaction {
  id: string;
  type: string;
  credits: number;
  amount: number | null;
  status: string;
  planLabel: string | null;
  cashfreeOrderId: string | null;
  createdAt: string;
}

const STATUS_STYLES: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  paid: { icon: CheckCircle2, color: 'text-green-400' },
  pending: { icon: Clock, color: 'text-amber-400' },
  failed: { icon: XCircle, color: 'text-red-400' },
};

const RETURN_BANNER: Record<string, { text: string; color: string }> = {
  paid: { text: 'Payment successful — credits added to your wallet.', color: 'border-green-400/20 bg-green-400/5 text-green-400' },
  pending: { text: 'Payment is still processing. This page will update automatically once confirmed.', color: 'border-amber-400/20 bg-amber-400/5 text-amber-400' },
  failed: { text: 'Payment failed or was cancelled. No credits were added — you were not charged.', color: 'border-red-400/20 bg-red-400/5 text-red-400' },
};

function WalletContent() {
  const { data: authSession } = useSession();
  const searchParams = useSearchParams();
  const returnOrderId = searchParams.get('order_id');

  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [tierId, setTierId] = useState(DEFAULT_TIER_ID);

  const fetchWallet = useCallback(async () => {
    const { ok, data, error: err } = await safeFetchJson<{ balance: number; transactions: Transaction[] }>('/api/wallet');
    if (!ok || !data) {
      setError((prev) => prev ?? err ?? 'Could not load your wallet.');
      setLoadingWallet(false);
      return;
    }
    setBalance(data.balance);
    setTransactions(data.transactions);
    setLoadingWallet(false);
  }, []);

  const fetchProfile = useCallback(async () => {
    const { ok, data } = await safeFetchJson<{ phone: string | null }>('/api/user');
    if (ok && data) setPhone(data.phone ?? '');
  }, []);

  useEffect(() => { fetchWallet(); }, [fetchWallet]);
  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  // If we just came back from checkout and the webhook hasn't landed yet, poll briefly.
  const returnTransaction = returnOrderId ? transactions.find((t) => t.cashfreeOrderId === returnOrderId) : undefined;
  useEffect(() => {
    if (!returnOrderId) return;
    if (returnTransaction && returnTransaction.status !== 'pending') return;
    const interval = setInterval(fetchWallet, 2500);
    const timeout = setTimeout(() => clearInterval(interval), 20000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [returnOrderId, returnTransaction, fetchWallet]);

  async function startCheckout(body: { tierId?: string; amountInr?: number }) {
    if (!phone) {
      setError('Add a phone number to your profile before making a payment.');
      return;
    }
    const key = body.tierId ?? `recharge-${body.amountInr}`;
    setBuying(key);
    setError(null);

    const { ok, data, error: err } = await safeFetchJson<{ paymentSessionId: string }>('/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!ok || !data) {
      setError(err ?? 'Could not start checkout. Please try again.');
      setBuying(null);
      return;
    }

    try {
      const { load } = await import('@cashfreepayments/cashfree-js');
      const cashfree = await load({ mode: process.env.NEXT_PUBLIC_CASHFREE_ENV === 'production' ? 'production' : 'sandbox' });
      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: '_self',
      });
    } catch {
      setError('Could not open the payment page. Please try again.');
      setBuying(null);
    }
  }

  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [savingPhone, setSavingPhone] = useState(false);

  function isValidPhone(p: string) {
    return /^[6-9]\d{9}$/.test(p.replace(/\D/g, '').slice(-10));
  }

  async function savePhone() {
    if (!isValidPhone(phoneInput)) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setSavingPhone(true);
    setError(null);

    const { ok, data, error: err } = await safeFetchJson<{ phone: string }>('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneInput }),
    });

    setSavingPhone(false);
    if (!ok || !data) {
      setError(err ?? 'Could not save phone number.');
      return;
    }
    setPhone(data.phone);
    setEditingPhone(false);
  }

  const selectedTier = getTierById(tierId)!;
  const rechargeValue = Number(rechargeAmount);
  const rechargeCredits = rechargeValue > 0 ? creditsForAmount(rechargeValue) : 0;
  const rechargeInRange =
    rechargeValue >= customRecharge.minAmountInr && rechargeValue <= customRecharge.maxAmountInr;

  const returnStatus = returnOrderId ? (returnTransaction?.status ?? 'pending') : null;
  const banner = returnStatus ? RETURN_BANNER[returnStatus] : null;

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
        <h1 className="text-[28px] font-black text-white sm:text-[36px]">AI Credits Wallet</h1>
        <p className="mt-2 text-[14px] text-slate-400">
          {authSession?.user?.email ? `Signed in as ${authSession.user.email}` : ''}
        </p>

        {banner && (
          <p className={`mt-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-[13px] ${banner.color}`}>
            {returnStatus === 'pending' && <Spinner className="h-3.5 w-3.5" />}
            {banner.text}
          </p>
        )}

        <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-[#0B1424] p-8">
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-cyan-400" />
            <p className="text-[13px] font-semibold uppercase tracking-widest text-slate-400">Current Balance</p>
          </div>
          {loadingWallet ? (
            <div className="mt-4 flex items-center gap-2 text-slate-500">
              <Spinner className="h-5 w-5" /> <span className="text-[13px]">Loading...</span>
            </div>
          ) : (
            <p className="mt-3 text-[44px] font-black text-white">
              {balance === null ? '—' : balance.toLocaleString('en-IN')}
              <span className="ml-2 text-[16px] font-medium text-slate-500">credits</span>
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6">
          <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Phone number</label>
          {editingPhone ? (
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                maxLength={10}
                className="w-full max-w-xs rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-2.5 text-[14px] text-white outline-none focus:border-cyan-400/40"
              />
              <button
                onClick={savePhone}
                disabled={savingPhone}
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold text-[#060B17] transition disabled:opacity-60"
                style={{ background: '#06CCE8' }}>
                {savingPhone && <Spinner className="h-3.5 w-3.5" />} {savingPhone ? 'Saving...' : 'Save'}
              </button>
              {phone && (
                <button onClick={() => setEditingPhone(false)} className="text-[13px] text-slate-500 hover:text-slate-300">
                  Cancel
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {phone === null ? (
                <span className="flex items-center gap-2 text-[13px] text-slate-500"><Spinner className="h-3.5 w-3.5" /> Loading...</span>
              ) : (
                <>
                  <p className="text-[14px] text-white">{phone ? `+91 ${phone}` : 'Not set'}</p>
                  <button
                    onClick={() => { setPhoneInput(phone ?? ''); setEditingPhone(true); }}
                    className="text-[12.5px] font-semibold text-cyan-400 hover:underline">
                    {phone ? 'Edit' : 'Add phone number'}
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">
            {error}
          </p>
        )}

        {/* Custom recharge */}
        <h2 className="mt-12 flex items-center gap-2 text-[20px] font-black text-white">
          <Wallet className="h-5 w-5 text-cyan-400" /> Recharge Any Amount
        </h2>
        <p className="mt-1.5 text-[13px] text-slate-500">
          $0.25 per credit. Min {formatUsd(customRecharge.minAmountInr, true)}, max {formatUsd(customRecharge.maxAmountInr, true)}.
        </p>
        <div className="mt-5 flex flex-wrap items-end gap-4 rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6">
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Amount (₹)</label>
            <input
              type="number"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              placeholder={`e.g. ${customRecharge.minAmountInr}`}
              min={customRecharge.minAmountInr}
              max={customRecharge.maxAmountInr}
              className="w-44 rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-2.5 text-[14px] text-white outline-none focus:border-cyan-400/40"
            />
            {rechargeValue > 0 && (
              <p className="mt-1.5 text-[11.5px] text-slate-500">≈ {formatUsd(rechargeValue, true)}</p>
            )}
          </div>
          <p className="pb-3 text-[13px] text-slate-400">
            {rechargeValue > 0 ? (
              <>You&apos;ll get <span className="font-bold text-cyan-400">{rechargeCredits.toLocaleString('en-IN')} credits</span></>
            ) : (
              'Enter an amount to see credits'
            )}
          </p>
          <button
            onClick={() => startCheckout({ amountInr: rechargeValue })}
            disabled={!rechargeInRange || buying !== null || !phone}
            className="ml-auto flex items-center gap-2 rounded-xl px-6 py-3 text-[13.5px] font-bold text-[#060B17] transition disabled:opacity-40"
            style={{ background: '#06CCE8' }}>
            {buying === `recharge-${rechargeValue}` && <Spinner className="h-4 w-4" />}
            {buying === `recharge-${rechargeValue}` ? 'Redirecting…' : 'Recharge'}
          </button>
        </div>
        {rechargeAmount !== '' && !rechargeInRange && (
          <p className="mt-2 text-[12px] text-amber-400">
            Amount must be between ₹{customRecharge.minAmountInr.toLocaleString('en-IN')} and ₹{customRecharge.maxAmountInr.toLocaleString('en-IN')}.
          </p>
        )}

        {/* Fixed credit tier */}
        <h2 className="mt-12 text-[20px] font-black text-white">Or Buy a Credit Pack</h2>
        <p className="mt-1.5 text-[13px] text-slate-500">$0.25 per credit at every tier — no volume discounts.</p>
        <div className="mt-5 max-w-md rounded-2xl border border-cyan-400/30 bg-[#0B1424] p-6">
          <p className="text-[32px] font-black text-white">
            {formatUsd(selectedTier.priceUsd)}
            <span className="ml-1 text-[13px] font-medium text-slate-500">one-time</span>
          </p>
          <p className="mt-1 text-[11.5px] text-slate-500">≈ ₹{selectedTier.priceInr.toLocaleString('en-IN')}, charged via Cashfree</p>
          <div className="mt-4">
            <CreditTierPicker selectedId={tierId} onChange={setTierId} />
          </div>
          <button
            onClick={() => startCheckout({ tierId })}
            disabled={buying !== null || !phone}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-bold text-[#060B17] transition disabled:opacity-60"
            style={{ background: '#06CCE8' }}>
            {buying === tierId && <Spinner className="h-4 w-4" />}
            {buying === tierId ? 'Redirecting…' : 'Buy Credits'}
          </button>
        </div>
        <p className="mt-3 text-[11px] text-slate-600">
          Prices shown in USD for reference. All payments are charged in INR via Cashfree.
        </p>

        <h2 className="mt-12 text-[20px] font-black text-white">Transaction History</h2>
        <div className="mt-5 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: '#0B1424' }}>
          {loadingWallet ? (
            <div className="flex items-center gap-2 p-6 text-[13px] text-slate-500">
              <Spinner className="h-4 w-4" /> Loading transactions...
            </div>
          ) : transactions.length === 0 ? (
            <p className="p-6 text-[13px] text-slate-500">No transactions yet.</p>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {transactions.map((t) => {
                const style = STATUS_STYLES[t.status] ?? STATUS_STYLES.pending;
                const Icon = style.icon;
                return (
                  <div key={t.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-4 w-4 ${style.color} ${t.status === 'pending' ? 'animate-pulse' : ''}`} />
                      <div>
                        <p className="text-[13.5px] font-semibold text-white">
                          {t.planLabel ?? (t.type === 'topup' ? 'Credit top-up' : 'Credit usage')}
                        </p>
                        <p className="text-[11.5px] text-slate-500">
                          {new Date(t.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[13.5px] font-bold text-white">
                        {t.type === 'topup' ? '+' : '−'}{t.credits.toLocaleString('en-IN')} credits
                      </p>
                      {t.amount != null && (
                        <p className="text-[11.5px] text-slate-500">{formatUsd(t.amount, true)} (₹{t.amount.toLocaleString('en-IN')})</p>
                      )}
                      {t.status === 'paid' && (
                        <Link href={`/dashboard/wallet/invoice/${t.id}`} className="text-[11px] font-semibold text-cyan-400 hover:underline">
                          View Invoice
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WalletPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#060B17' }}>
        <Spinner className="h-8 w-8 text-cyan-400" />
      </div>
    }>
      <WalletContent />
    </Suspense>
  );
}
