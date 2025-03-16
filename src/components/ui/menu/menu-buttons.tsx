import Image from 'next/image';

interface MenuButtonProps {
    icon: string;
    text: string;
    bgColor: string;
    textColor: string;
    isActive?: boolean;
    borderColor?: string;
}

export function MenuButtons({ icon, text, bgColor, textColor, isActive = false, borderColor = "border-white" }: MenuButtonProps) {
    // ... остальной код без изменений ...
    return (
        <div className="flex flex-col">
            <button className={`w-full relative flex items-center px-4 py-2 ${isActive ? 'bg-gray-100' : bgColor} ${isActive ? 'border-gray-100' : borderColor} rounded-lg border ${borderColor} hover:bg-gray-100 transition-colors duration-300`}>
                <Image 
                    src={icon} 
                    alt={text} 
                    width={20} 
                    height={20}
                    className="mr-3"
                />
                <span className={`text-base ${textColor} font-semibold flex-grow text-left`}>
                    {text}
                </span>
                {/* {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mr-4" />
                )} */}
            </button>
        </div>
    );
}