import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — AI Credits',
  description: 'Buy AI credits for chatbots, agents, and automation. $0.25 per credit, no volume discounts, no hidden fees.',
  alternates: { canonical: 'https://www.zyglotech.com/pricing' },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
