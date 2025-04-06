"use client";

import type { ComponentPropsWithRef } from "react";
import { X } from "lucide-react";
import { AccessibleIcon, Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@drugfax/ui/utils";

export const {
  Root: Dialog,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
} = DialogPrimitive;

export const DialogOverlay = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Overlay>) => {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80 radix-state-closed:animate-out radix-state-closed:fade-out-0 radix-state-open:animate-in radix-state-open:fade-in-0",
        className,
      )}
      {...props}
    />
  );
};

export const DialogContent = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof DialogPrimitive.Content>) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 radix-state-closed:animate-out radix-state-closed:fade-out-0 radix-state-closed:zoom-out-95 radix-state-closed:slide-out-to-left-1/2 radix-state-closed:slide-out-to-top-[48%] radix-state-open:animate-in radix-state-open:fade-in-0 radix-state-open:zoom-in-95 radix-state-open:slide-in-from-left-1/2 radix-state-open:slide-in-from-top-[48%] sm:rounded-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none radix-state-open:bg-accent radix-state-open:text-muted-foreground">
          <AccessibleIcon.Root label="Close">
            <X className="size-4" />
          </AccessibleIcon.Root>
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

export const DialogHeader = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  );
};

export const DialogFooter = ({
  className,
  ...props
}: ComponentPropsWithRef<"div">) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className,
      )}
      {...props}
    />
  );
};

export const DialogTitle = ({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"h2">) => {
  return (
    <h2
      className={cn("text-lg/none font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  );
};

export const DialogDescription = ({
  className,
  ...props
}: ComponentPropsWithRef<"p">) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
};
