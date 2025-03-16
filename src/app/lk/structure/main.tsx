'use client';

import { useEffect, useRef } from 'react';
import { LkConfig } from '../config';
import { LeftColumn } from './components/left-column';
import { RightColumn } from './components/right-column';

interface MainProps {
  rubleBalance: number;
  bonusBalance: number;
  cardNumber: string | null;
  onAddCard: () => void;
  onNavigate: (path: string) => void;
}

export const Main = ({
  rubleBalance,
  bonusBalance,
  cardNumber,
  onAddCard,
  onNavigate
}: MainProps) => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Функция для синхронизации высоты
    const syncCardHeight = () => {
      // Проверяем только для desktop разрешений
      if (window.innerWidth < 1024) return;

      const syncGroup = mainRef.current?.querySelector('[data-card-height-sync]');
      const cardContainer = mainRef.current?.querySelector('.card-container-wrapper');
      
      if (syncGroup && cardContainer) {
        const syncGroupHeight = syncGroup.getBoundingClientRect().height;
        (cardContainer as HTMLElement).style.height = `${syncGroupHeight}px`;
      }
    };

    // Первичная синхронизация
    syncCardHeight();
    
    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', syncCardHeight);

    // Очистка слушателя при размонтировании
    return () => {
      window.removeEventListener('resize', syncCardHeight);
    };
  }, []);

  // Добавляем отладочную информацию
  useEffect(() => {
    console.log('Main - cardNumber:', cardNumber);
  }, [cardNumber]);

  return (
    <main ref={mainRef} className="w-full flex-1 flex flex-col lg:flex-row gap-6 items-start">
      {/* Левая колонка */}
      <div className="w-full lg:w-[250px] flex flex-col gap-6 sticky top-6">
        <LeftColumn 
          rubleBalance={rubleBalance}
          bonusBalance={bonusBalance}
          onNavigate={onNavigate}
        />
      </div>
      
      {/* Правая колонка */}
      <div className="flex-1 flex flex-col gap-6">
        <RightColumn 
          cardNumber={cardNumber}
          onAddCard={onAddCard}
          onNavigate={onNavigate}
        />
      </div>
    </main>
  );
}; 