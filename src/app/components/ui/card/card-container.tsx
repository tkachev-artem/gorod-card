'use client';

import { Card } from './card';

interface CardContainerProps {
  cardNumber?: string;
  onAddCard?: () => void;
  backgroundImage?: string;
}

export function CardContainer({ 
  cardNumber, 
  onAddCard,
  backgroundImage = '/images/card-background.jpg'
}: CardContainerProps) {
  // Если есть номер карты, отображаем активную карту
  if (cardNumber) {
    return (
      <div className="w-full h-full min-h-[312px] p-4 bg-white rounded-xl border-[1.50px] border-gray-300 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="text-black text-base font-medium">Виртуальная карта</div>
          {onAddCard && (
            <button 
              onClick={onAddCard}
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Управление
            </button>
          )}
        </div>
        
        <div className="flex-1 p-4">
          <Card 
            cardNumber={cardNumber}
            backgroundImage={backgroundImage}
          />
        </div>
      </div>
    );
  }

  // Иначе показываем заглушку для добавления карты
  return (
    <div className="w-full h-full min-h-[312px] p-4 bg-white rounded-xl border-[1.50px] border-gray-300 flex flex-col gap-4">
      <div className="flex items-center">
        <div className="text-black text-base font-medium">Виртуальная карта</div>
      </div>
      
      <div
        className="p-4 bg-gray-100 rounded-xl border border-dashed border-gray-300 flex flex-col justify-center items-center flex-1 cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={onAddCard}
      >
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-2">
          <span className="text-2xl">+</span>
        </div>
        <div className="text-black text-sm text-center">Добавить виртуальную карту</div>
      </div>
    </div>
  );
} 