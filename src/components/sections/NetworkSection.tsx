import { ArrowRight } from 'lucide-react';

export function NetworkSection() {
  return (
    <section className="section network reveal" id="network">
      <div className="container network-layout">
        <div className="network-copy">
          <div className="eyebrow">Your people, in one place</div>
          <h2>A network that remembers the <span className="serif">human part.</span></h2>
          <p>Not a follower count. Not a spreadsheet. OneWinq helps you hold onto the people, context, and small details that make a connection worth keeping.</p>
          <a className="button-dark" href="#faq" data-testid="network-link-more">
            Keep exploring <ArrowRight size={15} />
          </a>
        </div>
        <div className="network-board" aria-label="Illustration of a personal network">
          <div className="connection" />
          <div className="connection two" />
          <div className="connection three" />
          <div className="connection four" />
          <div className="node node-main">AM</div>
          <div className="node node-a">JL</div>
          <div className="node node-b">RK</div>
          <div className="node node-c">NS</div>
          <div className="node node-d">TF</div>
          <div className="network-label">your network / 48 connections</div>
        </div>
      </div>
    </section>
  );
}
