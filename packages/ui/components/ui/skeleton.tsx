import type { ComponentPropsWithRef } from "react";

import { cn } from "@reclaim/ui/utils";

export const Skeleton = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-muted", className)}
      {...props}
    />
  );
};
