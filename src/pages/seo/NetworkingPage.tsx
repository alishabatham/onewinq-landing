import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { Users, HeartHandshake, MessageSquare, BookmarkCheck, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function NetworkingPage() {
  const schema = [
    {
      '@type': 'WebPage',
      '@id': 'https://onewinq.com/networking#webpage',
      'url': 'https://onewinq.com/networking',
      'name': 'Digital Networking & Connection Management Platform | OneWinq',
      'description': 'Never lose a meaningful connection. Discover profiles, save connections, retrieve contact details on demand, and message connected users with OneWinq.',
      'isPartOf': { '@id': 'https://onewinq.com/#website' },
    },
  ];

  return (
    <SEOPageLayout>
      <SEOHead
        title="Digital Networking & Connection Management Platform | OneWinq"
        description="Never lose a meaningful connection. Discover profiles, save connections, retrieve contact details on demand, and message connected users with OneWinq."
        canonical="https://onewinq.com/networking"
        keywords="digital networking platform, professional networking platform, connection management, save connections, professional networking app"
        jsonLd={schema}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Smart Connections</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            Digital Networking <span className="serif">Reimagined.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            A phone number or social handle alone doesn’t tell the full story. OneWinq helps you discover profiles, understand context, save contacts for the long term, and message connected users seamlessly.
          </p>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <BookmarkCheck style={{ color: 'var(--violet)' }} size={24} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '10px 0 6px' }}>Save & Retrieve Connections</h2>
              <p style={{ color: 'var(--muted)', margin: 0 }}>People you meet today can become important collaborators later. Organize your connections on your dashboard and search anytime.</p>
            </div>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <MessageSquare style={{ color: 'var(--coral)' }} size={24} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '10px 0 6px' }}>Built-in Messaging</h2>
              <p style={{ color: 'var(--muted)', margin: 0 }}>Send direct messages to connected users without needing third-party messaging apps.</p>
            </div>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
