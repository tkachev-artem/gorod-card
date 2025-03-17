import React from "react";
import TopRowBlock from "./TopRowBlock";

const TopRow: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full flex-1">
      <TopRowBlock index={0} />
      <TopRowBlock index={1} isSpecial={true} />
      <TopRowBlock index={2} />
    </div>
  );
};

export default TopRow; 