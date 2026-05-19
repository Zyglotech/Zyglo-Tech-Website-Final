import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ServiceSchema } from '@/components/ServiceSchema';

interface PageShellProps {
  division?: 'IT' | 'AI';
  label?: string;
  title: string;
  description: string;
  cta?: { label: string; href: string };
  features?: string[];
  /** URL path for this service page (e.g. '/services/ai-chatbots') — used for Service schema */
  servicePath?: string;
  /** Service category for schema (e.g. 'AI Chatbot Development') */
  serviceCategory?: string;
}

export function PageShell({ division, label, title, description, cta, features, servicePath, serviceCategory }: PageShellProps) {
  const isTech = division === 'IT';
  const accentColor = isTech ? '#3B82F6' : '#06CCE8';
  const accentBg = isTech ? 'rgba(59,130,246,0.08)' : 'rgba(6,204,232,0.08)';
  const accentBorder = isTech ? 'rgba(59,130,246,0.2)' : 'rgba(6,204,232,0.2)';

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    ...(division ? [{ label: division === 'IT' ? 'IT Services Division' : 'AI Services Division' }] : []),
    { label: title },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-20 lg:px-8">
      {/* Breadcrumb with structured data */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Service structured data */}
      {servicePath && (
        <ServiceSchema
          name={title}
          description={description}
          url={servicePath}
          category={serviceCategory}
        />
      )}

      <div className="rounded-2xl border p-6 sm:p-10" style={{ borderColor: accentBorder, background: '#0B1424' }}>
        {/* Division badge */}
        {division && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ borderColor: accentBorder, background: accentBg, color: accentColor }}>
            {division === 'IT' ? 'IT Services Division' : 'AI Services Division'}
          </div>
        )}
        {label && !division && (
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#06CCE8' }}>
            {label}
          </p>
        )}

        <h1 className="text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[44px]">{title}</h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-7 text-slate-400 sm:mt-5 sm:text-[16px] sm:leading-8">{description}</p>

        {features && features.length > 0 && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[14px] text-slate-300">
                <span className="mt-1 h-4 w-4 shrink-0 text-[10px]" style={{ color: accentColor }} aria-hidden="true">✓</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {cta && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={cta.href}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[14px] font-bold text-[#060B17] transition"
              style={{ background: accentColor }}>
              {cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-[14px] font-medium text-white transition hover:border-white/20">
              💬 WhatsApp: +91 9943 907 643
            </a>
          </div>
        )}
      </div>

      {/* Contact strip */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Call Us', value: '+91 9943 907 643', href: 'tel:+919943907643' },
          { label: 'Email Us', value: 'zyglotech@gmail.com', href: 'mailto:zyglotech@gmail.com' },
          { label: 'WhatsApp', value: '+91 9943 907 643', href: 'https://wa.me/919943907643' },
        ].map((c) => (
          <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex flex-col rounded-xl border border-white/[0.06] bg-[#0B1424] px-5 py-4 transition hover:border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#06CCE8' }}>{c.label}</span>
            <span className="mt-1.5 text-[13.5px] font-semibold text-white">{c.value}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
