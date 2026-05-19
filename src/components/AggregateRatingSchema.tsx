export function AggregateRatingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Zyglo Tech Enterprise',
    url: 'https://www.zyglo.tech',
    telephone: '+91-9943907643',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4th Floor, Module 5, Tidel Park, No.4, Rajiv Gandhi Salai, Taramani',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600113',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '47',
      reviewCount: '38',
    },
    priceRange: '₹₹',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
