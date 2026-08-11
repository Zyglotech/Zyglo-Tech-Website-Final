import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Chatbot & Appointment Agents',
  description: 'WhatsApp AI chatbots for customer support, lead capture, and appointment booking. Available 24/7. Built for Indian businesses by Zyglo Tech Enterprise, Salem.',
  keywords: ['AI chatbot India', 'WhatsApp chatbot', 'appointment bot', 'customer support bot', 'AI chatbot Salem', 'WhatsApp automation India'],
  openGraph: {
    title: 'AI Chatbot & Appointment Agents | Zyglo Tech Enterprise',
    description: 'WhatsApp AI chatbots for customer support, lead capture, and appointment booking. Available 24/7.',
    url: 'https://www.zyglotech.com/services/ai-chatbots',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chatbot & Appointment Agents | Zyglo Tech',
    description: 'WhatsApp AI chatbots for customer support, lead capture, and appointment booking.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/ai-chatbots' },
};

export default function AIChatbotsPage() {
  return (
    <PageShell
      division="AI"
      title="AI Chatbot & Appointment Agents"
      description="An AI chatbot is an automated software agent that uses artificial intelligence and natural language processing (NLP) to simulate human-like conversations with customers — available 24/7 across WhatsApp, web chat, and social channels. Our AI chatbots handle enquiries, qualify leads, book appointments, and send automated follow-ups without any human effort."
      features={[
        'WhatsApp Business API integration',
        'Website chatbot widget (web, React, WordPress)',
        'Natural language understanding in Hindi & English',
        'Lead capture with CRM push (Zoho, HubSpot, custom)',
        'Appointment and callback scheduling automation',
        'Product catalogue and quote sharing on WhatsApp',
        'Escalation to human agent when needed',
        'Conversation analytics and engagement reports',
      ]}
      cta={{ label: 'Build My AI Chatbot', href: '/demo' }}
      servicePath="/services/ai-chatbots"
      serviceCategory="AI Chatbot Development"
    />
  );
}
