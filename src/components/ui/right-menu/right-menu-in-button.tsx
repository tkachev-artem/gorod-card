import React from 'react';
import Image from 'next/image';

interface RightMenuInButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    borderColor?: string;
    bgColor?: string;
    textColor?: string;
    hoverColor?: string;
    hoverTextColor?: string;
    icon: string;
    altname: string;
    width: number;
    height: number;
}

export function RightMenuInButton({ children, onClick, borderColor = 'border-gray-300', bgColor = 'bg-white', textColor = 'text-black', hoverColor = 'hover:bg-gray-300', hoverTextColor = 'hover:text-white', icon = 'face.smiling', altname = 'Кнопка', width = 20, height = 20 }: RightMenuInButtonProps) {
    return (
        <button 
            className={`w-full text-center font-semibold flex items-center gap-4 px-4 py-2 border ${borderColor} ${bgColor} ${textColor} ${hoverColor} ${hoverTextColor} rounded-lg`}
            onClick={onClick}
        >
            <div className="w-[24px] flex items-center justify-center">
                <Image 
                    src={`/icon/${icon}.svg`}
                    alt={altname}
                    width={width}
                    height={height}
                />
            </div>
            {children}
        </button>
    );
}