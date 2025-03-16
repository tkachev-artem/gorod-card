'use client';

import Image from 'next/image';
import { LkConfig } from '../../config';

const { shop } = LkConfig.content.leftColumn;

interface ShopSectionProps {
  onNavigate: (path: string) => void;
}

export const ShopSection = ({ onNavigate }: ShopSectionProps) => {
  return (
    <div className={shop.container}>
      <div className={shop.header.container}>
        <div className={shop.header.icon}>
          <Image src="/icon/square.on.square.svg" alt="Магазин" width={24} height={24} className="text-sky-400" />
        </div>
        <div className={shop.header.info.container}>
          <div className={shop.header.info.title}>Магазин<br/>Твой город</div>
          <div className={shop.header.info.subtitle}>Потратить баллы</div>
        </div>
      </div>
      <div className={shop.button.container}>
        <button 
          onClick={() => onNavigate('/shop')}
          className={shop.button.button}
        >
          <span className={shop.button.text}>Открыть</span>
          <Image src="/icon/rectangle.and.hand.point.up.left.svg" alt="Открыть" width={12} height={12} />
        </button>
      </div>
    </div>
  );
}; 