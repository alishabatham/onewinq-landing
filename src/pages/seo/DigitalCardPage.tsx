import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { CreditCard, QrCode, SmartphoneNfc, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function DigitalCardPage() {
  const schema = [
    {
      '@type': 'WebPage',
      '@id': 'https://onewinq.com/digital-card#webpage',
      'url': 'https://onewinq.com/digital-card',
      'name': 'Smart Digital Business Card & Contactless Profile Sharing | OneWinq',
      'description': 'Replace paper business cards with a Smart Digital Card. Share your profile via NFC, QR code, or link without any app downloads.',
      'isPartOf': { '@id': 'https://onewinq.com/#website' },
    },
  ];

  return (
    <SEOPageLayout>
      <SEOHead
        title="Smart Digital Business Card & Contactless Profile Sharing | OneWinq"
        description="Replace paper business cards with a Smart Digital Card. Share your profile via NFC, QR code, or link without any app downloads."
        canonical="https://onewinq.com/digital-card"
        keywords="digital business card, smart digital card, digital visiting card, virtual business card, contactless business card, digital contact card"
        jsonLd={schema}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Smart Profile Sharing</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            Smart <span className="serif">Digital Business Card.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            Never run out of business cards again. OneWinq Smart Digital Cards let you share your profile using NFC tap, QR codes, or direct web links with zero friction.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '18px', border: '1px solid var(--line)' }}>
              <SmartphoneNfc style={{ color: 'var(--violet)' }} size={28} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '14px 0 8px' }}>NFC Tap Sharing</h2>
              <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.92rem' }}>Tap your physical card near any smartphone for instant profile reveal.</p>
            </div>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '18px', border: '1px solid var(--line)' }}>
              <QrCode style={{ color: 'var(--coral)' }} size={28} />
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '14px 0 8px' }}>Dynamic QR Code</h2>
              <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.92rem' }}>Scan your custom QR code on lockscreens, presentations, or print media.</p>
            </div>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
