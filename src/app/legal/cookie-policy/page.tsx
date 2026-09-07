import { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn how Zyglo Tech uses cookies and tracking technologies to personalize the website and product experience.',
  alternates: { canonical: 'https://www.zyglotech.com/legal/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description="Learn how Zyglo Tech uses cookies and tracking technologies to personalize the website and product experience." 
      cta={{ label: 'Privacy Settings', href: '/contact' }}
    />
  );
}
