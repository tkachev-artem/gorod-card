import Image from 'next/image';
import { LkConfig } from '@/app/lk/config';

const { tickets } = LkConfig.content.rightColumn.topRow;

interface TicketsSectionProps {
  onNavigate: (path: string) => void;
}

export const TicketsSection = ({ onNavigate }: TicketsSectionProps) => {
  return (
    <div className={tickets.container}>
      <div className={tickets.header.container}>
        <div className={tickets.header.title}>Проездные билеты</div>
      </div>
      <div className={tickets.content.container}>
        <div className="relative">
          <div className={tickets.content.title}>ЕДИНЫЙ 1 сутки</div>
          <div className={tickets.content.subtitle}>Зона «Ростовпассажиртранс»</div>
        </div>
        <div className={tickets.content.button.container}>
          <Image src="/icon/qr-code.svg" alt="Открыть билет" width={16} height={16} />
          <span className={tickets.content.button.text}>Открыть билет</span>
        </div>
      </div>
      <button 
        onClick={() => onNavigate('/tickets/buy')}
        className={tickets.button.container}
      >
        <Image src="/icon/logo-card.svg" alt="Купить" width={16} height={16} />
        <span className={tickets.button.text}>Купить</span>
      </button>
    </div>
  );
}; 