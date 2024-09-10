import Link from "next/link";
import { ModeToggle } from "./theme-toggle-button";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <nav className="flex justify-between">
      <h1>Inferno</h1>
      <div className="flex gap-x-2 items-center">
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
