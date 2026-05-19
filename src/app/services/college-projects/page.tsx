import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'College & Institution Projects — Final Year Projects',
  description: 'Final-year engineering projects, IoT solutions, AI/ML prototypes and academic software for BE, BTech, MCA, MBA students in India. Full documentation & source code provided.',
  keywords: ['final year project help', 'college project Chennai', 'engineering project development', 'BE BTech project', 'IoT project India', 'AI ML project for students'],
  openGraph: {
    title: 'College & Institution Projects | Zyglo Tech Enterprise',
    description: 'Academic and final-year project delivery for engineering colleges in India. IoT, AI/ML, web, mobile — with full docs and source code.',
    url: 'https://www.zyglo.tech/services/college-projects',
    type: 'website',
  },
  alternates: { canonical: 'https://www.zyglo.tech/services/college-projects' },
};

export default function CollegeProjectsPage() {
  return (
    <PageShell
      division="IT"
      title="College & Institution Projects"
      description="Innovative academic, IoT, AI, and software projects for students and institutions. We deliver final-year engineering projects, research prototypes, and institution-level software systems — with full documentation, source code, and presentation support."
      features={[
        'Final-year BE/BTech/MCA/MBA project delivery',
        'IoT solutions with hardware & firmware',
        'AI/ML prototypes and data science projects',
        'Web & mobile apps for academic submissions',
        'Full documentation and project reports',
        'Presentation deck and demo preparation',
        'Source code with clean, commented structure',
        'College department-level software systems',
      ]}
      cta={{ label: 'Enquire About Project Help', href: '/contact' }}
    />
  );
}
