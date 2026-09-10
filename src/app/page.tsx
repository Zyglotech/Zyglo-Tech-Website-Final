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
  Rocket, Heart, BadgeCheck, Layers, TrendingUp, Activity,
} from 'lucide-react';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ClientLogos } from '@/components/ClientLogos';
import { ChatbotDemo } from '@/components/ChatbotDemo';
import { DashboardMockupPanel } from '@/components/DashboardMockupPanel';

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
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                  India's #1 AI & IT Enterprise — Chennai
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

              {/* Trust badges */}
              <div style={{ animationDelay: '320ms' }} className="hero-child mt-10 flex flex-wrap gap-3">
                {[
                  { label: '50+ Businesses', icon: Building2 },
                  { label: 'GST-Ready ERP', icon: Shield },
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

            {/* Right — AI visual illustration */}
            <div className="relative hidden lg:block" style={{ animation: 'heroFadeIn 1s ease 0.2s both' }}>

              {/* Ambient glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
                style={{ background: 'radial-gradient(circle, rgba(6,204,232,0.14) 0%, transparent 72%)' }} />

              {/* Orbital container */}
              <div className="relative mx-auto w-full max-w-[460px] aspect-square">

                {/* ── Background rings + nodes SVG ── */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Rings */}
                  <circle cx="230" cy="230" r="212" stroke="rgba(6,204,232,0.06)" strokeWidth="1" />
                  <circle cx="230" cy="230" r="168" stroke="rgba(6,204,232,0.05)" strokeWidth="1" strokeDasharray="3 9" />
                  <circle cx="230" cy="230" r="118" stroke="rgba(6,204,232,0.06)" strokeWidth="1" />

                  {/* Connection lines — center to anchors */}
                  <line x1="230" y1="230" x2="350" y2="68"  stroke="rgba(6,204,232,0.13)" strokeWidth="1" />
                  <line x1="230" y1="230" x2="52"  y2="198" stroke="rgba(6,204,232,0.1)" strokeWidth="1" />
                  <line x1="230" y1="230" x2="230" y2="402" stroke="rgba(6,204,232,0.11)" strokeWidth="1" />
                  <line x1="230" y1="230" x2="406" y2="318" stroke="rgba(6,204,232,0.09)"  strokeWidth="1" />
                  {/* Cross links */}
                  <line x1="350" y1="68"  x2="406" y2="318" stroke="rgba(6,204,232,0.05)" strokeWidth="0.8" />
                  <line x1="52"  y1="198" x2="230" y2="402" stroke="rgba(6,204,232,0.05)"  strokeWidth="0.8" />

                  {/* Anchor nodes */}
                  <circle cx="350" cy="68"  r="5"  fill="rgba(6,204,232,0.9)" />
                  <circle cx="350" cy="68"  r="11" fill="rgba(6,204,232,0.11)" />
                  <circle cx="52"  cy="198" r="4.5" fill="rgba(6,204,232,0.75)" />
                  <circle cx="52"  cy="198" r="9"  fill="rgba(6,204,232,0.1)" />
                  <circle cx="230" cy="402" r="4.5" fill="rgba(6,204,232,0.85)" />
                  <circle cx="230" cy="402" r="9"  fill="rgba(6,204,232,0.1)" />
                  <circle cx="406" cy="318" r="4"  fill="rgba(6,204,232,0.7)" />
                  <circle cx="406" cy="318" r="8"  fill="rgba(6,204,232,0.1)" />

                  {/* Pulse ring */}
                  <circle cx="230" cy="230" r="72" fill="none" stroke="rgba(6,204,232,0.13)" strokeWidth="1">
                    <animate attributeName="r"       values="68;92;68"   dur="3.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5"  dur="3.6s" repeatCount="indefinite" />
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
                <div className="absolute top-[38%] left-[0%] w-[140px] rounded-2xl border border-cyan-400/[0.18] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  style={{ background: 'rgba(9,19,34,0.93)', backdropFilter: 'blur(14px)' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-[22px] w-[22px] rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(6,204,232,0.12)' }}>
                      <Users className="h-3 w-3 text-cyan-400" />
                    </div>
                    <span className="text-[8.5px] font-medium text-slate-400">Leads Qualified</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-[22px] font-black leading-none text-white">318</span>
                    <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold text-cyan-400" style={{ background: 'rgba(6,204,232,0.1)' }}>↑ 8%</span>
                  </div>
                  <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <div className="h-full w-[55%] rounded-full" style={{ background: 'linear-gradient(to right, #06CCE8, rgba(6,204,232,0.2))' }} />
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
                <div className="absolute bottom-[23%] right-[1%] w-[126px] rounded-2xl border border-cyan-400/[0.18] p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                  style={{ background: 'rgba(9,19,34,0.93)', backdropFilter: 'blur(14px)' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="h-[22px] w-[22px] rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(6,204,232,0.12)' }}>
                      <Activity className="h-3 w-3 text-cyan-400" />
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
                    <span className="h-2 w-2 rounded-full" style={{ background: '#06CCE8' }} />
                    Dashboard — Zyglo
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 text-[11px] text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                    ERP Module
                  </div>
                  {/* URL bar */}
                  <div className="ml-auto mb-2 flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] text-slate-500" style={{ background: 'rgba(6,11,23,0.7)' }}>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shrink-0" />
                    <span className="hidden sm:block">app.zyglotech.com/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Dashboard layout */}
              <div className="grid lg:grid-cols-[160px_1fr]">

                {/* Sidebar */}
                <div className="hidden border-r border-white/[0.05] lg:flex lg:flex-col" style={{ background: '#060D1A' }}>
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
              <ChatbotDemo />
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
                color: '#14B8A6',
              },
              {
                industry: 'Retail',
                company: 'SunMart Retail Chain',
                metric: '40%', label: 'Reduction in operational costs',
                detail: 'Workflow automation eliminated manual purchase orders, reorder alerts, and daily reporting.',
                color: '#F43F5E',
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
