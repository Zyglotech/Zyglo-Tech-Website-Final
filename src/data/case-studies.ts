export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  metric: string;
  metricLabel: string;
  excerpt: string;
  challenge: string;
  solution: string;
  results: string[];
  timeline: string;
  techStack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'chennai-clinic-whatsapp-ai',
    title: 'How a Chennai Clinic Booked 3x More Appointments with WhatsApp AI',
    client: 'Multi-Specialty Clinic, Chennai',
    industry: 'Healthcare',
    service: 'AI Chatbot',
    metric: '210%',
    metricLabel: 'Increase in bookings',
    excerpt: 'A 12-doctor clinic in Chennai deployed a WhatsApp AI appointment bot that tripled online bookings in 6 weeks.',
    challenge: 'The clinic received 200+ daily calls, leading to long hold times, missed bookings, and patient frustration. Front desk staff were overwhelmed managing calls, walk-ins, and follow-ups simultaneously. Evening and weekend enquiries went completely unanswered.',
    solution: 'We deployed a WhatsApp AI agent that handles appointment booking, doctor availability checks, prescription refill requests, and basic medical FAQs. The bot integrates with the clinic\'s existing scheduling system and escalates complex queries to reception staff.',
    results: ['210% increase in online bookings within 6 weeks', '70% of enquiries resolved without human intervention', '45-minute average daily time saved for front desk staff', '4.8/5 patient satisfaction rating for bot interactions', 'Zero missed after-hours enquiries'],
    timeline: '12 days from kickoff to go-live',
    techStack: ['WhatsApp Business API', 'GPT-4o', 'n8n', 'Google Calendar API'],
  },
  {
    slug: 'retail-erp-gst-automation',
    title: 'GST-Ready ERP Saves 20 Hours/Week for Chennai Retail Chain',
    client: 'Multi-Branch Retail Business, Chennai',
    industry: 'Retail',
    service: 'ERP Solutions',
    metric: '20 hrs',
    metricLabel: 'Saved per week',
    excerpt: 'A 5-branch retail chain replaced manual spreadsheets with a GST-ready ERP that automated invoicing, inventory, and compliance.',
    challenge: 'Five retail locations maintained separate Excel spreadsheets for inventory, sales, and accounting. GST filing took 3 days per month. Stock discrepancies between locations caused frequent stockouts and overstocking. Month-end reconciliation required 2 full days.',
    solution: 'Deployed Odoo ERP with custom GST module, multi-location inventory management, automated purchase orders, and unified POS integration. Configured automated GSTR-1 and GSTR-3B preparation with one-click filing.',
    results: ['20 hours/week saved on manual data entry', 'GST filing reduced from 3 days to 2 hours', '35% reduction in inventory holding costs', 'Real-time stock visibility across all 5 locations', 'Zero manual reconciliation errors'],
    timeline: '6 weeks for full deployment across 5 locations',
    techStack: ['Odoo Enterprise', 'PostgreSQL', 'Python', 'GST API'],
  },
  {
    slug: 'restaurant-automation-workflow',
    title: 'Restaurant Chain Automates Order-to-Kitchen Workflow, Cuts Wait Time 40%',
    client: 'QSR Chain, Tamil Nadu',
    industry: 'Food & Beverage',
    service: 'Workflow Automation',
    metric: '40%',
    metricLabel: 'Faster order processing',
    excerpt: 'A 3-location restaurant chain automated their order flow from POS to kitchen display, reducing average wait times by 40%.',
    challenge: 'Paper tickets from POS to kitchen caused delays, order mix-ups, and no visibility into preparation times. Peak hour chaos led to 15-20 minute average wait times and frequent customer complaints.',
    solution: 'Built a real-time kitchen display system integrated with existing POS. Orders flow automatically to the correct preparation station. Automated SMS/WhatsApp notifications alert customers when orders are ready. Dashboard tracks preparation times and identifies bottlenecks.',
    results: ['40% reduction in average order-to-ready time', '90% fewer order mix-ups', 'Automated customer ready-notifications via WhatsApp', 'Real-time kitchen performance dashboard', 'Peak hour throughput increased by 25%'],
    timeline: '3 weeks per location',
    techStack: ['Next.js', 'WebSockets', 'WhatsApp API', 'PostgreSQL'],
  },
  {
    slug: 'ecommerce-lead-agent',
    title: 'E-Commerce Brand Doubles Lead Conversion with AI Sales Agent',
    client: 'D2C Fashion Brand, India',
    industry: 'E-Commerce',
    service: 'AI Sales Agent',
    metric: '2x',
    metricLabel: 'Lead conversion rate',
    excerpt: 'An Indian D2C fashion brand deployed an AI sales agent on WhatsApp that doubled their lead-to-sale conversion rate.',
    challenge: 'The brand received 300+ daily WhatsApp enquiries about sizing, availability, and pricing. Manual responses took 4-8 hours, by which time customers had moved on. No systematic follow-up for abandoned conversations.',
    solution: 'Deployed an AI sales agent that instantly responds to product queries, provides size recommendations based on measurements, shares product images and pricing, applies discount codes, and follows up with abandoned conversations after 2 hours.',
    results: ['2x increase in lead-to-sale conversion', 'Average response time: 8 seconds (from 4 hours)', '60% of sales now handled end-to-end by AI agent', '₹12 lakh additional monthly revenue attributed to AI agent', '24/7 availability including festivals and weekends'],
    timeline: '10 days from brief to deployment',
    techStack: ['WhatsApp Business API', 'GPT-4o', 'Shopify API', 'n8n'],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}
