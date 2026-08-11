'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';
import { splitChargedInr, INR_PER_USD } from '@/data/credit-plans';

interface InvoiceTransaction {
  id: string;
  credits: number;
  amount: number | null;
  planLabel: string | null;
  invoiceNumber: string | null;
  cfPaymentId: string | null;
  paymentMethodLabel: string | null;
  paidAt: string | null;
  createdAt: string;
}

interface BillTo {
  name: string | null;
  email: string | null;
  companyName: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

const inr = (n: number) => `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function InvoicePage({ params }: { params: Promise<{ transactionId: string }> }) {
  const { transactionId } = use(params);
  const [transaction, setTransaction] = useState<InvoiceTransaction | null>(null);
  const [billTo, setBillTo] = useState<BillTo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { ok, data, error: err } = await safeFetchJson<{ transaction: InvoiceTransaction; billTo: BillTo }>(
        `/api/invoices/${transactionId}`
      );
      setLoading(false);
      if (!ok || !data) {
        setError(err ?? 'Could not load this invoice.');
        return;
      }
      setTransaction(data.transaction);
      setBillTo(data.billTo);
    })();
  }, [transactionId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#060B17' }}>
        <Spinner className="h-8 w-8 text-cyan-400" />
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4" style={{ background: '#060B17' }}>
        <p className="text-[14px] text-red-400">{error ?? 'Invoice not found.'}</p>
        <Link href="/dashboard/wallet" className="text-[13px] text-cyan-400 hover:underline">← Back to Wallet</Link>
      </div>
    );
  }

  const total = transaction.amount ?? 0;
  const { baseInr, feeInr } = splitChargedInr(total);
  const paidDate = new Date(transaction.paidAt ?? transaction.createdAt);
  const dateLabel = paidDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-100 py-10 text-slate-900">
      <div className="no-print mx-auto mb-4 flex max-w-3xl items-center justify-between px-5">
        <Link href="/dashboard/wallet" className="flex items-center gap-2 text-[13px] font-medium text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> Back to Wallet
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-slate-700">
          <Printer className="h-3.5 w-3.5" /> Print / Save as PDF
        </button>
      </div>

      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="h-2 bg-slate-900" />
        <div className="p-10">
          <div className="flex items-start justify-between">
            <h1 className="text-[28px] font-black text-slate-900">Receipt</h1>
            <BrandLogo className="h-9 w-auto" />
          </div>
          <p className="mt-2 text-[13px] text-slate-600">
            Invoice number <span className="font-semibold text-slate-900">{transaction.invoiceNumber ?? transaction.id}</span>
          </p>

          <div className="mt-6 grid grid-cols-2 gap-8 text-[13px]">
            <div>
              <p className="text-slate-500">Date paid</p>
              <p className="font-semibold text-slate-900">{dateLabel}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-8 text-[13px] leading-6">
            <div>
              <p className="font-bold text-slate-900">Zyglo Tech Enterprise Pvt. Ltd.</p>
              <p className="text-slate-600">18/10, Rail Nagar, Suramangalam</p>
              <p className="text-slate-600">Salem, Tamil Nadu 636005</p>
              <p className="text-slate-600">India</p>
              <p className="text-slate-600">zyglotech@gmail.com</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Bill to</p>
              <p className="text-slate-900">{billTo?.companyName || billTo?.name || 'Customer'}</p>
              {billTo?.addressLine1 && <p className="text-slate-600">{billTo.addressLine1}</p>}
              {billTo?.addressLine2 && <p className="text-slate-600">{billTo.addressLine2}</p>}
              {(billTo?.city || billTo?.postalCode) && (
                <p className="text-slate-600">{[billTo?.city, billTo?.postalCode].filter(Boolean).join(' ')}</p>
              )}
              {billTo?.state && <p className="text-slate-600">{billTo.state}{billTo?.country ? `, ${billTo.country}` : ''}</p>}
              {billTo?.email && <p className="text-slate-600">{billTo.email}</p>}
            </div>
          </div>

          <p className="mt-10 text-[17px] font-black text-slate-900">
            {inr(total)} paid on {dateLabel}
          </p>
          <p className="text-[12px] text-slate-500">
            ≈ ${(baseInr / INR_PER_USD).toFixed(2)} USD at 1 USD = ₹{INR_PER_USD}
          </p>

          <table className="mt-6 w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-300 text-left text-slate-500">
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium text-right">Qty</th>
                <th className="pb-2 font-medium text-right">Unit price</th>
                <th className="pb-2 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 text-slate-900">{transaction.planLabel ?? `${transaction.credits} Credits`}</td>
                <td className="py-3 text-right text-slate-900">1</td>
                <td className="py-3 text-right text-slate-900">{inr(baseInr)}</td>
                <td className="py-3 text-right text-slate-900">{inr(baseInr)}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-2 flex justify-end">
            <div className="w-56 space-y-1.5 text-[13px]">
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900">{inr(baseInr)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-600">Currency conversion fee (5%)</span>
                <span className="text-slate-900">{inr(feeInr)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-600">Total</span>
                <span className="text-slate-900">{inr(total)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-slate-900">Amount paid</span>
                <span className="text-slate-900">{inr(total)}</span>
              </div>
            </div>
          </div>

          <h2 className="mt-10 text-[15px] font-black text-slate-900">Payment history</h2>
          <table className="mt-4 w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-300 text-left text-slate-500">
                <th className="pb-2 font-medium">Payment method</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Amount paid</th>
                <th className="pb-2 font-medium">Receipt number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 text-slate-900">{transaction.paymentMethodLabel ?? 'Cashfree'}</td>
                <td className="py-3 text-slate-900">{dateLabel}</td>
                <td className="py-3 text-slate-900">{inr(total)}</td>
                <td className="py-3 text-slate-900">{transaction.cfPaymentId ?? transaction.id.slice(-10).toUpperCase()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-10 py-4 text-right text-[11px] text-slate-400">
          Page 1 of 1
        </div>
      </div>
    </div>
  );
}
