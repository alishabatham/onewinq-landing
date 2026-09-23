import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { CreditCard, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'wouter';

export default function NfcCardPage() {
  const schema = [
    {
      '@type': 'WebPage',
      '@id': 'https://onewinq.com/nfc-card#webpage',
      'url': 'https://onewinq.com/nfc-card',
      'name': 'Custom Physical Smart NFC Cards (PVC, Wooden, Metallic) | OneWinq',
      'description': 'Reserve custom physical OneWinq Smart NFC Cards in PVC, Wooden, & Metallic finishes. Get ₹100 instant launch discount.',
      'isPartOf': { '@id': 'https://onewinq.com/#website' },
    },
    {
      '@type': 'Product',
      'name': 'OneWinq Physical Smart NFC Card',
      'image': 'https://onewinq.com/onewinq_brand_logo.png',
      'description': 'Physical NFC smart business card for instant profile sharing.',
      'offers': [
        { '@type': 'Offer', 'name': 'PVC NFC Card', 'price': '400', 'priceCurrency': 'INR' },
        { '@type': 'Offer', 'name': 'Wooden NFC Card', 'price': '900', 'priceCurrency': 'INR' },
        { '@type': 'Offer', 'name': 'Metallic NFC Card', 'price': '1400', 'priceCurrency': 'INR' }
      ]
    }
  ];

  return (
    <SEOPageLayout>
      <SEOHead
        title="Custom Physical Smart NFC Cards (PVC, Wooden, Metallic) | OneWinq"
        description="Reserve custom physical OneWinq Smart NFC Cards in PVC, Wooden, & Metallic finishes. Get ₹100 instant launch discount."
        canonical="https://onewinq.com/nfc-card"
        keywords="NFC business card, NFC digital card, custom metallic NFC card, wooden NFC business card, PVC smart card, contactless card India"
        jsonLd={schema}
      />

      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Physical Touchpoint</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            Custom Physical <span className="serif">NFC Cards.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            Crafted from premium materials, OneWinq Physical NFC Cards combine luxury tactile design with modern contactless technology. Pre-book your card today and save ₹100 before official launch.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '18px', border: '1.5px solid var(--line)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '8px' }}>Standard</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 6px' }}>PVC NFC Card</h2>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px' }}>₹400 <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹500</span></div>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0 }}>Durable matte finish, scratch-resistant, perfect for everyday networking.</p>
            </div>

            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '18px', border: '1.5px solid var(--line)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--coral)', textTransform: 'uppercase', marginBottom: '8px' }}>Eco Luxury</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 6px' }}>Wooden NFC Card</h2>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '12px' }}>₹900 <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹1,000</span></div>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0 }}>Natural hardwood texture, laser engraved detail, eco-conscious statements.</p>
            </div>

            <div style={{ padding: '24px', background: '#ffffff', borderRadius: '18px', border: '1.5px solid var(--violet)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--violet)', textTransform: 'uppercase', marginBottom: '8px' }}>Executive</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 6px' }}>Metallic NFC Card</h2>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--violet)', marginBottom: '12px' }}>₹1,400 <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>₹1,500</span></div>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0 }}>Precision stainless steel alloy, weighted feel, laser engraved logo for executives.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/#cards" className="button-dark" style={{ padding: '14px 32px', borderRadius: '999px', fontSize: '0.95rem' }}>
              Reserve Your Card Now — ₹100 OFF <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
