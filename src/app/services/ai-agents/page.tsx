import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Sales & Lead Qualification Agents',
  description: 'AI-powered sales agents that engage, qualify and convert leads 24/7. WhatsApp, web, and CRM integration. Automated lead scoring and follow-ups for Indian businesses.',
  keywords: ['AI lead qualification India', 'AI sales agent', 'automated lead generation India', 'WhatsApp lead qualification', 'CRM AI integration', 'AI sales automation Salem'],
  openGraph: {
    title: 'AI Sales & Lead Qualification Agents | Zyglo Tech Enterprise',
    description: 'Deploy AI agents that qualify leads, follow up automatically, and push prospects to your CRM — 24/7, zero manual effort.',
    url: 'https://www.zyglotech.com/services/ai-agents',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Sales & Lead Qualification Agents | Zyglo Tech',
    description: 'Deploy AI agents that qualify leads and convert them — 24/7, zero manual effort.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/ai-agents' },
};

export default function AISalesAgentsPage() {
  return (
    <PageShell
      division="AI"
      title="AI Sales & Lead Qualification Agents"
      description="An AI sales agent is an autonomous software system that uses artificial intelligence to engage, qualify, and convert leads into valuable customers — 24/7 without manual intervention. Our AI agents respond to enquiries, score leads, personalise follow-ups, and push qualified prospects directly into your CRM."
      features={[
        'Automated lead capture from web, WhatsApp & social',
        'AI-powered lead scoring and qualification',
        'Personalised follow-up sequences via WhatsApp & email',
        'CRM integration (Zoho, HubSpot, custom)',
        'Appointment booking directly from chat',
        'Multi-language support (English, Hindi, Tamil)',
        'Real-time lead alerts to your sales team',
        'Conversion analytics and A/B testing',
      ]}
      cta={{ label: 'Deploy AI Sales Agent', href: '/demo' }}
      servicePath="/services/ai-agents"
      serviceCategory="AI Sales Agent Development"
    />
  );
}

