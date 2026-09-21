import { useState, useEffect, useRef } from 'react';
import {
  Layers,
  UserCheck,
  Share2,
  BookmarkCheck,
  Search,
  HeartHandshake,
  SmartphoneNfc,
  ShieldCheck,
  LayoutGrid,
  Building2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  type LucideIcon,
} from 'lucide-react';

interface WhyCard {
  number: string;
  title: string;
  problem: string;
  solution: string;
  icon: LucideIcon;
}

const whyCards: WhyCard[] = [
  {
    number: '01',
    title: 'Everything in One Place',
    problem: 'Your personal details, professional info, social profiles & portfolio are spread across different platforms.',
    solution: 'OneWinq brings your identity together in one connected place.',
    icon: Layers,
  },
  {
    number: '02',
    title: 'Multiple Profiles',
    problem: 'One single identity doesn’t fit every situation or audience.',
    solution: 'Create Public, Private & Professional profiles and choose exactly what to share.',
    icon: UserCheck,
  },
  {
    number: '03',
    title: 'Smart Sharing',
    problem: 'Sharing the wrong details in the wrong context.',
    solution: 'Choose the right profile for the right moment and control when it is visible.',
    icon: Share2,
  },
  {
    number: '04',
    title: 'Never Lose a Connection',
    problem: 'People you meet today can become important months or years later.',
    solution: 'Save connections on OneWinq and retrieve their profiles whenever you need them.',
    icon: BookmarkCheck,
  },
  {
    number: '05',
    title: 'Information, When You Need It',
    problem: 'Important info gets buried in chats, screenshots, emails, and different apps.',
    solution: 'Keep your stored information organized and accessible on demand.',
    icon: Search,
  },
  {
    number: '06',
    title: 'Meaningful Networking',
    problem: 'A phone number or social handle doesn’t tell the complete story.',
    solution: 'Discover profiles, understand who you connect with, and build real relationships.',
    icon: HeartHandshake,
  },
  {
    number: '07',
    title: 'Tap & Connect',
    problem: 'Traditional paper business cards are static and easy to lose.',
    solution: 'Use your OneWinq Card to instantly share your selected profile via a simple tap.',
    icon: SmartphoneNfc,
  },
  {
    number: '08',
    title: 'Complete Control',
    problem: 'Privacy shouldn’t be complicated or out of your hands.',
    solution: 'Control profile visibility and decide what you share, with whom, and when.',
    icon: ShieldCheck,
  },
  {
    number: '09',
    title: 'Your Network, Always With You',
    problem: 'As your network grows, finding the right person becomes difficult.',
    solution: 'Keep all your connections organized in your OneWinq dashboard anytime.',
    icon: LayoutGrid,
  },
  {
    number: '10',
    title: 'Built for Organizations Too',
    problem: 'Individual identity to enterprise identity layer.',
    solution: 'Connect companies, employees, teams, permissions and digital cards in one workspace.',
    icon: Building2,
  },
];

export function WhyOneWinq() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive cards per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, whyCards.length - cardsPerView);

  // Auto slide timer
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="section why-section reveal" id="why-onewinq">
      <div className="container">
        {/* Section Heading matching the rest of the site layout (Left / Right aligned) */}
        <div className="section-heading">
          <div>
            <div className="eyebrow">Real Problems • One Solution</div>
            <h2>
              Why <span className="serif">OneWinq?</span>
            </h2>
          </div>
          <p>
            Because your identity, information and connections deserve <em>one connected home.</em>
          </p>
        </div>

        {/* Automatic Slider Container */}
        <div
          className="why-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="why-slider-viewport">
            <div
              className="why-slider-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              }}
            >
              {whyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    className="why-slide-item"
                    key={card.number}
                    style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                  >
                    <div className="why-card">
                      <div className="why-card-top">
                        <span className="why-card-num">{card.number} / 10</span>
                        <div className="why-card-icon">
                          <Icon size={20} />
                        </div>
                      </div>
                      <h3>{card.title}</h3>
                      <p className="why-card-problem">{card.problem}</p>
                      <div className="why-card-solution">
                        <ArrowRight size={14} className="solution-arrow" />
                        <span>{card.solution}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="why-slider-controls">
            <div className="why-slider-progress">
              <span className="current-num">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
                  }}
                />
              </div>
              <span className="total-num">
                {String(maxIndex + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="why-slider-btns">
              <button
                className="slider-pause-btn"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
                title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              >
                {isPaused ? <Play size={15} /> : <Pause size={15} />}
              </button>
              <button
                className="slider-nav-btn"
                onClick={handlePrev}
                aria-label="Previous cards"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                className="slider-nav-btn"
                onClick={handleNext}
                aria-label="Next cards"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
