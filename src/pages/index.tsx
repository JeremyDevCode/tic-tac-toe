import { useState } from "react";
import { checkWinnerFrom, checkEndGame } from "../modules/board";
import { TURNS } from "../constants.js";
import { Square } from "../components/Square";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState<boolean | null>(null);
  const [turn, setTurn] = useState(TURNS.X);

  function updateBoard(index: number) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className="bg-[#0D0F12] h-screen flex flex-col items-center justify-center gap-20">
      <h1 className="text-7xl font-extrabold text-[#E3E6E8]">Tic Tac Toe</h1>
      <section className="grid grid-cols-3">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
    </main>
  );
}
