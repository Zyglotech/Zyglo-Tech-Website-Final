import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'College & Final Year Projects',
  description: 'Zyglo Tech Enterprise builds final-year engineering projects, IoT solutions, AI/ML prototypes and academic software for BE, BTech, MCA, MBA students. Full documentation & source code provided.',
  keywords: ['Zyglo college projects', 'final year project help', 'college project Salem', 'engineering project development', 'BE BTech project', 'IoT project India'],
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

const faqs = [
  { q: 'What kind of final-year projects does Zyglo build?', a: 'IoT prototypes, AI/ML models, web and mobile apps, and institution-level software systems for BE, BTech, MCA, and MBA students.' },
  { q: 'Do you provide full documentation and source code?', a: 'Yes — every project includes complete documentation, clean commented source code, and a project report ready for submission.' },
  { q: 'Can you help with the presentation and demo too?', a: 'Yes, we prepare the presentation deck and help you rehearse the demo before your review.' },
  { q: 'How long does a final-year project take?', a: 'Most projects are delivered in 2-4 weeks depending on complexity and any hardware/IoT components involved.' },
];

export default function CollegeProjectsPage() {
  return (
    <PageShell
      division="IT"
      title="College & Institution Projects"
      description="College project development provides students and institutions with professionally built final-year engineering projects, IoT prototypes, AI/ML research models, and institution-level software systems — delivered with full documentation, source code, and presentation support."
      faqs={faqs}
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

