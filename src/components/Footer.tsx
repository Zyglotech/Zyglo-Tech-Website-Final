import Link from 'next/link';
import { Linkedin, Instagram, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

const itServices = [
  { label: 'Website Development', href: '/services/web-development' },
  { label: 'App Development', href: '/services/app-development' },
  { label: 'ERP Setup & Customization', href: '/services/erp-solutions' },
  { label: 'College & Institution Projects', href: '/services/college-projects' },
  { label: 'Google Business & Local SEO', href: '/services/google-business' },
];

const aiServices = [
  { label: 'AI Chatbot & Appointment Agents', href: '/services/ai-chatbots' },
  { label: 'AI Sales & Lead Qualification', href: '/services/ai-agents' },
  { label: 'Workflow Automation', href: '/services/workflow-automation' },
  { label: 'Personal & Business AI Assistants', href: '/services/ai-assistants' },
  { label: 'SEO, AEO & GEO Ranking', href: '/services/seo-aeo-geo' },
];

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'Academy', href: '/academy' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Press & Media', href: '/press' },
  { label: 'Careers', href: '/careers' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
];

const legal = [
  { label: 'Privacy Policy', href: '/legal/privacy-policy' },
  { label: 'Terms of Service', href: '/legal/terms-of-service' },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]" style={{ background: '#060B17' }}>
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-16 lg:px-8">

        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">

          {/* Brand column */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <BrandLogo className="h-9 w-auto shrink-0" />
              <div className="leading-tight">
                <span className="block text-[16px] font-black tracking-[0.14em] text-white">ZYGLO</span>
                <span className="block text-[9px] font-medium tracking-[0.22em] uppercase" style={{ color: 'rgba(6,204,232,0.7)' }}>Tech Enterprise</span>
              </div>
            </Link>

            <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(6,204,232,0.7)' }}>
              INNOVATE · AUTOMATE · ACCELERATE
            </p>

            <p className="max-w-xs text-[13.5px] leading-6 text-slate-400">
              Intelligent IT and AI-powered solutions that help businesses automate, scale, and grow in the digital era. Built from India, for the world.
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              <a href="tel:+919943907643"
                className="flex items-center gap-3 text-[13px] text-slate-400 transition hover:text-cyan-400">
                <Phone className="h-4 w-4 text-cyan-400/60 shrink-0" />
                +91 9943 907 643
              </a>
              <a href="mailto:zyglotech@gmail.com"
                className="flex items-center gap-3 text-[13px] text-slate-400 transition hover:text-cyan-400">
                <Mail className="h-4 w-4 text-cyan-400/60 shrink-0" />
                zyglotech@gmail.com
              </a>
              <p className="flex items-center gap-3 text-[13px] text-slate-400">
                <MapPin className="h-4 w-4 text-cyan-400/60 shrink-0" />
                Indian Headquarters, Chennai
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2.5">
              <a href="https://x.com/zyglotech" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://instagram.com/zyglotech" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/zyglotech" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://wa.me/919943907643" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] font-medium text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-400">
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* IT Services */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">IT Services</p>
            <ul className="mb-6 space-y-2.5">
              {itServices.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-slate-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">AI Services</p>
            <ul className="space-y-2.5">
              {aiServices.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-slate-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Company</p>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-slate-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + CTA */}
          <div>
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Legal</p>
            <ul className="space-y-2.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-slate-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA card */}
            <div className="mt-8 rounded-2xl border border-white/[0.08] p-5" style={{ background: '#0F1C32' }}>
              <p className="text-[12.5px] font-bold text-white">Partner With Zyglo</p>
              <p className="mt-1.5 text-[11.5px] text-slate-400">Let's build intelligent solutions that drive your business into the future.</p>
              <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12px] font-bold text-[#060B17] transition"
                style={{ background: '#06CCE8' }}>
                <MessageCircle className="h-3.5 w-3.5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-[12px] text-slate-500">
            © 2026 Zyglo Tech Enterprise Pvt. Ltd. · www.zyglo.tech · All rights reserved.
          </p>
          <p className="text-[12px] text-slate-500">
            Indian Headquarters · Made with ❤ in <span style={{ color: '#06CCE8' }}>Chennai, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
