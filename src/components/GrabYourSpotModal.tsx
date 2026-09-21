import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';

interface GrabYourSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GrabYourSpotModal({ isOpen, onClose }: GrabYourSpotModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // POST form data to Nodemailer backend endpoint
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          handle,
          message,
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
        throw new Error(data.error || 'Failed to send email reservation.');
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
    setHandle('');
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
            <h2>Spot Reserved!</h2>
            <p>
              Thank you, <strong>{name}</strong>! Your spot has been successfully reserved. We will be in touch soon!
            </p>

            <div className="success-badge">
              <Sparkles size={16} /> Launching 01 October 2026
            </div>
            <button className="button-dark modal-done-btn" onClick={handleResetAndClose}>
              Back to OneWinq
            </button>
          </div>
        ) : (
          <div className="modal-form-wrap">
            <div className="modal-header">
              <span className="modal-eyebrow">Early Access</span>
              <h2>Grab Your Spot</h2>
              <p>Be the first to claim your OneWinq identity before our launch on 01 October 2026.</p>
            </div>

            {errorMessage && (
              <div style={{ padding: '10px 14px', marginBottom: '16px', background: '#fee2e2', border: '1px solid #f87171', borderRadius: '8px', color: '#991b1b', fontSize: '13px' }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="spot-name">Full Name *</label>
                <input
                  id="spot-name"
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="spot-email">Your Email Address *</label>
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
                <label htmlFor="spot-handle">Desired OneWinq Handle</label>
                <div className="handle-input-wrap">
                  <span className="handle-prefix">onewinq.me/</span>
                  <input
                    id="spot-handle"
                    type="text"
                    placeholder="alex"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="spot-message">Note or Question (Optional)</label>
                <textarea
                  id="spot-message"
                  rows={3}
                  placeholder="Tell us what profile mode you're most excited for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="form-footer">
                <button type="submit" className="header-cta submit-spot-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spinner" /> Reserving...
                    </>
                  ) : (
                    'Reserve My Spot'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
