'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LkConfig } from '@/app/lk/config';
import { RightMenuPrimaryButton } from './ui/right-menu/right-menu-primary-button';
import { RightMenuOpenMenuFace } from './ui/right-menu/right-menu-openmenu-face';
import { RightMenuOpenMenuNotifications } from './ui/right-menu/right-menu-openmenu-notifications';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Закрываем другие меню при открытии/закрытии мобильного меню
    if (isMenuOpen) onMenuToggle();
    if (isNotificationsOpen) onNotificationsToggle();
  };

  return (
    <div className={`${header.container} relative`}>
      <div className="flex items-center w-full md:flex-row md:gap-6">
        {/* Логотип и название */}
        <div className={header.logo.container}>
          <button onClick={() => handleNavigation('/')} className="flex items-center justify-center">
            <Image 
              src="/logo.png" 
              alt="Карта горожанина" 
              width={40} 
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
          </button>
          <div className="hidden sm:block">
            <div className={header.logo.title}>Личный кабинет –<br/>ключ к городу</div>
          </div>
        </div>
        
        {/* Навигация для больших экранов встроена в основной flex-контейнер */}
        <nav className="hidden md:block flex-1 overflow-x-auto scrollbar-hide">
          <div className={header.navigation.container}>
            {navItems.map((item, index) => {
              const isActive = item.path === activePath;
              return (
                <button 
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={isActive ? header.navigation.activeButton : header.navigation.button}
                  aria-label={item.name}
                  tabIndex={0}
                >
                  <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5">
                    <Image 
                      src={isActive ? item.activeIcon : item.icon} 
                      alt={item.name} 
                      width={16} 
                      height={16}
                      className="w-4 h-4 sm:w-5 sm:h-5" 
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
        </nav>
        
        {/* Правая часть с кнопками */}
        <div className={header.profile.container}>
          {/* Иконки профиля для desktop */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <RightMenuPrimaryButton
              icon="notification"
              activeIcon="notification"
              altname="Уведомления"
              onClick={onNotificationsToggle}
              isActive={isNotificationsOpen}
            />
            <RightMenuPrimaryButton
              icon="menu"
              activeIcon="menu"
              altname="Меню"
              width={25}
              height={25}
              onClick={onMenuToggle}
              isActive={isMenuOpen}
            />
          </div>
          
          {/* Мобильные кнопки */}
          <div className="md:hidden flex items-center gap-2">
            {/* Кнопка уведомлений для мобильных */}
            <button 
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200"
              onClick={onNotificationsToggle}
              aria-label="Уведомления"
              tabIndex={0}
            >
              <Image 
                src={isNotificationsOpen ? "/icon/right-button-menu/active/notification.svg" : "/icon/right-button-menu/standard/notification.svg"}
                alt="Уведомления" 
                width={20} 
                height={20}
                className="w-5 h-5" 
              />
            </button>
            
            {/* Кнопка профиля для мобильных */}
            <button 
              className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200"
              onClick={onMenuToggle}
              aria-label="Профиль"
              tabIndex={0}
            >
              <Image 
                src={isMenuOpen ? "/icon/right-button-menu/active/menu.svg" : "/icon/right-button-menu/standard/menu.svg"} 
                alt="Профиль" 
                width={20} 
                height={20}
                className="w-5 h-5" 
              />
            </button>
            
            {/* Кнопка меню для мобильных устройств */}
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
        </div>
      </div>
      
      {/* Мобильное меню, отображается при нажатии на кнопку */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[calc(var(--header-height,3rem)+1rem)] bg-white z-50 mx-3 sm:mx-4 py-2 px-3 shadow-lg rounded-lg border border-gray-200">
          {navItems.map((item, index) => {
            const isActive = item.path === activePath;
            return (
              <button 
                key={index}
                onClick={() => handleNavigation(item.path)}
                className="w-full py-3 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                aria-label={item.name}
                tabIndex={0}
              >
                <span className="flex items-center justify-center w-5 h-5">
                  <Image 
                    src={isActive ? item.activeIcon : item.icon} 
                    alt={item.name} 
                    width={20} 
                    height={20}
                    className="w-5 h-5" 
                    style={isActive ? {} : { 
                      filter: 'grayscale(100%) brightness(80%)',
                      opacity: 0.6
                    }}
                  />
                </span>
                <span className={`text-${isActive ? 'black font-medium' : 'gray-500'} text-base`}>{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
      
      {/* Выпадающие меню профиля и уведомлений */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <RightMenuOpenMenuFace />
        </div>
      )}

      {isNotificationsOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <RightMenuOpenMenuNotifications />
        </div>
      )}
    </div>
  );
}; 