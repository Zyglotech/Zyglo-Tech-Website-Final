'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, MessageCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(6,204,232,0.06) 0%, transparent 70%)' }} />

      <div className="relative">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 mx-auto">
          <RefreshCw className="h-9 w-9 text-red-400" />
        </div>

        <h1 className="text-[28px] font-black text-white sm:text-[36px]">
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-slate-400">
          An unexpected error occurred. Our team has been notified. Try refreshing the page or head back home.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-bold text-[#060B17] transition hover:shadow-[0_0_24px_rgba(6,204,232,0.3)]"
            style={{ background: '#06CCE8' }}>
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
          <Link href="/"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-[14px] font-medium text-white transition hover:border-cyan-400/30">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[13px] text-slate-500 transition hover:text-cyan-400">
          <MessageCircle className="h-4 w-4" />
          Need help? Chat with us on WhatsApp
        </a>
      </div>
    </div>
  );
}
