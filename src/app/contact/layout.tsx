import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Zyglo Tech Enterprise | Salem AI & IT Company',
  description: 'Get in touch with Zyglo Tech Enterprise in Salem. Call +91 9943 907 643, email zyglotech@gmail.com or WhatsApp for enquiries about AI chatbots, ERP, app development and automation.',
  keywords: ['contact Zyglo Tech', 'IT company Salem contact', 'AI chatbot enquiry', 'ERP consultation India', 'Zyglo phone number', 'Zyglo email'],
  openGraph: {
    title: 'Contact Zyglo Tech Enterprise | Salem AI & IT Company',
    description: 'Reach our Salem team for AI chatbots, ERP, automation and web development enquiries. Call, WhatsApp or email us.',
    url: 'https://www.zyglotech.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Zyglo Tech Enterprise | Salem',
    description: 'Reach our Salem team for AI chatbots, ERP, automation and web development enquiries.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
