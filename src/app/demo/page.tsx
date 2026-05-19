'use client';

import { useState, useCallback } from 'react';
import { Toast } from '@/components/Toast';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle, Bot, Zap, Cpu, Globe, BarChart3 } from 'lucide-react';

const services = [
  { value: 'ai-chatbot', label: 'AI Chatbot & Appointment Agent' },
  { value: 'ai-sales-agent', label: 'AI Sales & Lead Qualification Agent' },
  { value: 'workflow-automation', label: 'Workflow Automation' },
  { value: 'ai-assistant', label: 'Personal / Business AI Assistant' },
  { value: 'seo-aeo-geo', label: 'SEO, AEO & GEO Ranking' },
  { value: 'web-development', label: 'Website Development' },
  { value: 'app-development', label: 'App Development (Android / iOS)' },
  { value: 'erp', label: 'ERP Setup & Customisation' },
  { value: 'google-business', label: 'Google Business & Local SEO' },
  { value: 'college-project', label: 'College / Institution Project' },
  { value: 'other', label: 'Something else (I\'ll describe below)' },
];

const highlights = [
  { icon: Bot, label: 'AI Chatbot Demo', desc: 'See a live WhatsApp bot in action' },
  { icon: Zap, label: 'Automation Walkthrough', desc: 'Watch your workflows run themselves' },
  { icon: Cpu, label: 'ERP Live Preview', desc: 'GST-ready ERP with your data' },
  { icon: Globe, label: 'Website Prototype', desc: 'Clickable mockup in 48 hours' },
  { icon: BarChart3, label: 'ROI Projection', desc: 'Custom impact analysis for your business' },
];

export default function DemoPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'demo-page' }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        setToast({ type: 'error', message: data.error ?? 'Something went wrong. Please try again.' });
      } else {
        setStatus('success');
        setToast({ type: 'success', message: 'Demo request received! Our team will reach out within 2 hours.' });
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
      setToast({ type: 'error', message: 'Network error. Please WhatsApp us directly.' });
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#060B17' }}>
    <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      {toast && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}
      {/* Breadcrumb */}
      <div className="mb-10 flex items-center gap-2 text-[12px] text-slate-500">
        <Link href="/" className="transition hover:text-slate-300">Home</Link>
        <span>/</span>
        <span className="text-cyan-400">Free Consultation</span>
      </div>

      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        {/* Left — what you get */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400"
            style={{ background: 'rgba(6,204,232,0.08)' }}>
            Free · No Commitment
          </span>
          <h1 className="mt-6 text-[36px] font-black tracking-tight text-white sm:text-[48px]">
            Book your free<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              30-minute demo.
            </span>
          </h1>
          <p className="mt-5 text-[16px] leading-8 text-slate-400">
            See exactly how Zyglo's AI and IT solutions can work for your business — live walkthrough, no fluff, zero commitment.
          </p>

          <div className="mt-10 space-y-4">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                  <h.icon className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-white">{h.label}</p>
                  <p className="text-[12.5px] text-slate-500">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6">
            <p className="text-[12px] font-bold uppercase tracking-widest text-cyan-400">What to expect</p>
            <ul className="mt-4 space-y-3">
              {[
                'A 30-minute focused call with our solutions team',
                'Live demo tailored to your industry and use case',
                'Clear pricing and timeline estimate — no surprises',
                'Answers to every technical or business question',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13.5px] text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — form */}
        <div className="rounded-2xl border border-cyan-400/15 bg-[#0B1424] p-8"
          style={{ background: 'linear-gradient(to bottom, rgba(6,204,232,0.04), #0B1424)' }}>
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10">
                <CheckCircle2 className="h-8 w-8 text-cyan-400" />
              </div>
              <h2 className="text-[22px] font-black text-white">You're booked in!</h2>
              <p className="mt-3 max-w-sm text-[14px] text-slate-400">
                Our team will reach out within 2 hours to confirm your demo slot. Prefer faster? Chat with us on WhatsApp now.
              </p>
              <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-bold text-[#060B17]"
                style={{ background: '#06CCE8' }}>
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-[20px] font-black text-white">Book your free demo</h2>
                <p className="mt-1 text-[13px] text-slate-500">We'll confirm your slot within 2 hours.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Email Address *</label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">WhatsApp / Phone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Company / Organisation</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">What are you interested in? *</label>
                <select
                  required
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20">
                  <option value="" disabled>Select a service...</option>
                  {services.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Approximate Budget</label>
                <select
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20">
                  <option value="">Select a range (optional)</option>
                  <option value="under-25k">Under ₹25,000</option>
                  <option value="25k-50k">₹25,000 – ₹50,000</option>
                  <option value="50k-1L">₹50,000 – ₹1,00,000</option>
                  <option value="1L-3L">₹1,00,000 – ₹3,00,000</option>
                  <option value="3L-plus">₹3,00,000+</option>
                  <option value="enterprise">Enterprise / Custom</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-400">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-[14px] font-bold text-[#060B17] transition disabled:opacity-60"
                style={{ background: '#06CCE8' }}>
                {status === 'loading' ? 'Submitting...' : (
                  <>Book Free Consultation <ArrowRight className="h-4 w-4" /></>
                )}
              </button>

              <p className="text-center text-[11.5px] text-slate-500">
                No spam. No commitment. Our team will reach out within 2 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
