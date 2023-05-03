import { Button } from "./Button";

interface ModalProps {
  winner: boolean | null;
  resetGame: () => void;
  board: string[];
}

export function WinnerModal({ winner, resetGame, board }: ModalProps) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "And the winner is";

  return (
    <section className="h-screen w-full grid place-items-center bg-[#000000b3] absolute">
      <div className="bg-[#0D0F12] p-10 flex flex-col items-center justify-center w-[300px] h-[320px] rounded-lg">
        <h2>{winnerText}</h2>

        <header className="win">
          {winner && (
            <div className="grid place-items-center w-[100px] h-[100px]">
              {winner}
            </div>
          )}
        </header>

        <footer className="mt-10">
          <Button board={board} resetGame={resetGame}>
            Play again
          </Button>
        </footer>
      </div>
    </section>
  );
}
