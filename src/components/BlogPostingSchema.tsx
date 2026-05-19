export function BlogPostingSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  readTime,
  category,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  readTime: string;
  category: string;
  tags: string[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url: `https://www.zyglo.tech/blog/${slug}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: 'Zyglo Tech Enterprise',
      url: 'https://www.zyglo.tech',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zyglo Tech Enterprise',
      url: 'https://www.zyglo.tech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zyglo.tech/apple-touch-icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.zyglo.tech/blog/${slug}`,
    },
    articleSection: category,
    keywords: tags.join(', '),
    timeRequired: `PT${parseInt(readTime)}M`,
    inLanguage: 'en-IN',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
