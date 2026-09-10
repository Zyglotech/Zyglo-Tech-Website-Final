import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Users2, ShieldCheck, Zap, Rocket, Heart, Shield, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Chennai AI & IT Company',
  description: 'Zyglo Tech Enterprise is an AI and IT solutions company based in Chennai, building custom AI chatbots, WhatsApp automation agents, GST-ready ERP systems, and mobile/web apps for Indian SMEs.',
  keywords: ['Zyglo Tech Enterprise', 'about Zyglo Tech', 'Chennai IT company', 'AI company India', 'Zyglo AI solutions'],
  openGraph: {
    title: 'About Zyglo Tech Enterprise | Chennai AI & IT Company',
    description: 'Zyglo Tech Enterprise builds AI chatbots, WhatsApp automation, GST-ready ERP, and mobile/web apps for Indian SMEs.',
    url: 'https://www.zyglotech.com/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Zyglo Tech Enterprise',
    description: 'AI chatbots, ERP systems, and automation for Indian SMEs.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/about' },
};

const founderPoints = [
  { icon: Users2, title: 'Direct access to the team', desc: 'No account managers, no hand-offs — you work directly with the people actually building your system.' },
  { icon: Zap, title: 'Full attention, not a queue', desc: 'As a new studio, your project gets our full focus instead of being one of fifty accounts on a support board.' },
  { icon: ShieldCheck, title: 'Built right from day one', desc: 'Modern stack, GST-ready by design, and India-resident data — the same standards we\'d want for our own business.' },
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
              <span className="text-cyan-400">
                Built for India.
              </span>
            </h1>
            <p className="mt-6 text-[17px] leading-8 text-slate-400">
              Zyglo Tech Enterprise is an artificial intelligence and IT solutions company based in Chennai, Tamil Nadu. We build custom AI chatbots, WhatsApp automation agents, GST-ready ERP systems, and mobile & web applications for small and medium enterprises — giving every Indian business access to world-class technology at an accessible price.
            </p>
          </div>
        </div>
      </section>

      {/* Why work with a new studio */}
      <section className="border-t border-white/[0.06] py-20" style={{ background: 'rgba(11,20,36,0.4)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Why Zyglo</span>
            <h2 className="mt-4 text-[34px] font-black tracking-tight text-white">We're new. Here's what that gets you.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-slate-400">
              Zyglo Tech Enterprise is a young studio — we're not going to pretend otherwise. What we lack in a long client roster, we make up for in attention: every project right now gets built by the founding team directly, not handed off down a chain.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {founderPoints.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/[0.07] bg-[#0B1424] p-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                  <p.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-[15.5px] font-bold text-white">{p.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-6 text-slate-400">{p.desc}</p>
              </div>
            ))}
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
            Be one of our first clients and work directly with the team building your system — on time, on budget, and built for growth.
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
