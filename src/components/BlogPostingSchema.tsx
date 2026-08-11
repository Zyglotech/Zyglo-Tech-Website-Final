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
    url: `https://www.zyglotech.com/blog/${slug}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Organization',
      name: 'Zyglo Tech Enterprise',
      url: 'https://www.zyglotech.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zyglo Tech Enterprise',
      url: 'https://www.zyglotech.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.zyglotech.com/apple-touch-icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.zyglotech.com/blog/${slug}`,
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
