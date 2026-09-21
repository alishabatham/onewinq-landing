import { ArrowRight, Building2, Globe2, ShieldCheck, UsersRound, type LucideIcon } from 'lucide-react';

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Enterprise() {
  const items: Array<[LucideIcon, string, string]> = [
    [Building2, 'Company identities', 'A clear, consistent way for every team member to show up.'],
    [UsersRound, 'People directories', 'Find the right person with context, not just a title.'],
    [ShieldCheck, 'Permissions', 'Control what is shared, by team, role, or moment.'],
    [Globe2, 'Events & internal networking', 'Make every introduction inside your organization count.'],
  ];

  return (
    <section className="section enterprise reveal" id="enterprise">
      <div className="container">
        <div className="enterprise-wrap">
          <div className="product-context" aria-label="OneWinq products">
            <div className="product-context-intro">
              <span>ONEWINQ PRODUCTS</span>
              <b>One ecosystem. Two clear ways to use it.</b>
            </div>
            <div className="product-path">
              <span>For individuals</span>
              <strong>OneWinq</strong>
              <small>Your personal identity.</small>
            </div>
            <div className="product-path active">
              <span>For organizations</span>
              <strong>OneWinq Enterprise</strong>
              <small>Your company identity layer.</small>
            </div>
          </div>
          <div className="enterprise-top">
            <div>
              <div className="eyebrow">OneWinq Enterprise</div>
              <h2>Identity for the <em>whole company.</em></h2>
            </div>
            <p>
              <strong>OneWinq is for individuals.</strong> OneWinq Enterprise is the separate workspace for organizations, teams, culture, and company-wide connections.
            </p>
          </div>
          <div className="enterprise-features">
            {items.map(([Icon, title, description]) => (
              <div className="enterprise-feature" key={title}>
                <Icon size={20} />
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
          <a
            className="enterprise-cta"
            href="#footer"
            onClick={(event) => {
              event.preventDefault();
              scrollToId('footer');
            }}
            data-testid="enterprise-link-talk"
          >
            Talk to our team <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
