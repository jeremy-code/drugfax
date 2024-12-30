import { cn } from "@reclaim/ui/utils";
import type { ComponentPropsWithRef } from "react";
import Link from "next/link";

import { ThemeToggle } from "#components/misc/ThemeToggle";
import { Logo } from "#components/misc/Logo";

export const Navbar = ({
  className,
  ...props
}: ComponentPropsWithRef<"header">) => {
  return (
    <header className={cn("border-b", className)} {...props}>
      <div className="container flex justify-between py-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          {/* spacing.6 = 1.5rem (24px) aligns with line height */}
          <Logo className="size-[1lh]" />
          Reclaim
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/medications">Medications</Link>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};
