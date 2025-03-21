'use client';

import Image from 'next/image';

// Using Record<string, never> to properly type an empty object
type InfoSectionProps = Record<string, never>;

export const InfoSection = ({}: InfoSectionProps) => {
  const handleOpenInfo = () => {
    window.open('/lkr/info', '_blank');
  };

  return (
    <div className="w-full h-full p-4 bg-white rounded-xl border border-gray-300 flex flex-col gap-auto justify-between">
      <div className="flex justify-between items-center">
        <div className="text-black text-base font-semibold">Горожанин. Инфо</div>
        <button 
          className="px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2"
          onClick={handleOpenInfo}
          aria-label="Открыть информацию"
          tabIndex={0}
        >
          <span className="text-black text-xs font-medium">Открыть</span>
          <Image src="/icon/arrow-right.svg" alt="Открыть" width={12} height={12} className="text-black" />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-[calc(33.33%-1rem)] flex flex-col gap-2.5">
          <div className="w-full h-32 bg-gray-200 rounded-xl relative overflow-hidden">
            <Image 
              src="/images/news-city.jpg" 
              alt="Как живет город" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="text-black text-sm font-semibold">Как живет город?<br />Подборка местных мест</div>
          <div className="text-black text-xs">3 дня назад</div>
        </div>
        
        <div className="w-full sm:w-[calc(33.33%-1rem)] flex flex-col gap-2.5">
          <div className="w-full h-32 bg-gray-200 rounded-xl relative overflow-hidden">
            <Image 
              src="/images/event-city.jpg" 
              alt="Пророчица. Как создавался город" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="text-black text-sm font-semibold">Пророчица.<br />Как создавался город?</div>
          <div className="text-black text-xs">Набережная Дона</div>
        </div>
        
        <div className="w-full sm:w-[calc(33.33%-1rem)] flex flex-col gap-2.5">
          <div className="w-full h-32 bg-gray-200 rounded-xl relative overflow-hidden">
            <Image 
              src="/images/place-city.jpg" 
              alt="Местная кухня. Донские раки" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div className="text-black text-sm font-semibold">Местная кухня.<br />Донские раки – счастье</div>
          <div className="text-black text-xs">Есть раки</div>
        </div>
      </div>
    </div>
  );
}; 