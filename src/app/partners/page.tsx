import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Partners & Alliances',
  description: 'Partner with Zyglo Tech Enterprise to co-deliver AI automation, ERP modernization, and training solutions for Indian businesses.',
  keywords: ['Zyglo Tech partners', 'IT partnership India', 'AI reseller India', 'Zyglo Tech Enterprise alliances'],
  openGraph: {
    title: 'Partners & Alliances | Zyglo Tech Enterprise',
    description: 'Partner with Zyglo Tech to co-deliver AI automation, ERP modernization, and training solutions across industries.',
    url: 'https://www.zyglotech.com/partners',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partners & Alliances | Zyglo Tech Enterprise',
    description: 'Co-deliver AI automation, ERP modernization, and training solutions with Zyglo Tech.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/partners' },
};

export default function PartnersPage() {
  return (
    <PageShell
      title="Partners & Alliances"
      description="Partner with Zyglo Tech to co-deliver AI automation, ERP modernization, and training solutions across industries."
      cta={{ label: 'Partner with Us', href: '/contact' }}
    />
  );
}
