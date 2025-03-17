import React from "react";
import TopRow from "./TopRow";
import BottomRow from "./BottomRow";

const RightSection: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col gap-6 w-full">
      <TopRow />
      <BottomRow />
    </div>
  );
};

export default RightSection; 