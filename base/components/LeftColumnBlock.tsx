import React from "react";
import { gridConfig } from "../app/config";

interface LeftColumnBlockProps {
  index: number;
}

const LeftColumnBlock: React.FC<LeftColumnBlockProps> = ({ index }) => {
  return (
    <div 
      className={`flex-1 ${gridConfig.blockStyles.base}`}
      aria-label={`Блок левой колонки ${index + 1}`}
      tabIndex={0}
    />
  );
};

export default LeftColumnBlock; 