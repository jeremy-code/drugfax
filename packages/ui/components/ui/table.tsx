import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";

import { cn } from "@drugfax/ui/utils";

export const Table = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"table">) => {
  const Comp = asChild ? Slot.Root : "table";

  return (
    <div className="w-fit max-w-full overflow-x-auto whitespace-nowrap rounded-md border">
      <Comp
        className={cn(
          "relative table border-collapse text-left text-sm/6 transition-size",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export const TableBody = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"tbody">) => {
  const Comp = asChild ? Slot.Root : "tbody";

  return <Comp className={cn("table-row-group", className)} {...props} />;
};

export const TableCell = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"td">) => {
  const Comp = asChild ? Slot.Root : "td";

  return (
    <Comp
      className={cn(
        "relative table-cell border-b border-gray-300 px-4 py-3 dark:border-white/5",
        "transition-size",
        // "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
};

export const TableFooter = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"tfoot">) => {
  const Comp = asChild ? Slot.Root : "tfoot";

  <Comp
    className={cn(
      "table-footer-group border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />;
};

export const TableHeader = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"th">) => {
  const Comp = asChild ? Slot.Root : "th";

  return (
    <Comp
      className={cn(
        "border-b px-4 py-2 font-medium",
        // "pl-2 first:pl-4",
        "group last:pr-5",
        "transition-size",
        // "first:pl-2 last:pr-2 sm:first:pl-1 sm:last:pr-1",
        // "text-gray-500 dark:text-gray-400",
        // "border-b-gray-950/10 dark:border-b-white/10",
        // "border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.2))] last:pr-[var(--gutter,theme(spacing.2))] sm:first:pl-1 sm:last:pr-1 dark:border-b-white/10",
        // "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
};

export const TableHead = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"thead">) => {
  const Comp = asChild ? Slot.Root : "thead";

  return (
    <Comp
      className={cn(
        "table-header-group bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-400",
        className,
      )}
      {...props}
    />
  );
};

export const TableRow = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"tr">) => {
  const Comp = asChild ? Slot.Root : "tr";

  return (
    <Comp
      className={cn(
        "table-row align-middle text-inherit outline-0 transition-colors",
        "hover:bg-gray-950/[2.5%] dark:focus-within:bg-white/[2.5%] dark:hover:bg-white/[2.5%]",
        // "has-[[data-row-link][data-focus]]:outline has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500",
        // "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

export const TableCaption = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"caption">) => {
  const Comp = asChild ? Slot.Root : "caption";

  return (
    <Comp
      className={cn(
        "mt-4 table-caption caption-bottom text-sm/snug text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
