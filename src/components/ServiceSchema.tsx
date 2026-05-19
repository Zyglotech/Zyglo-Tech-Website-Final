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
  areaServed = ['India', 'Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi'],
  priceRange = '₹₹',
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `https://www.zyglo.tech${url}`,
    provider: {
      '@type': 'Organization',
      name: 'Zyglo Tech Enterprise',
      url: 'https://www.zyglo.tech',
      '@id': 'https://www.zyglo.tech/#organization',
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
