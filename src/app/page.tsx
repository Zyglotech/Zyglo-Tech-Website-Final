'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Bot, Zap, GraduationCap,
  CheckCircle2,
  Shield, Globe, Users, Clock, Award,
  Building2, Cpu, Code2, Smartphone, Search,
  MapPin, Brain, Target, ChevronDown,
  Rocket, Heart, BadgeCheck, Layers, TrendingUp,
} from 'lucide-react';
import { ChatbotDemo } from '@/components/ChatbotDemo';
import { DashboardMockupPanel } from '@/components/DashboardMockupPanel';

/* ─────────────────────── DATA ─────────────────────────────── */

const stats = [
  { value: 'New', label: 'Studio, Full Attention', icon: Building2 },
  { value: 'Direct', label: 'Access to the Builders', icon: Users },
  { value: 'Free', label: 'Initial Consultation', icon: Award },
  { value: 'India', label: 'Hosted & Compliant', icon: Shield },
];

const itServices = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Modern, responsive, and high-performance websites tailored for your business.',
    href: '/services/web-development',
  },
  {
    icon: Smartphone,
    title: 'App Development',
    desc: 'Custom Android, iOS, and cross-platform applications built for growth.',
    href: '/services/app-development',
  },
  {
    icon: Cpu,
    title: 'ERP Setup & Customization',
    desc: 'End-to-end ERP solutions customised to streamline your business operations.',
    href: '/services/erp-solutions',
  },
  {
    icon: GraduationCap,
    title: 'College & Institution Projects',
    desc: 'Innovative academic, IoT, AI, and software projects for students and institutions.',
    href: '/services/college-projects',
  },
  {
    icon: MapPin,
    title: 'Google Business & Local SEO',
    desc: 'Professional Google Business setup, optimisation, and local SEO for maximum visibility.',
    href: '/services/google-business',
  },
];

const aiServices = [
  {
    icon: Bot,
    title: 'AI Chatbot & Appointment Agents',
    desc: 'AI-powered chat systems for customer support, booking automation, and engagement.',
    href: '/services/ai-chatbots',
  },
  {
    icon: Target,
    title: 'AI Sales & Lead Qualification',
    desc: 'Automated AI agents that engage, qualify, and convert leads into valuable customers.',
    href: '/services/ai-agents',
  },
  {
    icon: Zap,
    title: 'Workflow Automation',
    desc: 'Smart automation systems that eliminate repetitive tasks and boost productivity.',
    href: '/services/workflow-automation',
  },
  {
    icon: Brain,
    title: 'Personal & Business AI Assistants',
    desc: 'Intelligent AI assistants to manage tasks, data, communication, and daily operations.',
    href: '/services/ai-assistants',
  },
  {
    icon: Search,
    title: 'SEO, AEO & GEO Ranking',
    desc: 'AI-driven strategies for SEO, AEO & GEO to improve visibility, rankings, and brand authority.',
    href: '/services/seo-aeo-geo',
  },
];

const coreValues = [
  {
    icon: Rocket,
    title: 'Innovative Solutions',
    desc: 'Cutting-edge AI and automation built for the real-world demands of Indian businesses today and tomorrow.',
  },
  {
    icon: Heart,
    title: 'Client Focused',
    desc: 'Every decision starts with your outcomes — you talk directly to the person building your system, not a relayed message.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Delivered',
    desc: 'Reliable, secure, production-grade systems, shipped on the timeline we agree to upfront.',
  },
  {
    icon: Layers,
    title: 'Scalable Growth',
    desc: 'Built to grow with you — from 10 users to 10,000, every solution scales without an architecture rebuild.',
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    desc: 'We understand your goals, workflow and tech landscape to craft a precise digital roadmap.',
  },
  {
    step: '02',
    title: 'Design & Architecture',
    desc: 'UI/UX, API design, data models and system blueprints — everything scoped before a line of code.',
  },
  {
    step: '03',
    title: 'Build & Integrate',
    desc: 'Agile two-week sprints. We develop, test and connect your system with your existing stack.',
  },
  {
    step: '04',
    title: 'Launch & Scale',
    desc: 'Confident deployment, team training, SLA monitoring and ongoing performance optimisation.',
  },
];

