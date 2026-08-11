'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CreditTierPicker } from '@/components/CreditTierPicker';
import { getTierById, DEFAULT_TIER_ID, formatUsd } from '@/data/credit-plans';

export default function PricingPage() {
  const [tierId, setTierId] = useState(DEFAULT_TIER_ID);
  const tier = getTierById(tierId)!;

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} />

      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-[34px] font-black tracking-tight text-white sm:text-[44px]">
          Simple, transparent AI credit pricing.
        </h1>
        <p className="mt-4 text-[16px] leading-8 text-slate-400">
          $0.25 per credit, every time — no volume discounts, no hidden fees. Credits power your AI chatbots, sales agents, and automation workflows.
        </p>
      </div>

      <div className="mt-14 rounded-2xl border border-cyan-400/30 bg-[#0B1424] p-8">
        <p className="text-[17px] font-black text-white">AI Credits</p>
        <p className="mt-1 text-[13px] text-slate-500">Buy credits once, use them at your own pace.</p>

        <p className="mt-6 text-[44px] font-black text-white">
          {formatUsd(tier.priceUsd)}
          <span className="ml-1 text-[14px] font-medium text-slate-500">one-time</span>
        </p>
        <p className="mt-1 text-[12px] text-slate-500">≈ ₹{tier.priceInr.toLocaleString('en-IN')}, charged via Cashfree</p>

        <div className="mt-6 max-w-xs">
          <CreditTierPicker selectedId={tierId} onChange={setTierId} />
        </div>

        <ul className="mt-6 space-y-2.5">
          <li className="flex items-start gap-2 text-[13px] text-slate-300">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
            {tier.credits.toLocaleString('en-IN')} AI credits, never expire
          </li>
          <li className="flex items-start gap-2 text-[13px] text-slate-300">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
            Chatbot, sales agent & automation usage
          </li>
          <li className="flex items-start gap-2 text-[13px] text-slate-300">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
            Card, UPI & netbanking payments
          </li>
        </ul>

        <Link
          href="/dashboard/wallet"
          className="mt-8 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-bold text-[#060B17] transition"
          style={{ background: '#06CCE8' }}>
          Get Started <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mt-8 text-center text-[13px] text-slate-500">
        Need a custom volume plan? <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Talk to us on WhatsApp</a>.
      </p>
    </div>
  );
}
