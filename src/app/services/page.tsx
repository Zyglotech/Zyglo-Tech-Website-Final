import { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Our Services — AI, ERP & Automation',
  description: 'Explore AI chatbots, ERP systems, custom web apps, workflow automation, and corporate training services designed for Indian enterprises.',
  alternates: { canonical: 'https://www.zyglotech.com/services' },
};

export default function ServicesPage() {
  return (
    <PageShell
      title="Enterprise Services for AI and Automation"
      description="Explore AI chatbots, ERP systems, custom web apps, training, and transformation services designed for modern enterprises."
      cta={{ label: 'Explore AI Chatbots', href: '/services/ai-chatbots' }}
    />
  );
}
