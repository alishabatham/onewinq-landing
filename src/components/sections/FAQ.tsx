import { useState } from 'react';
import { Plus } from 'lucide-react';

export const faqs: [string, string][] = [
  [
    'What is OneWinq?',
    'OneWinq is a digital identity and networking platform that gives every side of you a place to live. Build Public, Private, and Professional profiles, control which identity you share, connect with people, and manage your network effortlessly.',
  ],
  [
    'What is a digital identity?',
    'A digital identity on OneWinq is your unified, structured online presence. Unlike traditional static business cards or single social links, OneWinq lets you present different sides of yourself—personal, creative, or professional—depending on who you connect with.',
  ],
  [
    'How does OneWinq work?',
    'You create a single OneWinq account and configure your Public, Private, and Professional profiles. Share your active profile using a OneWinq NFC Card, QR code, or direct profile link. When others tap or view your link, your selected profile opens instantly on their device.',
  ],
  [
    'What is a OneWinq Card?',
    'The OneWinq Card is a physical Smart NFC card (available in PVC, Wooden, and Metallic finishes) linked to your digital identity. Tapping it against any NFC-enabled smartphone instantly opens your active profile without requiring any app download.',
  ],
  [
    'How does the NFC card work?',
    'NFC (Near Field Communication) allows wireless data transfer over short distances. When you tap your OneWinq Card near an iPhone or Android phone, the phone automatically recognizes the secure NFC chip signal and opens your custom profile URL in the browser.',
  ],
  [
    'Can I create multiple profiles on OneWinq?',
    'Yes. You can maintain multiple profile modes—such as Public for general networking, Private for close contacts, and Professional for career and client interactions—all under a single account.',
  ],
  [
    'What is the difference between Public, Private, and Professional profiles?',
    'Public profile is your open digital persona; Private profile is restricted to approved connections; and Professional profile highlights your career achievements, portfolio, resume, and formal contact channels.',
  ],
  [
    'Can I control which profile I share?',
    'Yes. You can switch your active default profile at any time from your OneWinq dashboard. Whichever profile mode you set active will be the one displayed when your OneWinq NFC card is tapped.',
  ],
  [
    'Can I connect with people on OneWinq?',
    'Yes. OneWinq includes built-in connection management. You can discover profiles, save connections, retrieve contact details on demand, and message connected users securely.',
  ],
  [
    'What is OneWinq Enterprise?',
    'OneWinq Enterprise is an organization identity management platform designed for companies, teams, and departments to manage corporate identity, employee digital profiles, smart employee cards, roles, and administrative permissions.',
  ],
  [
    'How can organizations use OneWinq?',
    'Organizations use OneWinq Enterprise to issue corporate digital NFC cards to employees, maintain unified company branding across staff profiles, manage directory permissions, and streamline B2B event networking.',
  ],
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq reveal" id="faq">
      <div className="container faq-layout">
        <div>
          <div className="eyebrow">The useful answers</div>
          <h2>Good to<br /><span className="serif">know.</span></h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <button
                className={`faq-question ${open === index ? 'open' : ''}`}
                onClick={() => setOpen(open === index ? -1 : index)}
                aria-expanded={open === index}
                data-testid={`button-faq-${index}`}
              >
                <span>{question}</span>
                <Plus size={20} />
              </button>
              {open === index && (
                <div className="faq-answer" data-testid={`text-faq-answer-${index}`}>
                  {answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
