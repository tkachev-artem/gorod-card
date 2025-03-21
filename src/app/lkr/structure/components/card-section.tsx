'use client';

import Image from 'next/image';
import { Card } from '@/app/components/ui/card/card';

interface CardSectionProps {
  cardNumber: string | null;
  onAddCard: () => void;
}

export const CardSection = ({ cardNumber, onAddCard }: CardSectionProps) => {
  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4">
      <div className="flex items-center">
        <div className="text-black text-base font-semibold">Все карты</div>
      </div>
      
      <div className="flex-1">
        <Card 
          cardNumber={cardNumber || ''} 
          backgroundImage="/images/card-background.svg"
          className="h-full"
        />
      </div>
      
      <button 
        className="w-full py-2 bg-gray-100 rounded-xl border border-gray-300 flex justify-center items-center gap-2"
        onClick={onAddCard}
        aria-label="Добавить карту"
        tabIndex={0}
      >
        <div>
          <Image src="/icon/plus.rectangle.fill.svg" alt="Купить" width={20} height={20} />
        </div>
        <span className="text-black text-sm font-semibold">Добавить карту</span>
      </button>
    </div>
  );
}; 