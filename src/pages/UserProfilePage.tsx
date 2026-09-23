import { SEOHead } from '@/components/SEOHead';
import { SEOPageLayout } from '@/components/SEOPageLayout';
import { useParams } from 'wouter';
import { Sparkles, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();

  // Profile Privacy Check: By default, profile routes are unindexed unless explicitly set public by user
  const isPublicProfile = false; // Mock privacy flag for illustration

  const title = isPublicProfile
    ? `${username || 'User'} — OneWinq Profile`
    : `OneWinq Digital Identity`;

  const description = isPublicProfile
    ? `Connect with ${username} on OneWinq digital identity and networking platform.`
    : `OneWinq digital identity profile page.`;

  return (
    <SEOPageLayout>
      <SEOHead
        title={title}
        description={description}
        canonical={`https://onewinq.com/u/${username || ''}`}
        noindex={!isPublicProfile} // NOINDEX safety flag for non-public user profiles
      />
      <section className="section">
        <div className="container text-center" style={{ maxWidth: '600px' }}>
          <div className="avatar" style={{ width: 80, height: 80, margin: '0 auto 16px', fontSize: '2rem' }}>
            {(username || 'OW').slice(0, 2).toUpperCase()}
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 6px' }}>@{username || 'user'}</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '24px' }}>OneWinq Digital Profile</p>
          
          <div style={{ padding: '24px', background: '#ffffff', borderRadius: '20px', border: '1px solid var(--line)', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--violet)', font: '600 0.75rem var(--app-font-mono)', marginBottom: '8px' }}>
              <Shield size={14} /> PROFILE PRIVACY SCOPED
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0 }}>
              This profile is managed securely via OneWinq. Connect with @{username} or pre-book your custom OneWinq NFC Card to share your identity.
            </p>
          </div>

          <div style={{ marginTop: '30px' }}>
            <Link href="/#cards" className="button-dark" style={{ padding: '12px 24px', borderRadius: '999px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Create Your OneWinq <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}
