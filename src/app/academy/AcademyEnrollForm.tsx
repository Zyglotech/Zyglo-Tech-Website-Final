'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const tracks = [
  // IT Tracks
  'T01 — Web Development',
  'T02 — Mobile App Development',
  'T03 — Backend & Full-Stack',
  'T04 — Cloud Computing & DevOps',
  'T05 — Data Science & Analytics',
  'T06 — UI/UX Design',
  'T07 — ERP & CRM Systems',
  'T08 — Blockchain & Web3',
  'T09 — IoT & Hardware',
  'T10 — No-Code / Low-Code',
  // AI Tracks
  'A01 — AI & ML Fundamentals',
  'A02 — Generative AI & LLMs',
  'A03 — AI Agent Development',
  'A04 — AI Workflow Automation',
  'A05 — AI Chatbots & Voice Agents',
  'A06 — AI for Business (Non-Tech)',
  'A07 — Computer Vision & Document AI',
  'A08 — Digital Marketing with AI',
  'A09 — Video & Content Creation with AI',
  'A10 — Cybersecurity Fundamentals',
];

export function AcademyEnrollForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', track: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  function update(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.track || 'Academy Enquiry',
          company: form.message || undefined,
          source: 'academy',
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error || 'Something went wrong');
      }
      setStatus('success');
      setForm({ name: '', email: '', phone: '', track: '', message: '' });
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(6,204,232,0.12)' }}>
          <CheckCircle2 className="h-8 w-8 text-cyan-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Enrollment Request Received!</h3>
        <p className="max-w-sm text-sm text-slate-400">Our team will contact you within 2 business hours to discuss your selected track and next steps.</p>
        <button onClick={() => setStatus('idle')} className="mt-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition">
          Submit another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-slate-500">Full Name *</label>
          <input
            name="name" value={form.name} onChange={update} required
            placeholder="Your name"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.07]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-slate-500">Email Address *</label>
          <input
            name="email" value={form.email} onChange={update} required type="email"
            placeholder="you@email.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.07]"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-slate-500">Phone / WhatsApp *</label>
          <input
            name="phone" value={form.phone} onChange={update} required
            placeholder="+91 XXXXX XXXXX"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.07]"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-slate-500">Interested Course</label>
          <select
            name="track" value={form.track} onChange={update}
            aria-label="Select a course"
            className="w-full rounded-xl border border-white/10 bg-[#0B1424] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
          >
            <option value="">Select a course…</option>
            <optgroup label="── IT Courses">
              {tracks.slice(0, 10).map(t => <option key={t} value={t}>{t}</option>)}
            </optgroup>
            <optgroup label="── AI Courses">
              {tracks.slice(10).map(t => <option key={t} value={t}>{t}</option>)}
            </optgroup>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-slate-500">Message (optional)</label>
        <textarea
          name="message" value={form.message} onChange={update} rows={3}
          placeholder="Tell us about your background, goals, or any questions…"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.07] resize-none"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errMsg}
        </div>
      )}

      <button
        type="submit" disabled={status === 'loading'}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-[#060B17] transition disabled:opacity-60"
        style={{ background: '#06CCE8' }}
      >
        {status === 'loading'
          ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
          : <><Send className="h-4 w-4" /> Enroll Now — It&apos;s Free to Enquire</>
        }
      </button>
      <p className="text-center text-[11px] text-slate-600">No commitment · Our team will reach you within 2 hours</p>
    </form>
  );
}
