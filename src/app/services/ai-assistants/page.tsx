import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Personal & Business AI Assistants',
  description: 'Custom AI assistants trained on your business data. Automate email drafting, generate reports, answer knowledge-base queries and streamline daily operations for Indian businesses.',
  keywords: ['business AI assistant India', 'custom AI chatbot', 'AI for business India', 'ChatGPT for business', 'AI knowledge base', 'AI assistant Salem', 'generative AI India'],
  openGraph: {
    title: 'Personal & Business AI Assistants | Zyglo Tech Enterprise',
    description: 'AI assistants trained on your data — answering questions, drafting emails, generating reports, and managing daily workflows automatically.',
    url: 'https://www.zyglotech.com/services/ai-assistants',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal & Business AI Assistants | Zyglo Tech',
    description: 'AI assistants trained on your data — answering questions, drafting emails, generating reports.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/ai-assistants' },
};

export default function AIAssistantsPage() {
  return (
    <PageShell
      division="AI"
      title="Personal & Business AI Assistants"
      description="An AI assistant is a custom-trained artificial intelligence agent that can manage tasks, answer questions from your internal knowledge base, draft communications, and automate daily workflows. We build AI assistants trained on your business data — capable of generating reports, summarising meetings, and streamlining operations."
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
      servicePath="/services/ai-assistants"
      serviceCategory="AI Assistant Development"
    />
  );
}

