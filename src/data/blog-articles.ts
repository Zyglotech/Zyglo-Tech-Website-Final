export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  tags: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'ai-chatbots-replacing-customer-support',
    title: 'How AI Chatbots Are Replacing Traditional Customer Support',
    excerpt: 'WhatsApp AI agents now handle 80% of tier-1 support queries. We break down the architecture, cost savings, and deployment timeline.',
    category: 'AI & Automation',
    date: 'May 14, 2026',
    isoDate: '2026-05-14',
    readTime: '8 min read',
    tags: ['AI Chatbots', 'WhatsApp Automation', 'Customer Support'],
  },
  {
    slug: 'aeo-vs-seo-future-of-search',
    title: 'AEO vs SEO: Why Answer Engine Optimization Is the Future of Search',
    excerpt: "Google's AI Overview and ChatGPT are changing how people find information. Here's how to optimize for AI-generated answers.",
    category: 'SEO & Growth',
    date: 'May 10, 2026',
    isoDate: '2026-05-10',
    readTime: '6 min read',
    tags: ['AEO', 'SEO', 'AI Search'],
  },
  {
    slug: 'odoo-vs-sap-indian-smes',
    title: 'Odoo vs SAP for Indian SMEs: A Practical Comparison for 2026',
    excerpt: 'Cost, customization, GST compliance, and integration capabilities compared for Indian businesses.',
    category: 'ERP & Business',
    date: 'May 7, 2026',
    isoDate: '2026-05-07',
    readTime: '5 min read',
    tags: ['ERP', 'Odoo', 'SAP', 'GST'],
  },
  {
    slug: 'nextjs-vs-remix-2026',
    title: 'Next.js 15 vs Remix: Which Should You Choose for Your Business Website in 2026?',
    excerpt: 'Performance benchmarks, DX, and real-world case studies from building 30+ client sites.',
    category: 'Web Development',
    date: 'May 3, 2026',
    isoDate: '2026-05-03',
    readTime: '7 min read',
    tags: ['Next.js', 'Web Dev', 'Performance'],
  },
  {
    slug: 'build-lead-qualification-ai-agent',
    title: 'Building a Lead Qualification AI Agent with n8n and GPT-4o',
    excerpt: 'A complete tutorial on building a no-code AI agent that scores leads, sends follow-ups, and books calls.',
    category: 'AI & Automation',
    date: 'Apr 28, 2026',
    isoDate: '2026-04-28',
    readTime: '9 min read',
    tags: ['n8n', 'AI Agents', 'Automation'],
  },
  {
    slug: 'geo-brand-chatgpt-gemini-perplexity',
    title: 'GEO: How to Make Your Brand Appear in ChatGPT, Gemini & Perplexity',
    excerpt: 'Generative Engine Optimization explained — the signals that make AI models cite your brand.',
    category: 'SEO & Growth',
    date: 'Apr 22, 2026',
    isoDate: '2026-04-22',
    readTime: '5 min read',
    tags: ['GEO', 'ChatGPT', 'AI Visibility'],
  },
  {
    slug: 'workflow-automation-101-sme',
    title: 'Workflow Automation 101: 10 Tasks Every SME Should Automate Today',
    excerpt: 'From invoice generation to inventory alerts — the ten workflows SMEs automate first.',
    category: 'AI & Automation',
    date: 'Apr 9, 2026',
    isoDate: '2026-04-09',
    readTime: '6 min read',
    tags: ['Automation', 'SME', 'Productivity'],
  },
  {
    slug: 'core-web-vitals-2026-guide',
    title: 'Core Web Vitals 2026: The Only Guide Indian Businesses Need',
    excerpt: 'LCP, INP, CLS explained with concrete fixes for WordPress, Shopify, and Next.js sites.',
    category: 'Web Development',
    date: 'Apr 2, 2026',
    isoDate: '2026-04-02',
    readTime: '5 min read',
    tags: ['Core Web Vitals', 'Performance', 'SEO'],
  },
];

export function getArticleBySlug(slug: string) {
  return blogArticles.find((a) => a.slug === slug);
}
