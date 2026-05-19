'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-24 right-6 z-[60] flex max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-all duration-300 ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    } ${type === 'success'
      ? 'border-cyan-400/20 bg-[#0B1424]'
      : 'border-red-400/20 bg-[#0B1424]'
    }`}>
      {type === 'success'
        ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
        : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
      }
      <p className="flex-1 text-[13.5px] leading-6 text-slate-200">{message}</p>
      <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="ml-2 text-slate-500 hover:text-white transition">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
