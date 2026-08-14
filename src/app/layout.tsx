import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { Providers } from '@/components/Providers';
import { HomeSchema } from './home-schema';
import { AggregateRatingSchema } from '@/components/AggregateRatingSchema';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Zyglo Tech Enterprise | AI, ERP & Automation for India',
    template: '%s | Zyglo Tech Enterprise',
  },
  description: 'India\'s leading AI & IT enterprise platform. AI chatbots, WhatsApp automation, GST-ready ERP, web & app development, and corporate training — built for India\'s fastest-growing businesses. Headquartered in Salem.',
  metadataBase: new URL('https://www.zyglotech.com'),
  keywords: [
    'AI chatbot India', 'WhatsApp automation India', 'ERP solution India', 'web development Salem',
    'app development India', 'business automation India', 'AI assistant India', 'workflow automation',
    'SEO AEO GEO India', 'GST ERP software', 'IT company Salem', 'digital transformation India',
  ],
  authors: [{ name: 'Zyglo Tech Enterprise', url: 'https://www.zyglotech.com' }],
  creator: 'Zyglo Tech Enterprise',
  publisher: 'Zyglo Tech Enterprise Pvt. Ltd.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'Zyglo Tech Enterprise — AI Chatbots, ERP & Automation for India',
    description: 'AI chatbots, ERP systems, business automation and web development from Salem. Trusted by 50+ Indian businesses.',
    type: 'website',
    url: 'https://www.zyglotech.com',
    siteName: 'Zyglo Tech Enterprise',
    locale: 'en_IN',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Zyglo Tech Enterprise — AI & IT Platform for India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zyglo Tech Enterprise | AI, ERP & Automation',
    description: 'AI chatbots, ERP and business automation built for India. 50+ businesses trust Zyglo.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://www.zyglotech.com' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
  manifest: '/manifest.json',
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
      '@id': 'https://www.zyglotech.com/#organization',
      name: 'Zyglo Tech Enterprise',
      legalName: 'Zyglo Tech Enterprise Pvt. Ltd.',
      url: 'https://www.zyglotech.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zyglotech.com/zyglo-logo.svg',
        width: 120,
        height: 60,
      },
      image: 'https://www.zyglotech.com/og-image.png',
      description: 'India\'s leading AI & IT enterprise platform offering AI chatbots, WhatsApp automation, GST-ready ERP, web & app development, and workflow automation for Indian businesses.',
      telephone: '+919943907643',
      email: 'zyglotech@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '18/10, Rail Nagar, Suramangalam',
        addressLocality: 'Salem',
        addressRegion: 'Tamil Nadu',
        postalCode: '636005',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 11.6643,
        longitude: 78.1460,
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'City', name: 'Salem' },
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
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Chatbot & Appointment Agents', url: 'https://www.zyglotech.com/services/ai-chatbots' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP Setup & Customization', url: 'https://www.zyglotech.com/services/erp-solutions' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Development', url: 'https://www.zyglotech.com/services/web-development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow Automation', url: 'https://www.zyglotech.com/services/workflow-automation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO, AEO & GEO Ranking', url: 'https://www.zyglotech.com/services/seo-aeo-geo' } },
        ],
      },
      sameAs: [
        'https://twitter.com/zyglotech',
        'https://linkedin.com/company/zyglotech',
        'https://wa.me/919943907643',
        'https://instagram.com/zyglotech',
        'https://www.youtube.com/@zyglotech',
        'https://github.com/zyglotech',
        'https://www.facebook.com/zyglotech',
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
      '@id': 'https://www.zyglotech.com/#website',
      url: 'https://www.zyglotech.com',
      name: 'Zyglo Tech Enterprise',
      description: 'AI, ERP and IT solutions for Indian businesses',
      publisher: { '@id': 'https://www.zyglotech.com/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://www.zyglotech.com/?q={search_term_string}' },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body className="bg-[#060B17] text-white antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <HomeSchema />
        <AggregateRatingSchema />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
