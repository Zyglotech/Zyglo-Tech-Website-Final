import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Building2, GraduationCap, Shield, Award, Rocket, Heart, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Salem AI & IT Company',
  description: 'Zyglo Tech Enterprise is an AI and IT solutions company headquartered in Salem, building custom AI chatbots, WhatsApp automation agents, GST-ready ERP systems, and mobile/web apps for Indian SMEs.',
  keywords: ['Zyglo Tech Enterprise', 'about Zyglo Tech', 'Salem IT company', 'AI company India', 'Zyglo AI solutions'],
  openGraph: {
    title: 'About Zyglo Tech Enterprise | Salem AI & IT Company',
    description: 'Zyglo Tech Enterprise builds AI chatbots, WhatsApp automation, GST-ready ERP, and mobile/web apps for 50+ Indian businesses.',
    url: 'https://www.zyglotech.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Zyglo Tech Enterprise',
    description: 'AI chatbots, ERP systems, and automation for 50+ Indian businesses.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/about' },
};

const timeline = [
  { year: '2021', title: 'Founded in Salem', desc: 'Zyglo Tech was founded with a mission to make enterprise AI accessible to every Indian business.' },
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
              Built in Salem.<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Built for India.
              </span>
            </h1>
            <p className="mt-6 text-[17px] leading-8 text-slate-400">
              Zyglo Tech Enterprise is an artificial intelligence and IT solutions company headquartered in Salem, Tamil Nadu. We build custom AI chatbots, WhatsApp automation agents, GST-ready ERP systems, and mobile & web applications for small and medium enterprises — giving every Indian business access to world-class technology at an accessible price.
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
