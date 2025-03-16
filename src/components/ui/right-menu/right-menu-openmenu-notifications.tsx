'use client';

import { useRouter } from 'next/navigation';
import { RightMenuInButton } from './right-menu-in-button';

export const RightMenuOpenMenuNotifications = () => {
    const router = useRouter();
    
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
                icon='bell'
                altname='Уведомление'
                width={20}
                height={20}
            >
                Уведомление?
            </RightMenuInButton>
        </div>
    );
};