import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { blogArticles, getArticleBySlug } from '@/data/blog-articles';
import { BlogPostingSchema } from '@/components/BlogPostingSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { articleContent } from './content';

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: `${article.title} | Zyglo Tech Blog`,
      description: article.excerpt,
      url: `https://www.zyglotech.com/blog/${slug}`,
      type: 'article',
      publishedTime: article.isoDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    alternates: { canonical: `https://www.zyglotech.com/blog/${slug}` },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const content = articleContent[slug];

  return (
    <main className="min-h-screen" style={{ background: '#060B17' }}>
      <BlogPostingSchema
        title={article.title}
        description={article.excerpt}
        slug={slug}
        datePublished={article.isoDate}
        readTime={article.readTime}
        category={article.category}
        tags={article.tags}
      />

      <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: article.title },
        ]} />

        {/* Meta row */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-[12px] text-slate-500">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-0.5 text-[10.5px] font-bold text-cyan-400">
            {article.category}
          </span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" aria-hidden="true" />{article.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" aria-hidden="true" />{article.readTime}</span>
        </div>

        <h1 className="text-[28px] font-black leading-tight text-white sm:text-[38px]">
          {article.title}
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-slate-400">{article.excerpt}</p>

        {/* Article body */}
        <div
          className="blog-content mt-10 text-[15px] leading-8 text-slate-300"
          dangerouslySetInnerHTML={{ __html: content ?? '<p>Article coming soon.</p>' }}
        />

        {/* Tags */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-8">
          <Tag className="h-3.5 w-3.5 text-slate-600" aria-hidden="true" />
          {article.tags.map((t) => (
            <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-500">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-white/[0.08] p-8 text-center" style={{ background: '#0F1C32' }}>
          <h3 className="text-[20px] font-black text-white">Need help implementing this?</h3>
          <p className="mt-2 text-[13px] text-slate-400">Our team can build it for you — book a free 30-minute consultation.</p>
          <Link href="/demo" className="mt-5 inline-block rounded-xl px-8 py-3 text-[13px] font-bold text-[#060B17]" style={{ background: '#06CCE8' }}>
            Book Free Consultation →
          </Link>
        </div>

        <Link href="/blog" className="mt-10 inline-flex items-center gap-2 text-[13px] font-semibold text-cyan-400 hover:text-cyan-300">
          <ArrowLeft className="h-3.5 w-3.5" />Back to all articles
        </Link>
      </article>
    </main>
  );
}
