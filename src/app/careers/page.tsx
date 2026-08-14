import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Zyglo Tech Enterprise in Salem — open roles in AI product development, SaaS engineering, and learning delivery at India\'s growing AI & IT platform.',
  keywords: ['Zyglo Tech careers', 'IT jobs Salem', 'AI engineer jobs India', 'Zyglo Tech Enterprise jobs'],
  openGraph: {
    title: 'Careers at Zyglo Tech Enterprise',
    description: 'Join our Salem-based team for roles in AI product development, SaaS engineering, and learning delivery.',
    url: 'https://www.zyglotech.com/careers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Zyglo Tech Enterprise',
    description: 'Open roles in AI product development, SaaS engineering, and learning delivery.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/careers' },
};

export default function CareersPage() {
  return (
    <PageShell
      title="Careers at Zyglo Tech"
      description="Join our Salem-based team for roles in AI product development, SaaS engineering, and learning delivery."
      cta={{ label: 'Apply Now', href: '/contact' }}
    />
  );
}
