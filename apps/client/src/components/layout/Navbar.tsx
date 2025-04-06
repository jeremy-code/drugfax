import type { ComponentPropsWithRef } from "react";
import Link from "next/link";
import { cn } from "@drugfax/ui/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@drugfax/ui/components/ui/navigation-menu";

import { ThemeToggle } from "#components/misc/ThemeToggle";
import { Logo } from "#components/misc/Logo";

export const Navbar = ({
  className,
  ...props
}: ComponentPropsWithRef<"header">) => {
  return (
    <header className={cn("border-b", className)} {...props}>
      <div className="container flex items-center justify-between py-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          {/* spacing.6 = 1.5rem (24px) aligns with line height */}
          <Logo className="size-[1lh]" />
          DrugFax
        </Link>

        <NavigationMenu className="grow">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild variant="trigger">
                <Link href="/drugs/search">Search</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>
    </header>
  );
};
