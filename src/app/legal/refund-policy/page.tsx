import { PageShell } from '@/components/PageShell';

export default function RefundPolicyPage() {
  return (
    <PageShell
      title="Refund Policy"
      description="Understand our refund terms for products, services, and course enrollments at Zyglo Tech." 
      cta={{ label: 'Contact Sales', href: '/contact' }}
    />
  );
}
