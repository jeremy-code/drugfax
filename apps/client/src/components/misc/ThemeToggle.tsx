"use client";

import type { ComponentPropsWithRef } from "react";
import { AccessibleIcon } from "radix-ui";
import { Moon, RefreshCw, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SwitchRoot, SwitchThumb } from "@drugfax/ui/components/ui/switch";
import { cn } from "@drugfax/ui/utils";

import { useIsMounted } from "#hooks/useIsMounted";

export type ThemeToggleProps = ComponentPropsWithRef<typeof SwitchRoot>;

export const ThemeToggle = (props: ThemeToggleProps) => {
  // Prevent hydration error and layout shift as theme must be resolved from
  // `localStorage`
  const isMounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const [ThemeIcon, themeIconLabel] =
    isMounted ?
      isLight ? [Sun, "Light Mode"]
      : [Moon, "Dark Mode"]
    : [RefreshCw, "Loading"];

  return (
    <SwitchRoot
      // Light mode = checked, Dark mode or not mounted = unchecked
      checked={isMounted && isLight}
      onCheckedChange={(checked) => {
        setTheme(checked ? "light" : "dark");
      }}
      disabled={!isMounted}
      {...props}
    >
      <SwitchThumb className="grid place-content-center">
        <AccessibleIcon.Root label={themeIconLabel}>
          <ThemeIcon
            size={16} // spacing.4 (1rem)
            className={cn({ "animate-spin": !isMounted })}
          />
        </AccessibleIcon.Root>
      </SwitchThumb>
    </SwitchRoot>
  );
};
