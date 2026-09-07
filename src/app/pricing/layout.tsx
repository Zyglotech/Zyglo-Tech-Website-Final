import type { Metadata } from 'next';
import { INR_PER_USD, USD_PER_CREDIT } from '@/data/credit-plans';

const inrPerCredit = (USD_PER_CREDIT * INR_PER_USD).toFixed(2);

export const metadata: Metadata = {
  title: 'Pricing — AI Credits',
  description: `Buy AI credits for chatbots, agents, and automation. ₹${inrPerCredit} per credit, no volume discounts, no hidden fees.`,
  alternates: { canonical: 'https://www.zyglotech.com/pricing' },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
