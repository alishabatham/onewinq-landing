import { ArrowDownRight, ArrowRight, ScanLine, Sparkles } from 'lucide-react';
import { Header } from './Header';

interface HeroProps {
  onCta: () => void;
}

export function Hero({ onCta }: HeroProps) {
  return (
    <section className="hero" id="top">
      <Header onCta={onCta} />
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="eyebrow">A better way to be known</div>
          <h1>Your identity.<br /><em>Your way.</em></h1>
          <p className="hero-copy">OneWinq gives every side of you a place to live — and lets you choose which one enters the room.</p>
          <div className="hero-actions">
            <button className="header-cta" onClick={onCta} data-testid="hero-button-create">
              Get your Card <ArrowRight size={15} />
            </button>
            <a className="button-light" href="#how-it-works" data-testid="hero-link-how-it-works">
              See how it works <ArrowDownRight size={15} />
            </a>
          </div>

        </div>
        <div className="hero-visual" aria-label="OneWinq profile preview">
          <div className="orbit" />
          <div className="float-pill pill-one"><ScanLine size={15} /> Tap to share</div>
          <div className="profile-card">
            <div className="card-top"><span>ONEWINQ / PUBLIC</span><Sparkles size={15} /></div>
            <div className="avatar">AM</div>
            <h2 className="profile-name">Alex Morgan</h2>
            <div className="profile-role">Designer, connector, curious human</div>
            <div className="profile-line" />
            <div className="profile-tags"><span>Design systems</span><span>City walks</span><span>Good questions</span></div>
            <div className="profile-link"><span>onewinq.me/alex</span><ArrowRight size={15} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
