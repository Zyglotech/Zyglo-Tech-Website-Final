import { PageShell } from '@/components/PageShell';

export default function PricingPage() {
  return (
    <PageShell
      title="Pricing Plans"
      description="Flexible starter, growth, and pro tiers for AI chatbots, ERP projects, and academy access." 
      cta={{ label: 'View Demo Plans', href: '/demo' }}
    />
  );
}
