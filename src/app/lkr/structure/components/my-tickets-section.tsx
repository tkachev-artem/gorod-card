'use client';

import Image from 'next/image';

export const MyTicketsSection = () => {
  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4">
      <div className="flex items-center">
        <div className="text-black text-base font-semibold">Мои билеты</div>
      </div>
      
      <div className="flex-1 p-4 bg-gray-100 rounded-xl flex flex-col gap-4 justify-between">
        <div>
          <div className="text-black text-sm font-semibold">Антонио Вивальди.<br />Времена года</div>
          <div className="text-black text-xs mt-2">Посвяшение Фрэнку синатое.</div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-black text-sm">􀖂</span>
          <span className="text-black text-xs font-semibold">Открыть билет</span>
        </div>
      </div>

      <button 
        className="w-full py-2 bg-gray-100 rounded-xl border border-gray-300 flex justify-center items-center gap-2"
      >
        <div>
          <Image src="/icon/card.svg" alt="Купить" width={20} height={20} />
        </div>
        <span className="text-black text-sm font-semibold">Приобрести</span>
      </button>
    </div>
  );
}; 