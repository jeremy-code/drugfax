import type { ComponentPropsWithRef } from "react";
import Link from "next/link";
import { cn } from "@reclaim/ui/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@reclaim/ui/components/ui/navigation-menu";

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
          Reclaim
        </Link>

        <NavigationMenu className="grow">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild variant="trigger">
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-0 top-0 w-full">
                <ul className="m-0 grid grid-cols-1 gap-x-2 p-5 sm:w-[500px] sm:grid-cols-2">
                  <li>
                    <NavigationMenuLink
                      className="block select-none rounded-md p-3 text-sm/none no-underline outline-none"
                      asChild
                    >
                      <Link href="/drugs/search">
                        <div className="mb-1 font-medium leading-snug text-primary">
                          Search Drugs by Name
                        </div>
                        <p className="leading-snug text-muted-foreground">
                          Drugs
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>
    </header>
  );
};
