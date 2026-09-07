'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Lock } from 'lucide-react';
import { Spinner } from '@/components/Spinner';

interface CardCheckoutModalProps {
  paymentSessionId: string;
  loadCashfree: () => Promise<any>;
  onClose: () => void;
  onOtherMethods: () => void;
  onPaymentAttempted: () => void;
  onError: (message: string) => void;
}

const elementStyle = {
  base: {
    fontSize: '15px',
    color: '#e2e8f0',
    fontFamily: 'inherit',
    '::placeholder': { color: '#64748b' },
  },
};

export function CardCheckoutModal({
  paymentSessionId,
  loadCashfree,
  onClose,
  onOtherMethods,
  onPaymentAttempted,
  onError,
}: CardCheckoutModalProps) {
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const cashfreeRef = useRef<any>(null);
  const componentsRef = useRef<{ cardHolder: any; cardNumber: any; cardExpiry: any; cardCvv: any } | null>(null);
  const completeState = useRef(new Map<string, boolean>());

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cashfree = await loadCashfree();
      if (cancelled) return;
      cashfreeRef.current = cashfree;

      const cardHolder = cashfree.create('cardHolder', { values: { placeholder: 'Name on card' }, style: elementStyle });
      const cardNumber = cashfree.create('cardNumber', { style: elementStyle });
      const cardExpiry = cashfree.create('cardExpiry', { style: elementStyle });
      const cardCvv = cashfree.create('cardCvv', { style: elementStyle });
      componentsRef.current = { cardHolder, cardNumber, cardExpiry, cardCvv };

      cardHolder.mount('#zyglo-card-holder');
      cardNumber.mount('#zyglo-card-number');
      cardExpiry.mount('#zyglo-card-expiry');
      cardCvv.mount('#zyglo-card-cvv');

      const keys = ['cardHolder', 'cardNumber', 'cardExpiry', 'cardCvv'] as const;
      keys.forEach((k) => {
        componentsRef.current![k].on('change', (d: { complete: boolean }) => {
          completeState.current.set(k, d.complete);
          setComplete(keys.every((key) => completeState.current.get(key)));
        });
      });

      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
      const c = componentsRef.current;
      if (c) {
        Object.values(c).forEach((component: any) => {
          try { component.destroy?.(); } catch { /* no-op */ }
        });
      }
    };
  }, [loadCashfree]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!complete || submitting || !cashfreeRef.current || !componentsRef.current) return;
    setSubmitting(true);

    try {
      const result = await cashfreeRef.current.pay({
        paymentMethod: componentsRef.current.cardNumber,
        paymentSessionId,
      });

      if (result?.error) {
        onError('Payment was not completed. No credits were added — you were not charged.');
        setSubmitting(false);
        return;
      }
      if (result?.redirect) {
        // Browser is navigating for a 3DS challenge — return_url handler takes over.
        return;
      }
      if (result?.paymentDetails) {
        onPaymentAttempted();
      }
    } catch {
      onError('Could not process the card payment. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-white">Pay with Card</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-slate-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div id="zyglo-card-holder" className="rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 min-h-[46px]" />
          <div id="zyglo-card-number" className="rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 min-h-[46px]" />
          <div className="grid grid-cols-2 gap-3">
            <div id="zyglo-card-expiry" className="rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 min-h-[46px]" />
            <div id="zyglo-card-cvv" className="rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 min-h-[46px]" />
          </div>

          {!ready && (
            <p className="flex items-center gap-2 text-[12.5px] text-slate-500">
              <Spinner className="h-3.5 w-3.5" /> Loading secure card form…
            </p>
          )}

          <button
            type="submit"
            disabled={!complete || submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-bold text-[#060B17] transition disabled:opacity-40"
            style={{ background: '#06CCE8' }}>
            {submitting && <Spinner className="h-4 w-4" />}
            {submitting ? 'Processing…' : 'Pay Now'}
          </button>
        </form>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <Lock className="h-3 w-3" /> Card details are encrypted and never touch our servers
        </p>

        <button onClick={onOtherMethods} className="mt-4 w-full text-center text-[12.5px] font-semibold text-cyan-400 hover:underline">
          Pay with UPI / Netbanking instead
        </button>
      </div>
    </div>
  );
}
