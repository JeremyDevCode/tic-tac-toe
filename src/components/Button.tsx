import React from "react";

interface ButtonProps {
  board: string[];
  resetGame: () => void;
  children: React.ReactNode;
}

function Button({ board, resetGame, children }: ButtonProps) {
  return (
    <button
      className={`text-[#0D0F12] py-2 px-5 rounded-lg font-semibold ${
        board.every((square) => square !== null) ? "hover:bg-[#D3D6D8]" : ""
      } ${
        board.every((square) => square === null) ? "bg-[#999]" : "bg-[#E3E6E8]"
      }`}
      disabled={board.every((square) => (square === null ? true : false))}
      onClick={resetGame}
    >
      {children}
    </button>
  );
}

export { Button };
