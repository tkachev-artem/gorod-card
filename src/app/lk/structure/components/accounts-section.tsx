'use client';

import Image from 'next/image';
import { LkConfig } from '../../config';

// Используем только необходимые стили из конфигурации
const { accounts } = LkConfig.content.leftColumn;

interface AccountsSectionProps {
  rubleBalance: number;
  bonusBalance: number;
}

export const AccountsSection = ({ rubleBalance, bonusBalance }: AccountsSectionProps) => {
  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4 min-h-[9rem]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 py-[3px] bg-emerald-100 rounded-[10px] border border-emerald-500 flex justify-center items-center">
          <Image src="/icon/rublesign.circle.fill.svg" alt="Рублевый счет" width={24} height={24} className="text-emerald-500" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-black text-base">Рублевый счет</div>
          <div className="text-black text-xl">{rubleBalance} ₽</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 py-[3px] bg-amber-100 rounded-[10px] border border-amber-400 flex justify-center items-center">
          <Image src="/icon/rhombus.fill.svg" alt="Бонусный счет" width={18} height={18} className="text-amber-400" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-black text-base">Бонусный счет</div>
          <div className="text-black text-xl">{bonusBalance}</div>
        </div>
      </div>
    </div>
  );
}; 