import Link from 'next/link';
import { ArrowRight, Home, MessageCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(6,204,232,0.08) 0%, transparent 70%)' }} />

      <div className="relative">
        {/* 404 large */}
        <div className="relative mb-6">
          <span className="block text-[120px] font-black leading-none tracking-[-0.05em]"
            style={{ background: 'linear-gradient(135deg, rgba(6,204,232,0.15), rgba(37,99,235,0.1))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            404
          </span>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 120 60" className="w-40" fill="none">
              <circle cx="60" cy="30" r="28" stroke="rgba(6,204,232,0.2)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="60" cy="30" r="18" stroke="rgba(37,99,235,0.15)" strokeWidth="1" />
              <text x="60" y="38" textAnchor="middle" fontSize="20" fontWeight="900" fill="url(#nfGrad)" fontFamily="system-ui">Z</text>
              <defs>
                <linearGradient id="nfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06CCE8" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h1 className="text-[28px] font-black text-white sm:text-[36px]">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-slate-400">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/"
            className="flex items-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-bold text-[#060B17] transition"
            style={{ background: '#06CCE8' }}>
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link href="/services"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-[14px] font-medium text-white transition hover:border-cyan-400/30">
            View Services
            <ArrowRight className="h-4 w-4" />
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
