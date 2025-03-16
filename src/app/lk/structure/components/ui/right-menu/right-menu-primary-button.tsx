'use client';

import React, { KeyboardEvent, ReactNode } from 'react';
import Image from 'next/image';

interface RightMenuPrimaryButtonProps {
  icon: string;
  altname: string;
  onClick: () => void;
  width?: number;
  height?: number;
  activeIcon?: string;
  isActive: boolean;
}

export function RightMenuPrimaryButton({ 
  onClick, 
  icon, 
  altname, 
  width = 20, 
  height = 20,
  activeIcon,
  isActive
}: RightMenuPrimaryButtonProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    <div className='relative'>
      <button 
        onClick={onClick}
        className='bg-white w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200'
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={altname}
      >
        <Image 
          src={`/icon/${isActive && activeIcon ? activeIcon : icon}.svg`}
          alt={altname}
          width={width}
          height={height}
        />
      </button>
    </div>
  );
} 