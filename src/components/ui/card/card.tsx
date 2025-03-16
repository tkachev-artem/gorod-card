import Image from 'next/image';

interface CardProps {
    isActive?: boolean;
    cardNumber?: string;
    backgroundImage?: string;
}

export function Card({ 
    isActive: initialIsActive = false, 
    cardNumber = '',
    backgroundImage = '/images/card-background.jpg'
}: CardProps) {
    // Функция для обработки клика по карте (например, для просмотра деталей)
    const handleCardClick = () => {
        if (initialIsActive) {
            console.log('Card: Клик по активной карте');
            // Здесь можно добавить логику для просмотра деталей карты
        }
    };

    if (!initialIsActive) {
        // Если карта неактивна, просто возвращаем пустой шаблон
        // Логика создания карты теперь находится в CardContainer
        return null;
    }

    return (
        <div 
            className="w-full h-[212px] p-5 bg-white rounded-xl border-2 border-gray-300 relative hover:border-blue-400 transition-colors duration-300 cursor-pointer z-10"
            onClick={handleCardClick}
            style={{ maxWidth: '340px' }}
        >
            {/* Фоновое изображение на всю карту */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
                {backgroundImage && (
                    <Image 
                        src={backgroundImage}
                        alt="Фон карты"
                        fill
                        className="object-cover"
                        priority
                    />
                )}
            </div>
            
            {/* QR-код */}
            <div className="absolute right-5 top-5 z-10">
                <div className="w-20 h-20 bg-blue-100 rounded-xl border-2 border-blue-400 flex items-center justify-center">
                    <Image 
                        src="/icon/qr-code.svg" 
                        alt="QR код" 
                        width={70} 
                        height={70}
                    />
                </div>
            </div>

            {/* Нижняя часть с логотипом и номером */}
            <div className="absolute bottom-5 flex items-center gap-4">
                <div className="flex items-center gap-2.5">
                    <Image 
                        src="/icon/logo-card.svg" 
                        alt="Логотип карты" 
                        width={16} 
                        height={35}
                    />
                    <span className="text-xs font-semibold">
                        Виртуальная<br/>Карта горожанина
                    </span>
                </div>
                <div className="text-gray-900 text-base font-semibold">
                    {cardNumber}
                </div>
            </div>
        </div>
    );
}