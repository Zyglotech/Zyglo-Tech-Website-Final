'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface DealerInvoice {
  id: string;
  invoiceNumber: string;
  currency: string;
  customerName: string | null;
  customerCompany: string | null;
  total: number;
  createdAt: string;
}

export default function DealerInvoicesPage() {
  const [invoices, setInvoices] = useState<DealerInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    const { ok, data, error: err } = await safeFetchJson<{ invoices: DealerInvoice[] }>('/api/dealer-invoices');
    setLoading(false);
    if (!ok || !data) {
      setError(err ?? 'Could not load your invoices.');
      return;
    }
    setInvoices(data.invoices);
  }, []);

  useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-cyan-400" />
            <h1 className="text-[28px] font-black text-white sm:text-[32px]">Your Invoices</h1>
          </div>
          <Link
            href="/dashboard/invoices/new"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-bold text-[#060B17] transition"
            style={{ background: '#06CCE8' }}>
            <Plus className="h-4 w-4" /> Create Invoice
          </Link>
        </div>
        <p className="mt-2 text-[14px] text-slate-400">
          Bill your own customers using your saved logo and business address (set up in{' '}
          <Link href="/dashboard/profile" className="text-cyan-400 hover:underline">Profile</Link>).
        </p>

        <div className="mt-8 rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: '#0B1424' }}>
          {loading ? (
            <div className="flex items-center gap-2 p-6 text-[13px] text-slate-500">
              <Spinner className="h-4 w-4" /> Loading...
            </div>
          ) : error ? (
            <p className="p-6 text-[13px] text-red-400">{error}</p>
          ) : invoices.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[13.5px] text-slate-500">No invoices yet.</p>
              <Link href="/dashboard/invoices/new" className="mt-2 inline-block text-[13px] font-semibold text-cyan-400 hover:underline">
                Create your first invoice →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {invoices.map((inv) => (
                <Link
                  key={inv.id}
                  href={`/dashboard/invoices/${inv.id}`}
                  className="flex items-center justify-between px-5 py-4 transition hover:bg-white/[0.02]">
                  <div>
                    <p className="text-[13.5px] font-semibold text-white">
                      {inv.customerCompany || inv.customerName || 'Untitled customer'}
                    </p>
                    <p className="text-[11.5px] text-slate-500">
                      {inv.invoiceNumber} · {new Date(inv.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <p className="text-[13.5px] font-bold text-white">
                    {inv.currency === 'USD' ? '$' : inv.currency + ' '}{inv.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
