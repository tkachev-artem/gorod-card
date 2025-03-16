import Image from 'next/image';
import { LkConfig } from '@/app/lk/config';

const { accounts } = LkConfig.content.leftColumn;

interface AccountsSectionProps {
  rubleBalance: number;
  bonusBalance: number;
}

export const AccountsSection = ({ rubleBalance, bonusBalance }: AccountsSectionProps) => {
  return (
    <div className={accounts.container}>
      <div className={accounts.item.container}>
        <div className={accounts.item.icon.ruble}>
          <Image src="/icon/rublesign.circle.fill.svg" alt="Рублевый счет" width={24} height={24} className="text-emerald-500" />
        </div>
        <div className={accounts.item.info.container}>
          <div className={accounts.item.info.title}>Рублевый счет</div>
          <div className={accounts.item.info.value}>{rubleBalance} ₽</div>
        </div>
      </div>
      <div className={accounts.item.container}>
        <div className={accounts.item.icon.bonus}>
          <Image src="/icon/rhombus.fill.svg" alt="Бонусный счет" width={24} height={24} className="text-amber-400" />
        </div>
        <div className={accounts.item.info.container}>
          <div className={accounts.item.info.title}>Бонусный счет</div>
          <div className={accounts.item.info.value}>{bonusBalance}</div>
        </div>
      </div>
    </div>
  );
}; 