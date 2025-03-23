'use client';

import Image from 'next/image';
import { LkConfig } from '../../config';

const { bottomRow } = LkConfig.content.rightColumn;

interface InfoSectionProps {
  onAddCard: () => void;
}

export const InfoSection = ({ onAddCard }: InfoSectionProps) => {
  // Данные для новостей
  const newsItems = [
    {
      title: 'Как живет город?<br/>Подборка местных мест',
      subtitle: '3 дня назад',
    },
    {
      title: 'Пророчица.<br/>Как создавался город?',
      subtitle: 'Набережная Дона',
    },
    {
      title: 'Местная кухня.<br/>Донские раки – счастье',
      subtitle: 'Есть раки',
    },
  ];

  return (
    <div className={`${bottomRow.container} w-full h-full min-h-[312px]`}>
      <div className={bottomRow.header.container}>
        <div className={bottomRow.header.title}>Горожанин. Инфо</div>
        <button 
          onClick={() => onAddCard()}
          className={bottomRow.header.button.container}
        >
          <span className={bottomRow.header.button.text}>Открыть</span>
          <Image src="/icon/rectangle.and.hand.point.up.left.svg" alt="Открыть" width={12} height={12} />
        </button>
      </div>
      <div className={bottomRow.content.container}>
        {newsItems.map((item, index) => (
          <div key={index} className={bottomRow.content.item.container}>
            <div className={bottomRow.content.item.image}></div>
            <div>
              <div className={bottomRow.content.item.title} dangerouslySetInnerHTML={{ __html: item.title }}></div>
            </div>
            <div className={bottomRow.content.item.subtitle}>{item.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}; 