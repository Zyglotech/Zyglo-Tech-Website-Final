import { type MetadataRoute } from 'next';

const siteUrl = 'https://www.zyglo.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: '2026-05-15', changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified: '2026-05-01', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/demo`, lastModified: '2026-05-01', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/services`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/services/web-development`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/app-development`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/erp-solutions`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/college-projects`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/services/google-business`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/services/ai-chatbots`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/ai-agents`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/workflow-automation`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services/ai-assistants`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/services/seo-aeo-geo`, lastModified: '2026-05-10', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/academy`, lastModified: '2026-05-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/academy/courses`, lastModified: '2026-05-01', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/academy/bootcamps`, lastModified: '2026-05-01', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/blog`, lastModified: '2026-05-14', changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/case-studies`, lastModified: '2026-04-16', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/pricing`, lastModified: '2026-04-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/careers`, lastModified: '2026-05-01', changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/partners`, lastModified: '2026-04-01', changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/legal/privacy-policy`, lastModified: '2026-01-01', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/legal/terms-of-service`, lastModified: '2026-01-01', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/legal/refund-policy`, lastModified: '2026-01-01', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/legal/cookie-policy`, lastModified: '2026-01-01', changeFrequency: 'yearly', priority: 0.3 },
  ];
}
