import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import type { ComponentPropsWithRef } from "react";

import { cn } from "@reclaim/ui/utils";

export const ScrollArea = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>) => (
  <ScrollAreaPrimitive.Root
    className={cn("overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

export const ScrollBar = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    className={cn(
      "flex touch-none select-none bg-muted/50 p-0.5 transition-colors hover:bg-muted/80",
      "radix-orientation-vertical:w-2.5",
      "radix-orientation-horizontal:h-2.5 radix-orientation-horizontal:flex-col",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-[10px] bg-muted-foreground" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);
