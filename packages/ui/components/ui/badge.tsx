import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";

import { cn } from "@drugfax/ui/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export type BadgeProps = PrimitivePropsWithRef<"div"> &
  VariantProps<typeof badgeVariants>;

export const Badge = ({
  className,
  variant,
  asChild,
  ...props
}: BadgeProps) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp className={cn(badgeVariants({ variant, className }))} {...props} />
  );
};
