import React from "react";
import LeftColumn from "./LeftColumn";
import RightSection from "./RightSection";

const Grid: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full flex-1">
      <LeftColumn />
      <RightSection />
    </div>
  );
};

export default Grid; 