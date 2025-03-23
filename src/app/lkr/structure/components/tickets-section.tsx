'use client';

import Image from 'next/image';
interface TicketsSectionProps {
  onNavigate: (path: string) => void;
}

export const TicketsSection = ({ onNavigate }: TicketsSectionProps) => {
  const handleBuyTicket = () => {
    onNavigate('/lkr/tickets/buy');
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4">
      <div className="flex items-center">
        <div className="text-black text-base font-semibold">Проездные билеты</div>
      </div>
      
      <div className="flex-1 p-4 bg-red-100 rounded-xl flex flex-col justify-between">
        <div>
          <div className="text-black text-base font-semibold">ЕДИНЫЙ 1 сутки</div>
          <div className="text-black text-xs mt-2">Зона «Ростовпассажиртранс»</div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-black text-sm">􀖂</span>
          <span className="text-black text-xs font-semibold">Открыть билет</span>
        </div>
      </div>
      
      <button 
        className="w-full py-2 bg-gray-100 rounded-xl border border-gray-300 flex justify-center items-center gap-2"
        onClick={handleBuyTicket}
        aria-label="Купить билет"
        tabIndex={0}
      >
        <div>
          <Image src="/icon/creditcard.fill.svg" alt="Купить" width={20} height={20} />
        </div>
        <span className="text-black text-sm font-semibold">Купить</span>
      </button>
    </div>
  );
}; 