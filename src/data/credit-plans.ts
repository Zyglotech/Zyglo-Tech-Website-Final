/**
 * Flat-rate credit pricing — $0.25 per credit at every tier, no volume discounts.
 * Prices are set in USD; actual Cashfree charges are in INR at INR_PER_USD plus a
 * CONVERSION_FEE_RATE currency-conversion fee (shown as a separate line on invoices).
 */
export const INR_PER_USD = 95.34;
export const USD_PER_CREDIT = 0.25;
export const CONVERSION_FEE_RATE = 0.05; // 5%

export interface FeeBreakdown {
  baseInr: number;
  feeInr: number;
  totalInr: number;
}

/** USD amount -> INR base/fee/total charged via Cashfree. */
export function usdToInr(usd: number): FeeBreakdown {
  const baseInr = usd * INR_PER_USD;
  const feeInr = baseInr * CONVERSION_FEE_RATE;
  return {
    baseInr: round2(baseInr),
    feeInr: round2(feeInr),
    totalInr: round2(baseInr + feeInr),
  };
}

/** Given a total INR amount already charged (incl. fee), back out the USD subtotal and fee. */
export function splitChargedInr(totalInr: number): FeeBreakdown {
  const baseInr = totalInr / (1 + CONVERSION_FEE_RATE);
  return {
    baseInr: round2(baseInr),
    feeInr: round2(totalInr - baseInr),
    totalInr: round2(totalInr),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface CreditTier {
  id: string;
  credits: number;
  priceUsd: number;
  priceInr: number; // total INR charged, incl. conversion fee
  recommended?: boolean;
}

function buildTier(credits: number, recommended = false): CreditTier {
  const priceUsd = Math.round(credits * USD_PER_CREDIT);
  return {
    id: `credits-${credits}`,
    credits,
    priceUsd,
    priceInr: usdToInr(priceUsd).totalInr,
    recommended,
  };
}

export const creditTiers: CreditTier[] = [
  buildTier(20),
  buildTier(100, true),
  buildTier(200),
  buildTier(400),
  buildTier(800),
  buildTier(1200),
  buildTier(2000),
  buildTier(3000),
  buildTier(4000),
];

export const DEFAULT_TIER_ID = 'credits-100';

export function getTierById(id: string): CreditTier | undefined {
  return creditTiers.find((t) => t.id === id);
}

/**
 * Custom wallet recharge (any amount, not tied to a fixed tier).
 * The ₹ amount the user enters is the total they pay (fee included);
 * credits are computed by backing the fee out first.
 */
export const customRecharge = {
  minAmountInr: usdToInr(5).totalInr,
  maxAmountInr: usdToInr(1000).totalInr,
};

export function creditsForAmount(totalAmountInr: number): number {
  const { baseInr } = splitChargedInr(totalAmountInr);
  const usd = baseInr / INR_PER_USD;
  return Math.floor(usd / USD_PER_CREDIT);
}

export function formatUsd(usdOrInr: number, fromInr = false): string {
  const usd = fromInr ? usdOrInr / INR_PER_USD : usdOrInr;
  return `$${usd.toFixed(usd < 10 ? 2 : 0)}`;
}
