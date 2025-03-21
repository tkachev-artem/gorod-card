'use client';

import Image from 'next/image';

interface ShopSectionProps {
  onNavigate: (path: string) => void;
}

export const ShopSection = ({ onNavigate }: ShopSectionProps) => {
  const handleOpenShop = () => {
    onNavigate('/lkr/shop');
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-[72px] py-[3px] rounded-[10px] border border-sky-400 bg-sky-100 flex justify-center items-center">
          <span className="text-sky-400 text-2xl">
            <Image src="/icon/giftcard.fill.svg" alt="Магазин" width={28} height={28} />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-black text-base font-semibold">Магазин<br />Твой город</div>
          <div className="text-black text-xs">Потратить баллы</div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          className="px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2"
          onClick={handleOpenShop}
          aria-label="Открыть магазин"
          tabIndex={0}
        >
          <span className="text-black text-xs font-medium">Открыть</span>
          <Image src="/icon/arrow-right.svg" alt="Открыть" width={12} height={12} className="text-black" />
        </button>
      </div>
    </div>
  );
}; 