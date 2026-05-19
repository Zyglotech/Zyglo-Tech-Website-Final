import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Zyglo Tech Enterprise',
  description: 'Review the terms, usage guidelines, and service commitments for Zyglo Tech Enterprise digital products and services.',
};

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By accessing or using any website, application, platform, or service operated by Zyglo Tech Enterprise Pvt. Ltd. ("Zyglo," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you must not use our services.',
      'These Terms apply to all visitors, registered users, clients, and others who access or use our services. We may update these Terms at any time. Continued use of our services after any changes constitutes your acceptance of the revised Terms. We will indicate the date of the most recent revision at the bottom of this page.',
    ],
  },
  {
    id: 'services',
    title: '2. Services Provided',
    content: [
      'Zyglo Tech Enterprise provides IT and AI-powered digital services including, but not limited to: website and application development, ERP setup and customization, Google Business and SEO solutions, AI chatbots and automation agents, workflow automation, business AI assistants, academy courses, and related consulting engagements.',
      'We reserve the right to modify, suspend, or discontinue any service — temporarily or permanently — with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of services.',
      'Certain services may be subject to additional agreements, statements of work, or project-specific terms provided at the time of engagement. In the event of a conflict, those project-specific terms will govern.',
    ],
  },
  {
    id: 'accounts',
    title: '3. User Accounts & Registration',
    content: [
      'Some services require you to create an account. You must provide accurate, complete, and current information and keep it updated. You are responsible for safeguarding your account credentials and for all activities that occur under your account.',
      'You must immediately notify us at zyglotech@gmail.com of any unauthorized use of your account or any other breach of security. We cannot and will not be liable for any loss or damage arising from your failure to comply with this obligation.',
      'We reserve the right to suspend or terminate accounts that violate these Terms, contain false information, or that have been inactive for an extended period, at our sole discretion.',
    ],
  },
  {
    id: 'client-obligations',
    title: '4. Client Obligations',
    content: [
      'Clients engaging Zyglo for project-based services agree to provide timely access to required resources, materials, accounts, and personnel necessary for project delivery. Delays caused by client unavailability may extend delivery timelines without penalty to Zyglo.',
      'You agree not to use our services for any unlawful purpose or in any way that could harm, disable, overburden, or impair our infrastructure, servers, or networks, or interfere with any other party\'s use of our services.',
      'You are solely responsible for the content, data, and materials you provide to us in connection with the services. You represent and warrant that you own or have the necessary rights and permissions to use such content and that it does not violate any third-party rights or applicable laws.',
    ],
  },
  {
    id: 'payments',
    title: '5. Payment Terms',
    content: [
      'Payment terms for each engagement are specified in the project proposal or invoice issued by Zyglo. Unless otherwise agreed in writing, project work begins only upon receipt of the agreed advance or deposit.',
      'All fees are quoted in Indian Rupees (INR) unless otherwise specified. Invoices not paid within the agreed payment window may attract a late fee of 1.5% per month on the outstanding balance.',
      'Zyglo reserves the right to pause or suspend active work on any project where payment obligations are overdue by more than 14 days. Final deliverables, source code, or login credentials will be released only upon full settlement of all outstanding dues.',
      'For subscription-based or retainer services, fees are billed in advance on the agreed billing cycle (monthly or annually). Non-payment within 7 days of the due date may result in service suspension.',
    ],
  },
  {
    id: 'ip',
    title: '6. Intellectual Property',
    content: [
      'All content, branding, designs, code, methodologies, frameworks, and proprietary tools created or owned by Zyglo remain the exclusive intellectual property of Zyglo Tech Enterprise Pvt. Ltd. unless a written agreement explicitly transfers specific rights to the client.',
      'Upon full payment of all applicable fees, Zyglo grants the client a non-exclusive, non-transferable license to use the deliverables created specifically for that client\'s project for the client\'s own business purposes.',
      'Zyglo retains the right to use generalized knowledge, skills, and non-proprietary methodologies gained during an engagement in future projects. Zyglo may also display completed work in its portfolio unless the client has specifically requested confidentiality in writing.',
      'Any third-party components (open-source libraries, stock assets, licensed fonts, etc.) incorporated into deliverables remain subject to their respective licenses. Clients are responsible for compliance with such licenses in their continued use.',
    ],
  },
  {
    id: 'confidentiality',
    title: '7. Confidentiality',
    content: [
      'Both parties agree to keep confidential any non-public information exchanged during the engagement that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.',
      'Confidentiality obligations do not apply to information that: (a) is or becomes publicly available through no breach of this agreement; (b) was already known to the receiving party before disclosure; (c) is independently developed by the receiving party without use of confidential information; or (d) is required to be disclosed by law or court order.',
      'These confidentiality obligations survive the termination of any agreement or engagement by two (2) years.',
    ],
  },
  {
    id: 'warranties',
    title: '8. Warranties & Disclaimers',
    content: [
      'Zyglo warrants that it will perform services in a professional and workmanlike manner consistent with industry standards. We do not warrant that any service will be uninterrupted, error-free, or entirely secure, or that any deliverable will meet every specific requirement not detailed in the agreed project scope.',
      'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.',
      'Zyglo does not guarantee specific business outcomes (e.g., sales growth, search ranking positions, conversion rates) from any of its services. Performance estimates shared during sales or onboarding are projections only and not contractual commitments.',
    ],
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: [
      'To the fullest extent permitted by law, Zyglo Tech Enterprise Pvt. Ltd., its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or goodwill — arising from or related to your use of our services, even if advised of the possibility of such damages.',
      'Our total aggregate liability to you for any claim arising out of or relating to these Terms or our services, regardless of the form of action, shall not exceed the total amount paid by you to Zyglo in the three (3) months immediately preceding the event giving rise to the claim.',
      'Some jurisdictions do not allow limitation of liability for certain types of damages. In such jurisdictions, our liability is limited to the minimum extent permitted by law.',
    ],
  },
  {
    id: 'termination',
    title: '10. Termination',
    content: [
      'Either party may terminate a project engagement by providing 30 days\' written notice to the other party. Upon termination, the client shall pay for all work completed up to the termination date, including any non-recoverable third-party costs incurred by Zyglo on the client\'s behalf.',
      'Zyglo may terminate access to any service immediately and without notice if you breach these Terms, engage in fraudulent activity, or fail to pay amounts due.',
      'Upon termination, provisions that by their nature should survive (including intellectual property rights, payment obligations, confidentiality, disclaimers, and limitation of liability) shall remain in effect.',
    ],
  },
  {
    id: 'governing-law',
    title: '11. Governing Law & Dispute Resolution',
    content: [
      'These Terms are governed by and construed in accordance with the laws of India, without regard to conflict-of-law principles. The courts of Chennai, Tamil Nadu, India shall have exclusive jurisdiction over any dispute arising out of or in connection with these Terms or our services.',
      'Before initiating any formal legal proceedings, both parties agree to attempt to resolve disputes amicably through good-faith negotiation. If a dispute cannot be resolved within 30 days of written notice, either party may escalate the matter to formal legal proceedings.',
    ],
  },
  {
    id: 'general',
    title: '12. General Provisions',
    content: [
      'These Terms, together with any project-specific agreements, constitute the entire agreement between you and Zyglo with respect to the subject matter herein and supersede all prior or contemporaneous communications.',
      'If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect. Our failure to enforce any right or provision of these Terms shall not constitute a waiver of that right or provision.',
      'You may not assign or transfer these Terms or any rights hereunder without our prior written consent. Zyglo may freely assign these Terms in connection with a merger, acquisition, or sale of substantially all of its assets.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-24">

        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-[12px] text-slate-500">
          <Link href="/" className="transition hover:text-slate-300">Home</Link>
          <span>/</span>
          <span style={{ color: '#06CCE8' }}>Terms of Service</span>
        </div>

        {/* Header */}
        <div className="mb-12 border-b border-white/[0.07] pb-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: '#06CCE8' }}>
            Legal · Zyglo Tech Enterprise
          </p>
          <h1 className="text-[32px] font-black tracking-tight text-white sm:text-[44px] lg:text-[52px]">
            Terms of Service
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-400">
            Please read these Terms carefully before using any Zyglo service. By accessing or using our services you agree to be bound by these Terms.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-[12px] text-slate-500">
            <span>Effective date: <span className="text-slate-300">1 January 2026</span></span>
            <span>Last updated: <span className="text-slate-300">17 May 2026</span></span>
            <span>Governed by: <span className="text-slate-300">Laws of India</span></span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 rounded-2xl border border-white/[0.07] p-6" style={{ background: '#0B1424' }}>
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: '#06CCE8' }}>
            Table of Contents
          </p>
          <ol className="grid gap-y-2 sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-[13px] text-slate-400 transition hover:text-cyan-400"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="mb-5 text-[18px] font-bold text-white sm:text-[21px]">{s.title}</h2>
              <div className="space-y-4">
                {s.content.map((para, i) => (
                  <p key={i} className="text-[14px] leading-7 text-slate-400">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 rounded-2xl border border-white/[0.08] p-8 text-center" style={{ background: '#0B1424' }}>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#06CCE8' }}>Questions About These Terms?</p>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-slate-400">
            Contact our legal and support team. We aim to respond to all enquiries within 2 business days.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:zyglotech@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-bold text-[#060B17] transition"
              style={{ background: '#06CCE8' }}
            >
              zyglotech@gmail.com
            </a>
            <a
              href="https://wa.me/919943907643"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[13px] font-medium text-white transition hover:border-white/20"
            >
              💬 WhatsApp: +91 9943 907 643
            </a>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[12px] text-slate-500">
          <Link href="/legal/privacy-policy" className="transition hover:text-cyan-400">Privacy Policy</Link>
        </div>

      </div>
    </div>
  );
}
