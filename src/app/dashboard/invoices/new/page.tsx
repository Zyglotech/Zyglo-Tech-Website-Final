'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface LineItemForm {
  description: string;
  qty: string;
  unitPrice: string;
}

const EMPTY_ITEM: LineItemForm = { description: '', qty: '1', unitPrice: '' };

export default function NewDealerInvoicePage() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddressLine1, setCustomerAddressLine1] = useState('');
  const [customerAddressLine2, setCustomerAddressLine2] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [customerPostalCode, setCustomerPostalCode] = useState('');
  const [customerCountry, setCustomerCountry] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<LineItemForm[]>([{ ...EMPTY_ITEM }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateItem(index: number, key: keyof LineItemForm, value: string) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [key]: value } : it)));
  }

  function addItem() {
    setItems((prev) => [...prev, { ...EMPTY_ITEM }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const total = items.reduce((sum, it) => {
    const qty = Number(it.qty) || 0;
    const price = Number(it.unitPrice) || 0;
    return sum + qty * price;
  }, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerName.trim()) {
      setError('Customer name is required.');
      return;
    }
    const validItems = items
      .map((it) => ({ description: it.description.trim(), qty: Number(it.qty), unitPrice: Number(it.unitPrice) }))
      .filter((it) => it.description && it.qty > 0 && it.unitPrice >= 0);
    if (validItems.length === 0) {
      setError('Add at least one line item with a description, quantity, and price.');
      return;
    }

    setSaving(true);
    setError(null);

    const { ok, data, error: err } = await safeFetchJson<{ invoice: { id: string } }>('/api/dealer-invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName, customerCompany, customerEmail,
        customerAddressLine1, customerAddressLine2, customerCity, customerState, customerPostalCode, customerCountry,
        currency, notes, lineItems: validItems,
      }),
    });

    setSaving(false);
    if (!ok || !data) {
      setError(err ?? 'Could not create the invoice.');
      return;
    }
    router.push(`/dashboard/invoices/${data.invoice.id}`);
  }

  const input = (value: string, onChange: (v: string) => void, placeholder: string, type = 'text') => (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-2.5 text-[14px] text-white outline-none focus:border-cyan-400/40"
    />
  );

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-2xl px-5 py-16 lg:px-8">
        <Link href="/dashboard/invoices" className="flex items-center gap-2 text-[13px] font-medium text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to Invoices
        </Link>
        <h1 className="mt-4 text-[28px] font-black text-white sm:text-[32px]">Create Invoice</h1>
        <p className="mt-2 text-[14px] text-slate-400">Uses your saved logo and business address as the seller.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6 space-y-4">
            <p className="text-[12px] font-bold uppercase tracking-widest text-slate-500">Bill To</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Customer name *</label>
                {input(customerName, setCustomerName, 'Full name')}
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Company</label>
                {input(customerCompany, setCustomerCompany, 'Optional')}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Email</label>
              {input(customerEmail, setCustomerEmail, 'customer@example.com', 'email')}
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Address line 1</label>
              {input(customerAddressLine1, setCustomerAddressLine1, 'Street address')}
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Address line 2</label>
              {input(customerAddressLine2, setCustomerAddressLine2, 'Optional')}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">City</label>
                {input(customerCity, setCustomerCity, '')}
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">State</label>
                {input(customerState, setCustomerState, '')}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Postal code</label>
                {input(customerPostalCode, setCustomerPostalCode, '')}
              </div>
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Country</label>
                {input(customerCountry, setCustomerCountry, '')}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-bold uppercase tracking-widest text-slate-500">Line items</p>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#0F1C32] px-2.5 py-1 text-[12.5px] text-white outline-none">
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            {items.map((it, i) => (
              <div key={i} className="flex items-end gap-2">
                <div className="flex-1">
                  {i === 0 && <label className="mb-1.5 block text-[11px] font-semibold text-slate-400">Description</label>}
                  {input(it.description, (v) => updateItem(i, 'description', v), 'e.g. Website design')}
                </div>
                <div className="w-16">
                  {i === 0 && <label className="mb-1.5 block text-[11px] font-semibold text-slate-400">Qty</label>}
                  {input(it.qty, (v) => updateItem(i, 'qty', v.replace(/[^\d.]/g, '')), '1')}
                </div>
                <div className="w-28">
                  {i === 0 && <label className="mb-1.5 block text-[11px] font-semibold text-slate-400">Unit price</label>}
                  {input(it.unitPrice, (v) => updateItem(i, 'unitPrice', v.replace(/[^\d.]/g, '')), '0.00')}
                </div>
                {items.length > 1 && (
                  <button type="button" onClick={() => removeItem(i)} className="mb-1 rounded-lg p-2.5 text-slate-500 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1.5 text-[12.5px] font-semibold text-cyan-400 hover:underline">
              <Plus className="h-3.5 w-3.5" /> Add line item
            </button>

            <div className="flex justify-end border-t border-white/[0.06] pt-3">
              <p className="text-[15px] font-bold text-white">
                Total: {currency === 'USD' ? '$' : currency + ' '}{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-2.5 text-[14px] text-white outline-none focus:border-cyan-400/40"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-[#060B17] transition disabled:opacity-60"
            style={{ background: '#06CCE8' }}>
            {saving && <Spinner className="h-4 w-4" />} {saving ? 'Creating...' : 'Create Invoice'}
          </button>
        </form>
      </div>
    </div>
  );
}
