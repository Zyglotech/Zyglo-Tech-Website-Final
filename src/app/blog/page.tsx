'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Clock, MessageCircle } from 'lucide-react';
import { blogArticles } from '@/data/blog-articles';

const categories = ['All', 'AI & Automation', 'Web Development', 'ERP & Business', 'SEO & Growth', 'Case Studies'];

const featured = blogArticles[0];

const articles = blogArticles.slice(1);

const colorMap: Record<string, string> = {
  'AI & Automation': '#06CCE8',
  'Web Development': '#60A5FA',
  'ERP & Business': '#34D399',
  'SEO & Growth': '#A78BFA',
  'Case Studies': '#FB923C',
};

function CategoryDot({ category }: { category: string }) {
  return (
    <span className="inline-block h-2 w-2 shrink-0 rounded-full"
      style={{ background: colorMap[category] ?? '#06CCE8' }} />
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <main className="min-h-screen" style={{ background: '#060B17' }}>

      {/* Hero */}
      <section className="border-b border-white/[0.06] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 px-4 py-1.5"
            style={{ background: 'rgba(6,204,232,0.08)' }}>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400">Zyglo Blog</span>
          </div>
          <h1 className="mt-5 text-[32px] font-black leading-tight text-white sm:text-[46px] lg:text-[56px]">
            Insights on AI, Automation<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> & Business Growth</span>
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-400">
            Practical guides, case studies, and industry analysis from the team building India's most advanced AI and IT solutions.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`rounded-xl border px-4 py-2 text-[12.5px] font-semibold transition ${
                activeCategory === cat
                  ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured article — coming soon */}
        {(activeCategory === 'All' || activeCategory === featured.category) && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-white/[0.08]" style={{ background: '#0B1424' }}>
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-400">
                  <CategoryDot category={featured.category} />
                  {featured.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[12px] text-slate-500">{featured.date}</span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-[12px] text-slate-500">
                  <Clock className="h-3 w-3" />{featured.readTime}
                </span>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10.5px] font-semibold text-cyan-400">Featured</span>
              </div>
              <h2 className="text-[20px] font-bold leading-snug text-white sm:text-[24px] lg:text-[28px]">
                {featured.title}
              </h2>
              <p className="mt-3 max-w-3xl text-[14px] leading-7 text-slate-400">{featured.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-[#060B17] transition hover:shadow-[0_0_24px_rgba(6,204,232,0.3)]"
                  style={{ background: '#06CCE8' }}>
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((t) => (
                    <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-500">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] py-20 text-center"
            style={{ background: '#0B1424' }}>
            <p className="text-[15px] font-semibold text-white">No articles in this category yet.</p>
            <p className="mt-2 text-[13px] text-slate-500">Check back soon — we publish new content every week.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, idx) => (
              <Link key={idx} href={`/blog/${article.slug}`}
                className="group flex flex-col rounded-2xl border border-white/[0.07] p-5 transition hover:border-cyan-400/20"
                style={{ background: '#0B1424' }}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryDot category={article.category} />
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-slate-500">{article.category}</span>
                  </div>
                </div>
                <h3 className="text-[14.5px] font-bold leading-snug text-white group-hover:text-cyan-400 transition">
                  {article.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[12.5px] leading-6 text-slate-500">{article.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10.5px] text-slate-600">{t}</span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-slate-600">
                    <Clock className="h-3 w-3" />{article.readTime}
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-slate-700">{article.date}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/[0.08] p-8 sm:p-10" style={{ background: '#0F1C32' }}>
          <div className="mx-auto max-w-xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">Newsletter</p>
            <h2 className="mt-3 text-[22px] font-black text-white sm:text-[26px]">The Zyglo Intelligence Brief</h2>
            <p className="mt-3 text-[13.5px] leading-6 text-slate-400">
              Weekly insights on AI, automation, and growth — curated for Indian tech leaders and founders. No spam. Unsubscribe any time.
            </p>
            {subscribed ? (
              <div className="mt-6 flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10">
                  <span className="text-xl text-cyan-400">✓</span>
                </div>
                <p className="text-[14px] font-semibold text-white">You're on the list!</p>
                <p className="text-[12px] text-slate-500">We'll notify you when the first issue lands.</p>
              </div>
            ) : (
              <>
                <form className="mt-6 flex flex-col gap-3 sm:flex-row"
                  onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}>
                  <input
                    type="email" required placeholder="your@email.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field flex-1" aria-label="Email address" />
                  <button type="submit"
                    className="shrink-0 rounded-xl px-6 py-3 text-[13px] font-bold text-[#060B17] transition hover:shadow-[0_0_24px_rgba(6,204,232,0.3)]"
                    style={{ background: '#06CCE8' }}>
                    Subscribe Free
                  </button>
                </form>
                <p className="mt-3 text-[11px] text-slate-600">Sent every Tuesday. No spam. Unsubscribe anytime.</p>
              </>
            )}
            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <p className="mb-3 text-[12px] text-slate-500">Want to talk to our team directly?</p>
              <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-[12.5px] font-semibold text-white transition hover:border-cyan-400/20 hover:text-cyan-300">
                <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
