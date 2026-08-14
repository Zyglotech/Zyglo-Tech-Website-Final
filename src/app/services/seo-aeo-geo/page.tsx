import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle2, Search, Bot, Globe, TrendingUp, Zap, Shield, BarChart3, MessageCircle } from 'lucide-react';
import { FaqAccordion } from '@/components/FaqAccordion';
import { FaqSchema } from '@/components/FaqSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ServiceSchema } from '@/components/ServiceSchema';

export const metadata: Metadata = {
  title: 'SEO, AEO & GEO Ranking Services',
  description: 'Rank on Google, ChatGPT, Gemini & Perplexity. 3.8x average traffic increase across 40+ businesses ranked. Get your free SEO + AI visibility audit today.',
  keywords: ['Zyglo SEO services', 'SEO services India', 'geo aeo seo services', 'AEO optimization', 'GEO optimization', 'AI search optimization', 'ChatGPT ranking'],
  openGraph: {
    title: 'SEO, AEO & GEO Ranking Services | Zyglo Tech Enterprise',
    description: 'Rank on Google, ChatGPT, Gemini & Perplexity. 3.8x average traffic increase across 40+ businesses ranked.',
    url: 'https://www.zyglotech.com/services/seo-aeo-geo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO, AEO & GEO Ranking Services | Zyglo Tech',
    description: 'Rank on Google, ChatGPT, Gemini & Perplexity. 3.8x average traffic increase across 40+ businesses ranked.',
  },
  alternates: { canonical: 'https://www.zyglotech.com/services/seo-aeo-geo' },
};

const stats = [
  { value: '3.8×', label: 'Average traffic increase' },
  { value: '60%', label: 'More AI-cited brands' },
  { value: '90 days', label: 'To first visible results' },
  { value: '40+', label: 'Businesses ranked' },
];

