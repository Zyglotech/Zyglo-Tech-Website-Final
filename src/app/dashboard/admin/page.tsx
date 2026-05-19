import { PageShell } from '@/components/PageShell';

export default function AdminDashboardPage() {
  return (
    <PageShell
      title="Admin Dashboard"
      description="Manage users, leads, blog content, courses, chatbot clients, and analytics from a single control panel." 
      cta={{ label: 'Sign In', href: '/auth/signin' }}
    />
  );
}
