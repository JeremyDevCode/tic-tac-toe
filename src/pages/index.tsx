import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col gap-20 items-center justify-center text-[#E3E6E8]">
      <h1 className="text-6xl font-bold">Select gamemode</h1>
      <div className="flex items-center justify-center gap-20 text-2xl font-medium">
        <Link
          className="hover:bg-[#E3E6E811] py-2 px-5 rounded-md"
          href="/local"
        >
          Local
        </Link>
        <Link
          className="hover:bg-[#E3E6E811] py-2 px-5 rounded-md"
          href="/machine"
        >
          Machine
        </Link>
        <Link
          className="hover:bg-[#E3E6E811] py-2 px-5 rounded-md"
          href="/multiplayer"
        >
          Online
        </Link>
      </div>
    </main>
  );
}
