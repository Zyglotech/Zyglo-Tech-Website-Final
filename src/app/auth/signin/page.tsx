'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { BrandLogo } from '@/components/BrandLogo';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  function handleGoogleSignIn() {
    setLoading(true);
    signIn('google', { callbackUrl: '/dashboard' });
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <BrandLogo className="h-12 w-12" />
          <h1 className="mt-5 text-[24px] font-black text-white">Sign in to Zyglo</h1>
          <p className="mt-2 text-[14px] text-slate-400">Access your dashboard, projects, and reports.</p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-8">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-[14px] font-semibold text-white transition hover:border-white/20 hover:bg-white/8 disabled:opacity-60">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {loading ? 'Redirecting...' : 'Continue with Google'}
          </button>

          <p className="mt-6 text-center text-[12px] text-slate-500">
            By signing in you agree to our{' '}
            <a href="/legal/terms-of-service" className="text-cyan-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="/legal/privacy-policy" className="text-cyan-400 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        <p className="mt-6 text-center text-[12.5px] text-slate-500">
          Not a client?{' '}
          <a href="/demo" className="text-cyan-400 transition hover:underline">Book a free consultation →</a>
        </p>
      </div>
    </div>
  );
}