const faqs = [
  {
    q: 'How quickly can Zyglo deploy an AI chatbot or automation for my business?',
    a: 'Most AI chatbot and workflow automation projects go live within 2–3 weeks following a structured discovery and sprint-based build process.',
  },
  {
    q: 'Do you build mobile apps for both Android and iOS?',
    a: 'Yes. We develop native Android, native iOS, and cross-platform apps using Flutter and React Native — whichever best suits your budget and requirements.',
  },
  {
    q: 'Is your ERP platform compliant with Indian GST and tax regulations?',
    a: 'Absolutely. Our ERP is GST-ready with automated GSTR-1, GSTR-3B and annual filing. Indian accounting standards and TDS/TCS tracking are included by default.',
  },
  {
    q: 'What is AEO and GEO ranking, and why does it matter?',
    a: 'AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) ensure your business appears in AI search results (ChatGPT, Gemini, Perplexity). As AI search grows, traditional SEO alone is no longer enough.',
  },
  {
    q: 'Do you handle college and academic final-year projects?',
    a: 'Yes. We deliver final-year projects, IoT solutions, AI prototypes and software systems for engineering colleges and institutions — with documentation, presentation support and source code.',
  },
];

/* ─────────────────────── ANIMATIONS ───────────────────────── */

// Used only for whileInView sections (below the fold — safe to start at opacity 0)
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.09 } } };

/* ─────────────────────── SUB-COMPONENTS ───────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400"
      style={{ background: 'rgba(6,204,232,0.08)' }}>
      {children}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 py-5 text-left text-[14px] font-semibold text-white transition hover:text-cyan-300 sm:gap-4 sm:text-[15px]"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {q}
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="pb-5 text-[14px] leading-7 text-slate-400">{a}</p>}
    </div>
  );
}

/* ─────────────────────── PAGE ──────────────────────────────── */

