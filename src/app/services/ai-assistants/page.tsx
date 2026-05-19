import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Personal & Business AI Assistants',
  description: 'Custom AI assistants trained on your business data. Automate email drafting, generate reports, answer knowledge-base queries and streamline daily operations for Indian businesses.',
  keywords: ['business AI assistant India', 'custom AI chatbot', 'AI for business India', 'ChatGPT for business', 'AI knowledge base', 'AI assistant Chennai', 'generative AI India'],
  openGraph: {
    title: 'Personal & Business AI Assistants | Zyglo Tech Enterprise',
    description: 'AI assistants trained on your data — answering questions, drafting emails, generating reports, and managing daily workflows automatically.',
    url: 'https://www.zyglo.tech/services/ai-assistants',
    type: 'website',
  },
  alternates: { canonical: 'https://www.zyglo.tech/services/ai-assistants' },
};

export default function AIAssistantsPage() {
  return (
    <PageShell
      division="AI"
      title="Personal & Business AI Assistants"
      description="Intelligent AI assistants to manage tasks, data, communication, and daily operations. We build custom AI assistants trained on your business data — capable of answering questions, generating reports, drafting responses, and streamlining daily workflows."
      features={[
        'Custom AI assistant trained on your business data',
        'Natural language queries over your documents & ERP',
        'Automated email and WhatsApp drafting',
        'Daily briefings, summaries and task reminders',
        'Meeting notes, action item extraction',
        'Internal knowledge base Q&A bot',
        'Integration with Google Workspace & Microsoft 365',
        'Role-specific assistants for sales, HR, finance teams',
      ]}
      cta={{ label: 'Build My AI Assistant', href: '/demo' }}
    />
  );
}
