import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.zyglotech.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-[12px] text-slate-500">
        {items.map((item, index) => (
          <span key={item.label} className="flex items-center gap-2">
            {index > 0 && <span>/</span>}
            {item.href ? (
              <Link href={item.href} className="transition hover:text-slate-300">
                {item.label}
              </Link>
            ) : (
              <span className="text-cyan-400">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
