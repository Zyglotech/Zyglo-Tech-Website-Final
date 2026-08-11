interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  category?: string;
  areaServed?: string[];
  priceRange?: string;
}

export function ServiceSchema({
  name,
  description,
  url,
  category,
  areaServed = ['India', 'Salem', 'Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi'],
  priceRange = '₹₹',
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `https://www.zyglotech.com${url}`,
    provider: {
      '@type': 'Organization',
      name: 'Zyglo Tech Enterprise',
      url: 'https://www.zyglotech.com',
      '@id': 'https://www.zyglotech.com/#organization',
    },
    areaServed: areaServed.map((area) => ({
      '@type': area === 'India' ? 'Country' : 'City',
      name: area,
    })),
    ...(category ? { serviceType: category } : {}),
    ...(priceRange ? { offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR' } } } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
