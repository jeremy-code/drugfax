import type { ComponentPropsWithRef } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { Separator } from "@drugfax/ui/components/ui/separator";
import { cn } from "@drugfax/ui/utils";

export const Command = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn(
      "w-full max-w-screen-sm overflow-hidden rounded-xl border bg-popover pt-2 text-popover-foreground",
      className,
    )}
    {...props}
  />
);

export const CommandInput = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.Input>) => {
  return (
    <div
      className="flex h-12 items-center gap-2 border-b px-2 pb-2"
      // eslint-disable-next-line react/no-unknown-property
      cmdk-input-wrapper=""
    >
      <Search className="size-5" />
      <CommandPrimitive.Input
        className={cn(
          "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export const CommandList = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    className={cn(
      "h-[min(theme(space.80),var(--cmdk-list-height)+1rem)] max-h-96 overflow-auto overscroll-contain p-2 transition-size",
      "[&>[cmdk-list-sizer]>:not([hidden])+[cmdk-group]]:mt-2", // Every group except the first (and CommandEmpty) have a top margin
      className,
    )}
    {...props}
  />
);

export const CommandEmpty = (
  props: ComponentPropsWithRef<typeof CommandPrimitive.Empty>,
) => <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />;

export const CommandGroup = ({
  heading,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    heading={<CommandHeading>{heading}</CommandHeading>}
    {...props}
  />
);

export const CommandHeading = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<"div">) => (
  <div
    // eslint-disable-next-line react/no-unknown-property
    cmdk-group-heading=""
    className={cn(
      "mb-2 flex select-none items-center px-2 text-xs text-muted-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export const CommandSeparator = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.Separator>) => (
  <Separator asChild>
    <CommandPrimitive.Separator
      className={cn("my-4 bg-muted", className)}
      {...props}
    />
  </Separator>
);

export const CommandItem = ({
  className,
  children,
  shortcut,
  ...props
}: ComponentPropsWithRef<typeof CommandPrimitive.Item> & {
  shortcut?: string;
}) => (
  <CommandPrimitive.Item
    className={cn(
      "flex h-12 cursor-pointer select-none items-center gap-2 rounded-lg px-4 transition-[none_150ms_ease]",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
      "active:transition-colors",
      "[&+[cmdk-item]]:mt-1",
      "[&_svg]:size-4",
      className,
    )}
    {...props}
  >
    {children}
    {!!shortcut && (
      // eslint-disable-next-line react/no-unknown-property
      <div className="ml-auto flex gap-2" cmdk-item-shortcuts="">
        {shortcut.split(" ").map((key) => (
          <CommandShortcut key={key}>{key}</CommandShortcut>
        ))}
      </div>
    )}
  </CommandPrimitive.Item>
);

export const CommandShortcut = ({
  className,
  ...props
}: ComponentPropsWithRef<"kbd">) => {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded bg-gray-200 p-1 text-xs uppercase text-gray-900 dark:bg-gray-900 dark:text-gray-200",
        className,
      )}
      {...props}
    />
  );
};
