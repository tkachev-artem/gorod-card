import React from "react";
import { gridConfig } from "../app/config";

const BottomRow: React.FC = () => {
  return (
    <div className="flex-1 w-full">
      <div 
        className={`h-full w-full ${gridConfig.blockStyles.base}`}
        aria-label="Блок нижнего ряда"
        tabIndex={0}
      />
    </div>
  );
};

export default BottomRow; 