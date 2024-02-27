import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full relative flex item-center justify-between max-w-2xl mx-auto py-5">
      <Link href="/" className="font-bold text-3xl">
        Muru<span className="text-blue-500">Blog</span>
      </Link>
      <ModeToggle />
    </nav>
  );
}
