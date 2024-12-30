import type { ComponentPropsWithRef } from "react";

import { cn } from "@reclaim/ui/utils";

export type InputProps = ComponentPropsWithRef<"input">;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-opacity",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-1",
        "disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50",
        "invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
};
