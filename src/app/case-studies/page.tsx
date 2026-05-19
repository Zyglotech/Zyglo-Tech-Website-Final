import { PageShell } from '@/components/PageShell';

export default function CaseStudiesPage() {
  return (
    <PageShell
      title="Case Studies"
      description="Explore real results from restaurant automation, clinic workflows, ERP launches, and student growth stories." 
      cta={{ label: 'See the Demo', href: '/demo' }}
    />
  );
}
