import { LkConfig } from '@/app/lk/config';
import { CustomCardContainer } from '@/components/ui/card/custom-card-container';
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
  return (
    <div className={rightColumn.container}>
      {/* Верхний ряд */}
      <div className={rightColumn.topRow.container}>
        {/* Все карты */}
        <CustomCardContainer 
          cardNumber={cardNumber || undefined}
          onAddCard={onAddCard}
        />
        
        {/* Проездные билеты */}
        <TicketsSection onNavigate={onNavigate} />
        
        {/* Мои билеты */}
        <MyTicketsSection />
      </div>
      
      {/* Нижний ряд */}
      <InfoSection onNavigate={onNavigate} />
    </div>
  );
}; 