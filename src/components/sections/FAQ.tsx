import { useState } from 'react';
import { Plus } from 'lucide-react';

export const faqs = [
  [
    'What is OneWinq?',
    'OneWinq is a single home for the different ways you show up. Build profiles for different moments, share only what feels right, and keep the people you meet in one thoughtful network.',
  ],
  [
    'Do I need a new profile for every context?',
    'No. You have one account and can shape as many profile modes as your life calls for. Switch between Public, Private, and Professional in a tap.',
  ],
  [
    'How does the OneWinq Card work?',
    'The Card is a physical touchpoint for your digital identity. Tap or scan it to open the profile you have chosen to share — no app download, no awkward searching.',
  ],
  [
    'Is OneWinq for teams too?',
    'Yes, and separately. OneWinq Enterprise gives companies a structured identity layer for employees, departments, directories, permissions, and events without changing the personal experience.',
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
