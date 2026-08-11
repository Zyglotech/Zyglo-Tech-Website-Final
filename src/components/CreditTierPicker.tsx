'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { creditTiers, formatUsd, type CreditTier } from '@/data/credit-plans';

interface CreditTierPickerProps {
  selectedId: string;
  onChange: (tierId: string) => void;
}

export function CreditTierPicker({ selectedId, onChange }: CreditTierPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = creditTiers.find((t) => t.id === selectedId) ?? creditTiers[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] font-semibold text-white transition hover:border-white/20">
        {selected.credits.toLocaleString('en-IN')} credits
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#0F1C32] shadow-xl">
          {creditTiers.map((tier: CreditTier) => (
            <button
              key={tier.id}
              type="button"
              role="option"
              aria-selected={tier.id === selectedId}
              onClick={() => { onChange(tier.id); setOpen(false); }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-[13.5px] transition hover:bg-white/5 ${tier.id === selectedId ? 'text-cyan-400' : 'text-slate-200'}`}>
              <span className="flex items-center gap-2">
                {tier.id === selectedId && <Check className="h-3.5 w-3.5" />}
                {tier.credits.toLocaleString('en-IN')} credits
                {tier.recommended && (
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-bold uppercase text-cyan-400">
                    Popular
                  </span>
                )}
              </span>
              <span className="text-slate-400">{formatUsd(tier.priceUsd)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
