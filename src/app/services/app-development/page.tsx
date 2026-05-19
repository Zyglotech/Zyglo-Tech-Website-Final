import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'App Development — Android, iOS & Cross-Platform',
  description: 'Custom Android, iOS and Flutter app development for Indian businesses. UX-first design, backend integration, Play Store & App Store deployment. Chennai-based app developers.',
  keywords: ['app development India', 'Android app development Chennai', 'iOS app development', 'Flutter app development', 'React Native development', 'mobile app development Chennai'],
  openGraph: {
    title: 'App Development — Android, iOS & Cross-Platform | Zyglo Tech Enterprise',
    description: 'Custom Android, iOS and Flutter apps built for Indian businesses. Fast delivery, GST-ready backend, App Store deployment.',
    url: 'https://www.zyglo.tech/services/app-development',
    type: 'website',
  },
  alternates: { canonical: 'https://www.zyglo.tech/services/app-development' },
};

export default function AppDevelopmentPage() {
  return (
    <PageShell
      division="IT"
      title="App Development"
      description="Custom Android, iOS, and cross-platform applications built for growth. We design and develop mobile apps that deliver seamless user experiences, integrate with your existing systems, and scale with your business."
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
    />
  );
}
