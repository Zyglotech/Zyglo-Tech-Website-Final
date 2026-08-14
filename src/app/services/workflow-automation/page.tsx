import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Workflow Automation Services',
  description: 'Zyglo Tech Enterprise builds intelligent workflow automation that eliminates repetitive tasks, connects your tools and boosts productivity for Indian SMEs.',
  keywords: ['Zyglo workflow automation', 'workflow automation India', 'business process automation Salem', 'RPA India', 'invoice automation', 'HR automation India'],
  openGraph: {
    title: 'Workflow Automation for Indian Businesses | Zyglo Tech Enterprise',
    description: 'Automate invoices, approvals, HR processes and data pipelines. Free your team from busywork with intelligent automation.',
    url: 'https://www.zyglotech.com/services/workflow-automation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workflow Automation for Indian Businesses | Zyglo Tech',
    description: 'Automate invoices, approvals, HR processes and data pipelines.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/workflow-automation' },
};

const faqs = [
  { q: 'What kinds of processes can Zyglo automate?', a: 'Invoicing, approvals, HR onboarding, inventory reordering, and any repetitive multi-step task that currently needs manual handling across your tools.' },
  { q: 'Do you need to replace our existing software?', a: 'No — Zyglo\'s automations connect to your existing tools via API integrations rather than replacing them.' },
  { q: 'Is this no-code or custom-built?', a: 'Both. We use a zero-code and custom-code hybrid approach, picking whichever is faster and more reliable for each specific workflow.' },
  { q: 'How much time does workflow automation typically save?', a: 'Clients commonly report 15-20 hours per week saved once approval, invoicing, and data-entry workflows are automated end-to-end.' },
];

export default function WorkflowAutomationPage() {
  return (
    <PageShell
      division="AI"
      title="Workflow Automation"
      description="Workflow automation is the use of intelligent software to eliminate repetitive manual tasks and boost operational efficiency. We build smart automation systems that connect your tools, automate approvals, invoicing, HR processes, and data pipelines — freeing your team to focus on high-value work."
      faqs={faqs}
      features={[
        'End-to-end business process automation',
        'API integrations across tools & platforms',
        'Automated reporting and data pipelines',
        'Trigger-based alerts and notifications',
        'Invoice, PO and approval flow automation',
        'HR onboarding & leave management automation',
        'Inventory reorder and supplier notification',
        'Zero-code and custom-code hybrid builds',
      ]}
      cta={{ label: 'Automate My Business Processes', href: '/demo' }}
      servicePath="/services/workflow-automation"
      serviceCategory="Business Process Automation"
    />
  );
}