export default function HomePage() {
  return (
    <div className="relative">

      {/* ═══════════════ HERO ════════════════════════════════ */}
      <section className="relative overflow-hidden pt-14 pb-0 sm:pt-20 lg:pt-24" style={{ background: '#060B17' }}>
        {/* Layered backgrounds */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(6,204,232,0.09) 0%, transparent 65%)' }} />
        {/* Subtle noise / depth layer */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(6,11,23,0) 0%, rgba(6,11,23,0.5) 100%)' }} />

        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(rgba(6,204,232,1) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* Left — copy (no opacity:0 initial — content must be visible immediately for LCP) */}
            <div className="hero-enter">
              <div style={{ animationDelay: '0ms' }} className="hero-child">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[12px] font-medium text-slate-300">
                  AI & IT Studio, Chennai
                </span>
              </div>

              <div style={{ animationDelay: '80ms' }} className="hero-child">
                <h1 className="mt-7 text-[34px] font-black leading-[1.05] tracking-[-0.025em] text-white text-balance sm:text-[50px] lg:text-[62px]">
                  <span className="text-cyan-400">Automate.</span>{' '}
                  <span className="text-white">Scale. Dominate.</span>
                </h1>
              </div>

              <div style={{ animationDelay: '160ms' }} className="hero-child">
                <p className="mt-6 text-[15px] leading-7 text-slate-400 sm:text-[17px] sm:leading-8">
                  ZYGLO builds <span className="font-semibold text-white">AI-powered chatbots, ERP systems, mobile apps and workflow automation</span> — turning Indian businesses into digital-first enterprises.
                </p>
              </div>

              <div style={{ animationDelay: '240ms' }} className="hero-child mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/demo" className="btn-primary text-[15px] px-8 py-4">
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right — Live dashboard preview */}
            <div className="relative mt-14 xl:mt-0" style={{ animation: 'heroFadeIn 1s ease 0.2s both' }}>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_0_1px_rgba(6,204,232,0.04)]" style={{ background: '#07101E' }}>

              {/* Panel header */}
              <div className="flex items-center gap-3 border-b border-white/[0.05] px-5 py-3.5" style={{ background: '#060D1A' }}>
                <span className="h-2 w-2 rounded-full" style={{ background: '#06CCE8' }} />
                <span className="text-[12px] font-semibold text-slate-300">Live operations overview</span>
              </div>

              {/* Dashboard layout */}
              <div className="grid xl:grid-cols-[160px_1fr]">

                {/* Sidebar */}
                <div className="hidden border-r border-white/[0.05] xl:flex xl:flex-col" style={{ background: '#060D1A' }}>
                  {/* Logo mark */}
                  <div className="flex items-center gap-2 border-b border-white/[0.05] px-3.5 py-3.5">
                    <div className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(6,204,232,0.22)' }}>
                      <span className="text-[8px] font-black text-cyan-400">Z</span>
                    </div>
                    <span className="text-[11px] font-black tracking-wider text-white">ZYGLO</span>
                    <span className="ml-auto rounded-md px-1.5 py-0.5 text-[7px] font-bold text-cyan-400" style={{ background: 'rgba(6,204,232,0.12)' }}>PRO</span>
                  </div>
                  <div className="flex-1 p-2.5 pt-3">
                    <p className="mb-2 px-2 text-[7.5px] font-bold uppercase tracking-[0.22em] text-slate-700">Main Menu</p>
                    {([
                      { label: 'Dashboard',   Icon: Layers,     active: true,  badge: null, color: '#06CCE8' },
                      { label: 'AI Chatbots', Icon: Bot,        active: false, badge: '3',  color: '#06CCE8' },
                      { label: 'Lead Agents', Icon: Target,     active: false, badge: null, color: '#06CCE8' },
                      { label: 'ERP Module',  Icon: Cpu,        active: false, badge: null, color: '#06CCE8' },
                      { label: 'Analytics',   Icon: TrendingUp, active: false, badge: null, color: '#06CCE8' },
                      { label: 'SEO / AEO',   Icon: Search,     active: false, badge: null, color: '#06CCE8' },
                    ] as { label: string; Icon: React.ElementType; active: boolean; badge: string | null; color: string }[]).map(({ label, Icon, active, badge, color }) => (
                      <div key={label}
                        className={`mb-0.5 flex items-center gap-2.5 rounded-xl px-2.5 py-[7px] text-[11px] transition ${active ? 'font-semibold text-cyan-300' : 'text-slate-600 hover:text-slate-400'}`}
                        style={active ? { background: 'rgba(6,204,232,0.09)', border: '1px solid rgba(6,204,232,0.15)' } : {}}>
                        <div className="h-[22px] w-[22px] flex-shrink-0 rounded-lg flex items-center justify-center"
                          style={{ background: active ? `${color}22` : 'rgba(255,255,255,0.03)' }}>
                          <Icon className="h-[10px] w-[10px]" style={{ color: active ? color : undefined }} />
                        </div>
                        <span className="flex-1 truncate">{label}</span>
                        {badge && (
                          <span className="rounded-full px-1.5 py-0.5 text-[7.5px] font-bold" style={{ color: '#06CCE8', background: 'rgba(6,204,232,0.15)' }}>
                            {badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Bottom user */}
                  <div className="border-t border-white/[0.05] p-3">
                    <div className="flex items-center gap-2 rounded-xl p-2" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <div className="h-[24px] w-[24px] rounded-full flex items-center justify-center text-[8px] font-black text-[#060B17] shrink-0"
                        style={{ background: '#06CCE8' }}>A</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9.5px] font-semibold text-slate-300 truncate">Admin</p>
                        <p className="text-[7.5px] text-slate-700 truncate">zyglotech.com</p>
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Main panel */}
                <DashboardMockupPanel />
              </div>
            </div>
            </div>
          </div>

        </div>

        {/* Fade to next section */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, #060B17)' }} />
      </section>

      {/* ═══════════════ TRUST STRIP ═════════════════════════ */}
      <section className="border-t border-white/[0.05] py-8" style={{ background: '#060B17' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Founder-Led Delivery', icon: Building2 },
              { label: 'WhatsApp AI Bots', icon: Bot },
              { label: 'Chennai', icon: MapPin },
            ].map(({ label, icon: Icon }) => (
              <span key={label} className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2 text-[12.5px] font-medium text-slate-400">
                <Icon className="h-3.5 w-3.5 text-cyan-400" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════════════════ */}
      <section className="border-y border-white/[0.06] py-12 sm:py-16" style={{ background: 'rgba(8,15,28,0.85)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/[0.07] px-6 py-8 text-center"
                style={{ background: '#0B1424' }}>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(6,204,232,0.5), transparent)' }} />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: 'rgba(6,204,232,0.1)' }}>
                  <s.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <p className="text-[44px] font-black leading-none tracking-tight text-cyan-400">{s.value}</p>
                <p className="mt-3 text-[13px] font-medium text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES (TWO DIVISIONS) ════════════ */}
      <section className="py-16 sm:py-28" id="services">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-10 text-center sm:mb-20">
            <motion.div variants={fadeUp}><SectionLabel>Our Services</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-5 text-[28px] font-black tracking-tight text-white sm:text-[42px] lg:text-[46px]">
              Two Divisions. One Powerful Partner.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 mx-auto max-w-xl text-[16px] text-slate-400">
              From building your digital presence to deploying intelligent AI agents — we handle every layer of your business technology.
            </motion.p>
          </motion.div>

          {/* IT Services Division */}
          <div className="mb-12 sm:mb-20">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                <Code2 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">Division 01</p>
                <h3 className="text-[22px] font-black text-white">IT Services Division</h3>
              </div>
              <div className="ml-auto hidden h-px flex-1 max-w-xs bg-gradient-to-r from-blue-400/30 to-transparent lg:block" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {itServices.map((svc, i) => (
                <motion.div key={svc.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group rounded-2xl border border-white/[0.06] bg-[#0B1424] p-5 transition hover:border-blue-400/25 hover:bg-[#0D1E38] hover:shadow-[0_8px_32px_rgba(59,130,246,0.07)]">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                    <svc.icon className="h-[18px] w-[18px] text-blue-400" />
                  </div>
                  <h4 className="text-[14px] font-bold leading-snug text-white">{svc.title}</h4>
                  <p className="mt-2 text-[12.5px] leading-5 text-slate-500">{svc.desc}</p>
                  <Link href={svc.href}
                    className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-blue-400 transition group-hover:gap-2">
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Services Division */}
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(167,139,250,0.15)' }}>
                <Brain className="h-5 w-5" style={{ color: '#A78BFA' }} />
              </div>
              <div>
                <p className="font-mono-label text-[11px] uppercase" style={{ color: '#A78BFA' }}>Division 02</p>
                <h3 className="font-display text-[22px] font-bold text-white">AI Services Division</h3>
              </div>
              <div className="ml-auto hidden h-px flex-1 max-w-xs lg:block" style={{ background: 'linear-gradient(to right, rgba(167,139,250,0.3), transparent)' }} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {aiServices.map((svc, i) => (
                <motion.div key={svc.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group rounded-2xl border border-white/[0.06] bg-[#0B1424] p-5 transition hover:border-[#A78BFA]/30 hover:bg-[#15122B] hover:shadow-[0_8px_32px_rgba(167,139,250,0.1)]">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'rgba(167,139,250,0.12)' }}>
                    <svc.icon className="h-[18px] w-[18px]" style={{ color: '#A78BFA' }} />
                  </div>
                  <h4 className="text-[14px] font-bold leading-snug text-white">{svc.title}</h4>
                  <p className="mt-2 text-[12.5px] leading-5 text-slate-500">{svc.desc}</p>
                  <Link href={svc.href}
                    className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold transition group-hover:gap-2"
                    style={{ color: '#A78BFA' }}>
                    Learn more <ArrowRight className="h-3 w-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ VISION & MISSION ════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24" style={{ background: 'rgba(11,20,36,0.4)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {[
              {
                label: 'Our Vision',
                icon: Globe,
                text: 'To be a global leader in technology and AI innovation, empowering businesses with intelligent solutions.',
                gradient: 'from-blue-400/10 to-transparent',
              },
              {
                label: 'Our Mission',
                icon: Target,
                text: 'To build smart, reliable, and future-ready digital solutions that create real impact and drive long-term growth.',
                gradient: 'from-cyan-400/10 to-transparent',
              },
            ].map((item, i) => (
              <motion.div key={item.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B1424] p-8">
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60`} />
                <div className="relative">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                    <item.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">{item.label}</p>
                  <p className="mt-3 text-[20px] font-bold leading-8 text-white">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CORE VALUES ═════════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-10 text-center sm:mb-14">
            <motion.h2 variants={fadeUp}
              className="text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              What makes us different.
            </motion.h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-[#0B1424] p-7 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                  <v.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-[16px] font-bold text-white">{v.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-6 text-slate-400">{v.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Extra differentiators grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Clock, title: '2–3 Week Delivery', desc: 'Sprint-based builds mean faster go-live without cutting corners.' },
              { icon: Shield, title: 'Indian Compliance First', desc: 'GST-ready, data-resident in India, and built for local regulatory requirements.' },
              { icon: Users, title: 'Dedicated Project Team', desc: 'Named PM, tech lead and support rep — not a ticketing queue.' },
            ].map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-[#0B1424] p-5">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                  <f.icon className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white">{f.title}</p>
                  <p className="mt-1 text-[13px] text-slate-400">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROCESS ═════════════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24" style={{ background: 'rgba(11,20,36,0.4)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-10 text-center sm:mb-16">
            <motion.h2 variants={fadeUp}
              className="text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              From idea to launch in weeks, not months.
            </motion.h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <motion.div key={p.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/[0.06] bg-[#0B1424] p-7">
                {i < process.length - 1 && (
                  <div className="pointer-events-none absolute -right-3 top-[37px] z-10 hidden items-center lg:flex">
                    <ArrowRight className="h-4 w-4 text-cyan-400/25" />
                  </div>
                )}
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20">
                  <span className="text-[12px] font-black text-cyan-400">{p.step}</span>
                </div>
                <h3 className="text-[16px] font-bold text-white">{p.title}</h3>
                <p className="mt-3 text-[13.5px] leading-6 text-slate-400">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ AI CHATBOT DEMO ════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-[24px] font-black tracking-tight text-white sm:text-[34px] lg:text-[38px]">
                Your smartest employee — live 24/7 on WhatsApp.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-slate-400">
                Our AI chatbots and appointment agents handle customer support, lead qualification, bookings, and FAQs automatically — without any human intervention.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Hindi & English natural language understanding',
                  'Instant lead capture and CRM push',
                  'Auto-schedule appointments and callbacks',
                  'Product catalogue & quote sharing on WhatsApp',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/services/ai-chatbots" className="btn-primary mt-8 w-fit">
                Explore AI Chatbots <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }}>
              <ChatbotDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW WE WORK ═════════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24" style={{ background: 'rgba(11,20,36,0.35)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-10 text-center sm:mb-14">
            <motion.div variants={fadeUp}><SectionLabel>How We Work</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-5 text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              What working with us actually looks like.
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-[15px] text-slate-400">
              We're a new studio, so instead of client logos we'll show you exactly how an engagement runs.
            </motion.p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Free discovery call', detail: 'We talk through what you actually need — no sales script, just an honest read on scope and fit.', color: '#06CCE8' },
              { step: '02', title: 'Fixed-price proposal', detail: 'A clear scope and price before any work starts. No hourly surprises.', color: '#14B8A6' },
              { step: '03', title: 'You work with the builders', detail: 'Direct access to whoever is writing your code — not a project manager relaying messages.', color: '#F59E0B' },
              { step: '04', title: 'Launch + support', detail: 'We stay on for fixes and iteration after launch — it\'s in the same relationship, not a separate contract.', color: '#10B981' },
            ].map((r, i) => (
              <motion.div key={r.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0B1424] p-6">
                <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full blur-3xl"
                  style={{ background: `${r.color}10` }} />
                <div className="relative">
                  <span className="text-[13px] font-black" style={{ color: r.color }}>{r.step}</span>
                  <p className="mt-3 text-[15px] font-bold text-white">{r.title}</p>
                  <p className="mt-2 text-[13px] leading-6 text-slate-400">{r.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═════════════════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-12 text-center">
            <motion.h2 variants={fadeUp}
              className="text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              Questions we get asked most.
            </motion.h2>
          </motion.div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] divide-y divide-white/[0.06] px-4 sm:px-8">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ══════════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-cyan-400/15 px-5 py-12 text-center sm:px-8 sm:py-16"
            style={{ background: 'linear-gradient(135deg, #0F1C32, #0B1424 50%, #0F1C32)' }}>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,204,232,0.5), transparent)' }} />
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: 'rgba(6,204,232,0.07)' }} />

            <SectionLabel>Partner With Zyglo</SectionLabel>
            <h2 className="mx-auto mt-7 max-w-3xl text-[26px] font-black tracking-tight text-white sm:text-[40px] lg:text-[50px]">
              Let's build intelligent solutions that drive your business into the future.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[16px] text-slate-400">
              Be one of our first clients and work directly with the team building your system — on time, on budget, and built for growth.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary text-[15px] px-10 py-4">
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 text-[12.5px] text-slate-500">
              founder@zyglotech.com · www.zyglotech.com · Chennai, India
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
