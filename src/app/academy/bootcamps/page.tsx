import { PageShell } from '@/components/PageShell';

export default function AcademyBootcampsPage() {
  return (
    <PageShell
      title="Bootcamps & Live Cohorts"
      description="Role-based bootcamps that fast-track students and professionals into AI and product roles." 
      cta={{ label: 'Join a Cohort', href: '/contact' }}
    />
  );
}
