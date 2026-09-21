import { ArrowRight } from 'lucide-react';

export function Sharing() {
  return (
    <section className="section section-dark share-section reveal" id="sharing">
      <div className="container share-grid">
        <div className="share-copy">
          <div className="eyebrow">Smart sharing</div>
          <h2>Choose what<br /><span className="serif">arrives first.</span></h2>
          <p>OneWinq makes sharing a gesture, not a chore. Your profile link, QR code, or OneWinq Card always opens the version you meant to send.</p>
          <a className="button-light" href="#how-it-works" data-testid="sharing-link-learn">
            The simple version <ArrowRight size={15} />
          </a>
        </div>
        <div className="share-art" aria-label="Phone showing OneWinq smart sharing controls">
          <div className="phone">
            <div className="phone-screen">
              <div className="phone-notch" />
              <div className="avatar">AM</div>
              <h4>Alex Morgan</h4>
              <p>Designing useful things</p>
              <hr />
              <div className="share-row"><span /><div><i /><i /></div></div>
              <div className="share-row"><span style={{ background: 'var(--coral)' }} /><div><i /><i /></div></div>
              <div className="share-controls">
                <div className="share-control"><span>Public profile</span><b className="toggle-on" /></div>
                <div className="share-control"><span>Contact details</span><b className="toggle-on" /></div>
                <div className="share-control"><span>Private notes</span><b style={{ width: 22, height: 12, borderRadius: 99, background: '#d9cdbd' }} /></div>
              </div>
            </div>
          </div>
          <div className="nfc-card">
            <b>onewinq</b>
            <small>Tap to share your world</small>
          </div>
        </div>
      </div>
    </section>
  );
}
