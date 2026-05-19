'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Bot, Zap, GraduationCap,
  CheckCircle2, MessageCircle,
  Shield, Globe, Users, Clock, Award,
  Building2, Cpu, Code2, Smartphone, Search,
  MapPin, Brain, Target, ChevronDown,
  Rocket, Heart, BadgeCheck, Layers, TrendingUp, Activity,
} from 'lucide-react';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ClientLogos } from '@/components/ClientLogos';

/* ─────────────────────── DATA ─────────────────────────────── */

const stats = [
  { value: '50+', label: 'Businesses Served', icon: Building2 },
  { value: '100+', label: 'Students Trained', icon: GraduationCap },
  { value: '99.9%', label: 'Platform Uptime', icon: Shield },
  { value: '100+', label: 'Free Consultations', icon: Award },
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
    desc: 'Every decision starts with your outcomes — named PMs, real SLAs, and success measured by your results.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Delivered',
    desc: 'Reliable, secure and high-performance systems shipped on time — with a 99.9% uptime commitment.',
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
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(6,204,232,0.11) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1/2" style={{ background: 'radial-gradient(ellipse 55% 65% at 0% 30%, rgba(37,99,235,0.09), transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" style={{ background: 'radial-gradient(ellipse 55% 65% at 100% 30%, rgba(6,204,232,0.07), transparent)' }} />
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
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                  India's #1 AI & IT Enterprise — Chennai HQ
                </span>
              </div>

              <div style={{ animationDelay: '80ms' }} className="hero-child">
                <h1 className="mt-7 text-[34px] font-black leading-[1.05] tracking-[-0.025em] text-white sm:text-[50px] lg:text-[62px]">
                  <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">Automate.</span>{' '}
                  <span className="text-white">Scale.</span>{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Dominate.</span>
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
                <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary text-[15px] px-8 py-4">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" style={{ color: '#25D366' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>

              {/* Trust badges */}
              <div style={{ animationDelay: '320ms' }} className="hero-child mt-10 flex flex-wrap gap-3">
                {[
                  { label: '50+ Businesses', icon: Building2 },
                  { label: 'GST-Ready ERP', icon: Shield },
                  { label: 'WhatsApp AI Bots', icon: Bot },
                  { label: 'Chennai HQ', icon: MapPin },
                ].map(({ label, icon: Icon }) => (
                  <span key={label} className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-2 text-[12.5px] font-medium text-slate-400">
                    <Icon className="h-3.5 w-3.5 text-cyan-400" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — AI visual illustration */}
            <div className="relative hidden lg:block" style={{ animation: 'heroFadeIn 1s ease 0.2s both' }}>

              {/* Ambient glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
                style={{ background: 'radial-gradient(circle, rgba(6,204,232,0.18) 0%, rgba(37,99,235,0.1) 55%, transparent 72%)' }} />

              {/* Orbital container */}
              <div className="relative mx-auto w-full max-w-[460px] aspect-square">

                {/* ── Background rings + nodes SVG ── */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Rings */}
                  <circle cx="230" cy="230" r="212" stroke="rgba(6,204,232,0.06)" strokeWidth="1" />
                  <circle cx="230" cy="230" r="168" stroke="rgba(6,204,232,0.05)" strokeWidth="1" strokeDasharray="3 9" />
                  <circle cx="230" cy="230" r="118" stroke="rgba(37,99,235,0.08)" strokeWidth="1" />

                  {/* Connection lines — center to anchors */}
                  <line x1="230" y1="230" x2="350" y2="68"  stroke="rgba(6,204,232,0.13)" strokeWidth="1" />
                  <line x1="230" y1="230" x2="52"  y2="198" stroke="rgba(37,99,235,0.11)" strokeWidth="1" />
                  <line x1="230" y1="230" x2="230" y2="402" stroke="rgba(6,204,232,0.11)" strokeWidth="1" />
                  <line x1="230" y1="230" x2="406" y2="318" stroke="rgba(37,99,235,0.1)"  strokeWidth="1" />
                  {/* Cross links */}
                  <line x1="350" y1="68"  x2="406" y2="318" stroke="rgba(37,99,235,0.06)" strokeWidth="0.8" />
                  <line x1="52"  y1="198" x2="230" y2="402" stroke="rgba(6,204,232,0.06)"  strokeWidth="0.8" />

                  {/* Anchor nodes */}
                  <circle cx="350" cy="68"  r="5"  fill="rgba(6,204,232,0.9)" />
                  <circle cx="350" cy="68"  r="11" fill="rgba(6,204,232,0.11)" />
                  <circle cx="52"  cy="198" r="4.5" fill="rgba(37,99,235,0.9)" />
                  <circle cx="52"  cy="198" r="9"  fill="rgba(37,99,235,0.13)" />
                  <circle cx="230" cy="402" r="4.5" fill="rgba(6,204,232,0.85)" />
                  <circle cx="230" cy="402" r="9"  fill="rgba(6,204,232,0.1)" />
                  <circle cx="406" cy="318" r="4"  fill="rgba(37,99,235,0.85)" />
                  <circle cx="406" cy="318" r="8"  fill="rgba(37,99,235,0.12)" />

                  {/* Pulse rings */}
                  <circle cx="230" cy="230" r="72" fill="none" stroke="rgba(6,204,232,0.13)" strokeWidth="1">
                    <animate attributeName="r"       values="68;92;68"   dur="3.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5"  dur="3.6s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="230" cy="230" r="88" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="1">
                    <animate attributeName="r"       values="88;114;88"  dur="3.6s" begin="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.35;0;0.35" dur="3.6s" begin="1.2s" repeatCount="indefinite" />
                  </circle>
                </svg>

                {/* ── Center hub ── */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[122px] w-[122px] rounded-full flex flex-col items-center justify-center border border-cyan-400/25 shadow-[0_0_56px_rgba(6,204,232,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]"
                  style={{ background: 'radial-gradient(circle at 40% 35%, #121F38 0%, #0B1424 100%)' }}>
                  <svg viewBox="0 0 70 70" className="h-12 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19" cy="21" r="8" fill="#06CCE8" />
                    <rect x="-7" y="-24" width="14" height="48" rx="7" fill="#06CCE8" transform="translate(40 40) rotate(38)" />
                  </svg>
                  <span className="text-[7px] font-black tracking-[0.32em] mt-1" style={{ color: 'rgba(6,204,232,0.65)' }}>ZYGLO</span>
                </div>

                {/* ── Metric Card 1 · top-right · Bot Conversations ── */}
                <div className="absolute top-[7%] right-[2%] w-[150px] rounded-2xl border border-cyan-400/[0.18] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  style={{ background: 'rgba(9,19,34,0.93)', backdropFilter: 'blur(14px)' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-[22px] w-[22px] rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(6,204,232,0.12)' }}>
                      <Bot className="h-3 w-3 text-cyan-400" />
                    </div>
                    <span className="text-[8.5px] font-medium leading-tight text-slate-400">Bot Conversations</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-[22px] font-black leading-none text-white">4,832</span>
                    <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold text-cyan-400" style={{ background: 'rgba(6,204,232,0.1)' }}>↑ 12%</span>
                  </div>
                  <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full w-[72%] rounded-full" style={{ background: 'linear-gradient(to right, #06CCE8, rgba(6,204,232,0.2))' }} />
                  </div>
                </div>

                {/* ── Metric Card 2 · left · Leads Qualified ── */}
                <div className="absolute top-[38%] left-[0%] w-[140px] rounded-2xl border border-blue-500/[0.18] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  style={{ background: 'rgba(9,19,34,0.93)', backdropFilter: 'blur(14px)' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-[22px] w-[22px] rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,99,235,0.14)' }}>
                      <Users className="h-3 w-3 text-blue-400" />
                    </div>
                    <span className="text-[8.5px] font-medium text-slate-400">Leads Qualified</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-[22px] font-black leading-none text-white">318</span>
                    <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold text-blue-400" style={{ background: 'rgba(37,99,235,0.12)' }}>↑ 8%</span>
                  </div>
                  <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full w-[55%] rounded-full" style={{ background: 'linear-gradient(to right, #3B82F6, rgba(59,130,246,0.2))' }} />
                  </div>
                </div>

                {/* ── Metric Card 3 · bottom-center · ERP Revenue ── */}
                <div className="absolute bottom-[5%] left-[22%] w-[160px] rounded-2xl border border-cyan-400/[0.18] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  style={{ background: 'rgba(9,19,34,0.93)', backdropFilter: 'blur(14px)' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-[22px] w-[22px] rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(6,204,232,0.12)' }}>
                      <TrendingUp className="h-3 w-3 text-cyan-400" />
                    </div>
                    <span className="text-[8.5px] font-medium text-slate-400">ERP Revenue</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-[22px] font-black leading-none text-white">₹18.4L</span>
                    <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold text-cyan-400" style={{ background: 'rgba(6,204,232,0.1)' }}>↑ 24%</span>
                  </div>
                  <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full w-[86%] rounded-full" style={{ background: 'linear-gradient(to right, #06CCE8, rgba(6,204,232,0.2))' }} />
                  </div>
                </div>

                {/* ── Metric Card 4 · bottom-right · Uptime ── */}
                <div className="absolute bottom-[23%] right-[1%] w-[126px] rounded-2xl border border-blue-500/[0.18] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  style={{ background: 'rgba(9,19,34,0.93)', backdropFilter: 'blur(14px)' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-[22px] w-[22px] rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,99,235,0.14)' }}>
                      <Activity className="h-3 w-3 text-blue-400" />
                    </div>
                    <span className="text-[8.5px] font-medium text-slate-400">Uptime</span>
                  </div>
                  <span className="text-[22px] font-black leading-none text-white">99.9%</span>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    <span className="text-[8px] font-medium text-emerald-400">All systems live</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-14 mx-auto max-w-5xl" style={{ animation: 'heroFadeIn 0.9s ease 0.4s both' }}>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_40px_120px_rgba(0,0,0,0.8),0_0_0_1px_rgba(6,204,232,0.04)]" style={{ background: '#07101E' }}>

              {/* Browser chrome — tab strip */}
              <div className="border-b border-white/[0.05] px-4 pt-3 pb-0" style={{ background: '#060D1A' }}>
                <div className="flex items-center gap-3">
                  {/* Traffic lights */}
                  <div className="flex shrink-0 items-center gap-1.5 pb-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  </div>
                  {/* Active tab */}
                  <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-white/[0.07] px-4 py-2 text-[11px] font-medium text-slate-300" style={{ background: '#07101E' }}>
                    <span className="h-2 w-2 rounded-full" style={{ background: 'linear-gradient(135deg,#06CCE8,#2563EB)' }} />
                    Dashboard — Zyglo
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                    ERP Module
                  </div>
                  {/* URL bar */}
                  <div className="ml-auto mb-2 flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] text-slate-500" style={{ background: 'rgba(6,11,23,0.7)' }}>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shrink-0" />
                    <span className="hidden sm:block">app.zyglo.tech/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Dashboard layout */}
              <div className="grid lg:grid-cols-[160px_1fr]">

                {/* Sidebar */}
                <div className="hidden border-r border-white/[0.05] lg:flex lg:flex-col" style={{ background: '#060D1A' }}>
                  {/* Logo mark */}
                  <div className="flex items-center gap-2 border-b border-white/[0.05] px-3.5 py-3.5">
                    <div className="h-6 w-6 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,rgba(6,204,232,0.25),rgba(37,99,235,0.25))' }}>
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
                      { label: 'Lead Agents', Icon: Target,     active: false, badge: null, color: '#3B82F6' },
                      { label: 'ERP Module',  Icon: Cpu,        active: false, badge: null, color: '#3B82F6' },
                      { label: 'Analytics',   Icon: TrendingUp, active: false, badge: null, color: '#8B5CF6' },
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
                      <div className="h-[24px] w-[24px] rounded-full flex items-center justify-center text-[8px] font-black text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg, #06CCE8, #2563EB)' }}>A</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9.5px] font-semibold text-slate-300 truncate">Admin</p>
                        <p className="text-[7.5px] text-slate-700 truncate">zyglo.tech</p>
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    </div>
                  </div>
                </div>

                {/* Main panel */}
                <div className="p-4 sm:p-5">

                  {/* Top bar */}
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[13px] font-bold text-white">Operations Overview</p>
                      <p className="text-[9.5px] text-slate-500">17 May 2026 · Chennai HQ</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:block rounded-lg border border-white/[0.06] px-2 py-1 text-[9.5px] text-slate-600">Last 7 days ▾</span>
                      {/* Notification dot */}
                      <div className="relative h-7 w-7 rounded-lg border border-white/[0.06] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <Activity className="h-3 w-3 text-slate-500" />
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-[#07101E]" style={{ background: '#06CCE8' }} />
                      </div>
                      <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-cyan-400"
                        style={{ background: 'rgba(6,204,232,0.09)', border: '1px solid rgba(6,204,232,0.16)' }}>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                        Live
                      </span>
                    </div>
                  </div>

                  {/* KPI cards with sparklines */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-3">
                    {([
                      {
                        label: 'Bot Chats', value: '4,832', change: '+12%', Icon: Bot, color: '#06CCE8',
                        spark: 'M0,19 L10,12.6 L20,15.6 L30,9.6 L40,11.3 L50,4 L60,1',
                        area:  'M0,19 L10,12.6 L20,15.6 L30,9.6 L40,11.3 L50,4 L60,1 L60,20 L0,20 Z',
                      },
                      {
                        label: 'Leads Qualified', value: '318', change: '+8%', Icon: Users, color: '#3B82F6',
                        spark: 'M0,19 L10,14.8 L20,16.4 L30,8.4 L40,11.1 L50,4.2 L60,1',
                        area:  'M0,19 L10,14.8 L20,16.4 L30,8.4 L40,11.1 L50,4.2 L60,1 L60,20 L0,20 Z',
                      },
                      {
                        label: 'ERP Revenue', value: '₹18.4L', change: '+24%', Icon: TrendingUp, color: '#06CCE8',
                        spark: 'M0,19 L10,16.1 L20,10.3 L30,13.2 L40,7.4 L50,4.5 L60,1',
                        area:  'M0,19 L10,16.1 L20,10.3 L30,13.2 L40,7.4 L50,4.5 L60,1 L60,20 L0,20 Z',
                      },
                      {
                        label: 'SEO Rank Avg.', value: '#4.2', change: '↑1.8', Icon: Search, color: '#8B5CF6',
                        spark: 'M0,19 L10,14.7 L20,10.4 L30,12.1 L40,6.1 L50,3.6 L60,1',
                        area:  'M0,19 L10,14.7 L20,10.4 L30,12.1 L40,6.1 L50,3.6 L60,1 L60,20 L0,20 Z',
                      },
                    ] as { label: string; value: string; change: string; Icon: React.ElementType; color: string; spark: string; area: string }[]).map(({ label, value, change, Icon, color, spark, area }) => (
                      <div key={label} className="rounded-xl p-3 border border-white/[0.05]" style={{ background: '#0C1828' }}>
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="h-[22px] w-[22px] rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}1A` }}>
                            <Icon className="h-[10px] w-[10px]" style={{ color }} />
                          </div>
                          <span className="text-[8.5px] font-bold rounded-md px-1.5 py-0.5" style={{ color, background: `${color}15` }}>{change}</span>
                        </div>
                        <p className="text-[19px] font-black text-white leading-none">{value}</p>
                        <p className="mt-0.5 text-[8.5px] text-slate-600 leading-tight">{label}</p>
                        {/* Sparkline */}
                        <svg viewBox="0 0 60 20" className="mt-2 w-full" style={{ height: '20px' }} preserveAspectRatio="none">
                          <defs>
                            <linearGradient id={`sg-${label.replace(/\s/g,'-')}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                              <stop offset="100%" stopColor={color} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d={area} fill={`url(#sg-${label.replace(/\s/g,'-')})`} />
                          <path d={spark} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* Bottom row: Area chart + Agents panel */}
                  <div className="grid gap-2.5 lg:grid-cols-[1fr_156px]">

                    {/* SVG Area Chart */}
                    <div className="rounded-xl border border-white/[0.05] p-3.5" style={{ background: '#0B1626' }}>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-[11px] font-semibold text-slate-300">Revenue & AI Activity</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <div className="h-1 w-4 rounded-full" style={{ background: '#06CCE8' }} />
                            <span className="text-[8px] text-slate-600">Revenue</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-1 w-4 rounded-full" style={{ background: '#3B82F6' }} />
                            <span className="text-[8px] text-slate-600">AI Activity</span>
                          </div>
                        </div>
                      </div>
                      <svg viewBox="0 0 560 72" className="w-full" style={{ height: '72px' }} preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06CCE8" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#06CCE8" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="ai-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        {[18,36,54].map(y => (
                          <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                        ))}
                        {/* Revenue area */}
                        <path d="M0,61 L93,42 L187,51 L280,22 L373,30 L467,2 L560,17 L560,72 L0,72 Z" fill="url(#rev-grad)" />
                        {/* AI area */}
                        <path d="M0,70 L93,54 L187,37 L280,45 L373,14 L467,27 L560,5 L560,72 L0,72 Z" fill="url(#ai-grad)" />
                        {/* Revenue line */}
                        <polyline points="0,61 93,42 187,51 280,22 373,30 467,2 560,17" fill="none" stroke="#06CCE8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        {/* AI line */}
                        <polyline points="0,70 93,54 187,37 280,45 373,14 467,27 560,5" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Highlight dots on last point */}
                        <circle cx="560" cy="17" r="3" fill="#06CCE8" />
                        <circle cx="560" cy="5"  r="3" fill="#3B82F6" />
                      </svg>
                      <div className="mt-1.5 flex justify-between text-[8px] text-slate-700">
                        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
                      </div>
                    </div>

                    {/* AI Agents Live */}
                    <div className="rounded-xl border border-white/[0.05] p-3" style={{ background: '#0C1828' }}>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10.5px] font-semibold text-slate-300">AI Agents</p>
                        <span className="text-[8px] font-bold text-emerald-400">4 Live</span>
                      </div>
                      <div className="space-y-2">
                        {([
                          { name: 'WhatsApp Bot',   sub: 'Real Estate', status: 'live',  stat: '127 chats', color: '#06CCE8' },
                          { name: 'Lead Qualifier', sub: 'Healthcare',  status: 'live',  stat: '43 leads',  color: '#06CCE8' },
                          { name: 'ERP Workflow',   sub: 'Retail',      status: 'busy',  stat: '12 tasks',  color: '#FBBF24' },
                          { name: 'SEO Monitor',    sub: 'Auto',        status: 'live',  stat: '↑4 ranks',  color: '#8B5CF6' },
                        ]).map(a => (
                          <div key={a.name} className="flex items-center gap-2 rounded-lg px-2 py-1.5 border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <span className="h-1.5 w-1.5 rounded-full shrink-0 animate-pulse" style={{ background: a.status === 'busy' ? '#FBBF24' : '#34D399' }} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[9px] font-semibold text-slate-300 truncate">{a.name}</p>
                              <p className="text-[7.5px] text-slate-700 truncate">{a.sub}</p>
                            </div>
                            <span className="text-[8px] font-bold shrink-0" style={{ color: a.color }}>{a.stat}</span>
                          </div>
                        ))}
                      </div>
                      {/* Uptime strip */}
                      <div className="mt-3 rounded-lg border border-white/[0.04] px-2.5 py-2" style={{ background: 'rgba(52,211,153,0.05)' }}>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-slate-600">Platform Uptime</span>
                          <span className="text-[9px] font-black text-emerald-400">99.9%</span>
                        </div>
                        <div className="mt-1.5 h-[2px] w-full rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <div className="h-full w-[99.9%] rounded-full" style={{ background: 'linear-gradient(90deg,#34D399,#059669)' }} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fade to next section */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32"
          style={{ background: 'linear-gradient(to bottom, transparent, #060B17)' }} />
      </section>

      {/* ═══════════════ CLIENT LOGOS TICKER ════════════════ */}
      <section className="border-t border-white/[0.05] py-10 sm:py-14" style={{ background: 'rgba(8,15,28,0.7)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8 mb-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-600 mb-3">Trusted across industries</p>
          <p className="text-[22px] sm:text-[28px] font-black text-white tracking-tight">
            <span style={{ color: '#06CCE8' }}>50+</span> businesses run on Zyglo
          </p>
          <p className="mt-2 text-[13px] text-slate-500">From Chennai startups to pan-India enterprises — across retail, healthcare, logistics, and more.</p>
        </div>
        <ClientLogos />
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
                  style={{ background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? 'rgba(6,204,232,0.5)' : 'rgba(59,130,246,0.5)'}, transparent)` }} />
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: i % 2 === 0 ? 'rgba(6,204,232,0.1)' : 'rgba(59,130,246,0.1)' }}>
                  <s.icon className={`h-5 w-5 ${i % 2 === 0 ? 'text-cyan-400' : 'text-blue-400'}`} />
                </div>
                <p className="text-[44px] font-black leading-none tracking-tight"
                  style={{ color: i % 2 === 0 ? '#06CCE8' : '#60A5FA' }}>{s.value}</p>
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15">
                <Brain className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Division 02</p>
                <h3 className="text-[22px] font-black text-white">AI Services Division</h3>
              </div>
              <div className="ml-auto hidden h-px flex-1 max-w-xs bg-gradient-to-r from-cyan-400/30 to-transparent lg:block" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {aiServices.map((svc, i) => (
                <motion.div key={svc.title}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group rounded-2xl border border-white/[0.06] bg-[#0B1424] p-5 transition hover:border-cyan-400/25 hover:bg-[#0D1E38] hover:shadow-[0_8px_32px_rgba(6,204,232,0.07)]">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">
                    <svc.icon className="h-[18px] w-[18px] text-cyan-400" />
                  </div>
                  <h4 className="text-[14px] font-bold leading-snug text-white">{svc.title}</h4>
                  <p className="mt-2 text-[12.5px] leading-5 text-slate-500">{svc.desc}</p>
                  <Link href={svc.href}
                    className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-cyan-400 transition group-hover:gap-2">
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
            <motion.div variants={fadeUp}><SectionLabel>Why Choose Zyglo</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-5 text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
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
            <motion.div variants={fadeUp}><SectionLabel>How We Work</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-5 text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
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
              <SectionLabel>AI Chatbot Demo</SectionLabel>
              <h2 className="mt-5 text-[24px] font-black tracking-tight text-white sm:text-[34px] lg:text-[38px]">
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
              <div className="rounded-2xl border border-white/10 bg-[#0B1424] overflow-hidden shadow-[0_16px_60px_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-3 border-b border-white/[0.06] bg-[#0F1C32]/80 px-5 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/20">
                    <Bot className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-white">Zyglo AI Bot</p>
                    <p className="text-[11px] text-green-400">● Online — Responding instantly</p>
                  </div>
                  <span className="ml-auto rounded-lg bg-[#25D366]/10 px-3 py-1 text-[10px] font-bold text-[#25D366]">
                    WhatsApp
                  </span>
                </div>
                <div className="space-y-4 p-5">
                  {[
                    { from: 'bot', text: 'Hello! 👋 I\'m your Zyglo AI assistant. I can help you schedule a demo, answer questions, or connect you with our team. How can I help?' },
                    { from: 'user', text: 'I need an automated lead system for my real estate business.' },
                    { from: 'bot', text: 'Great choice! 🏡 I\'ll set up a WhatsApp bot that auto-captures buyer enquiries, sends property previews and books site visits — no manual work needed. Want a live demo?' },
                    { from: 'user', text: 'Yes, show me how it works.' },
                    { from: 'bot', text: 'Perfect! ✅ I\'ve sent a demo link to your WhatsApp and scheduled a 30-min walkthrough with our team. What time works best for you today?' },
                  ].map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13px] leading-6 ${msg.from === 'bot'
                        ? 'rounded-tl-sm bg-[#0F1C32] text-slate-200'
                        : 'rounded-tr-sm text-white'
                        }`}
                        style={msg.from === 'user' ? { background: 'rgba(6,204,232,0.12)' } : {}}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.06] px-4 py-3">
                  <div className="flex items-center gap-3 rounded-xl bg-[#0F1C32]/80 px-4 py-2.5">
                    <span className="flex-1 text-[12px] text-slate-500">Type a message...</span>
                    <MessageCircle className="h-4 w-4 text-cyan-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ════════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24" style={{ background: 'rgba(11,20,36,0.35)' }}>
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-10 text-center sm:mb-14">
            <motion.div variants={fadeUp}><SectionLabel>Client Stories</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-5 text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              Businesses that trust Zyglo Tech.
            </motion.h2>
          </motion.div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ═══════════════ REAL RESULTS ═══════════════════════ */}
      <section className="border-t border-white/[0.06] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mb-10 text-center sm:mb-16">
            <motion.div variants={fadeUp}><SectionLabel>Real Results</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-5 text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
              Numbers that speak for themselves.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-[16px] text-slate-400">
              Measured outcomes from real deployments across industries.
            </motion.p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                industry: 'Real Estate',
                company: 'Prestige Property Group',
                metric: '2×', label: 'Inbound leads in 6 weeks',
                detail: 'WhatsApp AI bot handles enquiries, property previews and site visit bookings automatically.',
                color: '#06CCE8',
              },
              {
                industry: 'Healthcare',
                company: 'Wellness First Clinics',
                metric: '85%', label: 'Improvement in patient follow-ups',
                detail: 'ERP integration reduced billing errors to near zero and closed monthly books in 2 days vs. 2 weeks.',
                color: '#3B82F6',
              },
              {
                industry: 'Retail',
                company: 'SunMart Retail Chain',
                metric: '40%', label: 'Reduction in operational costs',
                detail: 'Workflow automation eliminated manual purchase orders, reorder alerts, and daily reporting.',
                color: '#8B5CF6',
              },
              {
                industry: 'Logistics',
                company: 'Apex Logistics',
                metric: '3×', label: 'Faster invoice processing',
                detail: 'GST-ready ERP automated all billing, TDS tracking and vendor reconciliation processes.',
                color: '#06CCE8',
              },
              {
                industry: 'Education',
                company: 'Sri Vidya Institutions',
                metric: '100+', label: 'Students upskilled via Academy',
                detail: 'Custom LMS with live sessions, certificate automation and placement tracking.',
                color: '#10B981',
              },
              {
                industry: 'F&B',
                company: 'The Chennai Kitchen',
                metric: '60%', label: 'More online orders from Google',
                detail: 'Google Business optimisation + local SEO ranked the restaurant #1 in Chennai local search.',
                color: '#F59E0B',
              },
            ].map((r, i) => (
              <motion.div key={r.company}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0B1424] p-7">
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full blur-3xl"
                  style={{ background: `${r.color}10` }} />
                <div className="relative">
                  <span className="inline-flex rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {r.industry}
                  </span>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-[48px] font-black leading-none" style={{ color: r.color }}>{r.metric}</span>
                  </div>
                  <p className="mt-1 text-[15px] font-bold text-white">{r.label}</p>
                  <p className="mt-3 text-[13px] leading-6 text-slate-400">{r.detail}</p>
                  <p className="mt-4 text-[11.5px] font-semibold text-slate-600">— {r.company}</p>
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
            <motion.div variants={fadeUp}><SectionLabel>FAQ</SectionLabel></motion.div>
            <motion.h2 variants={fadeUp}
              className="mt-5 text-[26px] font-black tracking-tight text-white sm:text-[38px] lg:text-[42px]">
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
              Join 50+ businesses across India that trust Zyglo Tech Enterprise to deliver technology that works — on time, on budget, and built for growth.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary text-[15px] px-10 py-4">
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
                className="btn-secondary text-[15px] px-10 py-4">
                <MessageCircle className="h-4 w-4" />
                WhatsApp: +91 9943 907 643
              </a>
            </div>
            <p className="mt-6 text-[12.5px] text-slate-500">
              zyglotech@gmail.com · www.zyglo.tech · Indian Headquarters, Chennai
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
