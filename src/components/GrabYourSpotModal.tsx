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

  const [paymentDetails, setPaymentDetails] = useState<{ paymentId?: string; orderId?: string } | null>(null);

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
      // 1. Create Razorpay order on backend
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedCard.finalPrice,
          name,
          email,
          cardType: selectedCard.id,
          cardName: selectedCard.name,
          originalPrice: selectedCard.originalPrice,
          discount: selectedCard.discount,
          finalPrice: selectedCard.finalPrice,
          message,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize Razorpay payment order.');
      }

      // 2. Open Razorpay Modal
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load. Please refresh the page and try again.');
      }

      const options = {
        key: orderData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'OneWinq',
        description: `Order ${selectedCard.name}`,
        order_id: orderData.orderId,
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: '#7b2cbf',
        },
        handler: async function (response: any) {
          setIsSubmitting(true);
          try {
            // 3. Verify Payment on Backend
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
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

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed.');
            }

            setPaymentDetails({
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });
            setSubmitted(true);
          } catch (err: any) {
            console.error('Payment Verification Error:', err);
            setErrorMessage(err?.message || 'Payment verification failed. Please contact support.');
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          },
        },
      };

      const razorpayCheckout = new window.Razorpay(options);
      razorpayCheckout.on('payment.failed', function (response: any) {
        setIsSubmitting(false);
        setErrorMessage(response.error?.description || 'Payment failed. Please try again.');
      });
      razorpayCheckout.open();
    } catch (err: any) {
      console.error('Razorpay Order Error:', err);
      setErrorMessage(err?.message || 'Failed to start payment process. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setPaymentDetails(null);
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
            <h2>Order Placed & Paid! 🎉</h2>
            <p>
              Thank you, <strong>{name}</strong>! Your payment for <strong>{selectedCard.name}</strong> has been successfully processed.
            </p>

            {paymentDetails?.paymentId && (
              <div style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', padding: '10px 14px', borderRadius: '10px', margin: '14px 0', fontSize: '13px', color: '#581c87' }}>
                💳 <strong>Payment ID:</strong> <code>{paymentDetails.paymentId}</code>
              </div>
            )}

            <div className="success-summary-pill">
              Selected: <strong>{selectedCard.name}</strong> (Amount Paid: <strong>₹{selectedCard.finalPrice}</strong>)
            </div>

            <div className="success-badge">
              Confirmation email sent to <strong>{email}</strong>
            </div>
            <button className="button-dark modal-done-btn" onClick={handleResetAndClose}>
              Back to OneWinq
            </button>
          </div>
        ) : (
          <div className="modal-form-wrap">
            <div className="modal-header">

              <h2>Order Your OneWinq NFC Card</h2>
              <p>Order your custom physical OneWinq Smart NFC Card with free shipping across India.</p>
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
              <div className="summary-row total-row">
                <span>Total Amount Payable</span>
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
                      <Loader2 size={15} className="spinner" /> Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard size={15} /> Pay & Pre-Book Now — ₹{selectedCard.finalPrice.toLocaleString('en-IN')}
                    </>
                  )}
                </button>
                <p className="routing-note" style={{ textAlign: 'center', fontSize: '12px', color: '#76667d', marginTop: '8px' }}>
                  🔒 Secure 256-bit Encrypted Payment via Razorpay
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

