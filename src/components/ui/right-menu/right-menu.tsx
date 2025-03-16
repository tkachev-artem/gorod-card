import { useState } from 'react';
//import { useRouter } from 'next/navigation';
import { RightMenuPrimaryButton } from './right-menu-primary-button';
import { RightMenuSearch } from './right-menu-search';
import { RightMenuOpenMenuFace } from './right-menu-openmenu-face';
import { RightMenuOpenMenuNotifications } from './right-menu-openmenu-notifications';

export const RightMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    //const router = useRouter();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        // Закрываем уведомления при открытии меню
        if (!isMenuOpen) {
            setIsNotificationsOpen(false);
        }
    };

    const handleNotificationsToggle = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        // Закрываем меню при открытии уведомлений
        if (!isNotificationsOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="inline-block bg-gray-100 rounded-xl border border-gray-300 relative z-50">
            <div className="flex items-center gap-6 px-4 py-4">

                {/* Поиск */}

                <RightMenuSearch/>

                {/* Уведомления */}

                <RightMenuPrimaryButton
                    icon="bell"
                    activeIcon='bell.fill'
                    altname="Уведомления"
                    onClick={handleNotificationsToggle}
                    isActive={isNotificationsOpen}
                />

                {/*Кнопка открытия меню */}
                
                <RightMenuPrimaryButton
                    icon="face.smiling"
                    activeIcon="face.smiling.inverse"
                    altname="Меню"
                    width={25}
                    height={25}
                    onClick={handleMenuToggle}
                    isActive={isMenuOpen}
                />

                {/* Меню */}

                {isMenuOpen && (
                    <RightMenuOpenMenuFace />
                )}

                {isNotificationsOpen && (
                    <RightMenuOpenMenuNotifications />
                )}
            </div>
        </div>
    );
}