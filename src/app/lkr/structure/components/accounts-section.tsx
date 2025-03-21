'use client';

import Image from 'next/image';

interface AccountsSectionProps {
  rubleBalance: number;
  bonusBalance: number;
}

export const AccountsSection = ({ rubleBalance, bonusBalance }: AccountsSectionProps) => {
  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 py-[3px] bg-emerald-100 rounded-[10px] border border-emerald-500 flex justify-center items-center">
          <span className="text-emerald-500 text-2xl"><Image src="/icon/rublesign.circle.fill.svg" alt="Рублевый счет" width={24} height={24} /></span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-black text-base font-semibold">Рублевый счет</div>
          <div className="text-black text-xl">{rubleBalance} ₽</div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 py-[3px] bg-amber-100 rounded-[10px] border border-amber-400 flex justify-center items-center">
          <span className="text-amber-400 text-2xl"><Image src="/icon/rhombus.fill.svg" alt="Бонусный счет" width={20} height={20} /></span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-black text-base font-semibold">Бонусный счет</div>
          <div className="text-black text-xl">{bonusBalance}</div>
        </div>
      </div>
    </div>
  );
}; 