// @ts-nocheck
import { ReactElement, ReactNode, useState } from "react";
import { checkWinnerFrom, checkEndGame } from "../modules/board";
import { TURNS } from "../constants.js";
import { Square } from "../components/Square";
import { WinnerModal } from "../components/WinnerModal";
import { Button } from "../components/Button";

export default function Home() {
  const [nodes, setNodes] = useState<{
    [key: string | number]: string | number;
  }>({});
  const [board, setBoard] = useState<ReactNode[]>(Array(9).fill(""));
  const [winLine, setWinLine] = useState<number[]>([]);
  const [winner, setWinner] = useState<boolean | null>(null);
  const [canPlay, setCanPlay] = useState<boolean>(true);

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setWinner(null);
    setCanPlay(true);
    setWinLine([]);
  };

  const closeModal = () => {
    setCanPlay(false);
    setWinner(null);
  };

  const getAvailableMoves = (board: ReactNode[]) => {
    const moves: number[] = [];
    board.forEach((square, index) => {
      if (!square) moves.push(index);
    });
    return moves;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || !canPlay) return;

    const editedBoard = [...board];
    editedBoard[index] = TURNS.X;

    setBoard(editedBoard);

    let randomNumber = getBestMove(editedBoard, 0, false);
    if (editedBoard[randomNumber] === "") {
      editedBoard[randomNumber] = TURNS.O;
    }

    setBoard(editedBoard);

    if (isTerminal(editedBoard).winner) {
      const newWinner = checkWinnerFrom(editedBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else if (checkEndGame(editedBoard)) {
        setWinner(false);
      }
    }
  };

  const isEmpty = (board: ReactNode[]) => {
    return board.every((cell) => !cell);
  };

  const isFull = (board: ReactNode[]) => {
    return board.every((cell) => cell);
  };

  const isTerminal = (board: ReactElement[]) => {
    if (isEmpty(board)) return false;

    if (board[0] === board[1] && board[0] === board[2] && board[0]) {
      return { winner: board[0], winLine: [0, 1, 2] };
    }
    if (board[3] === board[4] && board[3] === board[5] && board[3]) {
      return { winner: board[3], winLine: [3, 4, 5] };
    }
    if (board[6] === board[7] && board[6] === board[8] && board[6]) {
      return { winner: board[6], winLine: [6, 7, 8] };
    }

    if (board[0] === board[3] && board[0] === board[6] && board[0]) {
      return { winner: board[0], winLine: [0, 3, 6] };
    }
    if (board[1] === board[4] && board[1] === board[7] && board[1]) {
      return { winner: board[1], winLine: [1, 4, 7] };
    }
    if (board[2] === board[5] && board[2] === board[8] && board[2]) {
      return { winner: board[2], winLine: [2, 5, 8] };
    }

    if (board[0] === board[4] && board[0] === board[8] && board[0]) {
      return { winner: board[0], winLine: [0, 4, 8] };
    }
    if (board[2] === board[4] && board[2] === board[6] && board[2]) {
      return { winner: board[2], winLine: [2, 4, 6] };
    }

    if (isFull(board)) {
      return { winner: "draw" };
    }

    return false;
  };

  const getBestMove = (
    newBoard: ReactNode[],
    depth: number,
    isMax: boolean,
    callback = (value: number) => {}
  ) => {
    if (depth === 0) setNodes({});

    if (isTerminal(newBoard) || depth === -1) {
      if (isTerminal(newBoard).winner === TURNS.X) {
        return 100 - depth;
      } else if (isTerminal(newBoard).winner === TURNS.O) {
        return -100 + depth;
      }
      return 0;
    }

    if (isMax) {
      let best = -100;

      getAvailableMoves(newBoard).forEach((index) => {
        let child = [...newBoard];
        child[index] = TURNS.X;

        let score = getBestMove(child, depth + 1, false, callback);
        best = Math.max(best, score);
      });

      return best;
    }

    if (!isMax) {
      let best = 100;

      getAvailableMoves(newBoard).forEach((index) => {
        let child = [...newBoard];
        child[index] = TURNS.O;

        let score = getBestMove(child, depth + 1, true, callback);
        best = Math.min(best, score);

        if (depth === 0) {
          const moves = nodes[score] ? `${nodes[score]},${index}` : index;
          nodes[score] = moves;
        }
      });
      if (depth === 0) {
        let returnValue;

        if (typeof nodes[best] === "string") {
          const arr = nodes[best]!.split(",");
          const rand = Math.floor(Math.random() * arr.length);
          returnValue = arr[rand];
        } else {
          returnValue = nodes[best];
        }

        callback(returnValue);
        return returnValue;
      }
      return best;
    }
  };

  return (
    <main className="bg-[#0D0F12] h-screen flex flex-col items-center justify-center gap-20 relative">
      <h1 className="text-7xl font-extrabold text-[#E3E6E8]">Tic Tac Toe</h1>
      <section className="grid grid-cols-3">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={handleClick}>
              {square}
            </Square>
          );
        })}
      </section>
      <Button board={board} resetGame={resetGame}>
        Reset
      </Button>
      <WinnerModal
        resetGame={resetGame}
        winner={winner}
        board={board}
        closeModal={closeModal}
      />
    </main>
  );
}
