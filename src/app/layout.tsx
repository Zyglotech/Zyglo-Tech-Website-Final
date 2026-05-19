import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Zyglo Tech Enterprise | AI Chatbots, ERP, Automation & Web Development',
    template: '%s | Zyglo Tech Enterprise',
  },
  description: 'India\'s leading AI & IT enterprise platform. AI chatbots, WhatsApp automation, GST-ready ERP, web & app development, and corporate training — built for India\'s fastest-growing businesses. Headquartered in Chennai.',
  metadataBase: new URL('https://www.zyglo.tech'),
  keywords: [
    'AI chatbot India', 'WhatsApp automation India', 'ERP solution India', 'web development Chennai',
    'app development India', 'business automation India', 'AI assistant India', 'workflow automation',
    'SEO AEO GEO India', 'GST ERP software', 'IT company Chennai', 'digital transformation India',
  ],
  authors: [{ name: 'Zyglo Tech Enterprise', url: 'https://www.zyglo.tech' }],
  creator: 'Zyglo Tech Enterprise',
  publisher: 'Zyglo Tech Enterprise Pvt. Ltd.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'Zyglo Tech Enterprise — AI Chatbots, ERP & Automation for India',
    description: 'AI chatbots, ERP systems, business automation and web development from Chennai. Trusted by 500+ Indian businesses.',
    type: 'website',
    url: 'https://www.zyglo.tech',
    siteName: 'Zyglo Tech Enterprise',
    locale: 'en_IN',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zyglo Tech Enterprise — AI & IT Platform for India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zyglo Tech Enterprise | AI, ERP & Automation',
    description: 'AI chatbots, ERP and business automation built for India. 500+ businesses trust Zyglo.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://www.zyglo.tech' },
  icons: { icon: '/favicon.ico' },
  verification: {
    google: 'zyglo-google-site-verification',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.zyglo.tech/#organization',
      name: 'Zyglo Tech Enterprise',
      legalName: 'Zyglo Tech Enterprise Pvt. Ltd.',
      url: 'https://www.zyglo.tech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zyglo.tech/zyglo-logo.svg',
        width: 120,
        height: 60,
      },
      image: 'https://www.zyglo.tech/og-image.png',
      description: 'India\'s leading AI & IT enterprise platform offering AI chatbots, WhatsApp automation, GST-ready ERP, web & app development, and workflow automation for Indian businesses.',
      telephone: '+919943907643',
      email: 'zyglotech@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chennai',
        addressRegion: 'Tamil Nadu',
        postalCode: '600001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 13.0827,
        longitude: 80.2707,
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'City', name: 'Chennai' },
        { '@type': 'City', name: 'Bangalore' },
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Delhi' },
      ],
      serviceType: [
        'AI Chatbot Development',
        'WhatsApp Automation',
        'ERP Implementation',
        'Web Development',
        'App Development',
        'Workflow Automation',
        'SEO & AEO Services',
        'Digital Transformation',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Zyglo Tech Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Chatbot & Appointment Agents', url: 'https://www.zyglo.tech/services/ai-chatbots' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP Setup & Customization', url: 'https://www.zyglo.tech/services/erp-solutions' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development', url: 'https://www.zyglo.tech/services/web-development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow Automation', url: 'https://www.zyglo.tech/services/workflow-automation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO, AEO & GEO Ranking', url: 'https://www.zyglo.tech/services/seo-aeo-geo' } },
        ],
      },
      sameAs: [
        'https://twitter.com/zyglotech',
        'https://linkedin.com/company/zyglotech',
        'https://wa.me/919943907643',
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
      foundingDate: '2022',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 25 },
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Credit Card, UPI, Bank Transfer',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.zyglo.tech/#website',
      url: 'https://www.zyglo.tech',
      name: 'Zyglo Tech Enterprise',
      description: 'AI, ERP and IT solutions for Indian businesses',
      publisher: { '@id': 'https://www.zyglo.tech/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://www.zyglo.tech/?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body className="bg-[#060B17] text-white antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
