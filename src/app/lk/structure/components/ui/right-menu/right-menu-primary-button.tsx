'use client';

import React, { KeyboardEvent } from 'react';
import Image from 'next/image';

interface RightMenuPrimaryButtonProps {
  icon: string;
  activeIcon?: string;
  onClick: () => void;
  isActive?: boolean;
  altname: string;
  width?: number;
  height?: number;
}

export const RightMenuPrimaryButton = ({ 
  icon, 
  activeIcon, 
  onClick, 
  isActive = false, 
  altname,
  width = 20,
  height = 20
}: RightMenuPrimaryButtonProps) => {
  const iconPath = isActive 
    ? `/icon/right-button-menu/active/${activeIcon || icon}.svg` 
    : `/icon/right-button-menu/standard/${icon}.svg`;
  
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    <div className='relative'>
      <button 
        onClick={onClick}
        className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl border ${isActive ? 'bg-gray-500 border-gray-600' : 'bg-white border-gray-300'}`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={altname}
      >
        <Image 
          src={iconPath}
          alt={altname}
          width={width}
          height={height}
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </button>
    </div>
  );
}; 