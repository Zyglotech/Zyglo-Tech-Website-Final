import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ServiceCard({ title, description, icon: Icon }: ServiceCardProps) {
  return (
    <div className="group glass-card overflow-hidden p-7 transition duration-500 hover:-translate-y-2 hover:border-cyan-400/25 hover:bg-white/10">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 text-cyan-300 ring-1 ring-cyan-300/20 transition group-hover:bg-cyan-400/10">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
      <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-cyan-300 transition group-hover:text-cyan-100">
        <span>Explore</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}
