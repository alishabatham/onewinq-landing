import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Brand } from './Brand';

interface HeaderProps {
  onCta: () => void;
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Header({ onCta }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <div className="top-launch-bar">
        <span>Launching on 01 October 2026</span>
      </div>
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#profiles" data-testid="link-profiles">Profiles</a>
            <a href="#sharing" data-testid="link-sharing">Sharing</a>
            <a href="#network" data-testid="link-network">Network</a>
            <a href="#enterprise" data-testid="link-enterprise">For Organizations</a>
          </nav>
          <button className="header-cta" onClick={onCta} data-testid="button-get-started">
            Get started <ArrowRight size={14} />
          </button>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#profiles" onClick={() => navigate('profiles')} data-testid="mobile-link-profiles">Profiles</a>
            <a href="#sharing" onClick={() => navigate('sharing')} data-testid="mobile-link-sharing">Sharing</a>
            <a href="#network" onClick={() => navigate('network')} data-testid="mobile-link-network">Network</a>
            <a href="#enterprise" onClick={() => navigate('enterprise')} data-testid="mobile-link-enterprise">For Organizations</a>
            <button className="header-cta" onClick={() => { setMenuOpen(false); onCta(); }} data-testid="mobile-button-get-started">
              Get started <ArrowRight size={14} />
            </button>
          </nav>
        )}
      </header>
    </>
  );
}
