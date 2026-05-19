import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Digital Transformation Services',
  description: 'End-to-end digital transformation for Indian businesses. Audit, roadmap, cloud migration, automation and change management.',
};

export default function DigitalTransformationPage() {
  return (
    <PageShell
      division="AI"
      title="Digital Transformation"
      description="End-to-end digital transformation for businesses ready to modernise. We audit your current operations, identify automation opportunities, and build a phased technology roadmap that moves your business from manual processes to intelligent, connected systems."
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
    />
  );
}
