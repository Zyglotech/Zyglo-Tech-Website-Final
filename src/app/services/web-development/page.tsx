import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Website Development Services',
  description: 'Zyglo Tech Enterprise builds high-performance, SEO-optimised websites and web applications for Indian businesses. Mobile-first, fast loading, and conversion-focused.',
  keywords: ['Zyglo web development', 'web development India', 'website development Salem', 'business website India', 'Next.js development', 'e-commerce website India'],
  openGraph: {
    title: 'Website Development for Indian Businesses | Zyglo Tech Enterprise',
    description: 'Modern, fast and conversion-focused websites for Indian businesses. From landing pages to full web applications.',
    url: 'https://www.zyglotech.com/services/web-development',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website Development for Indian Businesses | Zyglo Tech',
    description: 'Modern, fast and conversion-focused websites for Indian businesses.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/web-development' },
};

const faqs = [
  { q: 'What technology does Zyglo build websites with?', a: 'Modern frameworks like Next.js and React, chosen for speed, SEO-friendliness, and long-term maintainability.' },
  { q: 'Do you build e-commerce websites too?', a: 'Yes, including payment gateway integration, product catalogues, and order management.' },
  { q: 'How long does a business website take to build?', a: 'Landing pages typically take 1-2 weeks; full web applications or e-commerce sites take 4-8 weeks depending on scope.' },
  { q: 'Do you offer hosting and maintenance after launch?', a: 'Yes — ongoing hosting support, updates, and performance monitoring are available as a maintenance plan.' },
];

export default function WebDevelopmentPage() {
  return (
    <PageShell
      division="IT"
      title="Website Development"
      description="Website development is the process of designing, building, and maintaining high-performance websites and web applications tailored for your business goals. We create modern, responsive sites that look world-class, load fast, and convert visitors into customers — from landing pages to full SaaS web applications."
      faqs={faqs}
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
      servicePath="/services/web-development"
      serviceCategory="Website Development"
    />
  );
}
