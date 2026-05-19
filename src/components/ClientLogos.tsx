'use client';

import { useEffect, useRef } from 'react';

const row1 = [
  { name: 'Hexbit Technologies',   abbr: 'HXT', color: '#3B82F6', industry: 'Technology' },
  { name: 'Cloudmere Solutions',   abbr: 'CMS', color: '#06CCE8', industry: 'Cloud / SaaS' },
  { name: 'Kinnara Analytics',     abbr: 'KNA', color: '#8B5CF6', industry: 'Analytics' },
  { name: 'Veltrix Software',      abbr: 'VLX', color: '#10B981', industry: 'Software' },
  { name: 'Infovera Systems',      abbr: 'IVS', color: '#3B82F6', industry: 'IT Services' },
  { name: 'Auranox Cyber',         abbr: 'AUC', color: '#EF4444', industry: 'Cybersecurity' },
  { name: 'Nexora Consulting',     abbr: 'NXC', color: '#06CCE8', industry: 'IT Consulting' },
  { name: 'Pixora Digital',        abbr: 'PXD', color: '#F59E0B', industry: 'Digital Media' },
  { name: 'Finova Capital',        abbr: 'FNC', color: '#2563EB', industry: 'Finance' },
  { name: 'Credwise Finance',      abbr: 'CWF', color: '#3B82F6', industry: 'Finance' },
  { name: 'BlueRidge Ventures',    abbr: 'BRV', color: '#4F46E5', industry: 'Investment' },
  { name: 'Shieldera Insurance',   abbr: 'SHI', color: '#0EA5E9', industry: 'Insurance' },
  { name: 'Talentara HR',          abbr: 'THR', color: '#8B5CF6', industry: 'HR Tech' },
  { name: 'Brandvox India',        abbr: 'BVI', color: '#F97316', industry: 'Marketing' },
  { name: 'Zephyr Web Studio',     abbr: 'ZWS', color: '#06CCE8', industry: 'Web Dev' },
  { name: 'Orbitron Labs',         abbr: 'ORL', color: '#10B981', industry: 'Software' },
  { name: 'LexForte Advisors',     abbr: 'LFA', color: '#64748B', industry: 'Legal Services' },
];

const row2 = [
  { name: 'Healvera Clinics',      abbr: 'HVC', color: '#10B981', industry: 'Healthcare' },
  { name: 'Mednova Hospitals',     abbr: 'MNH', color: '#059669', industry: 'Hospitals' },
  { name: 'Vitara Diagnostics',    abbr: 'VTD', color: '#06CCE8', industry: 'Diagnostics' },
  { name: 'Curenext Pharma',       abbr: 'CNP', color: '#3B82F6', industry: 'Pharma' },
  { name: 'Lifespan Sciences',     abbr: 'LPS', color: '#EF4444', industry: 'Life Sciences' },
  { name: 'Wellspring Care',       abbr: 'WSC', color: '#10B981', industry: 'Healthcare' },
  { name: 'Biomark Research',      abbr: 'BMR', color: '#8B5CF6', industry: 'Biotech' },
  { name: 'Primecure India',       abbr: 'PCI', color: '#059669', industry: 'Healthcare' },
  { name: 'Edunext Technologies',  abbr: 'ENT', color: '#8B5CF6', industry: 'EdTech' },
  { name: 'Gurukul Academy',       abbr: 'GKA', color: '#7C3AED', industry: 'Education' },
  { name: 'Learnova Institute',    abbr: 'LNI', color: '#8B5CF6', industry: 'Skills Training' },
  { name: 'Scholaris India',       abbr: 'SCI', color: '#4F46E5', industry: 'Online Learning' },
  { name: 'Mindcraft Edu',         abbr: 'MCE', color: '#06CCE8', industry: 'Tech Training' },
  { name: 'Pathways Learning',     abbr: 'PWL', color: '#7C3AED', industry: 'Upskilling' },
  { name: 'Brainwave Academy',     abbr: 'BWA', color: '#8B5CF6', industry: 'EdTech' },
  { name: 'Sparky Kids Learn',     abbr: 'SKL', color: '#EC4899', industry: 'K-12 EdTech' },
  { name: 'Zenova Coaching',       abbr: 'ZNC', color: '#3B82F6', industry: 'Education' },
];

