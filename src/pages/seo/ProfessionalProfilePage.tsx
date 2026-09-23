import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { Briefcase, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function ProfessionalProfilePage() {
  const schema = [
    {
      '@type': 'WebPage',
      '@id': 'https://onewinq.com/professional-profile#webpage',
      'url': 'https://onewinq.com/professional-profile',
      'name': 'Professional Digital Profile & Identity for Networking | OneWinq',
      'description': 'Elevate your professional digital identity. Present career achievements, portfolio, resume, and formal contact details with OneWinq.',
      'isPartOf': { '@id': 'https://onewinq.com/#website' },
    },
  ];

  return (
    <SEOPageLayout>
      <SEOHead
        title="Professional Digital Profile & Identity for Networking | OneWinq"
        description="Elevate your professional digital identity. Present career achievements, portfolio, resume, and formal contact details with OneWinq."
        canonical="https://onewinq.com/professional-profile"
        keywords="professional profile, professional digital identity, professional networking, digital business card, career digital profile"
        jsonLd={schema}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Career & B2B</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            Professional <span className="serif">Digital Identity.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            Stand out in client meetings, conferences, and job interviews. A OneWinq Professional Profile showcases your work experience, skill set, achievements, and business contacts in a polished format.
          </p>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 6px' }}>Verified Work Experience & Portfolio</h2>
              <p style={{ color: 'var(--muted)', margin: 0 }}>Showcase case studies, publications, and past achievements directly on your digital card.</p>
            </div>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 6px' }}>Instant VCard & Contact Save</h2>
              <p style={{ color: 'var(--muted)', margin: 0 }}>Allows recipients to save your contact details directly to their phone address book with one tap.</p>
            </div>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid var(--line)' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 6px' }}>Pair with Metallic or Wooden NFC Cards</h2>
              <p style={{ color: 'var(--muted)', margin: 0 }}>Pair your professional profile with a premium <Link href="/nfc-card">Metallic NFC Card</Link> for executive presence.</p>
            </div>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
