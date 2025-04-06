import { Separator as SeparatorPrimitive } from "radix-ui";
import type { ComponentPropsWithRef } from "react";

import { cn } from "@drugfax/ui/utils";

export const Separator = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof SeparatorPrimitive.Root>) => (
  <SeparatorPrimitive.Root
    className={cn(
      "bg-[hsl(var(--border))] radix-orientation-horizontal:h-px radix-orientation-horizontal:w-full radix-orientation-vertical:h-full radix-orientation-vertical:w-px",
      className,
    )}
    {...props}
  />
);
