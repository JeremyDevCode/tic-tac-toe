import React from "react";

interface SquareProps {
  children: React.ReactNode;
  index: number;
  updateBoard: (index: number, updatedFromOther: boolean) => void;
}

function Square({ children, index, updateBoard }: SquareProps) {
  const handleClick = () => {
    updateBoard(index, false);
  };

  return (
    <div
      onClick={handleClick}
      className={`grid place-items-center w-[100px] h-[100px] border-[#E3E6E8] ${
        index < 3 ? "border-b-2" : null
      } ${index > 5 ? "border-t-2" : null} ${
        index === 0 || index === 3 || index === 6 ? "border-r-2" : null
      } ${index === 2 || index === 5 || index === 8 ? "border-l-2" : null}`}
    >
      {children}
    </div>
  );
}

export { Square };
