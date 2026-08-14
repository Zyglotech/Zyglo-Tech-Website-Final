import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Google Business Setup & Local SEO',
  description: 'Professional Google Business Profile setup, optimisation and local SEO for Indian businesses. Rank on Google Maps, get more walk-ins and enquiries. Salem local SEO experts.',
  keywords: ['Zyglo local SEO', 'Google Business setup India', 'local SEO Salem', 'Google Maps ranking', 'Google Business Profile optimisation', 'local SEO India'],
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

const faqs = [
  { q: 'How long does it take to rank on Google Maps?', a: 'Local pack visibility often improves within 30-60 days, with fuller results building over 3-6 months as reviews and citations accumulate.' },
  { q: 'Do you write and respond to reviews for us?', a: 'We provide a review generation strategy and response templates; you (or your team) post the responses to keep the profile genuinely yours.' },
  { q: 'What is citation building?', a: 'Getting your business name, address, and phone number listed consistently across Indian business directories — a key local-ranking signal.' },
  { q: 'Do you provide ongoing reporting?', a: 'Yes, monthly performance reports covering rankings, calls, and direction requests from your Google Business Profile.' },
];

export default function GoogleBusinessPage() {
  return (
    <PageShell
      division="IT"
      title="Google Business Setup & Local SEO"
      description="Google Business Profile (formerly Google My Business) is a free tool by Google that lets businesses manage their online presence across Google Search and Maps. We provide professional setup, optimisation, and local SEO services to help your business rank higher, appear in local search results, and drive walk-ins and enquiries."
      faqs={faqs}
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

