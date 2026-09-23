import { useState, type ReactNode } from 'react';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { GrabYourSpotModal } from '@/components/GrabYourSpotModal';
import { CardType } from '@/components/sections/Cards';

interface SEOPageLayoutProps {
  children: ReactNode;
}

export function SEOPageLayout({ children }: SEOPageLayoutProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType>('pvc');

  const openModal = (cardId: CardType = 'pvc') => {
    setSelectedCard(cardId);
    setModalOpen(true);
  };

  return (
    <main className="page-shell">
      <Header onCta={() => openModal('pvc')} />
      <div className="seo-page-body" style={{ paddingTop: '100px', minHeight: '80vh' }}>
        {children}
      </div>
      <Footer onCta={() => openModal('pvc')} />
      <GrabYourSpotModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCardId={selectedCard}
      />
    </main>
  );
}
