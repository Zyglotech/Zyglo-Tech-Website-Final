import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle, Building2, GraduationCap, Shield, Award, Rocket, Heart, Globe, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Zyglo Tech Enterprise | Chennai AI & IT Company',
  description: 'Founded in Chennai by Vignesh & Gokul Raaj SS. Zyglo Tech builds AI chatbots, ERP systems, and automation for 50+ Indian businesses.',
  keywords: ['about Zyglo Tech', 'Chennai IT company', 'AI company India', 'Zyglo Tech founders', 'Vignesh Zyglo', 'Gokul Raaj'],
  openGraph: {
    title: 'About Zyglo Tech Enterprise | Chennai AI & IT Company',
    description: 'Founded in Chennai by Vignesh & Gokul Raaj SS. AI chatbots, ERP systems, and automation for 50+ Indian businesses.',
    url: 'https://www.zyglo.tech/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Zyglo Tech Enterprise',
    description: 'Founded in Chennai. AI chatbots, ERP systems, and automation for 50+ Indian businesses.',
  },
  alternates: { canonical: 'https://www.zyglo.tech/about' },
};

const timeline = [
  { year: '2021', title: 'Founded in Chennai', desc: 'Vignesh and Gokul Raaj SS founded Zyglo Tech with a mission to make enterprise AI accessible to every Indian business.' },
  { year: '2022', title: 'First 50 Clients', desc: 'Delivered web platforms, GST-ready ERP and automation solutions to 50+ businesses across Tamil Nadu.' },
  { year: '2023', title: 'AI Division Launch', desc: 'Launched the AI Services Division — bringing WhatsApp chatbots, lead agents, and workflow automation to market.' },
  { year: '2024', title: '50+ Businesses', desc: 'Crossed 50 businesses served. Launched Zyglo Academy for corporate and student upskilling.' },
  { year: '2025', title: 'Scale & Expand', desc: 'Expanded to serve clients across India. 35+ enterprise-grade products shipped. 100+ students trained.' },
];

const values = [
  { icon: Rocket, title: 'Innovation First', desc: 'We build with the latest AI, automation and cloud technologies — always ahead of the curve.' },
  { icon: Heart, title: 'Client Obsessed', desc: 'Every decision starts with the client. We measure success by the results our clients achieve.' },
  { icon: Shield, title: 'India-Native', desc: 'Built for how India works — GST-ready, WhatsApp-first, Hindi & English support, and local compliance.' },
  { icon: Globe, title: 'Global Quality', desc: 'World-class engineering standards. Scalable, secure, production-grade systems at every tier.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(6,204,232,0.1), transparent)' }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400"
              style={{ background: 'rgba(6,204,232,0.08)' }}>
              Our Story
            </span>
            <h1 className="mt-6 text-[40px] font-black tracking-tight text-white sm:text-[54px]">
              Built in Chennai.<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Built for India.
              </span>
            </h1>
            <p className="mt-6 text-[17px] leading-8 text-slate-400">
              Zyglo Tech Enterprise gives every Indian business — from local shops to large enterprises — access to world-class AI and technology at an accessible price.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-white/[0.06] py-16" style={{ background: 'rgba(11,20,36,0.5)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: '50+', label: 'Businesses Served', icon: Building2 },
              { value: '100+', label: 'Students Trained', icon: GraduationCap },
              { value: '35+', label: 'Products Shipped', icon: Award },
              { value: '99.9%', label: 'Platform Uptime', icon: Shield },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto mb-3 h-6 w-6 text-cyan-400/50" />
                <p className="text-[38px] font-black tracking-tight text-white">{s.value}</p>
                <p className="mt-1 text-[13px] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Leadership</span>
              <h2 className="mt-4 text-[34px] font-black tracking-tight text-white">
                Meet the founders.
              </h2>
              <p className="mt-5 text-[16px] leading-8 text-slate-400">
                Zyglo was founded by two Chennai engineers who believed great technology should not be limited to large corporations with massive budgets. Every product we ship reflects that conviction.
              </p>
              <p className="mt-4 text-[16px] leading-8 text-slate-400">
                We build India-first — WhatsApp channels, Hindi & Tamil language support, GST & compliance baked in, and pricing designed for Indian SMEs and enterprises alike.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-[#060B17]"
                  style={{ background: '#06CCE8' }}>
                  Work With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[14px] font-medium text-white">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>

            <div className="space-y-5">
              {[
                {
                  name: 'Vignesh',
                  role: 'CEO & Co-Founder',
                  initials: 'V',
                  color: '#06CCE8',
                  desc: 'Drives product vision, business strategy, and client success. Obsessed with building AI that delivers measurable, real-world results for Indian businesses.',
                  tags: ['Product Vision', 'AI Strategy', 'Client Relations'],
                },
                {
                  name: 'Gokul Raaj SS',
                  role: 'CTO & Co-Founder',
                  initials: 'G',
                  color: '#3B82F6',
                  desc: 'Architects the engineering foundation across AI, ERP and automation systems. Committed to scalable, production-grade product engineering at every layer.',
                  tags: ['System Architecture', 'AI Engineering', 'ERP & Automation'],
                },
              ].map((founder) => (
                <div key={founder.name} className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-7">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Founder avatar SVG */}
                    <div className="relative h-14 w-14 shrink-0">
                      <svg viewBox="0 0 56 56" className="h-full w-full" fill="none">
                        <rect width="56" height="56" rx="14" fill={`${founder.color}18`} stroke={`${founder.color}30`} strokeWidth="1" />
                        <circle cx="28" cy="22" r="9" fill={`${founder.color}40`} />
                        <ellipse cx="28" cy="46" rx="14" ry="10" fill={`${founder.color}25`} />
                        <text x="28" y="27" textAnchor="middle" fontSize="13" fontWeight="900" fill={founder.color} fontFamily="system-ui">{founder.initials}</text>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[17px] font-black text-white">{founder.name}</p>
                      <p className="text-[12px] font-semibold" style={{ color: founder.color }}>{founder.role}</p>
                    </div>
                  </div>
                  <p className="text-[14px] leading-7 text-slate-400">{founder.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {founder.tags.map((tag) => (
                      <span key={tag} className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-white/[0.06] py-24" style={{ background: 'rgba(11,20,36,0.4)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Our Journey</span>
            <h2 className="mt-4 text-[34px] font-black tracking-tight text-white">From startup to 50+ clients.</h2>
          </div>
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 via-blue-400/20 to-transparent" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={item.year} className="flex gap-6">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-[#0B1424] text-[11px] font-black text-cyan-400">
                    {i === timeline.length - 1 ? (
                      <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-[11px] font-bold text-cyan-400">{item.year}</p>
                    <h3 className="mt-0.5 text-[16px] font-bold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-6 text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">What We Stand For</span>
            <h2 className="mt-4 text-[34px] font-black tracking-tight text-white">Our values drive everything.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/[0.07] bg-[#0B1424] p-7 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                  <v.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-[16px] font-bold text-white">{v.title}</h3>
                <p className="mt-3 text-[13.5px] leading-6 text-slate-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <h2 className="text-[32px] font-black tracking-tight text-white sm:text-[44px]">
            Ready to work with us?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] text-slate-400">
            Join 50+ businesses that trust Zyglo Tech to deliver technology that works — on time, on budget, and built for growth.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/demo" className="btn-primary text-[15px] px-8 py-4">
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-secondary text-[15px] px-8 py-4">
              View Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
