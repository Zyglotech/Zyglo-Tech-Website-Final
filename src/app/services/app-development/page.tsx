import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'App Development — Android, iOS & Web',
  description: 'Zyglo Tech Enterprise builds custom Android, iOS and Flutter apps for Indian businesses. UX-first design, backend integration, Play Store & App Store deployment.',
  keywords: ['Zyglo app development', 'app development India', 'Android app development Salem', 'iOS app development', 'Flutter app development', 'React Native development'],
  openGraph: {
    title: 'App Development — Android, iOS & Cross-Platform | Zyglo Tech Enterprise',
    description: 'Custom Android, iOS and Flutter apps built for Indian businesses. Fast delivery, GST-ready backend, App Store deployment.',
    url: 'https://www.zyglotech.com/services/app-development',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'App Development — Android, iOS & Cross-Platform | Zyglo Tech',
    description: 'Custom Android, iOS and Flutter apps built for Indian businesses.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/app-development' },
};

const faqs = [
  { q: 'Do you build native or cross-platform apps?', a: 'Both — native Android/iOS when performance demands it, and Flutter or React Native for faster, cost-effective cross-platform delivery.' },
  { q: 'Will the app work offline?', a: 'Yes, we build offline-first architecture where needed, so the app stays usable in low-connectivity areas and syncs when back online.' },
  { q: 'Do you handle App Store and Play Store submission?', a: 'Yes, we manage the full submission and review process for both stores as part of the delivery.' },
  { q: 'Can the app connect to our existing ERP or backend?', a: 'Yes — API and database integration with your existing systems is a standard part of the build.' },
  { q: 'Do you have expertise in native iOS and Android development?', a: 'Yes, our team builds native iOS (Swift) and Android (Kotlin) apps in-house, alongside cross-platform work, for clients across Tamil Nadu and pan-India.' },
];

export default function AppDevelopmentPage() {
  return (
    <PageShell
      division="IT"
      title="App Development"
      description="App development is the process of creating mobile applications for Android, iOS, and cross-platform environments tailored to your business needs. We design and develop apps that deliver seamless user experiences, integrate with your existing systems, and scale with your business."
      faqs={faqs}
      features={[
        'Native Android & iOS development',
        'Cross-platform apps with Flutter & React Native',
        'UX-first design with Figma prototyping',
        'Backend API & database integration',
        'App Store & Play Store deployment',
        'Ongoing maintenance & version updates',
        'Push notifications & in-app analytics',
        'Offline-first architecture for low-connectivity areas',
      ]}
      cta={{ label: 'Request App Development Quote', href: '/demo' }}
      servicePath="/services/app-development"
      serviceCategory="Mobile App Development"
    />
  );
}

