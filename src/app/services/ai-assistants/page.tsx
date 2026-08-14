import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Personal & Business AI Assistants',
  description: 'Custom AI assistants trained on your business data. Automate email drafting, generate reports, answer knowledge-base queries and streamline daily operations for Indian businesses.',
  keywords: ['Zyglo AI assistant', 'business AI assistant India', 'custom AI chatbot', 'AI for business India', 'AI knowledge base', 'generative AI India'],
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

const faqs = [
  { q: 'What is a custom AI assistant trained on our own data?', a: 'It\'s an AI agent that answers questions and drafts content using your actual documents, ERP data, and knowledge base — not generic public information.' },
  { q: 'Can it integrate with Google Workspace or Microsoft 365?', a: 'Yes, Zyglo\'s AI assistants connect to both, so it can draft emails, read documents, and manage calendars directly.' },
  { q: 'Is my business data kept private?', a: 'Yes — your data is used only to train and run your assistant and is never shared across other customers or used to train public models.' },
  { q: 'Can different teams have different assistants?', a: 'Yes, we build role-specific assistants for sales, HR, and finance teams, each scoped to the data and tasks relevant to that team.' },
  { q: 'What\'s the difference between an AI assistant for business and a chatbot?', a: 'A chatbot handles customer-facing conversations; a business AI assistant works internally — drafting, summarising, and answering questions for your own team.' },
];

export default function AIAssistantsPage() {
  return (
    <PageShell
      division="AI"
      title="Personal & Business AI Assistants"
      description="An AI assistant is a custom-trained artificial intelligence agent that can manage tasks, answer questions from your internal knowledge base, draft communications, and automate daily workflows. We build AI assistants trained on your business data — capable of generating reports, summarising meetings, and streamlining operations."
      faqs={faqs}
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

