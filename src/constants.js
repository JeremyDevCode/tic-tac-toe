import Image from "next/image";

export const TURNS = {
  X: (
    <Image
      className="w-3/5"
      src="/cross.png"
      width={60}
      height={60}
      alt="cross"
    />
  ),
  O: (
    <Image
      className="w-3/5 invert"
      src="/circle.png"
      width={60}
      height={60}
      alt="circle"
    />
  ),
};

export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
