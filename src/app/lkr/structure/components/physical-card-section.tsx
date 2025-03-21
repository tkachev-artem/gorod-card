'use client';

import Image from 'next/image';

interface PhysicalCardSectionProps {
  onNavigate: (path: string) => void;
}

export const PhysicalCardSection = ({ onNavigate }: PhysicalCardSectionProps) => {
  const handleOrderCard = () => {
    onNavigate('/lkr/physical-card');
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-[72px] py-[3px] bg-gray-100 rounded-[10px] border border-gray-900 flex justify-center items-center">
          <span className="text-gray-900 text-2xl">
            <Image src="/icon/creditcard.fill.svg" alt="Физическая карта" width={28} height={28} />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-black text-base font-semibold">Физическая<br />Карта</div>
          <div className="text-black text-xs">Получите пластик</div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          className="px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2"
          onClick={handleOrderCard}
          aria-label="Оформить физическую карту"
          tabIndex={0}
        >
          <span className="text-black text-xs font-medium">Оформить</span>
          <Image src="/icon/arrow-right.svg" alt="Оформить" width={12} height={12} className="text-black" />
        </button>
      </div>
    </div>
  );
}; 