const row3 = [
  { name: 'Shoprise Retail',       abbr: 'SHR', color: '#F59E0B', industry: 'Retail' },
  { name: 'Freshfield Foods',      abbr: 'FFF', color: '#10B981', industry: 'FMCG' },
  { name: 'Spiceroute India',      abbr: 'SRI', color: '#F97316', industry: 'FMCG' },
  { name: 'Weaveron Textiles',     abbr: 'WVT', color: '#64748B', industry: 'Manufacturing' },
  { name: 'Ironvault Steel',       abbr: 'IVT', color: '#475569', industry: 'Steel' },
  { name: 'Flavora Foods',         abbr: 'FLF', color: '#F59E0B', industry: 'F&B' },
  { name: 'Verdant Organics',      abbr: 'VDO', color: '#22C55E', industry: 'Organic FMCG' },
  { name: 'Landmark Developers',   abbr: 'LMD', color: '#3B82F6', industry: 'Real Estate' },
  { name: 'Pinnacle Realty',       abbr: 'PNR', color: '#EC4899', industry: 'Real Estate' },
  { name: 'Concord Constructions', abbr: 'CNC', color: '#2563EB', industry: 'Construction' },
  { name: 'Urbanrise Homes',       abbr: 'URH', color: '#4F46E5', industry: 'Real Estate' },
  { name: 'Grandeur Properties',   abbr: 'GDP', color: '#06CCE8', industry: 'Real Estate' },
  { name: 'Fasthaul Logistics',    abbr: 'FHL', color: '#3B82F6', industry: 'Logistics' },
  { name: 'Cargolink Express',     abbr: 'CLE', color: '#0EA5E9', industry: 'Shipping' },
  { name: 'Heritage Stays',        abbr: 'HGS', color: '#F97316', industry: 'Hospitality' },
  { name: 'Motovera Auto',         abbr: 'MVA', color: '#EF4444', industry: 'Automotive' },
  { name: 'Driveon Motors',        abbr: 'DVM', color: '#F59E0B', industry: 'Automotive' },
];

function LogoCard({ name, abbr, color, industry }: { name: string; abbr: string; color: string; industry: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-xl mx-2 px-4 py-3 border border-white/[0.06]"
      style={{ background: 'rgba(11,20,36,0.7)' }}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-black tracking-tight"
        style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
        {abbr}
      </div>
      <div className="min-w-0">
        <p className="whitespace-nowrap text-[12.5px] font-semibold text-slate-300">{name}</p>
        <p className="text-[9.5px] font-medium text-slate-600 mt-0.5">{industry}</p>
      </div>
    </div>
  );
}

function Ticker({ items, reverse, speed = 0.45 }: { items: typeof row1; reverse?: boolean; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    const vel = reverse ? -speed : speed;
    const totalWidth = track.scrollWidth / 2;

    function animate() {
      xRef.current += vel;
      if (!reverse && xRef.current >= totalWidth) xRef.current = 0;
      if (reverse && xRef.current <= -totalWidth) xRef.current = 0;
      if (track) track.style.transform = `translateX(${-xRef.current}px)`;
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [reverse, speed]);

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex" style={{ willChange: 'transform' }}>
        {[...items, ...items].map((item, i) => (
          <LogoCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}

export function ClientLogos() {
  return (
    <div className="relative space-y-3">
      {/* Edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40"
        style={{ background: 'linear-gradient(to right, rgba(8,15,28,0.95), transparent)' }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40"
        style={{ background: 'linear-gradient(to left, rgba(8,15,28,0.95), transparent)' }} />

      <Ticker items={row1} speed={0.42} />
      <Ticker items={row2} reverse speed={0.38} />
      <Ticker items={row3} speed={0.46} />
    </div>
  );
}
