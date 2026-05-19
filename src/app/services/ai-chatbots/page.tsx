import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'AI Chatbot & Appointment Agents',
  description: 'WhatsApp AI chatbots for customer support, lead capture, and appointment booking. Available 24/7. Built for Indian businesses.',
};

export default function AIChatbotsPage() {
  return (
    <PageShell
      division="AI"
      title="AI Chatbot & Appointment Agents"
      description="AI-powered chat systems for customer support, booking automation, and engagement. Our chatbots work 24/7 on WhatsApp, your website, and social channels — handling enquiries, qualifying leads, booking appointments, and sending automated follow-ups without any human effort."
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
    />
  );
}
