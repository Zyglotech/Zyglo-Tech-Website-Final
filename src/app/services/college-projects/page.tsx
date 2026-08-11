import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'College & Institution Projects — Final Year Projects',
  description: 'Final-year engineering projects, IoT solutions, AI/ML prototypes and academic software for BE, BTech, MCA, MBA students in India. Full documentation & source code provided.',
  keywords: ['final year project help', 'college project Salem', 'engineering project development', 'BE BTech project', 'IoT project India', 'AI ML project for students'],
  openGraph: {
    title: 'College & Institution Projects | Zyglo Tech Enterprise',
    description: 'Academic and final-year project delivery for engineering colleges in India. IoT, AI/ML, web, mobile — with full docs and source code.',
    url: 'https://www.zyglotech.com/services/college-projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'College & Institution Projects | Zyglo Tech',
    description: 'Academic and final-year project delivery for engineering colleges in India.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/college-projects' },
};

export default function CollegeProjectsPage() {
  return (
    <PageShell
      division="IT"
      title="College & Institution Projects"
      description="College project development provides students and institutions with professionally built final-year engineering projects, IoT prototypes, AI/ML research models, and institution-level software systems — delivered with full documentation, source code, and presentation support."
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
      servicePath="/services/college-projects"
      serviceCategory="Academic Project Development"
    />
  );
}

