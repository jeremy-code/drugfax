import type { PrimitivePropsWithRef } from "@radix-ui/react-primitive";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@reclaim/ui/utils";

export const Card = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
};

export const CardHeader = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
};

export const CardTitle = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"h3">) => {
  const Comp = asChild ? Slot : "h1";

  return (
    <Comp
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
};

export const CardDescription = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"p">) => {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

export const CardContent = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot : "div";

  return <Comp className={cn("p-6 pt-0", className)} {...props} />;
};

export const CardFooter = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
};
