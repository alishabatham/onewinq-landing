import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { GrabYourSpotModal } from '@/components/GrabYourSpotModal';

import { SEOHead } from '@/components/SEOHead';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { WhyOneWinq } from '@/components/sections/WhyOneWinq';
import { Cards, type CardType } from '@/components/sections/Cards';
import { DemoVideoSection } from '@/components/sections/DemoVideoSection';
import { Profiles } from '@/components/sections/Profiles';
import { Moments } from '@/components/sections/Moments';
import { Sharing } from '@/components/sections/Sharing';
import { Journey } from '@/components/sections/Journey';
import { NetworkSection } from '@/components/sections/NetworkSection';
import { Enterprise } from '@/components/sections/Enterprise';
import { FAQ, faqs } from '@/components/sections/FAQ';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';

// SEO Landing Pages
import DigitalIdentityPage from '@/pages/seo/DigitalIdentityPage';
import DigitalProfilePage from '@/pages/seo/DigitalProfilePage';
import ProfessionalProfilePage from '@/pages/seo/ProfessionalProfilePage';
import DigitalCardPage from '@/pages/seo/DigitalCardPage';
import NfcCardPage from '@/pages/seo/NfcCardPage';
import NetworkingPage from '@/pages/seo/NetworkingPage';
import EnterprisePage from '@/pages/seo/EnterprisePage';
import EnterpriseDigitalIdentityPage from '@/pages/seo/EnterpriseDigitalIdentityPage';
import EmployeeDigitalIdentityPage from '@/pages/seo/EmployeeDigitalIdentityPage';
import UserProfilePage from '@/pages/UserProfilePage';
import PrivateAppRoute from '@/pages/PrivateAppRoute';

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

  const homepageSchema = [
    {
      '@type': 'Organization',
      '@id': 'https://onewinq.com/#organization',
      'name': 'OneWinq',
      'url': 'https://onewinq.com/',
      'logo': 'https://onewinq.com/onewinq_brand_logo.png',
      'email': 'support@onewinq.com',
      'description': 'Digital identity and networking platform allowing users to manage Public, Private & Professional profiles and share via Smart NFC Cards.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://onewinq.com/#website',
      'url': 'https://onewinq.com/',
      'name': 'OneWinq',
      'description': 'A digital identity and networking platform.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://onewinq.com/#faqpage',
      'mainEntity': faqs.map(([question, answer]) => ({
        '@type': 'Question',
        'name': question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': answer,
        },
      })),
    },
  ];

  return (
    <main className="page-shell">
      <SEOHead
        title="OneWinq – Digital Identity & Networking Platform"
        description="Create & manage your digital identity with Public, Private & Professional profiles. Share instantly through OneWinq NFC Card & OneWinq Enterprise."
        canonical="https://onewinq.com/"
        keywords="digital identity platform, digital identity, digital networking platform, professional networking platform, digital profile, digital business card, NFC business card, smart digital card, professional digital identity, OneWinq Enterprise"
        jsonLd={homepageSchema}
      />
      <Hero onCta={() => openModal('pvc')} />
      <DemoVideoSection />
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
        
        {/* Dedicated SEO Landing Pages */}
        <Route path="/digital-identity" component={DigitalIdentityPage} />
        <Route path="/digital-profile" component={DigitalProfilePage} />
        <Route path="/professional-profile" component={ProfessionalProfilePage} />
        <Route path="/digital-card" component={DigitalCardPage} />
        <Route path="/nfc-card" component={NfcCardPage} />
        <Route path="/networking" component={NetworkingPage} />
        <Route path="/onewinq-enterprise" component={EnterprisePage} />
        <Route path="/enterprise-digital-identity" component={EnterpriseDigitalIdentityPage} />
        <Route path="/employee-digital-identity" component={EmployeeDigitalIdentityPage} />
        
        {/* Dynamic User Profile Route */}
        <Route path="/u/:username" component={UserProfilePage} />
        
        {/* Private Application Routes (NOINDEX) */}
        <Route path="/dashboard"><PrivateAppRoute routeName="Dashboard" /></Route>
        <Route path="/account"><PrivateAppRoute routeName="Account" /></Route>
        <Route path="/settings"><PrivateAppRoute routeName="Settings" /></Route>
        <Route path="/admin"><PrivateAppRoute routeName="Admin" /></Route>
        <Route path="/login"><PrivateAppRoute routeName="Login" /></Route>
        <Route path="/signup"><PrivateAppRoute routeName="Signup" /></Route>

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