import { PageShell } from '@/components/PageShell';

export default function CookiePolicyPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="Learn how Zyglo Tech uses cookies and tracking technologies to personalize the website and product experience." 
      cta={{ label: 'Privacy Settings', href: '/contact' }}
    />
  );
}
