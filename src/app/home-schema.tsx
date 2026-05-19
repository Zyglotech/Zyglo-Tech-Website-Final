const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How quickly can Zyglo deploy an AI chatbot or automation for my business?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most AI chatbot and workflow automation projects go live within 2–3 weeks following a structured discovery and sprint-based build process.' },
    },
    {
      '@type': 'Question',
      name: 'Do you build mobile apps for both Android and iOS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We develop native Android, native iOS, and cross-platform apps using Flutter and React Native — whichever best suits your budget and requirements.' },
    },
    {
      '@type': 'Question',
      name: 'Is your ERP platform compliant with Indian GST and tax regulations?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. Our ERP is GST-ready with automated GSTR-1, GSTR-3B and annual filing. Indian accounting standards and TDS/TCS tracking are included by default.' },
    },
    {
      '@type': 'Question',
      name: 'What is AEO and GEO ranking and why does it matter for Indian businesses?',
      acceptedAnswer: { '@type': 'Answer', text: 'AEO (Answer Engine Optimisation) and GEO (Generative Engine Optimisation) ensure your business appears in AI search results on ChatGPT, Gemini, and Perplexity. As AI search grows, traditional SEO alone is no longer enough.' },
    },
    {
      '@type': 'Question',
      name: 'Do you handle college and academic final-year projects?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. We deliver final-year projects, IoT solutions, AI prototypes and software systems for engineering colleges and institutions — with documentation, presentation support and source code.' },
    },
    {
      '@type': 'Question',
      name: 'Where is Zyglo Tech Enterprise located?',
      acceptedAnswer: { '@type': 'Answer', text: 'Zyglo Tech Enterprise is headquartered in Chennai, Tamil Nadu, India. We serve clients across India including Bangalore, Hyderabad, Mumbai and Delhi, as well as international clients.' },
    },
    {
      '@type': 'Question',
      name: 'How much does an AI chatbot cost in India?',
      acceptedAnswer: { '@type': 'Answer', text: 'AI chatbot development at Zyglo typically starts from ₹25,000 for basic WhatsApp bots, and ₹75,000–₹2,00,000 for advanced multi-channel AI agents with CRM integration. We offer a free 30-minute consultation to provide a custom quote.' },
    },
  ],
};

export function HomeSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
