'use client';

import Image from 'next/image';
import { LkConfig } from '../../config';

// Используем только необходимые стили из конфигурации
const { tickets } = LkConfig.content.rightColumn.topRow;

interface TicketsSectionProps {
  onNavigate: (path: string) => void;
}

export const TicketsSection = ({ onNavigate }: TicketsSectionProps) => {
  return (
    <div className={`${tickets.container} w-full h-full min-h-[312px]`}>
      <div className={tickets.header.container}>
        <div className={tickets.header.title}>Проездные билеты</div>
      </div>
      <div className={tickets.content.container}>
        <div>
          <div className={tickets.content.title}>Проездной на месяц</div>
          <div className={tickets.content.subtitle}>Безлимитные поездки</div>
        </div>
        <div className="flex justify-end">
          <button 
            onClick={() => onNavigate('/tickets')}
            className={tickets.content.button.container}
          >
            <span className={tickets.content.button.text}>Купить</span>
          </button>
        </div>
      </div>
      <button 
        onClick={() => onNavigate('/tickets')}
        className={tickets.button.container}
      >
        <span className={tickets.button.text}>Все проездные</span>
        <Image src="/icon/rectangle.and.hand.point.up.left.svg" alt="Все проездные" width={12} height={12} />
      </button>
    </div>
  );
}; 