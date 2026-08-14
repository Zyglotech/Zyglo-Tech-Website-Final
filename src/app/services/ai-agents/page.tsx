import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Sales & Lead Qualification Agents',
  description: 'AI-powered sales agents that engage, qualify and convert leads 24/7. WhatsApp, web, and CRM integration. Automated lead scoring and follow-ups for Indian businesses.',
  keywords: ['Zyglo AI sales agent', 'AI lead qualification India', 'AI sales agent', 'automated lead generation India', 'WhatsApp lead qualification', 'CRM AI integration'],
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

const faqs = [
  { q: 'How does Zyglo\'s AI sales agent qualify leads?', a: 'It scores each lead based on their responses, intent signals, and engagement, then routes only qualified prospects to your sales team.' },
  { q: 'Does it integrate with my existing CRM?', a: 'Yes — Zoho, HubSpot, and custom CRM integrations are supported so qualified leads flow directly into your pipeline.' },
  { q: 'Can it follow up automatically?', a: 'Yes, the agent sends personalised follow-up sequences over WhatsApp and email until the lead responds or converts.' },
  { q: 'What languages does the AI agent support?', a: 'English, Hindi, and Tamil out of the box, with additional languages available on request.' },
];

export default function AISalesAgentsPage() {
  return (
    <PageShell
      division="AI"
      title="AI Sales & Lead Qualification Agents"
      description="An AI sales agent is an autonomous software system that uses artificial intelligence to engage, qualify, and convert leads into valuable customers — 24/7 without manual intervention. Our AI agents respond to enquiries, score leads, personalise follow-ups, and push qualified prospects directly into your CRM."
      faqs={faqs}
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

