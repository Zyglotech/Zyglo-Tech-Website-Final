import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/data/case-studies';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Case Studies — Real Results from Real Businesses',
  description: 'See how Zyglo Tech Enterprise helped clinics, retailers, restaurants, and e-commerce brands grow with AI chatbots, ERP, and automation.',
  openGraph: {
    title: 'Case Studies | Zyglo Tech Enterprise',
    description: 'Real results from AI chatbots, ERP, and automation for Indian businesses.',
    url: 'https://www.zyglotech.com/case-studies',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Case Studies | Zyglo Tech' },
  alternates: { canonical: 'https://www.zyglotech.com/case-studies' },
};

const colorMap: Record<string, string> = {
  Healthcare: '#34D399',
  Retail: '#60A5FA',
  'Food & Beverage': '#FB923C',
  'E-Commerce': '#A78BFA',
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen" style={{ background: '#060B17' }}>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]} />

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 px-4 py-1.5" style={{ background: 'rgba(52,211,153,0.08)' }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">Real Results</span>
        </div>

        <h1 className="mt-5 text-[32px] font-black leading-tight text-white sm:text-[46px]">
          Case Studies
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-400">
          How Indian businesses are growing with AI chatbots, ERP systems, and workflow automation built by Zyglo Tech Enterprise.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {caseStudies.map((cs) => (
            <Link key={cs.slug} href={`/case-studies/${cs.slug}`}
              className="group flex flex-col rounded-2xl border border-white/[0.07] p-6 transition hover:border-cyan-400/20"
              style={{ background: '#0B1424' }}>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full px-3 py-0.5 text-[10.5px] font-bold" style={{ background: `${colorMap[cs.industry] ?? '#06CCE8'}18`, color: colorMap[cs.industry] ?? '#06CCE8', border: `1px solid ${colorMap[cs.industry] ?? '#06CCE8'}30` }}>
                  {cs.industry}
                </span>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-600">{cs.service}</span>
              </div>

              <h2 className="text-[18px] font-bold leading-snug text-white group-hover:text-cyan-400 transition">{cs.title}</h2>
              <p className="mt-2 flex-1 text-[13px] leading-6 text-slate-500">{cs.excerpt}</p>

              <div className="mt-6 flex items-end justify-between">
                <div>
                  <p className="text-[28px] font-black" style={{ color: colorMap[cs.industry] ?? '#06CCE8' }}>{cs.metric}</p>
                  <p className="text-[11px] text-slate-500">{cs.metricLabel}</p>
                </div>
                <span className="flex items-center gap-1 text-[12px] font-semibold text-cyan-400 group-hover:text-cyan-300">
                  Read case study <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-white/[0.08] p-8 text-center sm:p-12" style={{ background: '#0F1C32' }}>
          <h2 className="text-[24px] font-black text-white">Want results like these?</h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] text-slate-400">Book a free consultation and we&apos;ll show you exactly how we can help your business.</p>
          <Link href="/demo" className="mt-6 inline-block rounded-xl px-8 py-3 text-[13px] font-bold text-[#060B17]" style={{ background: '#06CCE8' }}>
            Book Free Consultation →
          </Link>
        </div>
      </section>
    </main>
  );
}
