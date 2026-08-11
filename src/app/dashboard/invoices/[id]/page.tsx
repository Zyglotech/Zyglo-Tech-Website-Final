'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface LineItem {
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

interface DealerInvoice {
  id: string;
  invoiceNumber: string;
  currency: string;
  customerName: string | null;
  customerCompany: string | null;
  customerEmail: string | null;
  customerAddressLine1: string | null;
  customerAddressLine2: string | null;
  customerCity: string | null;
  customerState: string | null;
  customerPostalCode: string | null;
  customerCountry: string | null;
  lineItems: LineItem[];
  subtotal: number;
  total: number;
  notes: string | null;
  issueDate: string;
}

interface Seller {
  sellerLogoDataUrl: string | null;
  sellerCompanyName: string | null;
  sellerAddressLine1: string | null;
  sellerAddressLine2: string | null;
  sellerCity: string | null;
  sellerState: string | null;
  sellerPostalCode: string | null;
  sellerCountry: string | null;
  sellerEmail: string | null;
}

const currencySymbol = (c: string) => (c === 'USD' ? '$' : c === 'INR' ? '₹' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : c + ' ');
const money = (c: string, n: number) => `${currencySymbol(c)}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function DealerInvoiceViewPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [invoice, setInvoice] = useState<DealerInvoice | null>(null);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { ok, data, error: err } = await safeFetchJson<{ invoice: DealerInvoice; seller: Seller }>(`/api/dealer-invoices/${id}`);
      setLoading(false);
      if (!ok || !data) {
        setError(err ?? 'Could not load this invoice.');
        return;
      }
      setInvoice(data.invoice);
      setSeller(data.seller);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#060B17' }}>
        <Spinner className="h-8 w-8 text-cyan-400" />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4" style={{ background: '#060B17' }}>
        <p className="text-[14px] text-red-400">{error ?? 'Invoice not found.'}</p>
        <Link href="/dashboard/invoices" className="text-[13px] text-cyan-400 hover:underline">← Back to Invoices</Link>
      </div>
    );
  }

  const dateLabel = new Date(invoice.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const hasSellerBranding = seller?.sellerCompanyName || seller?.sellerLogoDataUrl;

  return (
    <div className="min-h-screen bg-slate-100 py-10 text-slate-900">
      <div className="no-print mx-auto mb-4 flex max-w-3xl items-center justify-between px-5">
        <Link href="/dashboard/invoices" className="flex items-center gap-2 text-[13px] font-medium text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> Back to Invoices
        </Link>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-slate-700">
          <Printer className="h-3.5 w-3.5" /> Print / Save as PDF
        </button>
      </div>

      {!hasSellerBranding && (
        <div className="no-print mx-auto mb-4 max-w-3xl px-5">
          <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-[12.5px] text-amber-800">
            You haven&apos;t set up your business logo/address yet — this invoice is using placeholder seller details.{' '}
            <Link href="/dashboard/profile" className="font-semibold underline">Add your branding →</Link>
          </p>
        </div>
      )}

      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="h-2 bg-slate-900" />
        <div className="p-10">
          <div className="flex items-start justify-between">
            <h1 className="text-[28px] font-black text-slate-900">Invoice</h1>
            {seller?.sellerLogoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={seller.sellerLogoDataUrl} alt="" className="h-9 w-auto max-w-[140px] object-contain" />
            ) : null}
          </div>
          <p className="mt-2 text-[13px] text-slate-600">
            Invoice number <span className="font-semibold text-slate-900">{invoice.invoiceNumber}</span>
          </p>

          <div className="mt-6 grid grid-cols-2 gap-8 text-[13px]">
            <div>
              <p className="text-slate-500">Date issued</p>
              <p className="font-semibold text-slate-900">{dateLabel}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-8 text-[13px] leading-6">
            <div>
              <p className="font-bold text-slate-900">{seller?.sellerCompanyName || 'Your Business Name'}</p>
              {seller?.sellerAddressLine1 && <p className="text-slate-600">{seller.sellerAddressLine1}</p>}
              {seller?.sellerAddressLine2 && <p className="text-slate-600">{seller.sellerAddressLine2}</p>}
              {(seller?.sellerCity || seller?.sellerPostalCode) && (
                <p className="text-slate-600">{[seller?.sellerCity, seller?.sellerPostalCode].filter(Boolean).join(' ')}</p>
              )}
              {seller?.sellerState && <p className="text-slate-600">{seller.sellerState}{seller?.sellerCountry ? `, ${seller.sellerCountry}` : ''}</p>}
              {seller?.sellerEmail && <p className="text-slate-600">{seller.sellerEmail}</p>}
            </div>
            <div>
              <p className="font-bold text-slate-900">Bill to</p>
              <p className="text-slate-900">{invoice.customerCompany || invoice.customerName || 'Customer'}</p>
              {invoice.customerAddressLine1 && <p className="text-slate-600">{invoice.customerAddressLine1}</p>}
              {invoice.customerAddressLine2 && <p className="text-slate-600">{invoice.customerAddressLine2}</p>}
              {(invoice.customerCity || invoice.customerPostalCode) && (
                <p className="text-slate-600">{[invoice.customerCity, invoice.customerPostalCode].filter(Boolean).join(' ')}</p>
              )}
              {invoice.customerState && <p className="text-slate-600">{invoice.customerState}{invoice.customerCountry ? `, ${invoice.customerCountry}` : ''}</p>}
              {invoice.customerEmail && <p className="text-slate-600">{invoice.customerEmail}</p>}
            </div>
          </div>

          <p className="mt-10 text-[17px] font-black text-slate-900">
            {money(invoice.currency, invoice.total)} due on {dateLabel}
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
              {invoice.lineItems.map((li, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-3 text-slate-900">{li.description}</td>
                  <td className="py-3 text-right text-slate-900">{li.qty}</td>
                  <td className="py-3 text-right text-slate-900">{money(invoice.currency, li.unitPrice)}</td>
                  <td className="py-3 text-right text-slate-900">{money(invoice.currency, li.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-2 flex justify-end">
            <div className="w-56 space-y-1.5 text-[13px]">
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900">{money(invoice.currency, invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 py-1.5">
                <span className="text-slate-600">Total</span>
                <span className="text-slate-900">{money(invoice.currency, invoice.total)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold">
                <span className="text-slate-900">Amount due</span>
                <span className="text-slate-900">{money(invoice.currency, invoice.total)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8">
              <p className="text-[12px] font-bold uppercase tracking-widest text-slate-500">Notes</p>
              <p className="mt-1 text-[13px] text-slate-700 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>
        <div className="border-t border-slate-100 px-10 py-4 text-right text-[11px] text-slate-400">
          Page 1 of 1
        </div>
      </div>
    </div>
  );
}
