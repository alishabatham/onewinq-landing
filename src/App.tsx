import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { GrabYourSpotModal } from '@/components/GrabYourSpotModal';

import { Hero } from '@/components/sections/Hero';
import { Ticker } from '@/components/sections/Ticker';
import { Intro } from '@/components/sections/Intro';
import { WhyOneWinq } from '@/components/sections/WhyOneWinq';
import { Cards, type CardType } from '@/components/sections/Cards';
import { Profiles } from '@/components/sections/Profiles';
import { Moments } from '@/components/sections/Moments';
import { Sharing } from '@/components/sections/Sharing';
import { Journey } from '@/components/sections/Journey';
import { NetworkSection } from '@/components/sections/NetworkSection';
import { Enterprise } from '@/components/sections/Enterprise';
import { FAQ } from '@/components/sections/FAQ';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

import './index.css';

const queryClient = new QueryClient();

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType>('pvc');

  const openModal = (cardId: CardType = 'pvc') => {
    setSelectedCard(cardId);
    setModalOpen(true);
  };

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-shell">
      <Hero onCta={() => openModal('pvc')} />
      <Ticker />
      <Intro />
      <WhyOneWinq />
      <Cards onSelectCard={(cardId) => openModal(cardId)} />
      <Profiles />
      <Moments />
      <Sharing />
      <Journey />
      <NetworkSection />
      <Enterprise />
      <FAQ />
      <ContactSection />
      <Footer onCta={() => openModal('pvc')} />
      <GrabYourSpotModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCardId={selectedCard}
      />
    </main>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

export default function App() {
  const baseUrl = import.meta.env.BASE_URL ? import.meta.env.BASE_URL.replace(/\/$/, '') : '';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={baseUrl}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}