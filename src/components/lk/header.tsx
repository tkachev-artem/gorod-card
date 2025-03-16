import Image from 'next/image';
import { LkConfig } from '@/app/lk/config';
import { RightMenuPrimaryButton } from '@/components/ui/right-menu/right-menu-primary-button';
import { RightMenuOpenMenuFace } from '@/components/ui/right-menu/right-menu-openmenu-face';
import { RightMenuOpenMenuNotifications } from '@/components/ui/right-menu/right-menu-openmenu-notifications';

const { header } = LkConfig;

interface HeaderProps {
  onNavigate: (path: string) => void;
  isMenuOpen: boolean;
  isNotificationsOpen: boolean;
  onMenuToggle: () => void;
  onNotificationsToggle: () => void;
}

export const Header = ({
  onNavigate,
  isMenuOpen,
  isNotificationsOpen,
  onMenuToggle,
  onNotificationsToggle
}: HeaderProps) => {
  // Навигационные пункты
  const navItems = [
    { path: '/', name: 'Главная', icon: '/icon/top-panel/main.svg', isActive: true },
    { path: '/services', name: 'Сервисы', icon: '/icon/top-panel/services.svg', isActive: false },
    { path: '/transport', name: 'Транспорт', icon: '/icon/top-panel/transport.svg', isActive: false },
    { path: '/culture', name: 'Культура', icon: '/icon/top-panel/culture.svg', isActive: false },
    { path: '/tourism', name: 'Туризм', icon: '/icon/top-panel/tourism.svg', isActive: false },
  ];

  return (
    <div className={header.container}>
      {/* Логотип и название */}
      <div className={header.logo.container}>
        <button onClick={() => onNavigate('/')}>
          <Image 
            src="/logo.png" 
            alt="Карта горожанина" 
            width={48} 
            height={48} 
          />
        </button>
        <div>
          <div className={header.logo.title}>Личный кабинет –<br/>ключ к городу</div>
        </div>
      </div>
      
      {/* Навигация */}
      <div className={header.navigation.container}>
        {navItems.map((item, index) => (
          <button 
            key={index}
            onClick={() => onNavigate(item.path)}
            className={item.isActive ? header.navigation.activeButton : header.navigation.button}
          >
            <span className={item.isActive ? header.navigation.activeText : header.navigation.text}>
              <Image src={item.icon} alt={item.name} width={20} height={20} />
            </span>
            <span className={item.isActive ? header.navigation.activeText : header.navigation.text}>{item.name}</span>
          </button>
        ))}
      </div>
      
      {/* Иконки профиля */}
      <div className={header.profile.container}>
        <RightMenuPrimaryButton
          icon="bell"
          activeIcon="bell.fill"
          altname="Уведомления"
          onClick={onNotificationsToggle}
          isActive={isNotificationsOpen}
        />
        <RightMenuPrimaryButton
          icon="face.smiling"
          activeIcon="face.smiling.inverse"
          altname="Меню"
          width={25}
          height={25}
          onClick={onMenuToggle}
          isActive={isMenuOpen}
        />
        
        {isMenuOpen && (
          <RightMenuOpenMenuFace />
        )}

        {isNotificationsOpen && (
          <RightMenuOpenMenuNotifications />
        )}
      </div>
    </div>
  );
}; 