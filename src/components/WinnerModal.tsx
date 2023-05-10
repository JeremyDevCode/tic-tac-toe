import Image from "next/image";
import { AgainIcon } from "../assets/icons/AgainIcon";
import { ReactNode } from "react";
import { HomeIcon } from "../assets/icons/HomeIcon";
import Link from "next/link";

interface ModalProps {
  winner: boolean | null;
  board: ReactNode[];
  resetGame: () => void;
  closeModal: () => void;
}

export function WinnerModal({
  winner,
  board,
  resetGame,
  closeModal,
}: ModalProps) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Tie" : "Winner";
  const tie = (
    <Image className="w-3/5" src="/tie.png" width={96} height={96} alt="tie" />
  );

  return (
    <section className="h-screen w-full grid place-items-center absolute">
      <div
        className="bg-[#000000b3] absolute w-full h-screen"
        onClick={closeModal}
      ></div>
      <div className="bg-[#1A1D28] p-10 flex flex-col items-center justify-center md:w-[700px] h-[480px] gap-12 rounded-2xl relative">
        <header className="flex flex-col items-center justify-center">
          <h2 className="text-7xl font-bold">{winnerText}</h2>
          {(winner || tie) && (
            <div className="grid place-items-center w-[160px] h-[160px]">
              {winner || tie}
            </div>
          )}
        </header>

        <footer className="flex items-center justify-center gap-5 mt-10">
          <button
            onClick={resetGame}
            className="flex bg-[#11131B] text-[#CECED0] items-center justify-center gap-3 py-5 px-5 w-[154px]"
          >
            <AgainIcon />
            Play again
          </button>
          <Link
            href="/"
            className="flex bg-[#11131B] text-[#CECED0] items-center justify-center gap-3 py-5 px-5 w-[154px]"
          >
            <HomeIcon />
            Menu
          </Link>
        </footer>
      </div>
    </section>
  );
}
