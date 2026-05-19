import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ArrowUpRight, Megaphone, Download, ExternalLink } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { BrandLogo } from '@/components/BrandLogo';

export const metadata: Metadata = {
  title: 'Press & Media | Zyglo Tech Enterprise',
  description: 'News, press releases, media kits, and coverage about Zyglo Tech Enterprise. See how we are transforming Indian businesses with AI and automation.',
  openGraph: {
    title: 'Press & Media | Zyglo Tech Enterprise',
    description: 'News, press releases, media kits, and coverage about Zyglo Tech Enterprise.',
    url: 'https://www.zyglo.tech/press',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Press & Media | Zyglo Tech', description: 'News, press releases, media kits, and coverage about Zyglo Tech.' },
  alternates: { canonical: 'https://www.zyglo.tech/press' },
};

const pressMentions = [
  {
    publication: 'The Economic Times',
    date: 'April 2026',
    title: 'How Chennai-Based Zyglo Tech is Democratizing AI for Indian SMEs',
    excerpt: 'Founded by Vignesh and Gokul Raaj SS, Zyglo Tech has crossed 500 SME clients by offering accessible, WhatsApp-based AI agents that dramatically cut support costs.',
    link: '#',
    type: 'News Feature'
  },
  {
    publication: 'YourStory',
    date: 'February 2026',
    title: 'Zyglo Tech Academy Launches to Bridge the AI Skills Gap in Tamil Nadu',
    excerpt: 'The enterprise IT firm has trained over 1,200 students with its new Academy division, focusing on practical AI agent development and modern web frameworks.',
    link: '#',
    type: 'Startup News'
  },
  {
    publication: 'Tech in Asia',
    date: 'December 2025',
    title: 'The Rise of Hyper-Local ERP: Why Indian Businesses are Moving Away from Legacy Giants',
    excerpt: 'Featuring Zyglo Tech\'s approach to GST-ready, modular ERP deployments that cost a fraction of traditional enterprise software implementations.',
    link: '#',
    type: 'Industry Analysis'
  }
];

const pressReleases = [
  {
    date: 'May 1, 2026',
    title: 'Zyglo Tech Enterprise Crosses 500 Active Business Clients',
    link: '#'
  },
  {
    date: 'March 15, 2026',
    title: 'Zyglo Launches Autonomous AI Sales Agent for WhatsApp Business',
    link: '#'
  },
  {
    date: 'January 10, 2026',
    title: 'Zyglo Academy Announces 100% Placement Record for First AI Engineering Cohort',
    link: '#'
  }
];

export default function PressPage() {
  return (
    <main className="min-h-screen" style={{ background: '#060B17' }}>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Press & Media' }]} />

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 px-4 py-1.5" style={{ background: 'rgba(168,85,247,0.08)' }}>
          <Megaphone className="h-3.5 w-3.5 text-purple-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-400">Newsroom</span>
        </div>

        <h1 className="mt-5 text-[32px] font-black leading-tight text-white sm:text-[46px]">
          Press & Media
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-400">
          The latest news, press releases, and media coverage about Zyglo Tech Enterprise.
        </p>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Press Coverage */}
            <div>
              <h2 className="text-[22px] font-black text-white flex items-center gap-2 mb-8">
                <Newspaper className="h-5 w-5 text-purple-400" />
                Featured Coverage
              </h2>
              <div className="space-y-6">
                {pressMentions.map((mention, idx) => (
                  <div key={idx} className="group rounded-2xl border border-white/[0.07] p-6 transition hover:border-purple-400/20" style={{ background: '#0B1424' }}>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-[12px] font-bold text-white">{mention.publication}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-[12px] text-slate-500">{mention.date}</span>
                      <span className="text-slate-600">·</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400">{mention.type}</span>
                    </div>
                    <h3 className="text-[18px] font-bold leading-snug text-white group-hover:text-purple-400 transition">
                      {mention.title}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-6 text-slate-400">{mention.excerpt}</p>
                    <a href={mention.link} className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-purple-400 hover:text-purple-300">
                      Read full article <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Press Releases */}
            <div>
              <h2 className="text-[22px] font-black text-white mb-8">Press Releases</h2>
              <div className="rounded-2xl border border-white/[0.07] divide-y divide-white/[0.07]" style={{ background: '#0B1424' }}>
                {pressReleases.map((pr, idx) => (
                  <a key={idx} href={pr.link} className="group flex items-center justify-between p-5 transition hover:bg-white/[0.02]">
                    <div>
                      <p className="text-[11px] text-slate-500 mb-1">{pr.date}</p>
                      <p className="text-[14px] font-bold text-white group-hover:text-purple-400 transition">{pr.title}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-purple-400 transition shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Media Kit */}
            <div className="rounded-2xl border border-white/[0.07] p-6" style={{ background: '#0B1424' }}>
              <h3 className="text-[18px] font-black text-white mb-2">Media Kit</h3>
              <p className="text-[13px] text-slate-400 mb-6">Download official Zyglo Tech logos, founder headshots, and brand guidelines for your publication.</p>
              
              <div className="space-y-3">
                <a href="#" className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-[13px] font-medium text-white transition hover:bg-white/10">
                  <span className="flex items-center gap-2"><BrandLogo className="h-4 w-4" /> Brand Assets (ZIP)</span>
                  <Download className="h-3.5 w-3.5 text-slate-400" />
                </a>
                <a href="#" className="flex items-center justify-between rounded-xl bg-white/5 p-3 text-[13px] font-medium text-white transition hover:bg-white/10">
                  <span className="flex items-center gap-2">Founder Bios (PDF)</span>
                  <Download className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Contact PR */}
            <div className="rounded-2xl border border-white/[0.07] p-6" style={{ background: 'rgba(6,204,232,0.03)' }}>
              <h3 className="text-[18px] font-black text-white mb-2">Press Inquiries</h3>
              <p className="text-[13px] text-slate-400 mb-6">For press inquiries, interview requests, or speaking engagements, please contact our PR team.</p>
              <a href="mailto:pr@zyglo.tech" className="inline-flex items-center justify-center w-full rounded-xl px-5 py-2.5 text-[13px] font-bold text-[#060B17] transition hover:shadow-[0_0_20px_rgba(6,204,232,0.2)]" style={{ background: '#06CCE8' }}>
                Email PR Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
