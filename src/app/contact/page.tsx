'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Toast } from '@/components/Toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        setToast({ type: 'error', message: data.error ?? 'Something went wrong. Please try again.' });
      } else {
        setStatus('success');
        setToast({ type: 'success', message: 'Message received! We\'ll respond within 2 business hours.' });
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
      setToast({ type: 'error', message: 'Network error. Please try again or WhatsApp us.' });
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      {toast && <Toast type={toast.type} message={toast.message} onClose={closeToast} />}
      {/* Breadcrumb */}
      <div className="mb-10 flex items-center gap-2 text-[12px] text-slate-500">
        <Link href="/" className="transition hover:text-slate-300">Home</Link>
        <span>/</span>
        <span className="text-cyan-400">Contact</span>
      </div>

      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Left — info */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400"
            style={{ background: 'rgba(6,204,232,0.08)' }}>
            Get In Touch
          </span>
          <h1 className="mt-6 text-[36px] font-black tracking-tight text-white sm:text-[48px]">
            Let's build something<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              great together.
            </span>
          </h1>
          <p className="mt-5 text-[16px] leading-8 text-slate-400">
            Talk to our Chennai team about AI chatbots, ERP systems, app development, workflow automation, or anything else — we'll respond within 2 business hours.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: Phone, label: 'Call Us', value: '+91 9943 907 643', href: 'tel:+919943907643' },
              { icon: Phone, label: 'WhatsApp', value: '+91 9943 907 643', href: 'https://wa.me/919943907643' },
              { icon: Mail, label: 'Email', value: 'zyglotech@gmail.com', href: 'mailto:zyglotech@gmail.com' },
              { icon: MapPin, label: 'Office', value: 'Indian Headquarters, Chennai', href: undefined },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                  <c.icon className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[14px] font-semibold text-white transition hover:text-cyan-400">
                      {c.value}
                    </a>
                  ) : (
                    <p className="text-[14px] font-semibold text-white">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-[#0B1424] p-6">
            <p className="text-[13px] font-bold text-white">Prefer WhatsApp?</p>
            <p className="mt-1.5 text-[13px] text-slate-400">Chat with our team directly on WhatsApp for the fastest response.</p>
            <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-bold text-[#060B17] transition"
              style={{ background: '#06CCE8' }}>
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0B1424] p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10">
                <CheckCircle2 className="h-8 w-8 text-cyan-400" />
              </div>
              <h2 className="text-[22px] font-black text-white">Message received!</h2>
              <p className="mt-3 max-w-sm text-[14px] text-slate-400">
                We'll respond within 2 business hours. You can also reach us on WhatsApp for immediate assistance.
              </p>
              <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-bold text-[#060B17]"
                style={{ background: '#06CCE8' }}>
                <MessageCircle className="h-4 w-4" />
                Continue on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-[20px] font-black text-white">Send us a message</h2>
                <p className="mt-1 text-[13px] text-slate-500">We respond within 2 business hours.</p>
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
                  <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Phone Number</label>
                  <input
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
                <label className="mb-1.5 block text-[12px] font-semibold text-slate-300">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project, requirements, or questions..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0F1C32] px-4 py-3 text-[14px] text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20"
                />
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
                {status === 'loading' ? 'Sending...' : (
                  <>Send Message <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
