import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Zyglo Tech Enterprise',
  description: 'Refund, cancellation, and dispute terms for AI credits, subscriptions, and project-based services at Zyglo Tech Enterprise.',
};

const sections = [
  {
    id: 'overview',
    title: '1. Overview',
    content: [
      'This Refund & Cancellation Policy applies to all purchases made through Zyglo Tech Enterprise Pvt. Ltd. ("Zyglo," "we," "us," or "our") websites and platforms, including AI credit top-ups, subscription/retainer services, and project-based engagements (website and application development, ERP setup, AI chatbots, and related consulting).',
      'By making a purchase or engaging our services, you agree to the terms below. This policy should be read together with our Terms of Service.',
    ],
  },
  {
    id: 'ai-credits',
    title: '2. AI Credits & Wallet Top-Ups',
    content: [
      'AI credits purchased on our platform are non-transferable and do not expire. Because credits are made available for use immediately upon successful payment, purchases are non-refundable once the credits have been added to your account.',
      'If a payment is deducted but credits are not credited to your account due to a technical or gateway error, contact us within 7 days of the transaction with your payment reference. We will verify the transaction and either credit the correct balance or issue a full refund to the original payment method within 5–7 business days.',
      'Duplicate charges caused by a payment gateway retry or network error are eligible for a full refund of the duplicate amount upon verification.',
    ],
  },
  {
    id: 'subscriptions',
    title: '3. Subscription & Retainer Services',
    content: [
      'For subscription-based or monthly retainer services, you may cancel future billing at any time by notifying us at least 7 days before the next billing cycle. Cancellation stops future charges; it does not refund the current billing period, for which service has already commenced.',
      'No pro-rated refunds are issued for partial use of a billing cycle unless required by applicable law.',
    ],
  },
  {
    id: 'project-services',
    title: '4. Project-Based Services',
    content: [
      'For fixed-scope engagements (e.g., website/app development, ERP implementation), cancellation terms are governed by the project proposal or invoice agreed with the client. Unless otherwise specified in that agreement:',
      'An advance/deposit paid to commence work is non-refundable once work has started, as it covers time and resources already committed.',
      'If a client cancels a project before any work has begun, the advance is refundable in full, less any payment gateway or transaction charges actually incurred.',
      'If a client cancels after partial delivery, Zyglo will invoice for work completed to date; any amount paid in excess of the value of completed work will be refunded.',
    ],
  },
  {
    id: 'process',
    title: '5. How to Request a Refund',
    content: [
      'To request a refund or raise a billing dispute, email zyglotech@gmail.com with your order/transaction ID, the date of payment, and the reason for the request. You may also reach us on WhatsApp at +91 9943 907 643.',
      'We aim to acknowledge refund requests within 2 business days and resolve them within 7 business days of approval.',
    ],
  },
  {
    id: 'method',
    title: '6. Refund Method & Timelines',
    content: [
      'Approved refunds are issued to the original payment method used for the transaction (card, UPI, or net banking) via our payment gateway partner. Depending on your bank or card issuer, funds may take 5–10 business days to reflect after a refund is initiated.',
      'Zyglo does not process refunds in cash or to a different account/payment method than the one used for the original transaction.',
    ],
  },
  {
    id: 'exceptions',
    title: '7. Exceptions',
    content: [
      'We reserve the right to decline a refund request where credits or services have already been substantially consumed, where the request is made outside the timelines stated in this policy, or where there is reasonable evidence of misuse or fraud.',
      'Statutory refund rights under applicable Indian consumer protection law are not affected by this policy.',
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-24">

        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-[12px] text-slate-500">
          <Link href="/" className="transition hover:text-slate-300">Home</Link>
          <span>/</span>
          <span style={{ color: '#06CCE8' }}>Refund & Cancellation Policy</span>
        </div>

        {/* Header */}
        <div className="mb-12 border-b border-white/[0.07] pb-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: '#06CCE8' }}>
            Legal · Zyglo Tech Enterprise
          </p>
          <h1 className="text-[32px] font-black tracking-tight text-white sm:text-[44px] lg:text-[52px]">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-400">
            Our terms for refunds, cancellations, and billing disputes across AI credits, subscriptions, and project-based services.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-[12px] text-slate-500">
            <span>Effective date: <span className="text-slate-300">1 January 2026</span></span>
            <span>Last updated: <span className="text-slate-300">7 September 2026</span></span>
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
          <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#06CCE8' }}>Need a Refund or Have a Billing Question?</p>
          <p className="mx-auto mt-3 max-w-md text-[14px] text-slate-400">
            Reach our support team with your transaction details. We aim to respond within 2 business days.
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
          <Link href="/legal/terms-of-service" className="transition hover:text-cyan-400">Terms of Service</Link>
          <Link href="/legal/privacy-policy" className="transition hover:text-cyan-400">Privacy Policy</Link>
        </div>

      </div>
    </div>
  );
}
