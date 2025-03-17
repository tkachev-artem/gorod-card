'use client';

import { LkConfig } from '../../config';

// Используем только необходимые стили из конфигурации
const { myTickets } = LkConfig.content.rightColumn.topRow;

export const MyTicketsSection = () => {
  return (
    <div className={`${myTickets.container} w-full h-full min-h-[312px]`}>
      <div className={myTickets.header.container}>
        <div className={myTickets.header.title}>Мои билеты</div>
      </div>
      <div className={myTickets.content.container}>
        <div className={myTickets.content.title}>У вас пока нет билетов</div>
        <div className={myTickets.content.subtitle}>Купите билет в разделе "Проездные билеты"</div>
      </div>
    </div>
  );
}; 