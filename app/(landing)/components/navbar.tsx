import Link from "next/link";
import { GitHubIcon } from "@/components/icons/github";

export default function Navbar() {
  return (
    <nav className="z-10 w-full">
      <div className="w-full p-2 flex justify-between items-center">
        <Link href={`/`} className="font-mono font-semibold text-xl">
          Pardy
        </Link>
        <Link href={`https://github.com/ebarthur`}>
          <GitHubIcon className="fill-gray-900 hover:fill-[#9333EA] transition-colors duration-200" />
        </Link>
      </div>
    </nav>
  );
}
