'use client';

import { useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  onNavigate: (path: string) => void;
  isMenuOpen: boolean;
  isNotificationsOpen: boolean;
  onMenuToggle: () => void;
  onNotificationsToggle: () => void;
}

interface NavItem {
  path: string;
  name: string;
  icon: string;
  activeIcon: string;
  isActive: boolean;
}

export const Header = ({
  onNavigate,
  onMenuToggle,
  onNotificationsToggle
}: HeaderProps) => {
  // Начальные навигационные пункты с разными иконками для активного и неактивного состояния
  const initialNavItems: NavItem[] = [
    { 
      path: '/lkr', 
      name: 'Главная', 
      icon: '/icon/header-menu/standard/house.svg', 
      activeIcon: '/icon/header-menu/standard/house.svg', 
      isActive: true 
    },
    { 
      path: '/lkr/services', 
      name: 'Сервисы', 
      icon: '/icon/header-menu/standard/service.svg', 
      activeIcon: '/icon/header-menu/active/service.svg', 
      isActive: false 
    },
    { 
      path: '/lkr/transport', 
      name: 'Транспорт', 
      icon: '/icon/header-menu/standard/transport.svg', 
      activeIcon: '/icon/header-menu/active/transport.svg', 
      isActive: false 
    },
    { 
      path: '/lkr/culture', 
      name: 'Культура', 
      icon: '/icon/header-menu/standard/culture.svg', 
      activeIcon: '/icon/header-menu/active/culture.svg', 
      isActive: false 
    },
    { 
      path: '/lkr/tourism', 
      name: 'Туризм', 
      icon: '/icon/header-menu/standard/tourism.svg', 
      activeIcon: '/icon/header-menu/active/tourism.svg', 
      isActive: false 
    }
  ];

  const [navItems, setNavItems] = useState<NavItem[]>(initialNavItems);

  const handleNavItemClick = (clickedPath: string) => {
    const updatedNavItems = navItems.map(item => ({
      ...item,
      isActive: item.path === clickedPath
    }));
    
    setNavItems(updatedNavItems);
    onNavigate(clickedPath);
  };

  return (
    <header className="w-full flex flex-col md:flex-row md:items-center">
      {/* Логотип и название */}
      <div className="w-full lg:w-[250px] flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-[10px]  flex justify-center items-center">
          <Image src="/icon/header-menu/standard/logo.svg" alt="Логотип" width={48} height={48} />
        </div>
        <div className="text-black text-base font-semibold">
          Личный кабинет –<br />ключ к городу
        </div>
      </div>
      
      {/* Навигация */}
      <div className="flex-1 flex flex-wrap items-center gap-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={item.isActive ? "px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2" : "px-4 py-2 bg-white rounded-xl flex items-center gap-2"}
            onClick={() => handleNavItemClick(item.path)}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <Image 
                src={item.isActive ? item.activeIcon : item.icon} 
                alt={`${item.name} icon`}
                width={20}
                height={20}
                className={item.isActive ? "" : "opacity-50 grayscale"}
              />
            </div>
            <span className={`text-${item.isActive ? 'black' : 'gray-400'} text-base font-semibold`}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
      
      {/* Правая часть с уведомлениями и меню */}
      <div className="flex items-center gap-4 relative">
        {/* Кнопка уведомлений */}
        <button 
          className="w-12 h-12 bg-white rounded-full border border-gray-300 flex justify-center items-center"
          onClick={onNotificationsToggle}
          aria-label="Уведомления"
          tabIndex={0}
        >
          <Image 
            src="/icon/right-button-menu/standard/notification.svg" 
            alt="Уведомления" 
            width={20} 
            height={20} 
          />
        </button>
        
        {/* Кнопка меню */}
        <button 
          className="w-12 h-12 bg-white rounded-full border border-gray-300 flex justify-center items-center"
          onClick={onMenuToggle}
          aria-label="Меню"
          tabIndex={0}
        >
          <Image 
            src="/icon/right-button-menu/standard/menu.svg" 
            alt="Меню" 
            width={25} 
            height={25} 
          />
        </button>
      </div>
    </header>
  );
}; 