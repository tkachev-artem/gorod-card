import { LkConfig } from '@/app/lk/config';
import { AccountsSection } from './accounts-section';
import { ShopSection } from './shop-section';
import { RoutesSection } from './routes-section';
import { PhysicalCardSection } from './physical-card-section';

const { leftColumn } = LkConfig.content;

interface LeftColumnProps {
  rubleBalance: number;
  bonusBalance: number;
  onNavigate: (path: string) => void;
}

export const LeftColumn = ({
  rubleBalance,
  bonusBalance,
  onNavigate
}: LeftColumnProps) => {
  return (
    <div className={leftColumn.container}>
      <AccountsSection 
        rubleBalance={rubleBalance} 
        bonusBalance={bonusBalance} 
      />
      <ShopSection onNavigate={onNavigate} />
      <RoutesSection onNavigate={onNavigate} />
      <PhysicalCardSection onNavigate={onNavigate} />
    </div>
  );
}; 