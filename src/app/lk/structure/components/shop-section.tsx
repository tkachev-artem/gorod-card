'use client';

import Image from 'next/image';
import { LkConfig } from '../../config';

// Используем только необходимые стили из конфигурации
const { shop } = LkConfig.content.leftColumn;

interface ShopSectionProps {
  onNavigate: (path: string) => void;
}

export const ShopSection = ({ onNavigate }: ShopSectionProps) => {
  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4 min-h-[9rem]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-[72px] py-[3px] bg-white rounded-[10px] border border-sky-400 flex justify-center items-center">
          <Image src="/icon/square.on.square.svg" alt="Магазин" width={24} height={24} className="text-sky-400" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-black text-base">Магазин<br/>Твой город</div>
          <div className="text-black text-xs">Потратить баллы</div>
        </div>
      </div>
      <div className="flex justify-end">
        <button 
          onClick={() => onNavigate('/shop')}
          className="px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2"
        >
          <span className="text-black text-xs font-medium">Открыть</span>
          <Image src="/icon/rectangle.and.hand.point.up.left.svg" alt="Открыть" width={12} height={12} />
        </button>
      </div>
    </div>
  );
}; 