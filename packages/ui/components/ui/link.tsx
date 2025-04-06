import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { Slot } from "radix-ui";
import { ExternalLink } from "lucide-react";

import { cn } from "@drugfax/ui/utils";

export type LinkProps = {
  /**
   * Opens link in new tab and adds an {@link ExternalLink} icon.
   */
  isExternal?: boolean;
} & PrimitivePropsWithRef<"a">;

export const Link = ({
  asChild,
  className,
  isExternal,
  children,
  ...props
}: LinkProps) => {
  const Comp = asChild ? Slot.Root : "a";

  return (
    <Comp
      className={cn(
        "inline-flex items-center gap-1 transition-colors [transition-behavior:allow-discrete]",
        "decoration-[color:hsl(from_currentcolor_h_s_l/80%)] decoration-from-font underline-offset-1 hover:underline",
        className,
      )}
      // target="_blank" implies rel="noopener": https://caniuse.com/mdn-html_elements_a_implicit_noopener
      {...(isExternal && { target: "_blank" })}
      {...props}
    >
      <Slot.Slottable>{children}</Slot.Slottable>
      {isExternal && <ExternalLink className="size-[1em]" />}
    </Comp>
  );
};
