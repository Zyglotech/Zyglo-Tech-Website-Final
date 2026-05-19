import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Website Development for Indian Businesses',
  description: 'High-performance, SEO-optimised websites and web applications built for Indian businesses. Mobile-first design, fast loading, and conversion-focused. Chennai web development company.',
  keywords: ['web development India', 'website development Chennai', 'business website India', 'Next.js development', 'React website India', 'e-commerce website India', 'web app development Chennai'],
  openGraph: {
    title: 'Website Development for Indian Businesses | Zyglo Tech Enterprise',
    description: 'Modern, fast and conversion-focused websites for Indian businesses. From landing pages to full web applications.',
    url: 'https://www.zyglo.tech/services/web-development',
    type: 'website',
  },
  alternates: { canonical: 'https://www.zyglo.tech/services/web-development' },
};

export default function WebDevelopmentPage() {
  return (
    <PageShell
      division="IT"
      title="Website Development"
      description="Modern, responsive, and high-performance websites tailored for your business. We design and build websites that look world-class, load fast, and convert visitors into customers — from landing pages to full SaaS web applications."
      features={[
        'Business websites, landing pages & portfolios',
        'SaaS web application development',
        'Admin dashboards and client portals',
        'E-commerce websites with payment gateway integration',
        'Mobile-first, SEO-optimised design',
        'CMS integration (Sanity, WordPress, custom)',
        'Performance optimisation (Core Web Vitals)',
        'Ongoing hosting support and maintenance',
      ]}
      cta={{ label: 'Get Website Quote', href: '/demo' }}
    />
  );
}
