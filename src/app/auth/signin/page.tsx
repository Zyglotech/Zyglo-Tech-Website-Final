'use client';

import { signIn } from 'next-auth/react';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BrandLogo } from '@/components/BrandLogo';
import { Spinner } from '@/components/Spinner';
import { safeFetchJson } from '@/lib/clientFetch';

type Step = 'email' | 'code' | 'phone';

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/wallet';

  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isValidEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }
  function isValidPhone(p: string) {
    return /^[6-9]\d{9}$/.test(p.replace(/\D/g, '').slice(-10));
  }

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    setError(null);

    const { ok, error: err } = await safeFetchJson('/api/auth/otp/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setLoading(false);

    if (!ok) {
      setError(err ?? 'Could not send the code. Please try again.');
      return;
    }
    setStep('code');
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let result;
    try {
      result = await signIn('credentials', { email, code, redirect: false });
    } catch {
      setLoading(false);
      setError('Network error. Check your connection and try again.');
      return;
    }

    if (result?.error) {
      setLoading(false);
      setError('Incorrect or expired code. Please try again.');
      return;
    }

    const { ok, data: profile } = await safeFetchJson<{ phone: string | null }>('/api/user');
    setLoading(false);

    if (!ok || !profile) {
      setError('Signed in, but could not load your profile. Try refreshing the page.');
      return;
    }

    if (!profile.phone) {
      setStep('phone');
      return;
    }
    router.push(callbackUrl);
  }

  async function handleSavePhone(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);
    setError(null);

    const { ok, error: err } = await safeFetchJson('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    setLoading(false);

    if (!ok) {
      setError(err ?? 'Could not save your phone number.');
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <BrandLogo className="h-12 w-12" />
          <h1 className="mt-5 text-[24px] font-black text-white">
            {step === 'phone' ? 'One last step' : 'Sign in to Zyglo'}
          </h1>
          <p className="mt-2 text-[14px] text-slate-400">
            {step === 'email' && 'Enter your email — we\'ll send you a one-time code, no password needed.'}
            {step === 'code' && `We sent a 6-digit code to ${email}.`}
            {step === 'phone' && 'Add your phone number so we can process payments (only asked once).'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-8">
          {step === 'email' && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white outline-none focus:border-cyan-400/40"
                  placeholder="you@company.com"
                />
              </div>
              {error && <p className="text-[13px] text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold text-[#060B17] transition disabled:opacity-60"
                style={{ background: '#06CCE8' }}>
                {loading && <Spinner className="h-4 w-4" />} {loading ? 'Sending code...' : 'Send Code'}
              </button>
            </form>
          )}

          {step === 'code' && (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">6-digit code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-center text-[20px] font-bold tracking-[0.3em] text-white outline-none focus:border-cyan-400/40"
                  placeholder="000000"
                />
              </div>
              {error && <p className="text-[13px] text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold text-[#060B17] transition disabled:opacity-60"
                style={{ background: '#06CCE8' }}>
                {loading && <Spinner className="h-4 w-4" />} {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
              <button
                type="button"
                onClick={() => { setStep('email'); setCode(''); setError(null); }}
                className="w-full text-center text-[12.5px] text-slate-500 transition hover:text-slate-300">
                Use a different email
              </button>
            </form>
          )}

          {step === 'phone' && (
            <form onSubmit={handleSavePhone} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Phone number</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white outline-none focus:border-cyan-400/40"
                  placeholder="10-digit mobile number"
                />
              </div>
              {error && <p className="text-[13px] text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold text-[#060B17] transition disabled:opacity-60"
                style={{ background: '#06CCE8' }}>
                {loading && <Spinner className="h-4 w-4" />} {loading ? 'Saving...' : 'Continue'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-[12px] text-slate-500">
            By continuing you agree to our{' '}
            <a href="/legal/terms-of-service" className="text-cyan-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/legal/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}
