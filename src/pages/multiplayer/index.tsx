import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { checkWinnerFrom, checkEndGame } from "../../modules/board";
import { TURNS } from "../../constants.js";
import { Square } from "../../components/Square";
import { WinnerModal } from "../../components/WinnerModal";
import { Button } from "../../components/Button";

export default function Multiplayer() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState<boolean | null>(null);
  const [canPlay, setCanPlay] = useState<boolean>(true);
  const [turn, setTurn] = useState(TURNS.X);
  const socket = io("https://server-production-960b.up.railway.app");

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  const closeModal = () => {
    setWinner(null);
  };

  const updateBoard = useCallback(
    (index: number, updatedFromOther: boolean) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);

      if (!updatedFromOther) {
        socket.emit("play", index);
      }

      const newWinner = checkWinnerFrom(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else if (checkEndGame(newBoard)) {
        setWinner(false);
      }
    },
    [board, setBoard, setTurn, socket, turn, winner]
  );

  useEffect(() => {
    const onPlay = (index: number) => {
      console.log("Índice actual", index);
      updateBoard(index, true);
    };

    socket.on("play", onPlay);

    return () => {
      socket.off("play", onPlay);
    };
  }, [socket, updateBoard]);

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
          <div className="grid place-items-center w-[100px] h-[100px]">
            {turn === TURNS.X ? TURNS.X : TURNS.O}
          </div>
        </section>
      )}

      <WinnerModal
        resetGame={resetGame}
        closeModal={closeModal}
        winner={winner}
        board={board}
      />
    </main>
  );
}
