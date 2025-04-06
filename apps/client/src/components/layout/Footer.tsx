import type { ComponentPropsWithRef } from "react";
import { cn } from "@drugfax/ui/utils";
import { Link } from "@drugfax/ui/components/ui/link";

export const Footer = ({
  className,
  ...props
}: ComponentPropsWithRef<"footer">) => {
  return (
    <footer
      className={cn("grid place-content-center border-t", className)}
      {...props}
    >
      <div className="container py-4">
        <p>
          {"Made with ❤️ by "}
          <Link href="https://github.com/jeremy-code">Jeremy</Link>
        </p>
      </div>
    </footer>
  );
};
