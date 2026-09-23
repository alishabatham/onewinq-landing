import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { ArrowRight, UserCheck, Shield, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

export default function DigitalProfilePage() {
  const schema = [
    {
      '@type': 'WebPage',
      '@id': 'https://onewinq.com/digital-profile#webpage',
      'url': 'https://onewinq.com/digital-profile',
      'name': 'Digital Profile Platform | Public, Private & Professional Modes | OneWinq',
      'description': 'Create versatile digital profiles for every situation. Build Public, Private, and Professional profiles and choose exactly what to share.',
      'isPartOf': { '@id': 'https://onewinq.com/#website' },
    },
  ];

  return (
    <SEOPageLayout>
      <SEOHead
        title="Digital Profile Platform | Public, Private & Professional Modes | OneWinq"
        description="Create versatile digital profiles for every situation. Build Public, Private, and Professional profiles and choose exactly what to share."
        canonical="https://onewinq.com/digital-profile"
        keywords="digital profile, digital profile platform, personal digital profile, public profile, private profile, professional profile"
        jsonLd={schema}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Versatile Profiles</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            One Account. <span className="serif">Multiple Profiles.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            One single profile doesn’t fit every situation or audience. OneWinq lets you create Public, Private, and Professional profiles under one account and choose what enters the room.
          </p>

          <div style={{ display: 'grid', gap: '24px' }}>
            <div style={{ padding: '28px', background: '#ffffff', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: 'var(--violet)' }}>1. Public Profile</h2>
              <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                Your open digital persona for general networking, social events, and public discovery. Share your bio, general social links, and public projects.
              </p>
            </div>

            <div style={{ padding: '28px', background: '#ffffff', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: 'var(--coral)' }}>2. Private Profile</h2>
              <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                Reserved strictly for close connections and trusted colleagues. Keep personal phone numbers, direct messaging handles, and private notes secure.
              </p>
            </div>

            <div style={{ padding: '28px', background: '#ffffff', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: 'var(--dark-violet-2)' }}>
                3. <Link href="/professional-profile" style={{ textDecoration: 'none', color: 'inherit' }}>Professional Profile</Link>
              </h2>
              <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                Tailored for career opportunities, clients, and corporate networking. Highlight work experience, portfolio, resume, and business email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
