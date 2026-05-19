import { PageShell } from '@/components/PageShell';

export default function StudentDashboardPage() {
  return (
    <PageShell
      title="Student Dashboard"
      description="Track your enrolled courses, lesson progress, certificates, upcoming sessions, and student resources." 
      cta={{ label: 'Explore Academy', href: '/academy/courses' }}
    />
  );
}
