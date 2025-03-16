'use client';

import { LkConfig } from '../../config';
import { AccountsSection } from './accounts-section';
import { ShopSection } from './shop-section';
import { RoutesSection } from './routes-section';
import { PhysicalCardSection } from './physical-card-section';

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
    <div className={LkConfig.content.leftColumn.container}>
      {/* Группа компонентов, которая должна быть выровнена по высоте с CardContainer */}
      <div className="flex flex-col gap-6" data-card-height-sync>
        <AccountsSection 
          rubleBalance={rubleBalance}
          bonusBalance={bonusBalance}
        />
        
        <ShopSection onNavigate={onNavigate} />
      </div>
      
      <RoutesSection onNavigate={onNavigate} />
      
      <PhysicalCardSection onNavigate={onNavigate} />
    </div>
  );
}; 