import { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Bootcamps & Live Cohorts',
  description: 'Role-based AI and IT bootcamps that fast-track students and professionals into AI and product roles at Zyglo Academy, Salem.',
  alternates: { canonical: 'https://www.zyglotech.com/academy/bootcamps' },
};

export default function AcademyBootcampsPage() {
  return (
    <PageShell
      title="Bootcamps & Live Cohorts"
      description="Role-based bootcamps that fast-track students and professionals into AI and product roles." 
      cta={{ label: 'Join a Cohort', href: '/contact' }}
    />
  );
}
