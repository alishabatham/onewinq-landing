import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { UserCheck, CreditCard, Shield } from 'lucide-react';

export default function EmployeeDigitalIdentityPage() {
  return (
    <SEOPageLayout>
      <SEOHead
        title="Employee Digital Profiles & Corporate NFC Cards | OneWinq Enterprise"
        description="Equip your employees with professional digital profiles and branded Smart NFC cards for frictionless corporate B2B networking."
        canonical="https://onewinq.com/employee-digital-identity"
        keywords="employee digital identity, employee digital profile, digital employee card, employee networking platform"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Corporate Staff Profiles</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            Employee Digital <span className="serif">Identity & NFC Cards.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            Empower your sales, executive, and field teams with branded OneWinq Smart NFC Cards. Eliminate re-printing costs while modernizing your organization's physical-to-digital image.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
