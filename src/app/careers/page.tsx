import { PageShell } from '@/components/PageShell';

export default function CareersPage() {
  return (
    <PageShell
      title="Careers at Zyglo Tech"
      description="Join our Chennai-based team for roles in AI product development, SaaS engineering, and learning delivery." 
      cta={{ label: 'Apply Now', href: '/contact' }}
    />
  );
}
