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
            <a href="#why-onewinq" data-testid="link-why-onewinq">Why OneWinq</a>
            <a href="#cards" data-testid="link-cards">Smart Cards</a>
            <a href="#profiles" data-testid="link-profiles">Profiles</a>
            <a href="#sharing" data-testid="link-sharing">Sharing</a>
            <a href="#contact" data-testid="link-contact">Contact Us</a>
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
            <a href="#why-onewinq" onClick={() => navigate('why-onewinq')} data-testid="mobile-link-why-onewinq">Why OneWinq</a>
            <a href="#cards" onClick={() => navigate('cards')} data-testid="mobile-link-cards">Smart Cards</a>
            <a href="#profiles" onClick={() => navigate('profiles')} data-testid="mobile-link-profiles">Profiles</a>
            <a href="#sharing" onClick={() => navigate('sharing')} data-testid="mobile-link-sharing">Sharing</a>
            <a href="#contact" onClick={() => navigate('contact')} data-testid="mobile-link-contact">Contact Us</a>
            <button className="header-cta" onClick={() => { setMenuOpen(false); onCta(); }} data-testid="mobile-button-get-started">
              Get started <ArrowRight size={14} />
            </button>
          </nav>
        )}
      </header>
    </>
  );
}
