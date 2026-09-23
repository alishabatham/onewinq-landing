import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

interface PrivateAppRouteProps {
  routeName: string;
}

export default function PrivateAppRoute({ routeName }: PrivateAppRouteProps) {
  return (
    <SEOPageLayout>
      <SEOHead
        title={`${routeName} | OneWinq App`}
        description="OneWinq application route."
        noindex={true} // NOINDEX: Prevent crawling of private application routes
      />
      <section className="section">
        <div className="container text-center" style={{ maxWidth: '500px' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#f3ebfc', color: 'var(--violet)', display: 'grid', placeItems: 'center', margin: '0 auto 20px' }}>
            <Lock size={28} />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '0 0 10px' }}>{routeName} Access</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginBottom: '24px' }}>
            Please log in or authenticate to access your OneWinq {routeName.toLowerCase()}.
          </p>
          <Link href="/#top" className="button-dark" style={{ padding: '12px 24px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            Back to OneWinq Home <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </SEOPageLayout>
  );
}
