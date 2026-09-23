import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { Building2, Users, ShieldCheck, LayoutGrid, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function EnterprisePage() {
  const schema = [
    {
      '@type': 'WebPage',
      '@id': 'https://onewinq.com/onewinq-enterprise#webpage',
      'url': 'https://onewinq.com/onewinq-enterprise',
      'name': 'OneWinq Enterprise | Organization & Employee Identity Management Platform',
      'description': 'Empower your company with OneWinq Enterprise. Manage corporate identity, employee digital profiles, teams, departments, smart cards, and permissions.',
      'isPartOf': { '@id': 'https://onewinq.com/#website' },
    },
    {
      '@type': 'Organization',
      'name': 'OneWinq Enterprise',
      'url': 'https://onewinq.com/onewinq-enterprise',
      'description': 'Enterprise digital identity management for companies and teams.'
    }
  ];

  return (
    <SEOPageLayout>
      <SEOHead
        title="OneWinq Enterprise | Organization & Employee Identity Management Platform"
        description="Empower your company with OneWinq Enterprise. Manage corporate identity, employee digital profiles, teams, departments, smart cards, and permissions."
        canonical="https://onewinq.com/onewinq-enterprise"
        keywords="OneWinq Enterprise, digital identity for organizations, enterprise digital identity, organization management platform, enterprise networking platform, company digital profile"
        jsonLd={schema}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Organization Platform</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            OneWinq <span className="serif">Enterprise.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            Scale your company identity effortlessly. OneWinq Enterprise gives organizations complete control over employee digital profiles, team permissions, corporate NFC smart cards, and brand consistency.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '18px', border: '1px solid var(--line)' }}>
              <Building2 style={{ color: 'var(--violet)' }} size={28} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '12px 0 6px' }}>Company Identity Layer</h2>
              <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.92rem' }}>Maintain consistent corporate branding across all employee digital profiles and contact cards.</p>
            </div>

            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '18px', border: '1px solid var(--line)' }}>
              <Users style={{ color: 'var(--coral)' }} size={28} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '12px 0 6px' }}>Teams & Departments</h2>
              <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.92rem' }}>Organize staff into sales, executive, design, and engineering teams with granular access controls.</p>
            </div>
          </div>

          <div style={{ padding: '32px', background: '#faf5ff', border: '1px solid #d8b4fe', borderRadius: '24px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '10px' }}>Transform Corporate Networking for Your Team</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Interested in custom enterprise pricing, SSO integration, or bulk card orders?</p>
            <Link href="/#contact" className="button-dark" style={{ padding: '12px 28px', borderRadius: '999px' }}>
              Contact Enterprise Sales <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
