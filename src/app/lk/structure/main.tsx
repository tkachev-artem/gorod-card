'use client';

import { useEffect, useRef } from 'react';
import { AccountsSection } from './components/accounts-section';
import { ShopSection } from './components/shop-section';
import { CardContainer } from '@/app/components/ui/card/card-container';
import { TicketsSection } from './components/tickets-section';
import { MyTicketsSection } from './components/my-tickets-section';
import { RoutesSection } from './components/routes-section';
import { PhysicalCardSection } from './components/physical-card-section';
import { InfoSection } from './components/info-section';

interface MainProps {
  rubleBalance: number;
  bonusBalance: number;
  cardNumber: string | null;
  onAddCard: () => void;
  onNavigate: (path: string) => void;
}

export const Main = ({
  rubleBalance,
  bonusBalance,
  cardNumber,
  onAddCard,
  onNavigate
}: MainProps) => {
  const mainRef = useRef<HTMLElement>(null);

  // Добавляем отладочную информацию
  useEffect(() => {
    console.log('Main - cardNumber:', cardNumber);
  }, [cardNumber]);

  return (
    <main ref={mainRef} className="min-h-screen w-full flex flex-col">
      <div className="flex flex-col gap-4 sm:gap-6 w-full flex-1">
        {/* Верхний контейнер */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
          {/* Левая колонка с AccountsSection и ShopSection */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-1/5 shrink-0">
            <div className="w-full h-full">
              <AccountsSection 
                rubleBalance={rubleBalance}
                bonusBalance={bonusBalance}
              />
            </div>
            
            <div className="w-full h-full">
              <ShopSection onNavigate={onNavigate} />
            </div>
          </div>
          
          {/* Правый ряд с CardContainer, TicketsSection и MyTicketsSection */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full flex-1">
            <div className="w-full sm:w-1/3 h-full">
              <CardContainer 
                cardNumber={cardNumber || undefined}
                onAddCard={onAddCard}
                backgroundImage="/images/card-background.jpg"
              />
            </div>
            
            <div className="w-full sm:w-1/3 h-full">
              <TicketsSection onNavigate={onNavigate} />
            </div>
            
            <div className="w-full sm:w-1/3 h-full">
              <MyTicketsSection />
            </div>
          </div>
        </div>
        
        {/* Нижний единый контейнер */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
          {/* Левая колонка с RoutesSection и PhysicalCardSection */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-1/5 shrink-0">
            <div className="w-full h-full">
              <RoutesSection onNavigate={onNavigate} />
            </div>
            
            <div className="w-full h-full">
              <PhysicalCardSection onNavigate={onNavigate} />
            </div>
          </div>
          
          {/* Правая часть с InfoSection */}
          <div className="flex-1 w-full h-full">
            <InfoSection 
              cardNumber={cardNumber}
              onAddCard={onAddCard}
            />
          </div>
        </div>
      </div>
    </main>
  );
}; 