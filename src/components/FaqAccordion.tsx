'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

function AccordionItem({ q, a }: FaqItem) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-[14.5px] font-semibold text-white"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {q}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-[13.5px] leading-7 text-slate-400">{a}</p>
      )}
    </div>
  );
}

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div>
      {faqs.map((faq) => (
        <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
      ))}
    </div>
  );
}
