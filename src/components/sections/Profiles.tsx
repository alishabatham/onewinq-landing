import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export type Mode = 'Public' | 'Private' | 'Professional';

export const modes: Record<Mode, { kicker: string; title: string; description: string; tags: string[] }> = {
  Public: {
    kicker: 'The open door',
    title: 'Meet the real you.',
    description: 'A warm, human profile for the people you want to find you — and the parts of you worth remembering.',
    tags: ['Your story', 'Interests', 'Social links'],
  },
  Private: {
    kicker: 'The close circle',
    title: 'Keep it yours.',
    description: 'Share a little more with the people who have earned it. You decide what belongs behind the door.',
    tags: ['Personal email', 'Trusted people', 'Quiet details'],
  },
  Professional: {
    kicker: 'The signal',
    title: 'Show your work.',
    description: 'A focused identity for the room you are in now — your work, proof, and the next conversation.',
    tags: ['Work history', 'Portfolio', 'Booking link'],
  },
};

export function Profiles() {
  const [active, setActive] = useState<Mode>('Public');
  const current = modes[active];

  return (
    <section className="section modes reveal" id="profiles">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">Three ways to show up</div>
            <h2>Let the moment<br /><span className="serif">set the tone.</span></h2>
          </div>
          <p>Make the right impression without sanding off the interesting parts. Your profiles are yours to shape, switch, and share.</p>
        </div>
        <div className="mode-layout">
          <div className="mode-tabs" role="tablist" aria-label="Profile modes">
            {(Object.keys(modes) as Mode[]).map((mode) => (
              <button
                key={mode}
                className={`mode-tab ${active === mode ? 'active' : ''}`}
                onClick={() => setActive(mode)}
                role="tab"
                aria-selected={active === mode}
                data-testid={`button-profile-mode-${mode.toLowerCase()}`}
              >
                <span>
                  <strong>{mode}</strong>
                  <small>{modes[mode].kicker}</small>
                </span>
                <ArrowRight size={18} />
              </button>
            ))}
          </div>
          <div className="mode-preview" role="tabpanel" data-testid="profile-mode-preview">
            <div className="preview-meta">
              <span>ONEWINQ / {active.toUpperCase()}</span>
              <span>01 / 03</span>
            </div>
            <div className="preview-content">
              <div>
                <div className="eyebrow">{current.kicker}</div>
                <h3>{current.title}</h3>
                <p>{current.description}</p>
                <div className="preview-buttons">
                  {current.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className="preview-art">
                <div className="preview-art-lines">
                  <i /><i /><i />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
