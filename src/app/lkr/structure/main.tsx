'use client';

import { useRef } from 'react';
import { AccountsSection } from './components/accounts-section';
import { ShopSection } from './components/shop-section';
import { CardSection } from './components/card-section';
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

  return (
    <main ref={mainRef} className="min-h-screen w-full flex flex-col">
      <div className="flex flex-col gap-4 sm:gap-6 w-full flex-1">
        {/* First row */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
          {/* Left column with wallet and shop */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-1/5">
            <AccountsSection 
              rubleBalance={rubleBalance}
              bonusBalance={bonusBalance}
            />
            
            <ShopSection onNavigate={onNavigate} />
          </div>
          
          {/* Right column with cards, tickets, and my tickets */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:flex-1">
            <div className="w-full sm:w-1/3">
              <CardSection 
                cardNumber={cardNumber}
                onAddCard={onAddCard}
              />
            </div>
            
            <div className="w-full sm:w-1/3">
              <TicketsSection onNavigate={onNavigate} />
            </div>
            
            <div className="w-full sm:w-1/3">
              <MyTicketsSection />
            </div>
          </div>
        </div>
        
        {/* Second row */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full">
          {/* Left column with routes and physical card */}
          <div className="flex flex-col gap-4 sm:gap-6 w-full lg:w-1/5">
            <RoutesSection onNavigate={onNavigate} />
            
            <PhysicalCardSection onNavigate={onNavigate} />
          </div>
          
          {/* Right column with info section */}
          <div className="w-full lg:flex-1">
            <InfoSection />
          </div>
        </div>
      </div>
    </main>
  );
}; 