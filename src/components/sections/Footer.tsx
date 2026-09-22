import { ArrowRight } from 'lucide-react';
import { Brand } from './Brand';

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
        <div className="container footer-inner">
          <Brand />
          <div className="footer-links">
            <a href="#cards" data-testid="footer-link-cards">Smart Cards</a>
            <a href="#profiles" data-testid="footer-link-profiles">Profiles</a>
            <a href="#faq" data-testid="footer-link-faq">FAQ</a>
            <a href="mailto:support@onewinq.com" data-testid="footer-link-email">support@onewinq.com</a>
            <a href="#contact" data-testid="footer-link-contact">Contact Us</a>
          </div>
          <div className="copyright">© 2025 OneWinq</div>
        </div>
      </footer>
    </>
  );
}
