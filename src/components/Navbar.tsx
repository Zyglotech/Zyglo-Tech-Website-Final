'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown, Code2, Brain, Wallet, LogOut, User as UserIcon, FileText } from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';

const itServices = [
  { label: 'Website Development', href: '/services/web-development', desc: 'High-performance websites for your business' },
  { label: 'App Development', href: '/services/app-development', desc: 'Android, iOS & cross-platform apps' },
  { label: 'ERP Setup & Customization', href: '/services/erp-solutions', desc: 'Streamline operations with GST-ready ERP' },
  { label: 'College & Institution Projects', href: '/services/college-projects', desc: 'Academic, IoT & AI project delivery' },
  { label: 'Google Business & Local SEO', href: '/services/google-business', desc: 'Local visibility and Google listing setup' },
];

const aiServices = [
  { label: 'AI Chatbot & Appointment Agents', href: '/services/ai-chatbots', desc: 'WhatsApp bots for support & bookings' },
  { label: 'AI Sales & Lead Qualification', href: '/services/ai-agents', desc: 'Automated agents that convert leads' },
  { label: 'Workflow Automation', href: '/services/workflow-automation', desc: 'Eliminate repetitive tasks at scale' },
  { label: 'Personal & Business AI Assistants', href: '/services/ai-assistants', desc: 'Intelligent assistants for daily operations' },
  { label: 'SEO, AEO & GEO Ranking', href: '/services/seo-aeo-geo', desc: 'AI-powered search visibility strategy' },
];

const navLinks = [
  { label: 'Academy', href: '/academy' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const { data: authSession, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(6,11,23,0.96)', backdropFilter: 'blur(20px)' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileOpen(false)}>
          <BrandLogo className="h-9 w-auto" />
          <div className="leading-tight">
            <span className="block font-display text-[17px] font-bold tracking-[0.06em] text-white">ZYGLO</span>
            <span className="block font-mono-label text-[8.5px] uppercase" style={{ color: 'rgba(6,204,232,0.7)' }}>Tech Enterprise</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Home */}
          <Link href="/" className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition hover:text-white">
            Home
          </Link>

          {/* Services dropdown */}
          <div className="relative" ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}>
            <button
              className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition hover:text-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}>
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full z-50 w-[580px] pt-2">
                <div className="rounded-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-4"
                  style={{ background: '#0B1424' }}>
                  <div className="grid grid-cols-2 gap-2">
                    {/* IT Division column */}
                    <div>
                      <div className="mb-2 flex items-center gap-2 px-2 py-1.5">
                        <Code2 className="h-3.5 w-3.5 text-blue-400" />
                        <span className="font-mono-label text-[10px] uppercase text-blue-400">IT Services Division</span>
                      </div>
                      {itServices.map((s) => (
                        <Link key={s.href} href={s.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block rounded-xl px-3 py-2.5 transition hover:bg-white/5">
                          <p className="text-[13px] font-semibold text-white">{s.label}</p>
                          <p className="mt-0.5 text-[11px] text-slate-500">{s.desc}</p>
                        </Link>
                      ))}
                    </div>
                    {/* AI Division column */}
                    <div>
                      <div className="mb-2 flex items-center gap-2 px-2 py-1.5">
                        <Brain className="h-3.5 w-3.5" style={{ color: '#A78BFA' }} />
                        <span className="font-mono-label text-[10px] uppercase" style={{ color: '#A78BFA' }}>AI Services Division</span>
                      </div>
                      {aiServices.map((s) => (
                        <Link key={s.href} href={s.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block rounded-xl px-3 py-2.5 transition hover:bg-white/5">
                          <p className="text-[13px] font-semibold text-white">{s.label}</p>
                          <p className="mt-0.5 text-[11px] text-slate-500">{s.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 border-t border-white/[0.06] pt-3">
                    <Link href="/services" onClick={() => setDropdownOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white/8 hover:text-cyan-300">
                      View All Services →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          {status === 'authenticated' ? (
            <>
              <Link href="/dashboard/wallet"
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition hover:text-white">
                <Wallet className="h-3.5 w-3.5" /> Wallet
              </Link>
              <Link href="/dashboard/invoices"
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition hover:text-white">
                <FileText className="h-3.5 w-3.5" /> Invoices
              </Link>
              <Link href="/dashboard/profile"
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition hover:text-white">
                <UserIcon className="h-3.5 w-3.5" /> Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition hover:text-white">
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </>
          ) : (
            <Link href="/auth/signin"
              className="rounded-lg px-3.5 py-2 text-[13.5px] font-medium text-slate-300 transition hover:text-white">
              Sign In
            </Link>
          )}
          <Link href="/demo"
            className="rounded-xl px-5 py-2.5 text-[13px] font-bold text-[#060B17] transition hover:shadow-[0_0_24px_rgba(6,204,232,0.3)]"
            style={{ background: '#06CCE8' }}>
            Free Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] px-5 py-5 lg:hidden" style={{ background: '#060B17' }}>
          <div className="space-y-1">
            <p className="mb-2 px-2 font-mono-label text-[10px] uppercase text-blue-400">IT Services</p>
            {itServices.map((s) => (
              <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                {s.label}
              </Link>
            ))}
            <p className="mb-2 mt-4 px-2 font-mono-label text-[10px] uppercase" style={{ color: '#A78BFA' }}>AI Services</p>
            {aiServices.map((s) => (
              <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                {s.label}
              </Link>
            ))}
            <div className="mt-4 border-t border-white/[0.06] pt-4 space-y-1.5">
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                Home
              </Link>
              {navLinks.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-white/[0.06] pt-4 space-y-1.5">
              {status === 'authenticated' ? (
                <>
                  <Link href="/dashboard/wallet" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                    <Wallet className="h-4 w-4" /> Wallet
                  </Link>
                  <Link href="/dashboard/invoices" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                    <FileText className="h-4 w-4" /> Invoices
                  </Link>
                  <Link href="/dashboard/profile" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                    <UserIcon className="h-4 w-4" /> Profile
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); signOut({ callbackUrl: '/' }); }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/auth/signin" onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-slate-200 transition hover:bg-white/5 hover:text-white">
                  Sign In
                </Link>
              )}
            </div>
            <div className="mt-4 border-t border-white/[0.06] pt-4">
              <Link href="/demo" onClick={() => setMobileOpen(false)}
                className="block rounded-xl py-3.5 text-center text-[14px] font-bold text-[#060B17] transition"
                style={{ background: '#06CCE8' }}>
                Book Free Consultation
              </Link>
              <a href="tel:+919943907643"
                className="mt-2 block rounded-xl border border-white/10 bg-white/5 py-3.5 text-center text-[13.5px] font-medium text-slate-200">
                📞 +91 9943 907 643
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