const disciplines = [
  {
    icon: Search,
    color: '#2563EB',
    colorDim: 'rgba(37,99,235,0.12)',
    tag: 'SEO',
    title: 'Search Engine Optimization',
    subtitle: 'Rank on Google, Bing & Yahoo',
    description: 'Traditional but evolved. Modern SEO combines technical excellence, authoritative content, and E-E-A-T signals to earn and hold top rankings for keywords that drive real revenue.',
    points: [
      'Technical SEO audit & Core Web Vitals optimization',
      'Keyword research & competitive gap analysis',
      'On-page optimization (titles, schema, internal links)',
      'High-authority backlink acquisition',
      'Google Business Profile & local pack ranking',
      'Monthly rank tracking & detailed reporting',
    ],
  },
  {
    icon: Bot,
    color: '#06CCE8',
    colorDim: 'rgba(6,204,232,0.12)',
    tag: 'AEO',
    title: 'Answer Engine Optimization',
    subtitle: 'Win Google Featured Snippets & AI Overviews',
    description: "As search shifts to direct answers, AEO positions your content to be pulled into Featured Snippets, People Also Ask boxes, and Google's AI Overview — driving zero-click brand awareness at massive scale.",
    points: [
      'FAQ & Q&A schema structured data',
      'Featured Snippet targeting and content rewriting',
      'AI Overview compatibility optimization',
      'Voice search readiness (conversational queries)',
      'People Also Ask (PAA) domination strategy',
      'Knowledge panel authority building',
    ],
  },
  {
    icon: Globe,
    color: '#A78BFA',
    colorDim: 'rgba(167,139,250,0.12)',
    tag: 'GEO',
    title: 'Generative Engine Optimization',
    subtitle: 'Get cited by ChatGPT, Gemini & Perplexity',
    description: "The newest frontier. GEO optimizes your brand's digital footprint so that large language models (LLMs) cite, recommend, and reference your business when users ask AI assistants for recommendations.",
    points: [
      'Brand entity building across the web',
      'Wikipedia, Wikidata & knowledge graph presence',
      'Press and media citation strategy',
      'LLM-friendly content architecture',
      'Perplexity, ChatGPT & Gemini brand monitoring',
      'AI citation audit and competitive positioning',
    ],
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery & Audit',
    desc: 'We audit your current SEO health, keyword positions, content gaps, and AI citation status across ChatGPT, Gemini, and Perplexity.',
  },
  {
    step: '02',
    title: 'Strategy Blueprint',
    desc: 'Custom 90-day roadmap combining technical fixes, content strategy, schema markup, entity building, and AI visibility targets.',
  },
  {
    step: '03',
    title: 'Technical Foundation',
    desc: 'Core Web Vitals, site speed, crawlability, structured data, and schema — ensuring search engines and AI crawlers can fully understand your site.',
  },
  {
    step: '04',
    title: 'Content & Authority',
    desc: 'E-E-A-T-optimized content, FAQ clusters, authoritative backlinks, press placements, and knowledge graph entries that build lasting authority.',
  },
  {
    step: '05',
    title: 'AEO & GEO Execution',
    desc: 'Featured snippet targeting, AI Overview optimization, LLM brand entity building, and monitoring across all major AI answer engines.',
  },
  {
    step: '06',
    title: 'Track & Compound',
    desc: 'Monthly rank reports, AI citation tracking, ROI analysis, and continuous iteration — compounding your visibility over time.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '₹12,999',
    period: '/month',
    desc: 'Perfect for local businesses and startups wanting to build their first digital presence.',
    color: '#2563EB',
    features: [
      'Technical SEO audit',
      'On-page optimization (10 pages)',
      'Google Business Profile setup & optimization',
      'Local keyword targeting',
      'Monthly rank report',
      'Basic schema markup',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    price: '₹29,999',
    period: '/month',
    desc: 'Full SEO + AEO strategy for businesses serious about dominating search and AI answers.',
    color: '#06CCE8',
    features: [
      'Everything in Starter',
      'Full SEO + AEO strategy',
      'Featured Snippet targeting',
      'AI Overview optimization',
      'Content creation (4 articles/month)',
      'Link building (5 backlinks/month)',
      'FAQ & Q&A schema',
      'Bi-weekly strategy calls',
    ],
    cta: 'Most Popular',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Full SEO + AEO + GEO for brands that want to dominate Google AND all AI platforms.',
    color: '#A78BFA',
    features: [
      'Everything in Growth',
      'Generative Engine Optimization (GEO)',
      'Wikipedia / Wikidata entity creation',
      'Press & media citation strategy',
      'ChatGPT, Gemini, Perplexity monitoring',
      'Unlimited content creation',
      'Dedicated strategy team',
      'Weekly reporting & calls',
    ],
    cta: 'Contact Us',
    popular: false,
  },
];

const faqs = [
  {
    q: 'How is AEO different from SEO?',
    a: "Traditional SEO gets you ranked in the list of blue links. AEO (Answer Engine Optimization) gets your content pulled directly into Google's Featured Snippets, AI Overviews, and People Also Ask boxes — meaning users see your answer without even clicking. It's about being the answer, not just a result.",
  },
  {
    q: 'What is GEO and why does it matter?',
    a: 'GEO (Generative Engine Optimization) optimizes your brand\'s presence so that AI assistants like ChatGPT, Gemini, and Perplexity recommend and cite your business. As more users skip traditional search in favor of AI answers, being cited by these models becomes a critical new channel for brand discovery.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Technical SEO and local rankings typically improve within 30-60 days. Organic keyword rankings and featured snippets usually show meaningful movement in 60-90 days. GEO results (AI citations) can appear sooner for targeted queries once entity building is complete, but full authority compounding takes 4-6 months.',
  },
  {
    q: 'Do you create content as part of the service?',
    a: 'Yes. The Growth plan includes 4 SEO-optimized articles per month. Enterprise includes unlimited content. We research keywords, write the content, add structured data, and publish — you review and approve before anything goes live.',
  },
  {
    q: 'Can you rank a business that is brand new?',
    a: 'Yes — especially for local SEO (Google Business Profile, local pack) and long-tail queries. New sites take longer for competitive head terms, but our 90-day blueprint is specifically designed to build momentum quickly without waiting for domain age.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes. While our team is based in Salem, we manage SEO campaigns for clients in the UAE, UK, USA, and Southeast Asia. Our GEO strategies are particularly valuable for international markets where AI search adoption is highest.',
  },
];

const tools = [
  'Google Search Console', 'Ahrefs', 'Semrush', 'Screaming Frog',
  'Schema Pro', 'ChatGPT API', 'Perplexity API', 'Google Analytics 4',
  'BrightLocal', 'Moz Local', 'Clearscope', 'SurferSEO',
];

export default function SeoAeoGeoPage() {
  return (
    <main className="min-h-screen" style={{ background: '#060B17' }}>
      <FaqSchema faqs={faqs} />
      <ServiceSchema
        name="SEO, AEO & GEO Ranking Services"
        description="AI-powered SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) to rank on Google, ChatGPT, Gemini and Perplexity."
        url="/services/seo-aeo-geo"
        category="Search Engine Optimization"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.06] px-5 py-20 lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #06CCE8 0%, #2563EB 50%, transparent 70%)' }} />

        <div className="relative mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'SEO, AEO & GEO' }]} />
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-1.5 mb-6">
            <TrendingUp className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-400">AI Services Division</span>
          </div>

          <h1 className="text-[32px] font-black leading-tight text-white sm:text-[46px] lg:text-[58px]">
            SEO · AEO · GEO<br />
            <span className="text-gradient">Rank Everywhere That Matters</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-slate-400 sm:text-[16px]">
            We don't just rank you on Google. We make your brand the answer in AI Overviews, Featured Snippets, ChatGPT, Gemini, and Perplexity — so you capture customers wherever they search in 2026 and beyond.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demo" className="btn-primary">
              Get Free SEO Audit
            </Link>
            <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
              className="btn-secondary">
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/[0.07] p-5" style={{ background: '#0B1424' }}>
                <p className="text-[28px] font-black text-cyan-400 sm:text-[32px]">{s.value}</p>
                <p className="mt-1 text-[12px] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three disciplines */}
      <section className="px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 text-center">
            <p className="section-label mx-auto w-fit">The Trinity of Modern Search</p>
          </div>
          <h2 className="mt-4 text-center text-[26px] font-black text-white sm:text-[36px]">
            Three Disciplines. One Unified Strategy.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[14px] leading-7 text-slate-400">
            Most agencies only do SEO. We run all three in parallel — because your customers are searching on Google, asking AI assistants, and clicking AI-generated answers. You need to show up in all of them.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {disciplines.map((d) => (
              <div key={d.tag} className="rounded-2xl border border-white/[0.07] p-6 sm:p-8" style={{ background: '#0B1424' }}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: d.colorDim }}>
                    <d.icon className="h-5 w-5" style={{ color: d.color }} />
                  </div>
                  <span className="rounded-lg border px-2.5 py-1 text-[10.5px] font-black uppercase tracking-[0.2em]"
                    style={{ color: d.color, borderColor: `${d.color}30`, background: d.colorDim }}>
                    {d.tag}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold text-white">{d.title}</h3>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: d.color }}>{d.subtitle}</p>
                <p className="mt-3 text-[13.5px] leading-6 text-slate-400">{d.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {d.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-[12.5px] text-slate-400">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: d.color }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/[0.06] px-5 py-16 lg:px-8 lg:py-24" style={{ background: '#060B17' }}>
        <div className="mx-auto max-w-7xl">
          <p className="section-label mx-auto mb-4 w-fit">Our Process</p>
          <h2 className="mt-4 text-center text-[26px] font-black text-white sm:text-[36px]">
            How We Build Your Search Dominance
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((p) => (
              <div key={p.step} className="rounded-2xl border border-white/[0.07] p-6" style={{ background: '#0B1424' }}>
                <span className="text-[11px] font-black tracking-[0.2em] text-cyan-400/50">{p.step}</span>
                <h3 className="mt-2 text-[15px] font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-6 text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Zyglo */}
      <section className="border-t border-white/[0.06] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <p className="section-label mb-5 w-fit">Why Zyglo</p>
              <h2 className="text-[26px] font-black text-white sm:text-[36px]">
                We Think in AI,<br />Not Just Algorithms
              </h2>
              <p className="mt-5 text-[14px] leading-7 text-slate-400">
                Most SEO agencies are still writing for Google's 2020 algorithm. We're optimizing for where search is going — AI-first, answer-first, entity-first. Our team includes AI engineers, not just content writers.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Zap, text: 'AI-native team — we build AI tools, not just use them' },
                  { icon: Shield, text: 'White-hat only — no penalties, ever. Sustainable rankings' },
                  { icon: BarChart3, text: 'Full transparency — you own all accounts, all data' },
                  { icon: TrendingUp, text: 'ROI-focused — we track leads and revenue, not just rankings' },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10">
                      <item.icon className="h-4 w-4 text-cyan-400" />
                    </div>
                    <p className="pt-1 text-[13.5px] text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] p-6 sm:p-8" style={{ background: '#0B1424' }}>
              <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Tools We Use</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span key={tool} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-slate-400">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                <p className="text-[12.5px] font-semibold text-cyan-400">Plus our proprietary AI tools</p>
                <p className="mt-1 text-[12px] text-slate-500">
                  We build custom monitoring dashboards that track your AI citations across ChatGPT, Gemini, and Perplexity in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-white/[0.06] px-5 py-16 lg:px-8 lg:py-24" style={{ background: '#060B17' }}>
        <div className="mx-auto max-w-7xl">
          <p className="section-label mx-auto mb-4 w-fit">Pricing</p>
          <h2 className="mt-4 text-center text-[26px] font-black text-white sm:text-[36px]">
            Plans for Every Stage of Growth
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[14px] text-slate-400">
            No lock-in contracts. Cancel anytime. All plans include a free 30-day audit before we charge a rupee.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 sm:p-7 ${
                  plan.popular ? 'border-cyan-400/40' : 'border-white/[0.07]'
                }`}
                style={{ background: plan.popular ? '#0F1C32' : '#0B1424' }}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full px-4 py-1.5 text-[10.5px] font-black uppercase tracking-[0.15em] text-[#060B17]"
                      style={{ background: '#06CCE8' }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-4">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.18em]" style={{ color: plan.color }}>
                    {plan.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-black text-white">{plan.price}</span>
                  {plan.period && <span className="text-[13px] text-slate-500">{plan.period}</span>}
                </div>
                <p className="mt-2 text-[12.5px] leading-5 text-slate-500">{plan.desc}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12.5px] text-slate-400">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/demo'}
                  className="mt-7 block rounded-xl py-3 text-center text-[13px] font-bold transition"
                  style={
                    plan.popular
                      ? { background: '#06CCE8', color: '#060B17' }
                      : { border: `1px solid ${plan.color}30`, color: plan.color, background: `${plan.color}10` }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="section-label mx-auto mb-4 w-fit">FAQ</p>
          <h2 className="mt-4 text-center text-[26px] font-black text-white sm:text-[34px]">
            Common Questions
          </h2>
          <div className="mt-10">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] px-5 py-16 lg:px-8 lg:py-24" style={{ background: '#060B17' }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl border border-white/[0.08] p-8 sm:p-12" style={{ background: '#0F1C32' }}>
            <p className="section-label mx-auto mb-5 w-fit">Ready to Rank?</p>
            <h2 className="text-[24px] font-black text-white sm:text-[32px]">
              Get Your Free SEO + AI Visibility Audit
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-7 text-slate-400">
              We'll audit your current search rankings, identify your biggest opportunities, and show you exactly where your brand stands in ChatGPT, Gemini, and Perplexity — completely free.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/demo" className="btn-primary w-full sm:w-auto">
                Get Free Audit →
              </Link>
              <a href="https://wa.me/919943907643" target="_blank" rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
