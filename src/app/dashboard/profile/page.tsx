'use client';

import { useEffect, useState, useCallback } from 'react';
import { User } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

interface Profile {
  name: string | null;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

const EMPTY: Profile = {
  name: '', email: '', phone: '', companyName: '',
  addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: 'India',
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Profile>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const fetchProfile = useCallback(async () => {
    const { ok, data, error: err } = await safeFetchJson<Profile>('/api/user');
    setLoading(false);
    if (!ok || !data) {
      setError(err ?? 'Could not load your profile.');
      return;
    }
    setProfile(data);
    setForm({ ...EMPTY, ...data, country: data.country || 'India' });
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  function update<K extends keyof Profile>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  function isValidPhone(p: string) {
    return !p || /^[6-9]\d{9}$/.test(p.replace(/\D/g, '').slice(-10));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (form.phone && !isValidPhone(form.phone)) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setSaving(true);
    setError(null);
    setSaved(false);

    const { ok, data, error: err } = await safeFetchJson<Profile>('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        companyName: form.companyName,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country,
      }),
    });

    setSaving(false);
    if (!ok || !data) {
      setError(err ?? 'Could not save your profile.');
      return;
    }
    setProfile(data);
    setSaved(true);
  }

  const field = (label: string, key: keyof Profile, opts: { placeholder?: string; type?: string } = {}) => (
    <div>
      <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">{label}</label>
      <input
        type={opts.type ?? 'text'}
        value={form[key] ?? ''}
        onChange={(e) => update(key, e.target.value)}
        placeholder={opts.placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-2.5 text-[14px] text-white outline-none focus:border-cyan-400/40"
      />
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-2xl px-5 py-16 lg:px-8">
        <div className="flex items-center gap-3">
          <User className="h-6 w-6 text-cyan-400" />
          <h1 className="text-[28px] font-black text-white sm:text-[32px]">Profile</h1>
        </div>
        <p className="mt-2 text-[14px] text-slate-400">
          Your billing address appears on invoices for credit purchases.
        </p>

        {loading ? (
          <div className="mt-8 flex items-center gap-2 text-slate-500">
            <Spinner className="h-5 w-5" /> <span className="text-[13px]">Loading...</span>
          </div>
        ) : (
          <form onSubmit={handleSave} className="mt-8 space-y-8">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6 space-y-4">
              <p className="text-[12px] font-bold uppercase tracking-widest text-slate-500">Account</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {field('Full name', 'name', { placeholder: 'Your name' })}
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Email</label>
                  <input
                    type="email"
                    value={profile?.email ?? ''}
                    disabled
                    className="w-full rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-[14px] text-slate-500"
                  />
                </div>
                {field('Phone', 'phone', { placeholder: '10-digit mobile number', type: 'tel' })}
                {field('Company name', 'companyName', { placeholder: 'Optional' })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6 space-y-4">
              <p className="text-[12px] font-bold uppercase tracking-widest text-slate-500">Billing Address</p>
              <p className="text-[12px] text-slate-500 -mt-2">Used as the &quot;Bill to&quot; address on your invoices.</p>
              {field('Address line 1', 'addressLine1', { placeholder: 'Street address' })}
              {field('Address line 2', 'addressLine2', { placeholder: 'Apartment, suite, area (optional)' })}
              <div className="grid gap-4 sm:grid-cols-2">
                {field('City', 'city')}
                {field('State', 'state')}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {field('Postal code', 'postalCode')}
                {field('Country', 'country')}
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">
                {error}
              </p>
            )}
            {saved && (
              <p className="rounded-xl border border-green-400/20 bg-green-400/5 px-4 py-3 text-[13px] text-green-400">
                Profile saved.
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-[#060B17] transition disabled:opacity-60"
              style={{ background: '#06CCE8' }}>
              {saving && <Spinner className="h-4 w-4" />} {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
