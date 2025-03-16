'use client';

import { useRouter } from 'next/navigation';
import { RightMenuInButton } from './right-menu-in-button';

export const RightMenuOpenMenuFace = () => {
    const router = useRouter();
    
    const handleLogout = async () => {
        console.log('Выход из системы...');
        // Удаляем токен из localStorage
        localStorage.removeItem('authToken');
        console.log('Токен удален из localStorage');
        
        // Удаляем cookie с токеном через API
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
            console.log('Ответ от сервера при выходе:', response.status);
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }

        // Перенаправляем на страницу авторизации
        console.log('Перенаправление на страницу авторизации');
        window.location.href = '/auth';
    };

    const handleNavigate = (path: string) => {
        console.log('Перенаправление на:', path);
        window.location.href = path;
    };

    return (
        <div className="absolute top-full mt-4 -right-[1px] w-auto bg-white border border-gray-300 rounded-xl p-2 space-y-2">
            <RightMenuInButton
                onClick={() => handleNavigate('/lk')} 
                hoverColor='hover:bg-gray-200'
                hoverTextColor='hover:text-black'
                icon='person'
                altname='Мой профиль'
                width={16}
                height={16}
            >
                Мой профиль
            </RightMenuInButton>

            <RightMenuInButton
                onClick={() => handleNavigate('/lk')}
                hoverColor='hover:bg-gray-200'
                hoverTextColor='hover:text-black'
                icon='gear'
                altname='Настройки'
                width={20}
                height={20}
            >
                Настройки
            </RightMenuInButton>

            <RightMenuInButton
                onClick={() => handleNavigate('/lk')}
                hoverColor='hover:bg-gray-200'
                hoverTextColor='hover:text-black'
                icon='questionmark.circle'
                altname='О сервисе'
                width={18}
                height={18}
            >
                О сервисе
            </RightMenuInButton>

            <RightMenuInButton
                onClick={handleLogout}
                borderColor="border-red-400"
                bgColor="bg-white"
                textColor="text-red-500"
                hoverColor="hover:bg-red-200"
                hoverTextColor="hover:text-red-500"
                icon='xmark-red'
                altname='Выйти'
                width={12}
                height={12}
            >  
                Выйти
            </RightMenuInButton>
        </div>
    );
}; 