import { Sparkles, Smartphone, Zap } from 'lucide-react';

export function DemoVideoSection() {
  return (
    <section className="section demo-video-section reveal" id="demo">
      <div className="container">
        <div className="demo-header text-center">

          <h2>
            Tap the card. <br />
            <span className="serif">Share your world instantly.</span>
          </h2>
          <p className="demo-subtitle">
            Watch how a single tap on any NFC-enabled smartphone launches your custom OneWinq digital profile in under a second.
          </p>
        </div>

        <div className="demo-stage-card">
          <div className="onewinq-stage" aria-label="OneWinq NFC card tap animation">
            <div className="ambient-orb orb-one" />
            <div className="ambient-orb orb-two" />
            <div className="ambient-orb orb-three" />

            <div className="card-shadow" />
            <div className="nfc-card-anim" aria-hidden="true">
              <div className="card-brand">
                <span>onewinq</span>
                <span>01</span>
              </div>
              <div className="card-chip" />
              <div className="card-nfc">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="device-wrap">
              <div className="device-shadow" />
              <div className="phone-anim">
                <div className="phone-glass">
                  <div className="phone-island" />
                  <div className="screen-light">
                    <span className="lock-kicker">Ready when you are</span>
                    <div className="lock-mark">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 10.5a7.5 7.5 0 0 1 12 0M8.8 13.2a4.1 4.1 0 0 1 6.4 0M11.3 15.8a1.2 1.2 0 0 1 1.4 0" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="12" cy="18.2" r="0.7" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <p className="lock-title">Tap to connect</p>
                    <p className="lock-subtitle">Bring your OneWinq card close</p>
                  </div>

                  <div className="screen-profile">
                    <div className="profile-topline">
                      <span>OneWinq profile</span>
                      <strong>● live</strong>
                    </div>
                    <div className="profile-avatar">
                      <span>OW</span>
                    </div>
                    <p className="profile-name">Alex Morgan</p>
                    <p className="profile-role">Product Strategist</p>
                    <p className="profile-bio">
                      Building the thoughtful layer between people, products, and possibility.
                    </p>
                    <div className="profile-connect">Connect with Alex</div>
                    <div className="profile-icons" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
                      </svg>
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M6 4.5h12A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="m6 7 6 5 6-5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="tap-ripple" />
                </div>
              </div>
            </div>

            <div className="nfc-signals" aria-hidden="true">
              <span />
              <span />
              <span />
              <i className="nfc-dot" />
            </div>

            <p className="floating-copy">
              Tap. Share. Connect.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
