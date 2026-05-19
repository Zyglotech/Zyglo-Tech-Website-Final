import type { Metadata } from 'next';
import { PageShell } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'GST-Ready ERP Setup & Customization for Indian Businesses',
  description: 'GST-ready ERP systems for Indian businesses — finance, inventory, HR, CRM and billing in one platform. GSTR-1, GSTR-3B, TDS/TCS ready. Chennai-based ERP implementation experts.',
  keywords: ['ERP software India', 'GST ready ERP', 'ERP implementation Chennai', 'Indian ERP system', 'GSTR ERP software', 'inventory management India', 'ERP for SME India'],
  openGraph: {
    title: 'GST-Ready ERP for Indian Businesses | Zyglo Tech Enterprise',
    description: 'Unified ERP covering finance, inventory, HR and CRM. Built for Indian GST compliance. Get a live demo.',
    url: 'https://www.zyglo.tech/services/erp-solutions',
    type: 'website',
  },
  alternates: { canonical: 'https://www.zyglo.tech/services/erp-solutions' },
};

export default function ERPSolutionsPage() {
  return (
    <PageShell
      division="IT"
      title="ERP Setup & Customization"
      description="End-to-end ERP solutions customised to streamline your business operations. Our ERP platform is GST-ready, built for Indian compliance, and unifies finance, inventory, HR, CRM and billing into a single real-time dashboard — accessible from anywhere."
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
    />
  );
}
