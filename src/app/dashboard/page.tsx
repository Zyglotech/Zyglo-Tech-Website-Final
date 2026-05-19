import { PageShell } from '@/components/PageShell';

export default function DashboardPage() {
  return (
    <PageShell
      title="Dashboard" 
      description="Access your student, client, and admin dashboards for course activity, project health, billing, and analytics." 
      cta={{ label: 'Student Dashboard', href: '/dashboard/student' }}
    />
  );
}
