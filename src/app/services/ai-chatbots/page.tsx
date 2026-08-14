import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Chatbot Agency for WhatsApp',
  description: 'Get a 24/7 AI chatbot for WhatsApp & web that books appointments and qualifies leads automatically. Trusted by 50+ Indian businesses — see it live free.',
  keywords: ['Zyglo AI chatbot', 'AI chatbot India', 'ai chatbot agency', 'WhatsApp chatbot', 'appointment bot', 'chatbot service india', 'WhatsApp automation India'],
  openGraph: {
    title: 'AI Chatbot Agency for WhatsApp | Zyglo Tech Enterprise',
    description: 'A 24/7 AI chatbot for WhatsApp & web that books appointments and qualifies leads automatically. Trusted by 50+ Indian businesses.',
    url: 'https://www.zyglotech.com/services/ai-chatbots',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chatbot Agency for WhatsApp | Zyglo Tech',
    description: '24/7 AI chatbots for WhatsApp & web that book appointments and qualify leads automatically.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/ai-chatbots' },
};

const faqs = [
  { q: 'Which platforms does Zyglo\'s AI chatbot work on?', a: 'WhatsApp Business API, your website (as a chat widget), and Facebook/Instagram — with conversation history synced across all of them.' },
  { q: 'Does the chatbot understand Hindi and regional languages?', a: 'Yes, our chatbots handle natural conversation in Hindi and English, with regional language support available for enterprise plans.' },
  { q: 'Can it book appointments automatically?', a: 'Yes — the chatbot checks availability, books the slot, and sends confirmation/reminder messages without any manual follow-up.' },
  { q: 'What happens if the chatbot can\'t answer a question?', a: 'It escalates the conversation to a human agent seamlessly, with full context of what the customer already asked.' },
];

export default function AIChatbotsPage() {
  return (
    <PageShell
      division="AI"
      title="AI Chatbot & Appointment Agents"
      description="An AI chatbot is an automated software agent that uses artificial intelligence and natural language processing (NLP) to simulate human-like conversations with customers — available 24/7 across WhatsApp, web chat, and social channels. Our AI chatbots handle enquiries, qualify leads, book appointments, and send automated follow-ups without any human effort."
      faqs={faqs}
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
