import { ArrowRight } from 'lucide-react';

export type CardType = 'pvc' | 'wooden' | 'metallic';

export interface CardOption {
  id: CardType;
  name: string;
  subTitle: string;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  description: string;
  visualClass: string;
}

export const CARD_OPTIONS: CardOption[] = [
  {
    id: 'pvc',
    name: 'PVC Card',
    subTitle: 'LIGHTWEIGHT EVERYDAY CARRY',
    originalPrice: 500,
    discount: 100,
    finalPrice: 400,
    description: 'Clean, durable, and ready for every introduction.',
    visualClass: 'card-preview-pvc',
  },
  {
    id: 'wooden',
    name: 'Wooden Card',
    subTitle: 'NATURAL STATEMENT PIECE',
    originalPrice: 1000,
    discount: 100,
    finalPrice: 900,
    description: 'A warm, tactile card for a memorable first impression.',
    visualClass: 'card-preview-wooden',
  },
  {
    id: 'metallic',
    name: 'Metallic Card',
    subTitle: 'PREMIUM LASTING FINISH',
    originalPrice: 1500,
    discount: 100,
    finalPrice: 1400,
    description: 'A refined metal finish for the moments that matter.',
    visualClass: 'card-preview-metallic',
  }
];

interface CardsProps {
  onSelectCard: (cardId: CardType) => void;
}

// Custom Chip Icon Component for realistic credit card chip look
function EmvChip({ className = '' }: { className?: string }) {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" className={className}>
      <rect width="34" height="26" rx="5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.2" />
      <path d="M 0 13 H 34 M 11 0 V 26 M 23 0 V 26 M 11 8 H 23 M 11 18 H 23" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="11" y="8" width="12" height="10" rx="2" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function Cards({ onSelectCard }: CardsProps) {
  return (
    <section className="reveal cards-section" id="cards">
      <div className="container">
        {/* Top Header Grid */}
        <div className="cards-top-header">
          <div className="header-left">
            <span className="cards-eyebrow">THE ONEWINQ SMART NFC CARD</span>
            <h2 className="cards-hero-title">
              Carry your<br />
              identity<br />
              <em>with you.</em>
            </h2>
          </div>
          <div className="header-right">
            <p className="cards-hero-desc">
              Tap once with your smart NFC card to share the profile that fits the moment. Choose the finish that feels like you.
            </p>
          </div>
        </div>

        {/* Launch Pre-Booking Banner */}
        <div className="launch-banner">
          <div className="banner-left">
            <span className="banner-badge">LAUNCH PRE-BOOKING</span>
            <span className="banner-text">Save ₹100 on every card</span>
          </div>
          <div className="banner-right">
            Available until 01 October 2026
          </div>
        </div>

        {/* 3 Cards Grid */}
        <div className="cards-grid">
          {CARD_OPTIONS.map((card) => (
            <div key={card.id} className="pricing-card" data-testid={`card-option-${card.id}`}>
              {/* Realistic Visual Card Mockup */}
              <div className={`card-visual-box ${card.visualClass}`}>
                <div className="visual-top">
                  <span className="visual-brand">onewinq</span>
                  <EmvChip className="visual-chip-icon" />
                </div>
                <div className="visual-bottom">
                  <span className="visual-tap-text">Tap to share</span>
                </div>
              </div>

              {/* Card Meta & Subtitle */}
              <div className="card-sub-header">
                <span className="card-subtitle-tag">{card.subTitle}</span>
                <span className="discount-tag">₹100 OFF</span>
              </div>

              {/* Title & Description */}
              <h3 className="card-title">{card.name}</h3>
              <p className="card-desc">{card.description}</p>

              {/* Pricing Row */}
              <div className="price-row">
                <span className="original-price">₹{card.originalPrice.toLocaleString('en-IN')}</span>
                <span className="final-price">₹{card.finalPrice.toLocaleString('en-IN')}</span>
                <span className="prebooking-label">PRE-BOOKING</span>
              </div>

              {/* Action Button */}
              <button
                className="card-prebook-btn"
                onClick={() => onSelectCard(card.id)}
                data-testid={`button-prebook-${card.id}`}
              >
                <span>Pre-book this card</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
