import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'GST-Ready ERP Setup & Customization',
  description: 'Zyglo Tech Enterprise builds GST-ready ERP systems for Indian businesses — finance, inventory, HR, CRM and billing in one platform. GSTR-1, GSTR-3B, TDS/TCS ready.',
  keywords: ['Zyglo ERP software', 'ERP software India', 'GST ready ERP', 'ERP implementation Salem', 'Indian ERP system', 'GSTR ERP software', 'ERP for SME India'],
  openGraph: {
    title: 'GST-Ready ERP for Indian Businesses | Zyglo Tech Enterprise',
    description: 'Unified ERP covering finance, inventory, HR and CRM. Built for Indian GST compliance. Get a live demo.',
    url: 'https://www.zyglotech.com/services/erp-solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GST-Ready ERP for Indian Businesses | Zyglo Tech',
    description: 'Unified ERP covering finance, inventory, HR and CRM. Built for Indian GST compliance.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/erp-solutions' },
};

const faqs = [
  { q: 'Is Zyglo\'s ERP GST-compliant?', a: 'Yes — GSTR-1, GSTR-3B, and GSTR-9 filing are built in, along with TDS/TCS handling, so your ERP stays compliant with current Indian tax rules automatically.' },
  { q: 'Can Zyglo customize the ERP for my industry?', a: 'Yes. We configure the finance, inventory, HR, and CRM modules around how your business actually operates — retail, manufacturing, services, or multi-location operations.' },
  { q: 'How long does ERP implementation take?', a: 'Most Zyglo ERP rollouts go live in 2-6 weeks depending on the number of modules and how much historical data needs migrating.' },
  { q: 'Does the ERP work on mobile?', a: 'Yes, the dashboard and core modules are mobile-friendly so you can check inventory, approvals, and reports from anywhere.' },
];

export default function ERPSolutionsPage() {
  return (
    <PageShell
      division="IT"
      title="ERP Setup & Customization"
      description="ERP (Enterprise Resource Planning) is a unified software platform that integrates finance, inventory, HR, CRM and billing into a single real-time dashboard. Our ERP solutions are GST-ready, built for Indian compliance, and streamline your business operations — accessible from anywhere."
      faqs={faqs}
      features={[
        'Finance management & automated GST-ready invoicing',
        'Inventory tracking with low-stock alerts',
        'Purchase orders, vendors & supplier management',
        'HR module: payroll, attendance & leave management',
        'CRM: leads, customers & follow-up pipeline',
        'Role-based access control for departments',
        'GSTR-1, GSTR-3B, GSTR-9 automated filing',
        'Multi-location and multi-warehouse support',
        'Custom reports and export to Excel/PDF',
        'Mobile-friendly dashboard and app',
      ]}
      cta={{ label: 'Get ERP Demo', href: '/demo' }}
      servicePath="/services/erp-solutions"
      serviceCategory="ERP Software Solutions"
    />
  );
}

