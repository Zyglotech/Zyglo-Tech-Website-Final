import { type MetadataRoute } from 'next';

const siteUrl = 'https://www.zyglo.tech';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    { url: `${siteUrl}/contact`, lastModified: new Date() },
    { url: `${siteUrl}/demo`, lastModified: new Date() },
    { url: `${siteUrl}/services`, lastModified: new Date() },
    { url: `${siteUrl}/services/web-development`, lastModified: new Date() },
    { url: `${siteUrl}/services/app-development`, lastModified: new Date() },
    { url: `${siteUrl}/services/erp-solutions`, lastModified: new Date() },
    { url: `${siteUrl}/services/college-projects`, lastModified: new Date() },
    { url: `${siteUrl}/services/google-business`, lastModified: new Date() },
    { url: `${siteUrl}/services/ai-chatbots`, lastModified: new Date() },
    { url: `${siteUrl}/services/ai-agents`, lastModified: new Date() },
    { url: `${siteUrl}/services/workflow-automation`, lastModified: new Date() },
    { url: `${siteUrl}/services/ai-assistants`, lastModified: new Date() },
    { url: `${siteUrl}/services/seo-aeo-geo`, lastModified: new Date() },
    { url: `${siteUrl}/academy`, lastModified: new Date() },
    { url: `${siteUrl}/academy/courses`, lastModified: new Date() },
    { url: `${siteUrl}/academy/bootcamps`, lastModified: new Date() },
    { url: `${siteUrl}/blog`, lastModified: new Date() },
    { url: `${siteUrl}/case-studies`, lastModified: new Date() },
    { url: `${siteUrl}/pricing`, lastModified: new Date() },
    { url: `${siteUrl}/careers`, lastModified: new Date() },
    { url: `${siteUrl}/partners`, lastModified: new Date() },
    { url: `${siteUrl}/legal/privacy-policy`, lastModified: new Date() },
    { url: `${siteUrl}/legal/terms-of-service`, lastModified: new Date() },
    { url: `${siteUrl}/legal/refund-policy`, lastModified: new Date() },
    { url: `${siteUrl}/legal/cookie-policy`, lastModified: new Date() },
  ];
}
