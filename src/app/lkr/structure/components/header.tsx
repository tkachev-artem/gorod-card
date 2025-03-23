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
  isMenuOpen,
  isNotificationsOpen,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavItemClick = (clickedPath: string) => {
    const updatedNavItems = navItems.map(item => ({
      ...item,
      isActive: item.path === clickedPath
    }));
    
    setNavItems(updatedNavItems);
    onNavigate(clickedPath);
    setMobileMenuOpen(false);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-6 relative z-40">
      <div className="w-full flex items-center justify-between">
        {/* Логотип и название */}
        <div className="lg:w-[250px] flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-[8px] sm:rounded-[10px] flex justify-center items-center">
            <Image 
              src="/icon/header-menu/standard/logo.svg" 
              alt="Логотип" 
              width={40} 
              height={40}
              className="w-8 h-8 sm:w-10 sm:h-10" 
            />
          </div>
          <div className="hidden sm:block text-black text-sm sm:text-base font-semibold">
            Личный кабинет –<br />ключ к городу
          </div>
        </div>
        
        {/* Кнопки для мобильных */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Кнопки для мобильных */}
          <div className="md:hidden flex items-center gap-2">
            {/* Кнопка уведомлений */}
            <button 
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200"
              onClick={onNotificationsToggle}
              aria-label="Уведомления"
              tabIndex={0}
            >
              <Image 
                src="/icon/bell.svg" 
                alt="Уведомления" 
                width={16} 
                height={16} 
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
            
            {/* Кнопка меню профиля */}
            <button 
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200"
              onClick={onMenuToggle}
              aria-label="Меню"
              tabIndex={0}
            >
              <Image 
                src="/icon/menu.svg" 
                alt="Меню" 
                width={20} 
                height={20} 
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            
            {/* Кнопка мобильного меню */}
            <button 
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg"
              onClick={toggleMobileMenu}
              aria-label="Открыть меню навигации"
              tabIndex={0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Десктопные кнопки */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            {/* Кнопка уведомлений */}
            <button 
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex justify-center items-center"
              onClick={onNotificationsToggle}
              aria-label="Уведомления"
              tabIndex={0}
            >
              <Image 
                src={isNotificationsOpen ? "/icon/right-button-menu/active/notification.svg" : "/icon/right-button-menu/standard/notification.svg"} 
                alt="Уведомления" 
                width={20} 
                height={20} 
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
            
            {/* Кнопка меню */}
            <button 
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl border border-gray-300 flex justify-center items-center"
              onClick={onMenuToggle}
              aria-label="Меню"
              tabIndex={0}
            >
              <Image 
                src={isMenuOpen ? "/icon/right-button-menu/active/menu.svg" : "/icon/right-button-menu/standard/menu.svg"} 
                alt="Меню" 
                width={20} 
                height={20} 
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Навигация для десктопа */}
      <div className="hidden md:block w-full overflow-x-auto scrollbar-hide flex-1 mt-3 md:mt-0">
        <div className="flex items-center gap-1 sm:gap-2 py-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={item.isActive 
                ? "px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 flex-shrink-0" 
                : "px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 flex-shrink-0"}
              onClick={() => handleNavItemClick(item.path)}
              aria-label={item.name}
              tabIndex={0}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                <Image 
                  src={item.isActive ? item.activeIcon : item.icon} 
                  alt={`${item.name} icon`}
                  width={16}
                  height={16}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${item.isActive ? "" : "opacity-50 grayscale"}`}
                />
              </div>
              <span className={`text-${item.isActive ? 'black' : 'gray-400'} text-sm sm:text-base font-semibold`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Выпадающее мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[calc(var(--header-height,4rem)+1rem)] bg-white z-50 mx-3 sm:mx-4 py-2 px-3 shadow-lg rounded-lg border border-gray-200">
          {navItems.map((item) => (
            <button
              key={item.path}
              className="w-full py-3 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
              onClick={() => handleNavItemClick(item.path)}
              aria-label={item.name}
              tabIndex={0}
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Image 
                  src={item.isActive ? item.activeIcon : item.icon} 
                  alt={`${item.name} icon`}
                  width={20}
                  height={20}
                  className={`w-5 h-5 ${item.isActive ? "" : "opacity-50 grayscale"}`}
                />
              </div>
              <span className={`text-${item.isActive ? 'black font-medium' : 'gray-500'} text-base`}>
                {item.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}; 