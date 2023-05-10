import Link from "next/link";
import { GroupIcon } from "../assets/icons/GroupIcon";
import { ScreenIcon } from "../assets/icons/ScreenIcon";
import { GlobeIcon } from "../assets/icons/GlobeIcon";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col gap-20 items-center justify-center text-[#E3E6E8]">
      <h1 className="text-6xl font-bold">Select gamemode</h1>
      <div className="flex items-center justify-center gap-20 text-2xl font-medium">
        <Link
          className="flex items-center gap-2 hover:bg-[#E3E6E811] py-2 px-5 rounded-md text-[#AAA] hover:text-[#E3E6E8] transition-colors"
          href="/local"
        >
          <GroupIcon />
          Local
        </Link>
        <Link
          className="flex items-center gap-2 hover:bg-[#E3E6E811] py-2 px-5 rounded-md text-[#AAA] hover:text-[#E3E6E8] transition-colors"
          href="/machine"
        >
          <ScreenIcon />
          Machine
        </Link>
        <Link
          className="flex items-center gap-2 hover:bg-[#E3E6E811] py-2 px-5 rounded-md text-[#AAA] hover:text-[#E3E6E8] transition-colors"
          href="/multiplayer"
        >
          <GlobeIcon />
          Online
        </Link>
      </div>
    </main>
  );
}
