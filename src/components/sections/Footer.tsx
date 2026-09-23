import { ArrowRight } from 'lucide-react';
import { Brand } from './Brand';
import { Link } from 'wouter';

interface FooterProps {
  onCta: () => void;
}

export function Footer({ onCta }: FooterProps) {
  return (
    <>
      <section className="final-cta" id="footer">
        <div className="container final-grid">
          <div>
            <div className="eyebrow">Ready when you are</div>
            <h2>Make a better<br /><em>first impression.</em></h2>
          </div>
          <div className="final-action">
            <p>One identity. More context. A lot more you.</p>
            <button className="button-dark" onClick={onCta} data-testid="footer-button-get-started">
              Create your OneWinq <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container" style={{ paddingTop: '20px' }}>
          <div className="footer-links-matrix" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', paddingBottom: '30px', borderBottom: '1px solid var(--line)', marginBottom: '24px' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', marginBottom: '10px' }}>Product & Platform</div>
              <div style={{ display: 'grid', gap: '6px' }}>
                <Link href="/digital-identity" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Digital Identity Platform</Link>
                <Link href="/digital-profile" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Digital Profiles</Link>
                <Link href="/professional-profile" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Professional Profile</Link>
                <Link href="/networking" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Digital Networking</Link>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', marginBottom: '10px' }}>NFC & Hardware</div>
              <div style={{ display: 'grid', gap: '6px' }}>
                <Link href="/digital-card" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Smart Digital Business Card</Link>
                <Link href="/nfc-card" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Physical NFC Cards</Link>
                <a href="/#cards" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>PVC, Wooden & Metallic</a>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', marginBottom: '10px' }}>Enterprise Solutions</div>
              <div style={{ display: 'grid', gap: '6px' }}>
                <Link href="/onewinq-enterprise" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>OneWinq Enterprise</Link>
                <Link href="/enterprise-digital-identity" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Enterprise Identity</Link>
                <Link href="/employee-digital-identity" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Employee Digital Profiles</Link>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--ink)', marginBottom: '10px' }}>Support & Direct</div>
              <div style={{ display: 'grid', gap: '6px' }}>
                <a href="/#faq" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Frequently Asked Questions</a>
                <a href="/#contact" style={{ fontSize: '0.8rem', color: 'var(--muted)', textDecoration: 'none' }}>Contact Us</a>
                <a href="mailto:support@onewinq.com" style={{ fontSize: '0.8rem', color: 'var(--violet)', textDecoration: 'none', fontWeight: 600 }}>support@onewinq.com</a>
              </div>
            </div>
          </div>

          <div className="footer-inner">
            <Brand />
            <div className="copyright">© 2025 OneWinq • Digital Identity & Networking Platform</div>
          </div>
        </div>
      </footer>
    </>
  );
}
