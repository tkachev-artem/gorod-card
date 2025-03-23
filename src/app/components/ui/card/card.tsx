'use client';

import Image from 'next/image';

interface CardProps {
  cardNumber?: string;
  backgroundImage?: string;
  className?: string;
}

// Функция для форматирования номера карты (добавление пробелов через каждые 4 символа)
const formatCardNumber = (cardNumber: string): string => {
  // Удаляем все пробелы из номера карты
  const cleanNumber = cardNumber.replace(/\s/g, '');
  // Разбиваем номер на группы по 4 символа и объединяем с пробелами
  return cleanNumber.match(/.{1,4}/g)?.join(' ') || cardNumber;
};

export function Card({ 
  cardNumber = '',
  backgroundImage = '/images/card-background.jpg',
  className = ''
}: CardProps) {
  // Форматируем номер карты, если он есть
  const formattedCardNumber = cardNumber ? formatCardNumber(cardNumber) : '';
  const hasCard = cardNumber && cardNumber.trim().length > 0;
  
  return (
    <div 
      className={`w-full aspect-[1.6/1] p-5 bg-white rounded-xl ${hasCard ? 'border-2 border-gray-300' : 'border-[1.5px] border-dashed border-gray-300'} relative hover:border-blue-400 transition-colors duration-300 cursor-pointer z-10 ${className}`}
    >
      {/* Фоновое изображение на всю карту */}
      {hasCard && (
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          {backgroundImage && (
            <Image 
              src={backgroundImage}
              alt="Фон карты"
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      )}
      
      {/* Сообщение "Выпустите или добавьте карту горожанина", когда нет номера карты */}
      {!hasCard && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-2.5">
          <div className="text-xs text-gray-600 text-center">
            Выпустите или добавьте<br/>карту горожанина
          </div>
        </div>
      )}

      {/* Нижняя часть с логотипом и номером - отображается только когда есть карта */}
      {hasCard && (
        <div className="absolute bottom-5 flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Image 
              src="/icon/logo-card.svg" 
              alt="Логотип карты" 
              width={16} 
              height={50}
              className="h-[50px] w-auto"
            />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold">
                Виртуальная<br/>Карта горожанина
              </span>

              <div className="text-gray-900 text-sm font-semibold">
                {formattedCardNumber}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 