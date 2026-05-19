import { PageShell } from '@/components/PageShell';

export default function ServicesPage() {
  return (
    <PageShell
      title="Enterprise Services for AI and Automation"
      description="Explore AI chatbots, ERP systems, custom web apps, training, and transformation services designed for modern enterprises."
      cta={{ label: 'Explore AI Chatbots', href: '/services/ai-chatbots' }}
    />
  );
}
