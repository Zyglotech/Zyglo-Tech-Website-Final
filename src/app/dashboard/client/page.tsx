import { PageShell } from '@/components/PageShell';

export default function ClientDashboardPage() {
  return (
    <PageShell
      title="Client Dashboard"
      description="Monitor project status, invoices, chatbot analytics, support tickets, and billing history in one view." 
      cta={{ label: 'View Services', href: '/services' }}
    />
  );
}
