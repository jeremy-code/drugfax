import type { ComponentPropsWithRef } from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { Check, Minus } from "lucide-react";

import { cn } from "@drugfax/ui/utils";

export const Checkbox = ({
  className,
  ...props
}: Omit<ComponentPropsWithRef<typeof CheckboxPrimitive.Root>, "children">) => (
  <CheckboxPrimitive.Root
    className={cn(
      "flex size-4 appearance-none items-center justify-center rounded border bg-background shadow outline-none transition-colors hover:bg-muted",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "radix-state-checked:border-primary radix-state-checked:bg-primary radix-state-checked:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="group">
      <Minus className="hidden size-3 group-radix-state-indeterminate:block" />
      <Check className="hidden size-3 group-radix-state-checked:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);
