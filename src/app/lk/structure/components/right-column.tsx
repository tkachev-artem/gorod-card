'use client';

import { useEffect } from 'react';
import { LkConfig } from '../../config';
import { CardContainer } from '@/app/components/ui/card/card-container';
import { TicketsSection } from './tickets-section';
import { MyTicketsSection } from './my-tickets-section';
import { InfoSection } from './info-section';

const { rightColumn } = LkConfig.content;

interface RightColumnProps {
  cardNumber: string | null;
  onAddCard: () => void;
  onNavigate: (path: string) => void;
}

export const RightColumn = ({
  cardNumber,
  onAddCard,
  onNavigate
}: RightColumnProps) => {
  // Добавляем отладочную информацию
  useEffect(() => {
    console.log('RightColumn - cardNumber:', cardNumber);
  }, [cardNumber]);

  return (
    <div className={rightColumn.container}>
      {/* Верхний ряд */}
      <div className={`${rightColumn.topRow.container} items-stretch`}>
        {/* Виртуальная карта */}
        <div className="flex-1 flex flex-col card-container-wrapper">
          <CardContainer 
            cardNumber={cardNumber || undefined}
            onAddCard={onAddCard}
            backgroundImage="/images/card-background.jpg"
          />
        </div>
        
        {/* Проездные билеты */}
        <TicketsSection onNavigate={onNavigate} />
        
        {/* Мои билеты */}
        <MyTicketsSection />
      </div>
      
      {/* Нижний ряд */}
      <InfoSection 
        onAddCard={onAddCard}
      />
    </div>
  );
}; 