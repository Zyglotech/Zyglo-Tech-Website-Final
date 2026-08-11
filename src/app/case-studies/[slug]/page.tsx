import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, Layers } from 'lucide-react';
import { caseStudies, getCaseStudyBySlug } from '@/data/case-studies';
import { Breadcrumb } from '@/components/Breadcrumb';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.excerpt,
    openGraph: {
      title: `${cs.title} | Zyglo Tech Case Study`,
      description: cs.excerpt,
      url: `https://www.zyglotech.com/case-studies/${slug}`,
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: cs.title, description: cs.excerpt },
    alternates: { canonical: `https://www.zyglotech.com/case-studies/${slug}` },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <main className="min-h-screen" style={{ background: '#060B17' }}>
      <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: cs.client },
        ]} />

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-0.5 text-[10.5px] font-bold text-cyan-400">{cs.industry}</span>
          <span className="text-[12px] text-slate-500">{cs.service}</span>
          <span className="flex items-center gap-1 text-[12px] text-slate-500"><Clock className="h-3 w-3" aria-hidden="true" />{cs.timeline}</span>
        </div>

        <h1 className="text-[28px] font-black leading-tight text-white sm:text-[36px]">{cs.title}</h1>
        <p className="mt-4 text-[15px] leading-7 text-slate-400">{cs.excerpt}</p>

        {/* Metric highlight */}
        <div className="mt-8 rounded-2xl border border-cyan-400/20 p-6 text-center" style={{ background: 'rgba(6,204,232,0.05)' }}>
          <p className="text-[48px] font-black text-cyan-400">{cs.metric}</p>
          <p className="text-[14px] font-semibold text-slate-400">{cs.metricLabel}</p>
        </div>

        {/* Challenge */}
        <section className="mt-12">
          <h2 className="text-[20px] font-black text-white">The Challenge</h2>
          <p className="mt-3 text-[15px] leading-8 text-slate-300">{cs.challenge}</p>
        </section>

        {/* Solution */}
        <section className="mt-10">
          <h2 className="text-[20px] font-black text-white">Our Solution</h2>
          <p className="mt-3 text-[15px] leading-8 text-slate-300">{cs.solution}</p>
        </section>

        {/* Results */}
        <section className="mt-10">
          <h2 className="text-[20px] font-black text-white">Results</h2>
          <ul className="mt-4 space-y-3">
            {cs.results.map((r) => (
              <li key={r} className="flex items-start gap-3 text-[14px] text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech stack */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-[16px] font-bold text-white">
            <Layers className="h-4 w-4 text-slate-500" aria-hidden="true" /> Tech Stack
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {cs.techStack.map((t) => (
              <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-slate-400">{t}</span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-white/[0.08] p-8 text-center" style={{ background: '#0F1C32' }}>
          <h3 className="text-[20px] font-black text-white">Want similar results?</h3>
          <p className="mt-2 text-[13px] text-slate-400">Book a free consultation — we&apos;ll build a custom solution for your business.</p>
          <Link href="/demo" className="mt-5 inline-block rounded-xl px-8 py-3 text-[13px] font-bold text-[#060B17]" style={{ background: '#06CCE8' }}>
            Book Free Consultation →
          </Link>
        </div>

        <Link href="/case-studies" className="mt-10 inline-flex items-center gap-2 text-[13px] font-semibold text-cyan-400 hover:text-cyan-300">
          <ArrowLeft className="h-3.5 w-3.5" />Back to all case studies
        </Link>
      </article>
    </main>
  );
}
