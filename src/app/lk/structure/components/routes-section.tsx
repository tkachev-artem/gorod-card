'use client';

import Image from 'next/image';
import { LkConfig } from '../../config';

const { routes } = LkConfig.content.leftColumn;

interface RoutesSectionProps {
  onNavigate: (path: string) => void;
}

export const RoutesSection = ({ onNavigate }: RoutesSectionProps) => {
  return (
    <div className={`${routes.container} w-full h-full flex-1 min-h-[9rem]`}>
      <div className={routes.header.container}>
        <div className={routes.header.icon}>
          <Image src="/icon/beach.umbrella.svg" alt="Туристические маршруты" width={24} height={24} className="text-red-400" />
        </div>
        <div className={routes.header.info.container}>
          <div className={routes.header.info.title}>Туристические<br/>Маршруты</div>
          <div className={routes.header.info.subtitle}>Изучай свой город</div>
        </div>
      </div>
      <div className={routes.button.container}>
        <button 
          onClick={() => onNavigate('/routes')}
          className={routes.button.button}
        >
          <span className={routes.button.text}>Открыть</span>
          <Image src="/icon/rectangle.and.hand.point.up.left.svg" alt="Открыть" width={12} height={12} />
        </button>
      </div>
    </div>
  );
}; 