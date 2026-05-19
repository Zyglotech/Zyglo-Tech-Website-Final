'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'Zyglo built us a WhatsApp automation that doubled our inbound leads within 6 weeks. The bot handles everything from property enquiries to scheduling site visits — our sales team now focuses only on serious buyers.',
    author: 'Priya Sundar',
    role: 'Operations Head',
    company: 'Prestige Property Group',
    industry: 'Real Estate',
    rating: 5,
  },
  {
    quote: 'The ERP platform transformed how our clinic network operates. Patient follow-up improved by 85%, billing errors dropped to near zero, and our finance team now closes monthly books in 2 days instead of 2 weeks.',
    author: 'Dr. Ramesh Krishnan',
    role: 'Founder & CEO',
    company: 'Wellness First Healthcare',
    industry: 'Healthcare',
    rating: 5,
  },
  {
    quote: 'I completed the AI & Automation bootcamp and landed a product manager role within 3 months. The curriculum is practical, the mentors are industry professionals, and the projects you build are genuinely impressive to employers.',
    author: 'Ananya Sharma',
    role: 'Product Manager',
    company: 'Freshworks',
    industry: 'Academy Graduate',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
      ))}
    </div>
  );
}

export function TestimonialCarousel() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((item, index) => (
        <motion.div
          key={item.author}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col rounded-2xl border border-white/8 bg-[#0B1424] p-7">

          {/* Quote icon */}
          <Quote className="mb-4 h-7 w-7 text-cyan-400/30" />

          {/* Star rating */}
          <StarRating count={item.rating} />

          {/* Quote text */}
          <p className="mt-4 flex-1 text-[14px] leading-7 text-slate-300">
            "{item.quote}"
          </p>

          {/* Divider */}
          <div className="mt-6 h-px bg-white/[0.06]" />

          {/* Author */}
          <div className="mt-5 flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-[14px] font-bold text-cyan-400">
              {item.author.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-white">{item.author}</p>
              <p className="text-[12px] text-slate-500">{item.role}, {item.company}</p>
            </div>
            <span className="ml-auto shrink-0 rounded-lg border border-white/8 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
              {item.industry}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
