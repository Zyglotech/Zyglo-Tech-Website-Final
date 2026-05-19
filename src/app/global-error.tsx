'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function GlobalError({
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
    <html lang="en">
      <body style={{ background: '#060B17', color: '#fff', fontFamily: 'system-ui, sans-serif', margin: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '0 20px' }}>
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '72px', width: '72px', borderRadius: '16px', border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.1)' }}>
            <RefreshCw style={{ width: '32px', height: '32px', color: '#f87171' }} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '16px' }}>
            Critical Error
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '400px', lineHeight: '1.7', marginBottom: '32px' }}>
            A critical application error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#06CCE8', color: '#060B17', fontWeight: 700, fontSize: '14px', padding: '14px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
            <RefreshCw style={{ width: '16px', height: '16px' }} />
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
