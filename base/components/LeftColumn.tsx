import React from "react";
import LeftColumnBlock from "./LeftColumnBlock";
import { gridConfig } from "../app/config";

const LeftColumn: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-1/5 shrink-0">
      {Array.from({ length: gridConfig.leftColumnBlocks }).map((_, index) => (
        <LeftColumnBlock key={`left-${index}`} index={index} />
      ))}
    </div>
  );
};

export default LeftColumn; 