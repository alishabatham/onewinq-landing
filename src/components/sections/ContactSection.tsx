import { useState, type FormEvent } from 'react';
import { Mail, Send, CheckCircle2, Loader2, MessageSquare, ShieldCheck } from 'lucide-react';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('NFC Card Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          subject,
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
        throw new Error(data.error || 'Failed to send message.');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setErrorMessage(err?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setSubject('NFC Card Inquiry');
    setMessage('');
  };

  return (
    <section className="reveal contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left Column: Information & Email */}
          <div className="contact-info-col">
            <span className="contact-eyebrow">REACH OUT TO US</span>
            <h2 className="contact-title">
              Let&apos;s start a <em>conversation.</em>
            </h2>
            <p className="contact-desc">
              Have a question about our Smart NFC Cards, custom branding, enterprise orders, or digital profiles? Our support team is here to assist you.
            </p>

            {/* Prominent Email Card */}
            <div className="contact-email-card">
              <div className="email-icon-box">
                <Mail size={22} />
              </div>
              <div className="email-details">
                <span className="email-label">Official Support Email</span>
                <a href="mailto:support@onewinq.com" className="email-link" data-testid="contact-email-link">
                  support@onewinq.com
                </a>
              </div>
            </div>

            <div className="contact-perks">
              <div className="perk-item">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Response within 24 business hours</span>
              </div>
              <div className="perk-item">
                <ShieldCheck size={16} className="perk-icon" />
                <span>Custom bulk order consultations</span>
              </div>
              <div className="perk-item">
                <MessageSquare size={16} className="perk-icon" />
                <span>Dedicated customer support team</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success-state">
                <div className="success-icon-circle">
                  <CheckCircle2 size={44} />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>
                  Thank you, <strong>{name}</strong>! We have received your inquiry and our team will get back to you at <strong>{email}</strong> shortly.
                </p>
                <button type="button" className="contact-reset-btn" onClick={handleReset}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h3 className="form-heading">Send Us a Message</h3>

                {errorMessage && (
                  <div className="contact-error-box">
                    {errorMessage}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Topic / Subject</label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="contact-select-input"
                  >
                    <option value="NFC Card Inquiry">NFC Card Order Inquiry</option>
                    <option value="Pre-Booking Question">Pre-Booking Special Offer Question</option>
                    <option value="Enterprise / Bulk Order">Enterprise / Bulk Card Orders</option>
                    <option value="Technical Support">Technical & Profile Support</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="How can we help you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spinner" /> Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
