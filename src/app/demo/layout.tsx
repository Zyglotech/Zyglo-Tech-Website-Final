import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Free Consultation — 30-Min Live Demo',
  description: 'Book a free 30-minute consultation with Zyglo Tech Enterprise. Live demo of AI chatbots, ERP systems, workflow automation and web development. No commitment. Salem-based.',
  keywords: ['free IT consultation India', 'book AI chatbot demo', 'free business consultation Salem', 'ERP demo India', 'automation demo'],
  openGraph: {
    title: 'Book Free Consultation | Zyglo Tech Enterprise',
    description: 'Free 30-minute live demo — AI chatbots, ERP, automation and web development tailored to your business. Zero commitment.',
    url: 'https://www.zyglotech.com/demo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Free Consultation | Zyglo Tech Enterprise',
    description: 'Free 30-minute live demo — AI chatbots, ERP, automation and web development.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/demo' },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
