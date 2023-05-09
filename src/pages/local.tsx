import { useState } from "react";
import { checkWinnerFrom, checkEndGame } from "../modules/board";
import { TURNS } from "../constants.js";
import { Square } from "../components/Square";
import { WinnerModal } from "../components/WinnerModal";
import { Button } from "../components/Button";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState<boolean | null>(null);
  const [turn, setTurn] = useState(TURNS.X);
  const [canPlay, setCanPlay] = useState<boolean>(true);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setCanPlay(true);
  };

  const closeModal = () => {
    setCanPlay(false);
    setWinner(null);
  };

  const updateBoard = (index: number) => {
    if (board[index] || winner || !canPlay) return;

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
  };

  return (
    <main className="bg-[#0D0F12] h-screen flex flex-col items-center justify-center gap-20 relative">
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
      <Button board={board} resetGame={resetGame}>
        Reset
      </Button>
      {winner === null && (
        <section className="absolute bottom-10 right-10 flex flex-col items-center justify-center gap-2">
          <span className="text-[#999] font-semibold text-lg">
            Current turn
          </span>
          <div className="grid place-items-center">
            {turn === TURNS.X ? TURNS.X : TURNS.O}
          </div>
        </section>
      )}

      <WinnerModal
        resetGame={resetGame}
        winner={winner}
        board={board}
        closeModal={closeModal}
      />
    </main>
  );
}
