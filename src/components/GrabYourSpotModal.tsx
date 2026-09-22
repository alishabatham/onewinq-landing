import { useState, useEffect, type FormEvent } from 'react';
import { CheckCircle2, Loader2, X, Tag, Sparkles, CreditCard } from 'lucide-react';
import { CARD_OPTIONS, type CardType } from './sections/Cards';

interface GrabYourSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCardId?: CardType;
}

export function GrabYourSpotModal({ isOpen, onClose, initialCardId = 'pvc' }: GrabYourSpotModalProps) {
  const [selectedCardId, setSelectedCardId] = useState<CardType>(initialCardId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialCardId) {
      setSelectedCardId(initialCardId);
    }
  }, [initialCardId, isOpen]);

  if (!isOpen) return null;

  const selectedCard = CARD_OPTIONS.find((c) => c.id === selectedCardId) || CARD_OPTIONS[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          cardType: selectedCard.id,
          cardName: selectedCard.name,
          originalPrice: selectedCard.originalPrice,
          discount: selectedCard.discount,
          finalPrice: selectedCard.finalPrice,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      let data: any = {};

      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text);
        throw new Error('Server returned invalid response. Please try again.');
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send pre-booking reservation.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Email submission error:', err);
      setErrorMessage(err?.message || 'Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleResetAndClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleResetAndClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success-state">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h2>Pre-Booking Reserved!</h2>
            <p>
              Thank you, <strong>{name}</strong>! Your <strong>{selectedCard.name}</strong> pre-booking with a <strong>₹100 discount</strong> has been recorded. We will contact you at <strong>{email}</strong> prior to launch!
            </p>

            <div className="success-summary-pill">
              Selected: <strong>{selectedCard.name}</strong> (Payable on Launch: <strong>₹{selectedCard.finalPrice}</strong>)
            </div>

            <div className="success-badge">
              Official Launch: 01 October 2026
            </div>
            <button className="button-dark modal-done-btn" onClick={handleResetAndClose}>
              Back to OneWinq
            </button>
          </div>
        ) : (
          <div className="modal-form-wrap">
            <div className="modal-header">

              <h2>Pre-Book Your NFC Card</h2>
              <p>Reserve your custom physical OneWinq Smart NFC Card and get ₹100 instant discount before official launch.</p>
            </div>

            {errorMessage && (
              <div style={{ padding: '10px 14px', marginBottom: '16px', background: '#fee2e2', border: '1px solid #f87171', borderRadius: '10px', color: '#991b1b', fontSize: '13px' }}>
                {errorMessage}
              </div>
            )}

            {/* Card Selection Selector */}
            <div className="modal-card-selector">
              <label className="selector-label">Select NFC Card Material:</label>
              <div className="card-pill-group">
                {CARD_OPTIONS.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    className={`card-pill ${selectedCardId === c.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedCardId(c.id)}
                  >
                    <span>{c.name.split(' ')[0]}</span>
                    <span className="pill-price">₹{c.finalPrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Price Breakdown Box */}
            <div className="order-summary-box">
              <div className="summary-row">
                <span>{selectedCard.name} Base Price</span>
                <span className="original-strikethrough">₹{selectedCard.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row discount-row">
                <span><Tag size={13} /> Pre-Booking Discount</span>
                <span className="discount-amt">- ₹{selectedCard.discount} OFF</span>
              </div>
              <div className="summary-row total-row">
                <span>Total Payable on Launch</span>
                <span className="final-total">₹{selectedCard.finalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="spot-name">Full Name *</label>
                <input
                  id="spot-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="spot-email">Email Address *</label>
                <input
                  id="spot-email"
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="spot-message">Delivery Address / Notes (Optional)</label>
                <textarea
                  id="spot-message"
                  rows={2}
                  placeholder="Enter city, pin code, or custom profile request..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="form-footer">
                <button type="submit" className="submit-spot-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="spinner" /> Reserving...
                    </>
                  ) : (
                    <>
                      <CreditCard size={15} /> Pre-Book Now — ₹{selectedCard.finalPrice.toLocaleString('en-IN')}
                    </>
                  )}
                </button>
                {/* <p className="routing-note">
                  🔒 No payment needed today. Payable when your card ships.
                </p> */}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

