import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Digital Transformation Services',
  description: 'End-to-end digital transformation for Indian businesses. Audit, roadmap, cloud migration, automation and change management by Zyglo Tech Enterprise, Salem.',
  keywords: ['Zyglo digital transformation', 'digital transformation India', 'cloud migration Salem', 'business process automation', 'digital readiness audit'],
  openGraph: {
    title: 'Digital Transformation Services | Zyglo Tech Enterprise',
    description: 'Modernise your business operations with end-to-end digital transformation — audit, cloud migration, automation, and change management.',
    url: 'https://www.zyglotech.com/services/digital-transformation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Transformation Services | Zyglo Tech',
    description: 'Modernise your business operations with end-to-end digital transformation.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/digital-transformation' },
};

const faqs = [
  { q: 'Where do we start with digital transformation?', a: 'With a digital readiness audit — we assess your current systems and processes, then build a phased roadmap prioritised by impact.' },
  { q: 'Does this replace our existing software?', a: 'Not necessarily. We often integrate and modernise what you already have before recommending a full replacement.' },
  { q: 'How long does a transformation roadmap take to execute?', a: 'Phased rollouts typically run 3-12 months depending on scope, with early wins delivered in the first phase.' },
  { q: 'Do you provide training for our team?', a: 'Yes, change management and team training are part of every transformation engagement.' },
];

export default function DigitalTransformationPage() {
  return (
    <PageShell
      division="AI"
      title="Digital Transformation"
      description="Digital transformation is the strategic adoption of digital technologies to fundamentally improve business processes, culture, and customer experiences. We audit your current operations, identify automation opportunities, and build a phased technology roadmap that moves your business from manual processes to intelligent, connected systems."
      faqs={faqs}
      features={[
        'Digital readiness audit and transformation roadmap',
        'Legacy system migration and modernisation',
        'Cloud migration and infrastructure setup',
        'Business process re-engineering',
        'System integration across tools and platforms',
        'Change management and team training',
        'Data centralisation and reporting strategy',
        'Ongoing advisory and quarterly reviews',
      ]}
      cta={{ label: 'Start My Transformation', href: '/demo' }}
      servicePath="/services/digital-transformation"
      serviceCategory="Digital Transformation Consulting"
    />
  );
}
