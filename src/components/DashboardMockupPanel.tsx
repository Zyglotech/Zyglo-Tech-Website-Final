'use client';

import { useEffect, useState } from 'react';
import { Bot, Users, TrendingUp, Search, Activity } from 'lucide-react';

const fmtInt = (n: number) => Math.round(n).toLocaleString('en-US');
const fmtRevenue = (n: number) => `₹${n.toFixed(1)}L`;
const fmtRank = (n: number) => `#${n.toFixed(1)}`;

const AGENT_META = [
  { name: 'WhatsApp Bot', sub: 'Real Estate', status: 'live' as const, color: '#06CCE8' },
  { name: 'Lead Qualifier', sub: 'Healthcare', status: 'live' as const, color: '#06CCE8' },
  { name: 'ERP Workflow', sub: 'Retail', status: 'busy' as const, color: '#FBBF24' },
  { name: 'SEO Monitor', sub: 'Auto', status: 'live' as const, color: '#06CCE8' },
];

export function DashboardMockupPanel() {
  const [botChats, setBotChats] = useState(4832);
  const [leadsQualified, setLeadsQualified] = useState(318);
  const [erpRevenue, setErpRevenue] = useState(18.4);
  const [seoRank, setSeoRank] = useState(4.2);
  const [uptime, setUptime] = useState(99.9);
  const [agentStats, setAgentStats] = useState({ whatsapp: 127, leads: 43, tasks: 12, ranksUp: 4 });

  useEffect(() => {
    const interval = setInterval(() => {
      setBotChats((v) => v + Math.floor(Math.random() * 4) + 1);
      setLeadsQualified((v) => (Math.random() > 0.55 ? v + 1 : v));
      setErpRevenue((v) => Math.round((v + Math.random() * 0.08) * 10) / 10);
      setSeoRank((v) => (Math.random() > 0.75 ? Math.max(1, Math.round((v - 0.1) * 10) / 10) : v));
      setUptime(99.7 + Math.random() * 0.3);
      setAgentStats((s) => ({
        whatsapp: s.whatsapp + (Math.random() > 0.4 ? 1 : 0),
        leads: s.leads + (Math.random() > 0.7 ? 1 : 0),
        tasks: Math.max(1, s.tasks + (Math.random() > 0.6 ? 1 : -1)),
        ranksUp: Math.max(1, Math.min(6, s.ranksUp + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    {
      label: 'Bot Chats', value: fmtInt(botChats), change: '+12%', Icon: Bot, color: '#06CCE8',
      spark: 'M0,19 L10,12.6 L20,15.6 L30,9.6 L40,11.3 L50,4 L60,1',
      area: 'M0,19 L10,12.6 L20,15.6 L30,9.6 L40,11.3 L50,4 L60,1 L60,20 L0,20 Z',
    },
    {
      label: 'Leads Qualified', value: fmtInt(leadsQualified), change: '+8%', Icon: Users, color: '#06CCE8',
      spark: 'M0,19 L10,14.8 L20,16.4 L30,8.4 L40,11.1 L50,4.2 L60,1',
      area: 'M0,19 L10,14.8 L20,16.4 L30,8.4 L40,11.1 L50,4.2 L60,1 L60,20 L0,20 Z',
    },
    {
      label: 'ERP Revenue', value: fmtRevenue(erpRevenue), change: '+24%', Icon: TrendingUp, color: '#06CCE8',
      spark: 'M0,19 L10,16.1 L20,10.3 L30,13.2 L40,7.4 L50,4.5 L60,1',
      area: 'M0,19 L10,16.1 L20,10.3 L30,13.2 L40,7.4 L50,4.5 L60,1 L60,20 L0,20 Z',
    },
    {
      label: 'SEO Rank Avg.', value: fmtRank(seoRank), change: '↑1.8', Icon: Search, color: '#06CCE8',
      spark: 'M0,19 L10,14.7 L20,10.4 L30,12.1 L40,6.1 L50,3.6 L60,1',
      area: 'M0,19 L10,14.7 L20,10.4 L30,12.1 L40,6.1 L50,3.6 L60,1 L60,20 L0,20 Z',
    },
  ];

  const agents = [
    { ...AGENT_META[0], stat: `${fmtInt(agentStats.whatsapp)} chats` },
    { ...AGENT_META[1], stat: `${fmtInt(agentStats.leads)} leads` },
    { ...AGENT_META[2], stat: `${fmtInt(agentStats.tasks)} tasks` },
    { ...AGENT_META[3], stat: `↑${agentStats.ranksUp} ranks` },
  ];

  return (
    <div className="p-4 sm:p-5">

      {/* Top bar */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[13px] font-bold text-white">Operations Overview</p>
          <p className="text-[9.5px] text-slate-500">17 May 2026 · Chennai</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block rounded-lg border border-white/[0.06] px-2 py-1 text-[9.5px] text-slate-600">Last 7 days ▾</span>
          {/* Notification dot */}
          <div className="relative h-7 w-7 rounded-lg border border-white/[0.06] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <Activity className="h-3 w-3 text-slate-500" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-[#07101E]" style={{ background: '#06CCE8' }} />
          </div>
          <span className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-semibold text-cyan-400"
            style={{ background: 'rgba(6,204,232,0.09)', border: '1px solid rgba(6,204,232,0.16)' }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            Live
          </span>
        </div>
      </div>

      {/* KPI cards with sparklines */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-3">
        {kpis.map(({ label, value, change, Icon, color, spark, area }) => (
          <div key={label} className="rounded-xl p-3 border border-white/[0.05]" style={{ background: '#0C1828' }}>
            <div className="flex items-center justify-between mb-2.5">
              <div className="h-[22px] w-[22px] rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}1A` }}>
                <Icon className="h-[10px] w-[10px]" style={{ color }} />
              </div>
              <span className="text-[8.5px] font-bold rounded-md px-1.5 py-0.5" style={{ color, background: `${color}15` }}>{change}</span>
            </div>
            <p className="text-[19px] font-black text-white leading-none transition-all duration-500">{value}</p>
            <p className="mt-0.5 text-[8.5px] text-slate-600 leading-tight">{label}</p>
            {/* Sparkline */}
            <svg viewBox="0 0 60 20" className="mt-2 w-full" style={{ height: '20px' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id={`sg-${label.replace(/\s/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={area} fill={`url(#sg-${label.replace(/\s/g, '-')})`} />
              <path d={spark} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* Bottom row: Area chart + Agents panel */}
      <div className="grid gap-2.5 lg:grid-cols-[1fr_156px]">

        {/* SVG Area Chart */}
        <div className="rounded-xl border border-white/[0.05] p-3.5" style={{ background: '#0B1626' }}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold text-slate-300">Revenue & AI Activity</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="h-1 w-4 rounded-full" style={{ background: '#06CCE8' }} />
                <span className="text-[8px] text-slate-600">Revenue</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-1 w-4 rounded-full" style={{ background: '#94A3B8' }} />
                <span className="text-[8px] text-slate-600">AI Activity</span>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 560 72" className="w-full" style={{ height: '72px' }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06CCE8" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#06CCE8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="ai-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            {[18, 36, 54].map(y => (
              <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            ))}
            {/* Revenue area */}
            <path d="M0,61 L93,42 L187,51 L280,22 L373,30 L467,2 L560,17 L560,72 L0,72 Z" fill="url(#rev-grad)" />
            {/* AI area */}
            <path d="M0,70 L93,54 L187,37 L280,45 L373,14 L467,27 L560,5 L560,72 L0,72 Z" fill="url(#ai-grad)" />
            {/* Revenue line */}
            <polyline points="0,61 93,42 187,51 280,22 373,30 467,2 560,17" fill="none" stroke="#06CCE8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* AI line */}
            <polyline points="0,70 93,54 187,37 280,45 373,14 467,27 560,5" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Highlight dots on last point — pulsing to feel live */}
            <circle cx="560" cy="17" r="3" fill="#06CCE8" />
            <circle cx="560" cy="17" r="5" fill="none" stroke="#06CCE8" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="3;8;3" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="560" cy="5" r="3" fill="#94A3B8" />
            <circle cx="560" cy="5" r="5" fill="none" stroke="#94A3B8" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="3;8;3" dur="2.2s" begin="0.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </svg>
          <div className="mt-1.5 flex justify-between text-[8px] text-slate-700">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        {/* AI Agents Live */}
        <div className="rounded-xl border border-white/[0.05] p-3" style={{ background: '#0C1828' }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10.5px] font-semibold text-slate-300">AI Agents</p>
            <span className="text-[8px] font-bold text-emerald-400">4 Live</span>
          </div>
          <div className="space-y-2">
            {agents.map(a => (
              <div key={a.name} className="flex items-center gap-2 rounded-lg px-2 py-1.5 border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <span className="h-1.5 w-1.5 rounded-full shrink-0 animate-pulse" style={{ background: a.status === 'busy' ? '#FBBF24' : '#34D399' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-semibold text-slate-300 truncate">{a.name}</p>
                  <p className="text-[7.5px] text-slate-700 truncate">{a.sub}</p>
                </div>
                <span className="text-[8px] font-bold shrink-0 transition-all duration-500" style={{ color: a.color }}>{a.stat}</span>
              </div>
            ))}
          </div>
          {/* Uptime strip */}
          <div className="mt-3 rounded-lg border border-white/[0.04] px-2.5 py-2" style={{ background: 'rgba(52,211,153,0.05)' }}>
            <div className="flex items-center justify-between">
              <span className="text-[8px] text-slate-600">Platform Uptime</span>
              <span className="text-[9px] font-black text-emerald-400">{uptime.toFixed(1)}%</span>
            </div>
            <div className="mt-1.5 h-[2px] w-full rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${uptime}%`, background: 'linear-gradient(90deg,#34D399,#059669)' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
