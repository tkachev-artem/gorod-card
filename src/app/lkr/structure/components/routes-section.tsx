'use client';

import Image from 'next/image';

interface RoutesSectionProps {
  onNavigate: (path: string) => void;
}

export const RoutesSection = ({ onNavigate }: RoutesSectionProps) => {
  const handleOpenRoutes = () => {
    onNavigate('/lkr/routes');
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-[72px] py-[3px] bg-red-100 rounded-[10px] border border-red-400 flex justify-center items-center">
          <span className="text-red-400 text-2xl">
            <Image src="/icon/map.fill.svg" alt="Маршруты" width={24} height={24} />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-black text-base font-semibold">Туристические<br />Маршруты</div>
          <div className="text-black text-xs">Изучай свой город</div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          className="px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2"
          onClick={handleOpenRoutes}
          aria-label="Открыть маршруты"
          tabIndex={0}
        >
          <span className="text-black text-xs font-medium">Открыть</span>
          <Image src="/icon/arrow-right.svg" alt="Открыть" width={12} height={12} className="text-black" />
        </button>
      </div>
    </div>
  );
}; 