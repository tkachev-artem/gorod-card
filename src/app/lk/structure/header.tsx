'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LkConfig } from '../config';

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
      path: '/lk', 
      name: 'Главная', 
      icon: '/icon/header-menu/standard/house.svg', 
      activeIcon: '/icon/header-menu/active/house.fill.svg', 
      isActive: true 
    },
    { 
      path: '/lk/services', 
      name: 'Сервисы', 
      icon: '/icon/header-menu/standard/service.svg', 
      activeIcon: '/icon/header-menu/active/service.fill.svg', 
      isActive: false 
    },
    { 
      path: '/lk/transport', 
      name: 'Транспорт', 
      icon: '/icon/header-menu/standard/transport.svg', 
      activeIcon: '/icon/header-menu/active/transport.fill.svg', 
      isActive: false 
    },
    { 
      path: '/lk/culture', 
      name: 'Культура', 
      icon: '/icon/header-menu/standard/culture.svg', 
      activeIcon: '/icon/header-menu/active/culture.fill.svg', 
      isActive: false 
    },
    { 
      path: '/lk/tourism', 
      name: 'Туризм', 
      icon: '/icon/header-menu/standard/tourism.svg', 
      activeIcon: '/icon/header-menu/active/tourism.fill.svg', 
      isActive: false 
    },
  ];

  // Состояние для навигационных пунктов
  const [navItems, setNavItems] = useState<NavItem[]>(initialNavItems);

  // Обработчик клика по пункту меню
  const handleNavItemClick = (clickedPath: string) => {
    // Обновляем активное состояние
    const updatedNavItems = navItems.map(item => ({
      ...item,
      isActive: item.path === clickedPath
    }));
    
    // Обновляем состояние
    setNavItems(updatedNavItems);
    
    // Не выполняем навигацию, только меняем активное состояние
    // onNavigate(clickedPath);
  };

  // Обработчик выхода из аккаунта
  const handleLogout = () => {
    // Очистка данных авторизации из localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Другие данные для очистки при необходимости
    // localStorage.removeItem('refreshToken');
    
    // Перенаправление на страницу входа
    onNavigate('/auth');
    
    // Закрытие меню после выхода
    onMenuToggle();
  };

  return (
    <header className={LkConfig.header.container}>
      <div className={LkConfig.header.logo.container}>
        <button onClick={() => onNavigate('/')} className="flex items-center justify-center">
          <Image 
            src="/logo.png" 
            alt="Карта горожанина" 
            width={48} 
            height={48} 
          />
        </button>
        <div>
          <div className={LkConfig.header.logo.title}>Личный кабинет –<br/>ключ к городу</div>
        </div>
      </div>
      
      <nav className={LkConfig.header.navigation.container}>
        {navItems.map((item, index) => (
          <button 
            key={index}
            onClick={() => handleNavItemClick(item.path)}
            className={item.isActive ? LkConfig.header.navigation.activeButton : LkConfig.header.navigation.button}
          >
            <Image 
              src={item.isActive ? item.activeIcon : item.icon} 
              alt={item.name} 
              width={20} 
              height={20} 
              className={item.isActive ? "" : "opacity-70"}
            />
            <span className={item.isActive ? LkConfig.header.navigation.activeText : LkConfig.header.navigation.text}>
              {item.name}
            </span>
          </button>
        ))}
      </nav>
      
      <div className={LkConfig.header.profile.container}>
        <button 
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${isNotificationsOpen ? 'bg-gray-500 border-gray-600' : 'bg-white border-gray-300'}`}
          onClick={onNotificationsToggle}
        >
          <Image 
            src={isNotificationsOpen ? '/icon/bell.fill.svg' : '/icon/bell.svg'} 
            alt="Уведомления" 
            width={22} 
            height={22} 
          />
        </button>
        
        <button 
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${isMenuOpen ? 'bg-gray-500 border-gray-600' : 'bg-white border-gray-300'}`}
          onClick={onMenuToggle}
        >
          <Image 
            src={isMenuOpen ? '/icon/face.smiling.inverse.svg' : '/icon/face.smiling.svg'} 
            alt="Меню" 
            width={23} 
            height={23} 
          />
        </button>
        
        {isMenuOpen && (
          <div className="absolute right-0 top-12 p-4 bg-white rounded-xl border border-gray-300 shadow-lg z-10 whitespace-nowrap min-w-max overflow-visible">
            <button className="px-4 py-2 text-gray-900 hover:bg-gray-100 w-full rounded-lg flex items-center justify-center">
              <Image 
                src="/icon/drop-down-menu/person.svg" 
                alt="Профиль" 
                width={20} 
                height={20} 
                className="mr-2 opacity-70"
              />
              Профиль
            </button>
            <button 
              className="px-4 py-2 text-red-600 hover:bg-gray-100 w-full rounded-lg flex items-center justify-center"
              onClick={handleLogout}
              aria-label="Выйти из аккаунта"
            >
              <Image 
                src="/icon/drop-down-menu/xmark.svg" 
                alt="Выйти" 
                width={14} 
                height={14}
                className="mr-2 opacity-70" 
              />
              Выйти
            </button>
          </div>
        )}
        
        {isNotificationsOpen && (
          <div className="absolute right-0 top-12 p-4 bg-white rounded-xl border border-gray-300 shadow-lg z-10 w-72">
            <div className="text-black font-medium mb-2">Уведомления</div>
            <div className="text-gray-500 text-sm">У вас нет новых уведомлений</div>
          </div>
        )}
      </div>
    </header>
  );
}; 