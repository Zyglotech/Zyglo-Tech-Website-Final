import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Workflow Automation for Indian Businesses',
  description: 'Intelligent workflow automation that eliminates repetitive tasks, connects your tools and boosts productivity. Invoice, HR, inventory and approval flow automation for Indian SMEs.',
  keywords: ['workflow automation India', 'business process automation Salem', 'RPA India', 'invoice automation', 'HR automation India', 'API integration services'],
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

export default function WorkflowAutomationPage() {
  return (
    <PageShell
      division="AI"
      title="Workflow Automation"
      description="Workflow automation is the use of intelligent software to eliminate repetitive manual tasks and boost operational efficiency. We build smart automation systems that connect your tools, automate approvals, invoicing, HR processes, and data pipelines — freeing your team to focus on high-value work."
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

