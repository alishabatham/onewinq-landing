import { ArrowRight, ShieldCheck, UsersRound, Zap } from 'lucide-react';

export function Moments() {
  return (
    <section className="section moments reveal" id="moments">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Made for real life</div>
            <h2>Every room asks<br /><span className="serif">a little different.</span></h2>
          </div>
          <p>From a first hello to a new collaboration, your identity can arrive ready for the moment.</p>
        </div>
        <div className="moment-grid">
          <article className="moment-card tall">
            <div>
              <div className="moment-icon"><UsersRound size={20} /></div>
              <h3>At a dinner with people you want to know.</h3>
              <p>Share a glimpse that opens up a good conversation — not a data dump.</p>
            </div>
            <div className="moment-footer">
              <span>PUBLIC PROFILE</span>
              <ArrowRight size={15} />
            </div>
          </article>
          <article className="moment-card yellow">
            <div>
              <div className="moment-icon"><Zap size={20} /></div>
              <h3>In the room where work happens.</h3>
              <p>Lead with the work, proof, and details that move things forward.</p>
            </div>
            <div className="moment-footer">
              <span>PROFESSIONAL</span>
              <ArrowRight size={15} />
            </div>
          </article>
          <article className="moment-card">
            <div>
              <div className="moment-icon"><ShieldCheck size={20} /></div>
              <h3>With the people who have earned more.</h3>
              <p>Keep the close-to-you details in a space that feels considered.</p>
            </div>
            <div className="moment-footer">
              <span>PRIVATE PROFILE</span>
              <ArrowRight size={15} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
