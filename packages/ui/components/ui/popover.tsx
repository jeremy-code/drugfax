"use client";

import { Popover as PopoverPrimitive } from "radix-ui";
import type { ComponentPropsWithRef } from "react";

import { cn } from "@drugfax/ui/utils";

export const { Root: Popover, Trigger: PopoverTrigger } = PopoverPrimitive;

export const PopoverContent = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        "radix-state-closed:animate-out radix-state-closed:fade-out-0 radix-state-open:animate-in radix-state-open:fade-in-0",
        "radix-side-bottom:slide-in-from-top-2 radix-side-left:slide-in-from-right-2 radix-side-right:slide-in-from-left-2 radix-side-top:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
