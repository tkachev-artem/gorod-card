'use client';

import Image from 'next/image';

interface CardProps {
  cardNumber?: string;
  backgroundImage?: string;
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
  backgroundImage = '/images/card-background.jpg'
}: CardProps) {
  // Форматируем номер карты, если он есть
  const formattedCardNumber = cardNumber ? formatCardNumber(cardNumber) : '';
  
  return (
    <div 
      className="w-[340px] h-[212px] p-5 bg-white rounded-xl border-2 border-gray-300 relative hover:border-blue-400 transition-colors duration-300 cursor-pointer z-10"
    >
      {/* Фоновое изображение на всю карту */}
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
      
      {/* QR-код */}
      <div className="absolute right-5 top-5 z-10">
        <div className="w-20 h-20 bg-blue-100 rounded-xl border-2 border-blue-400 flex items-center justify-center">
          <Image 
            src="/icon/qr-code.svg" 
            alt="QR код" 
            width={70} 
            height={70}
          />
        </div>
      </div>

      {/* Нижняя часть с логотипом и номером */}
      <div className="absolute bottom-5 flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <Image 
            src="/icon/logo-card.svg" 
            alt="Логотип карты" 
            width={16} 
            height={35}
          />
          <span className="text-xs font-semibold">
            Виртуальная<br/>Карта горожанина
          </span>
        </div>
        <div className="text-gray-900 text-base font-semibold">
          {formattedCardNumber}
        </div>
      </div>
    </div>
  );
} 