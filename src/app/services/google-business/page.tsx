import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Google Business Setup & Local SEO',
  description: 'Professional Google Business Profile setup, optimisation and local SEO for Indian businesses. Rank on Google Maps, get more walk-ins and enquiries. Salem local SEO experts.',
  keywords: ['Google Business setup India', 'local SEO Salem', 'Google Maps ranking', 'Google Business Profile optimisation', 'local SEO India', 'Google My Business setup'],
  openGraph: {
    title: 'Google Business Setup & Local SEO | Zyglo Tech Enterprise',
    description: 'Rank on Google Maps, build a credible online presence and drive local walk-ins. Expert Google Business setup for Indian businesses.',
    url: 'https://www.zyglotech.com/services/google-business',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Business Setup & Local SEO | Zyglo Tech',
    description: 'Rank on Google Maps and drive local walk-ins. Expert Google Business setup.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/google-business' },
};

export default function GoogleBusinessPage() {
  return (
    <PageShell
      division="IT"
      title="Google Business Setup & Local SEO"
      description="Google Business Profile (formerly Google My Business) is a free tool by Google that lets businesses manage their online presence across Google Search and Maps. We provide professional setup, optimisation, and local SEO services to help your business rank higher, appear in local search results, and drive walk-ins and enquiries."
      features={[
        'Google Business Profile setup & verification',
        'Business category & attribute optimisation',
        'Photo uploads, posts & Q&A management',
        'Local SEO keyword research & on-page optimisation',
        'Citation building across Indian directories',
        'Review generation strategy & response templates',
        'Google Maps ranking improvement',
        'Monthly performance reporting',
      ]}
      cta={{ label: 'Setup My Google Business', href: '/demo' }}
      servicePath="/services/google-business"
      serviceCategory="Google Business Profile Management"
    />
  );
}

