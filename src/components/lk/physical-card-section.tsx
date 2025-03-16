import Image from 'next/image';
import { LkConfig } from '@/app/lk/config';

const { physicalCard } = LkConfig.content.leftColumn;

interface PhysicalCardSectionProps {
  onNavigate: (path: string) => void;
}

export const PhysicalCardSection = ({ onNavigate }: PhysicalCardSectionProps) => {
  return (
    <div className={physicalCard.container}>
      <div className={physicalCard.header.container}>
        <div className={physicalCard.header.icon}>
          <Image src="/icon/logo-card.svg" alt="Физическая карта" width={24} height={24} className="text-gray-900" />
        </div>
        <div className={physicalCard.header.info.container}>
          <div className={physicalCard.header.info.title}>Физическая<br/>Карта</div>
          <div className={physicalCard.header.info.subtitle}>Получите пластик</div>
        </div>
      </div>
      <div className={physicalCard.button.container}>
        <button 
          onClick={() => onNavigate('/physical-card')}
          className={physicalCard.button.button}
        >
          <span className={physicalCard.button.text}>Оформить</span>
          <Image src="/icon/rectangle.and.hand.point.up.left.svg" alt="Оформить" width={12} height={12} />
        </button>
      </div>
    </div>
  );
}; 