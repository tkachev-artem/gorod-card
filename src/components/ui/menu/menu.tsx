import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MenuButtons } from './menu-buttons';


export const Menu: React.FC = () => {
    const pathname = usePathname();

    return (
        <div className="flex items-center h-[48px] gap-8">
            {/* Логотип */}
            <div className="flex items-center gap-3">
                <Image 
                    src="/images/logo-cl.png" 
                    alt="Логотип" 
                    width={48} 
                    height={48}
                    priority
                />
                <div className="flex flex-col gap-0.5">
                    <div className="text-black text-sm font-semibold leading-tight tracking-tight">Личный кабинет –</div>
                    <div className="text-black text-sm font-semibold leading-none">ключ к твоему городу</div>
                </div>
            </div>

            {/* Горизонтальное меню */}
            <nav className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <MenuButtons 
                        icon="/icon/house.fill.svg"
                        text="Главная"
                        bgColor="bg-white"
                        textColor="text-gray-600"
                        isActive={pathname === '/lk'}
                    />

                    <MenuButtons 
                        icon="/icon/rectangle.on.rectangle.angled.svg"
                        text="Сервисы"
                        bgColor="bg-white"
                        textColor='text-gray-600'
                        isActive={pathname === '/lk/services'}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <MenuButtons 
                        icon="/icon/rectangle.and.hand.point.up.left.svg"
                        text="Диалог"
                        bgColor="bg-white"
                        textColor='text-gray-600'
                        isActive={pathname === '/lk/dialog'}
                    />

                    <MenuButtons 
                        icon="/icon/theatermasks.svg"
                        text="Культура"
                        bgColor="bg-white"
                        textColor='text-gray-600'
                        isActive={pathname === '/lk/culture'}
                    />
                </div>
            </nav>
        </div>
    );
}