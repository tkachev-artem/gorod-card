'use client';

import { LkConfig } from '../../config';

const { myTickets } = LkConfig.content.rightColumn.topRow;

export const MyTicketsSection = () => {
  return (
    <div className={myTickets.container}>
      <div className={myTickets.header.container}>
        <div className={myTickets.header.title}>Мои билеты</div>
      </div>
      <div className={myTickets.content.container}>
        <div className="relative">
          <div className={myTickets.content.title}>Антонио Вивальди.<br/>Времена года</div>
          <div className={myTickets.content.subtitle}>Посвящение Фрэнку синатое.</div>
        </div>
      </div>
    </div>
  );
}; 