import React, { ReactNode } from "react";

interface ButtonProps {
  board: ReactNode[];
  resetGame: () => void;
  children: React.ReactNode;
  className?: string;
}

function Button({ board, resetGame, className, children }: ButtonProps) {
  return (
    <button
      className={`text-[#0D0F12] py-2 px-5 rounded-lg font-semibold ${
        board.every((square) => square !== null) ? "hover:bg-[#D3D6D8]" : ""
      } ${
        board.every((square) => square === null) ? "bg-[#999]" : "bg-[#E3E6E8]"
      } ${className}`}
      disabled={board.every((square) => (square === null ? true : false))}
      onClick={resetGame}
    >
      {children}
    </button>
  );
}

export { Button };
