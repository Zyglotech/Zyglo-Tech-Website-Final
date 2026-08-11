declare module '@cashfreepayments/cashfree-js' {
  interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: '_self' | '_blank' | '_top' | '_modal' | HTMLElement;
  }

  interface CheckoutResult {
    error?: unknown;
    paymentDetails?: unknown;
  }

  interface Cashfree {
    checkout(options: CheckoutOptions): Promise<CheckoutResult>;
  }

  export function load(options: { mode: 'sandbox' | 'production' }): Promise<Cashfree>;
}
