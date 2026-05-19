import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — AI, Automation & Business Growth Insights',
  description: 'Practical guides, case studies, and industry analysis on AI chatbots, ERP systems, workflow automation, SEO, AEO and GEO from Zyglo Tech Enterprise, Chennai.',
  keywords: ['AI blog India', 'automation blog', 'ERP guides', 'AI chatbot tutorials', 'SEO AEO GEO blog', 'tech blog Chennai'],
  openGraph: {
    title: 'Zyglo Blog — AI, Automation & Business Growth',
    description: 'Practical guides, case studies, and industry analysis from India\'s leading AI & IT enterprise platform.',
    url: 'https://www.zyglo.tech/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zyglo Blog — AI, Automation & Business Growth',
    description: 'Practical guides, case studies, and industry analysis from India\'s leading AI & IT enterprise platform.',
  },
  alternates: { canonical: 'https://www.zyglo.tech/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
