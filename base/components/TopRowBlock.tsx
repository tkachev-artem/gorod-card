import React from "react";
import { gridConfig } from "../app/config";

interface TopRowBlockProps {
  index: number;
  isSpecial?: boolean;
}

const TopRowBlock: React.FC<TopRowBlockProps> = ({ index, isSpecial = false }) => {
  const blockStyle = isSpecial ? gridConfig.blockStyles.special : gridConfig.blockStyles.base;
  
  return (
    <div 
      className={`${index === 0 ? 'w-full md:w-1/3' : 'flex-1'} ${blockStyle} ${isSpecial ? 'flex flex-col gap-4' : ''}`}
      aria-label={`Блок верхнего ряда ${index + 1}`}
      tabIndex={0}
    />
  );
};

export default TopRowBlock; 