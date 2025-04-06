import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Slot, AccessibleIcon } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import type { ReactNode } from "react";

import { cn } from "@reclaim/ui/utils";

export const Breadcrumb = ({
  asChild,
  ...props
}: PrimitivePropsWithRef<"nav">) => {
  const Comp = asChild ? Slot.Root : "nav";

  return <Comp aria-label="breadcrumb" {...props} />;
};

export const BreadcrumbList = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"ol">) => {
  const Comp = asChild ? Slot.Root : "ol";

  return (
    <Comp
      className={cn(
        "flex items-center gap-1.5 break-words text-sm/5 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};

export const BreadcrumbItem = ({
  asChild,
  className,
  separator,
  ...props
}: PrimitivePropsWithRef<"li"> & { separator?: ReactNode }) => {
  const Comp = asChild ? Slot.Root : "li";
  const Separator = separator === undefined ? ChevronRight : Slot.Root;

  return (
    <>
      <Comp className={cn("inline-flex items-center", className)} {...props} />
      <li className="text-muted-foreground/80 last:hidden">
        <Separator className="size-3.5">
          <Slot.Slottable>{separator}</Slot.Slottable>
        </Separator>
      </li>
    </>
  );
};

export const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"a">) => {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      className={cn(
        "inline-flex items-center gap-2 rounded-sm text-muted-foreground no-underline outline-0 transition-[color,background-color,box-shadow]",
        "hover:text-gray-700 dark:hover:text-gray-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
};

export const BreadcrumbCurrentLink = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"span">) => {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      role="link"
      aria-current="page"
      className={cn("text-foreground", className)}
      {...props}
    />
  );
};

export const BreadcrumbEllipsis = ({
  className,
  asChild,
  children,
  ...props
}: PrimitivePropsWithRef<"span">) => {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <AccessibleIcon.Root label="more">
        <MoreHorizontal className="size-4" />
      </AccessibleIcon.Root>
      <Slot.Slottable>{children}</Slot.Slottable>
    </Comp>
  );
};
