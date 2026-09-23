import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { ShieldCheck, Building2, Layers } from 'lucide-react';

export default function EnterpriseDigitalIdentityPage() {
  return (
    <SEOPageLayout>
      <SEOHead
        title="Enterprise Digital Identity Management for Companies | OneWinq"
        description="Unified enterprise digital identity management platform for companies, teams, and departments. Control security, branding, and smart profile cards."
        canonical="https://onewinq.com/enterprise-digital-identity"
        keywords="enterprise digital identity, digital identity management for companies, corporate digital identity, organization management platform"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="eyebrow">Enterprise Security & Compliance</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05, margin: '16px 0 24px', fontWeight: 700 }}>
            Enterprise Digital <span className="serif">Identity Management.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            Centralize your company identity operations. Manage staff credentials, corporate branding guidelines, single sign-on access, and corporate digital cards from one admin portal.
          </p>
        </div>
      </section>
    </SEOPageLayout>
  );
}
