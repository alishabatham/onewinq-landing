import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { ArrowRight, ShieldCheck, UserCheck, Layers, Share2 } from 'lucide-react';
import { Link } from 'wouter';

export default function DigitalIdentityPage() {
  const schema = [
    {
      '@type': 'WebPage',
      '@id': 'https://onewinq.com/digital-identity#webpage',
      'url': 'https://onewinq.com/digital-identity',
      'name': 'Digital Identity Platform | Create & Manage Your Identity | OneWinq',
      'description': 'Build and manage your complete digital identity with OneWinq. Create Public, Private, and Professional profiles, share via Smart NFC cards, and own your identity.',
      'isPartOf': { '@id': 'https://onewinq.com/#website' },
      'breadcrumb': { '@id': 'https://onewinq.com/digital-identity#breadcrumb' },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://onewinq.com/digital-identity#breadcrumb',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://onewinq.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Digital Identity', 'item': 'https://onewinq.com/digital-identity' },
      ],
    },
  ];

  return (
    <SEOPageLayout>
      <SEOHead
        title="Digital Identity Platform | Create & Manage Your Identity | OneWinq"
        description="Build and manage your complete digital identity with OneWinq. Create Public, Private, and Professional profiles, share via Smart NFC cards, and own your identity."
        canonical="https://onewinq.com/digital-identity"
        keywords="digital identity platform, digital identity, online digital identity, digital identity management, personal digital profile"
        jsonLd={schema}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Core Platform</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            What is a <span className="serif">Digital Identity?</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            Your digital identity is the complete, structured representation of who you are online. OneWinq replaces fragmented links, paper business cards, and static social handles with one intelligent, connected identity platform.
          </p>

          <div style={{ display: 'grid', gap: '30px', marginTop: '40px' }}>
            <div style={{ padding: '28px', background: '#ffffff', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Layers style={{ color: 'var(--violet)' }} size={24} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Unified Identity Management</h2>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Manage all your personal, creative, and professional details in one secure dashboard. Update your contact info once, and every active profile automatically stays up to date.
              </p>
            </div>

            <div style={{ padding: '28px', background: '#ffffff', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <UserCheck style={{ color: 'var(--violet)' }} size={24} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Contextual Profile Modes</h2>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Shape different profile modes for different moments. Switch between <Link href="/digital-profile">Public Profile</Link>, <Link href="/professional-profile">Professional Profile</Link>, and Private Profile seamlessly.
              </p>
            </div>

            <div style={{ padding: '28px', background: '#ffffff', borderRadius: '20px', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Share2 style={{ color: 'var(--violet)' }} size={24} />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Smart NFC Card Integration</h2>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                Pair your digital identity with a physical <Link href="/nfc-card">OneWinq NFC Card</Link>. Tap your card against any smartphone to open your chosen profile instantly.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '50px', padding: '32px', background: 'var(--gradient-dark)', color: '#ffffff', borderRadius: '24px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '12px', color: '#ffffff' }}>Ready to Take Control of Your Identity?</h3>
            <p style={{ color: 'rgba(251,248,255,0.8)', marginBottom: '24px' }}>Reserve your physical OneWinq NFC Card today with ₹100 instant launch discount.</p>
            <Link href="/#cards" className="button-coral" style={{ padding: '12px 28px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Pre-Book Your Card <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
