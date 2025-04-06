"use client";

import type { ComponentPropsWithRef } from "react";
import {
  NavigationMenu as NavigationMenuPrimitive,
  AccessibleIcon,
  Slot,
} from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@reclaim/ui/utils";

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenu = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root>) => (
  <NavigationMenuPrimitive.Root
    className={cn("relative z-10 flex grow justify-center", className)}
    {...props}
  >
    <Slot.Slottable>{children}</Slot.Slottable>
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
);

export const NavigationMenuList = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>) => (
  <NavigationMenuPrimitive.List
    className={cn("m-0 flex justify-center gap-4 rounded-md p-1", className)}
    {...props}
  >
    <Slot.Slottable>{children}</Slot.Slottable>
    <NavigationMenuIndicator />
  </NavigationMenuPrimitive.List>
);

export const navigationMenuTriggerVariants = cva(
  [
    "select-none rounded px-4 py-3 text-sm/none font-medium text-foreground outline-none transition-colors",
    "hover:bg-accent hover:text-accent-foreground",
    "focus:bg-accent focus:text-accent-foreground focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        link: "block text-sm/none no-underline",
        trigger: "group flex items-center justify-between gap-0.5",
      },
    },
    defaultVariants: { variant: "link" },
  },
);

export const NavigationMenuTrigger = ({
  className,
  children,
  variant = "trigger",
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger> &
  VariantProps<typeof navigationMenuTriggerVariants>) => {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(
        navigationMenuTriggerVariants({ className, variant }),
        "group",
      )}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <AccessibleIcon.Root label="Open menu">
        <ChevronDown className="relative top-px size-3 transition-transform duration-300 group-radix-state-open:rotate-180" />
      </AccessibleIcon.Root>
    </NavigationMenuPrimitive.Trigger>
  );
};

export const NavigationMenuLink = ({
  className,
  variant = "link",
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Link> &
  VariantProps<typeof navigationMenuTriggerVariants>) => (
  <NavigationMenuPrimitive.Link
    className={cn(navigationMenuTriggerVariants({ className, variant }))}
    {...props}
  />
);

export const NavigationMenuContent = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Content>) => (
  <NavigationMenuPrimitive.Content
    className={cn(
      "absolute left-0 top-0 w-full sm:w-auto",
      "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in",
      "data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out",
      "radix-motion-from-start:slide-in-from-left-52",
      "radix-motion-from-end:slide-in-from-right-52",
      "radix-motion-to-start:slide-out-to-left-52",
      "radix-motion-to-end:slide-out-to-right-52",
      className,
    )}
    {...props}
  />
);

export const NavigationMenuViewport = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Viewport>) => (
  <div className="absolute left-0 top-full flex w-full justify-center">
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "relative mt-2.5 w-full origin-[top_center] overflow-hidden rounded-md bg-popover transition-size",
        // Using `box-shadow` to simulate border, so it lines up with <NavigationMenuIndicator />'s arrow
        "shadow-[0_0_0_1px] shadow-border",
        "h-radix-navigation-menu-viewport sm:w-radix-navigation-menu-viewport",
        "radix-state-open:animate-in radix-state-open:fade-in radix-state-open:zoom-in-90",
        "radix-state-closed:animate-out radix-state-closed:fade-out radix-state-closed:zoom-out-90",
        className,
      )}
      {...props}
    />
  </div>
);

export const NavigationMenuIndicator = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof NavigationMenuPrimitive.Indicator>) => (
  <NavigationMenuPrimitive.Indicator
    className={cn(
      "top-full z-[1] flex h-2.5 items-end justify-center overflow-hidden transition-[width,transform]",
      "radix-state-visible:animate-in radix-state-visible:fade-in",
      "radix-state-hidden:animate-out radix-state-hidden:fade-out",
      // arrow indicator pseudo-element
      "after:relative after:top-1/2 after:size-2.5 after:rotate-45 after:rounded-tl-sm after:border after:bg-popover",
      className,
    )}
    {...props}
  />
);
