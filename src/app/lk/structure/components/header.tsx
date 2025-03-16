'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  // Получаем текущий путь
  const pathname = usePathname();
  const [activePath, setActivePath] = useState('/');
  
  // Обновляем активный путь при изменении pathname
  useEffect(() => {
    if (pathname) {
      // Определяем основной путь (например, /services/details -> /services)
      const basePath = '/' + (pathname.split('/')[1] || '');
      
      // Если путь /lk, считаем активным путь /
      if (basePath === '/lk') {
        setActivePath('/');
      } else {
        setActivePath(basePath);
      }
    }
  }, [pathname]);

  // Навигационные пункты
  const navItems = [
    { 
      path: '/', 
      name: 'Главная', 
      icon: '/icon/header-menu/standard/house.svg',
      activeIcon: '/icon/header-menu/active/house.fill.svg'
    },
    { 
      path: '/services', 
      name: 'Сервисы', 
      icon: '/icon/header-menu/standard/service.svg',
      activeIcon: '/icon/header-menu/active/service.fill.svg'
    },
    { 
      path: '/transport', 
      name: 'Транспорт', 
      icon: '/icon/header-menu/standard/transport.svg',
      activeIcon: '/icon/header-menu/active/transport.fill.svg'
    },
    { 
      path: '/culture', 
      name: 'Культура', 
      icon: '/icon/header-menu/standard/culture.svg',
      activeIcon: '/icon/header-menu/active/culture.fill.svg'
    },
    { 
      path: '/tourism', 
      name: 'Туризм', 
      icon: '/icon/header-menu/standard/tourism.svg',
      activeIcon: '/icon/header-menu/active/tourism.fill.svg'
    },
  ];
  
  // Функция для определения активности пункта меню
  const handleNavigation = (path: string) => {
    setActivePath(path);
    onNavigate(path);
  };

  return (
    <div className={header.container}>
      {/* Логотип и название */}
      <div className={header.logo.container}>
        <button onClick={() => handleNavigation('/')}>
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
        {navItems.map((item, index) => {
          const isActive = item.path === activePath;
          return (
            <button 
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={isActive ? header.navigation.activeButton : header.navigation.button}
            >
              <span className={isActive ? header.navigation.activeText : header.navigation.text}>
                <Image 
                  src={isActive ? item.activeIcon : item.icon} 
                  alt={item.name} 
                  width={20} 
                  height={20} 
                  style={isActive ? {} : { 
                    filter: 'grayscale(100%) brightness(80%)',
                    opacity: 0.6
                  }}
                />
              </span>
              <span className={isActive ? header.navigation.activeText : header.navigation.text}>{item.name}</span>
            </button>
          );
        })}
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