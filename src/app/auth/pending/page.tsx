'use client';

import { Suspense } from 'react';
import { signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Clock, Ban } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

function PendingContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason') === 'inactive' ? 'inactive' : 'pending';

  const copy =
    reason === 'inactive'
      ? {
          icon: Ban,
          title: 'Account deactivated',
          body: 'Your account has been deactivated. If you believe this is a mistake, please contact us.',
        }
      : {
          icon: Clock,
          title: 'Awaiting approval',
          body: 'Your account has been created and is waiting for admin approval. You\'ll be able to sign in as soon as it\'s approved.',
        };

  const Icon = copy.icon;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <div className="w-full max-w-sm text-center">
        <div className="mb-8 flex flex-col items-center">
          <BrandLogo className="h-12 w-12" />
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10">
            <Icon className="h-6 w-6 text-amber-400" />
          </div>
          <h1 className="mt-4 text-[20px] font-black text-white">{copy.title}</h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">{copy.body}</p>
          <a
            href="mailto:founder@zyglotech.com"
            className="mt-5 inline-block text-[12.5px] font-semibold text-cyan-400 hover:underline">
            Contact founder@zyglotech.com
          </a>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-[13.5px] font-semibold text-white transition hover:border-white/20">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PendingPage() {
  return (
    <Suspense fallback={null}>
      <PendingContent />
    </Suspense>
  );
}
