import type { ComponentPropsWithRef } from "react";
import {
  Accordion as AccordionPrimitive,
  AccessibleIcon,
  Slot,
} from "radix-ui";
import { ChevronDown } from "lucide-react";

import { cn } from "@drugfax/ui/utils";

export const Accordion = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Root>) => (
  <AccordionPrimitive.Root
    className={cn("max-w-screen-sm rounded-md border", className)}
    {...props}
  />
);

export const AccordionItem = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Item>) => (
  <AccordionPrimitive.Item
    className={cn("overflow-hidden border-b", className)}
    {...props}
  />
);

export const AccordionTrigger = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>) => (
  <AccordionPrimitive.Header className="flex max-w-[unset]">
    <AccordionPrimitive.Trigger
      className={cn(
        "group flex flex-1 items-center justify-between px-5 py-4 text-sm font-medium transition-colors hover:bg-muted/50 ",
        "radix-disabled:cursor-not-allowed radix-disabled:opacity-50 radix-disabled:hover:bg-transparent",
        className,
      )}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      <AccessibleIcon.Root label="Expand">
        <ChevronDown className="size-4 text-muted-foreground transition-transform group-radix-state-open:rotate-180" />
      </AccessibleIcon.Root>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

export const AccordionContent = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Content>) => (
  <AccordionPrimitive.Content
    className="overflow-hidden bg-muted text-sm radix-state-closed:animate-accordion-up radix-state-open:animate-accordion-down"
    {...props}
  >
    <div className={cn("px-5 py-4", className)}>
      <Slot.Slottable>{children}</Slot.Slottable>
    </div>
  </AccordionPrimitive.Content>
);
