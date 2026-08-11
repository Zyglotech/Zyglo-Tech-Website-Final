'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { Spinner } from '@/components/Spinner';

export default function AdminSignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let result;
    try {
      result = await signIn('admin-password', { email, password, redirect: false });
    } catch {
      setLoading(false);
      setError('Network error. Check your connection and try again.');
      return;
    }

    setLoading(false);
    if (result?.error) {
      setError('Incorrect email or password.');
      return;
    }
    router.push('/dashboard/admin');
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <BrandLogo className="h-12 w-12" />
          <div className="mt-5 flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-cyan-400" />
            <h1 className="text-[24px] font-black text-white">Admin Sign In</h1>
          </div>
          <p className="mt-2 text-[14px] text-slate-400">Restricted access. Email and password required.</p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white outline-none focus:border-cyan-400/40"
                placeholder="admin@zyglotech.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white outline-none focus:border-cyan-400/40"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-[13px] text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold text-[#060B17] transition disabled:opacity-60"
              style={{ background: '#06CCE8' }}>
              {loading && <Spinner className="h-4 w-4" />} {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
