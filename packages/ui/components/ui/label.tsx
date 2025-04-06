"use client";

import type { ComponentPropsWithRef } from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const labelVariants = cva([
  "text-sm/none font-medium",
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
]);

export type LabelProps = ComponentPropsWithRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

export const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    className={twMerge(labelVariants({ className }))}
    {...props}
  />
);
