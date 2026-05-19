import type { Metadata } from 'next';
import { GraduationCap, Cpu, Code2, Smartphone, Server, Cloud, BarChart3, Palette, Database, Globe, Zap, Bot, Sparkles, Workflow, MessageSquare, BrainCircuit, Eye, Megaphone, Video, Shield } from 'lucide-react';
import { AcademyEnrollForm } from './AcademyEnrollForm';

export const metadata: Metadata = {
  title: 'Zyglo Academy — IT & AI Courses',
  description: 'India\'s most complete AI & IT learning platform. 20 structured courses — from Web Development to AI Agents. Job-ready, certification-backed, mentorship-driven.',
  alternates: { canonical: 'https://www.zyglo.tech/academy' },
};

const itTracks = [
  { id: 'T01', title: 'Web Development',           icon: Code2,       tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind', 'PWA'] },
  { id: 'T02', title: 'Mobile App Development',    icon: Smartphone,  tools: ['Flutter', 'React Native', 'Android (Kotlin)', 'iOS (Swift)', 'Firebase'] },
  { id: 'T03', title: 'Backend & Full-Stack',       icon: Server,      tools: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'REST', 'GraphQL'] },
  { id: 'T04', title: 'Cloud Computing & DevOps',  icon: Cloud,       tools: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'] },
  { id: 'T05', title: 'Data Science & Analytics',  icon: BarChart3,   tools: ['Python', 'Power BI', 'Tableau', 'Looker Studio', 'SQL', 'ETL', 'ML Basics'] },
  { id: 'T06', title: 'UI/UX Design',              icon: Palette,     tools: ['Figma', 'Adobe XD', 'User Research', 'Wireframes', 'Design Systems'] },
  { id: 'T07', title: 'ERP & CRM Systems',         icon: Database,    tools: ['Odoo', 'ERPNext', 'HubSpot', 'Zoho CRM', 'GoHighLevel', 'Salesforce'] },
  { id: 'T08', title: 'Blockchain & Web3',         icon: Globe,       tools: ['Solidity', 'Ethereum', 'NFTs', 'DeFi', 'Web3 Frontend', 'Smart Contracts'] },
  { id: 'T09', title: 'IoT & Hardware',            icon: Cpu,         tools: ['Arduino', 'Raspberry Pi', 'MQTT', 'IoT Dashboards', 'Edge Computing'] },
  { id: 'T10', title: 'No-Code / Low-Code',        icon: Zap,         tools: ['Bubble.io', 'Webflow', 'Glide', 'Softr', 'Airtable', 'Notion', 'No-Code SaaS'] },
];

const aiTracks = [
  { id: 'A01', title: 'AI & ML Fundamentals',              icon: BrainCircuit,   tools: ['Supervised/Unsupervised ML', 'Python for AI', 'TensorFlow', 'PyTorch', 'Real Projects'] },
  { id: 'A02', title: 'Generative AI & LLMs',              icon: Sparkles,       tools: ['GPT-4o', 'Claude', 'Gemini', 'Prompt Engineering', 'Midjourney', 'RunwayML'] },
  { id: 'A03', title: 'AI Agent Development',              icon: Bot,            tools: ['LangChain', 'LangGraph', 'CrewAI', 'AutoGen', 'LlamaIndex', 'Autonomous Agents'] },
  { id: 'A04', title: 'AI Workflow Automation',            icon: Workflow,       tools: ['Make.com', 'n8n', 'Zapier + GPT', 'WhatsApp API', 'Email & CRM Automation'] },
  { id: 'A05', title: 'AI Chatbots & Voice Agents',        icon: MessageSquare,  tools: ['WhatsApp Bots', 'Website Bots', 'ElevenLabs Voice', 'Retell AI', 'Multi-Channel Bots'] },
  { id: 'A06', title: 'AI for Business (Non-Tech)',        icon: GraduationCap,  tools: ['ChatGPT for Marketing', 'HR', 'Finance', 'Sales', 'Legal', 'Productivity'] },
  { id: 'A07', title: 'Computer Vision & Document AI',     icon: Eye,            tools: ['OpenCV', 'YOLO', 'OCR', 'Face Recognition', 'AWS Textract', 'Google Document AI'] },
  { id: 'A08', title: 'Digital Marketing with AI',         icon: Megaphone,      tools: ['SEO', 'Google/Meta Ads', 'AI Copywriting', 'Email Marketing', 'GA4', 'Content Strategy'] },
  { id: 'A09', title: 'Video & Content Creation w/ AI',    icon: Video,          tools: ['CapCut AI', 'DaVinci', 'Reels', 'Podcast', 'ElevenLabs Dubbing', 'Personal Brand'] },
  { id: 'A10', title: 'Cybersecurity Fundamentals',        icon: Shield,         tools: ['Ethical Hacking', 'OWASP', 'Kali Linux', 'CTF Challenges', 'Digital Forensics'] },
];

function TrackCard({ id, title, icon: Icon, tools, variant }: {
  id: string; title: string; icon: React.ElementType; tools: string[]; variant: 'it' | 'ai';
}) {
  const isIT = variant === 'it';
  const accent = isIT ? '#3B82F6' : '#06CCE8';
  const badgeBg = isIT ? 'rgba(59,130,246,0.12)' : 'rgba(6,204,232,0.12)';
  const badgeBorder = isIT ? 'rgba(59,130,246,0.25)' : 'rgba(6,204,232,0.25)';

  return (
    <div className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.07] p-5 transition hover:border-white/[0.14]"
      style={{ background: 'rgba(11,20,36,0.7)' }}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}>
          <Icon className="h-4.5 w-4.5" style={{ color: accent, width: 18, height: 18 }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-0.5 flex items-center gap-2">
            <span className="text-[10px] font-black tracking-widest" style={{ color: accent }}>{id}</span>
          </div>
          <h3 className="text-[14.5px] font-bold leading-snug text-white">{title}</h3>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tools.map(tool => (
          <span key={tool} className="rounded-lg px-2 py-0.5 text-[10.5px] font-medium text-slate-400"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AcademyPage() {
  return (
    <main style={{ background: '#060B17' }} className="min-h-screen">

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 lg:px-8 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-cyan-400">Zyglo Academy</span>
        </div>
        <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          India&apos;s Most Complete<br />
          <span style={{ color: '#06CCE8' }}>AI & IT Learning Platform</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-slate-400 leading-relaxed">
          20 structured courses — from beginner to advanced. Job-ready curriculum, certification-backed, with live mentorship from industry practitioners.
        </p>

        {/* Stats */}
        <div className="mx-auto mb-4 flex flex-wrap justify-center gap-6">
          {[
            { value: '20', label: 'Courses' },
            { value: '10', label: 'IT Courses' },
            { value: '10', label: 'AI Courses' },
            { value: '100+', label: 'Students Trained' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black" style={{ color: '#06CCE8' }}>{s.value}</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IT Tracks ── */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'rgba(59,130,246,0.15)' }}>
              <Code2 className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">10 Courses</p>
              <h2 className="text-xl font-black text-white">IT Courses</h2>
            </div>
          </div>
          <div className="flex-1 h-px" style={{ background: 'rgba(59,130,246,0.15)' }} />
          <span className="text-[11px] text-slate-600 hidden sm:block">From beginner to advanced — structured, job-ready, certification-backed</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {itTracks.map(t => <TrackCard key={t.id} {...t} variant="it" />)}
          {/* Wider card for last 2 to fill row evenly */}
        </div>
      </section>

      {/* ── AI Tracks ── */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'rgba(6,204,232,0.12)' }}>
              <Bot className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">10 Courses</p>
              <h2 className="text-xl font-black text-white">AI Courses</h2>
            </div>
          </div>
          <div className="flex-1 h-px" style={{ background: 'rgba(6,204,232,0.1)' }} />
          <span className="text-[11px] text-slate-600 hidden sm:block">From fundamentals to autonomous agents — the most complete AI curriculum in India</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {aiTracks.map(t => <TrackCard key={t.id} {...t} variant="ai" />)}
        </div>
      </section>

      {/* ── Enroll Form ── */}
      <section id="enroll" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl border border-white/[0.08] p-8 md:p-10"
          style={{ background: '#0B1424' }}>

          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-cyan-400">Free Enquiry</span>
            </div>
            <h2 className="text-2xl font-black text-white">Enroll in a Course</h2>
            <p className="mt-2 text-sm text-slate-400">
              Fill in your details and we&apos;ll reach out within 2 hours with your course roadmap, batch schedule, and next steps.
            </p>
          </div>

          <AcademyEnrollForm />
        </div>
      </section>

    </main>
  );
}
