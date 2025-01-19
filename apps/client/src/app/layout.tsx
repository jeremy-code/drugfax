import "@reclaim/ui/globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AppProvider } from "./_components/AppProvider";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  metadataBase: new URL("https://reclaim.sh"),
  title: { default: "Reclaim", template: "%s | Reclaim" },
  description:
    "Reclaim is a tool to help you get the most out of your health insurance.",
  applicationName: "Reclaim",
  authors: { name: "Jeremy Nguyen", url: "https://jeremy.ng" },
  keywords: ["reclaim", "health", "denial", "insurance"],
  referrer: "origin-when-cross-origin",
  creator: "Jeremy Nguyen",
  publisher: "Reclaim",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    /**
     * @remarks
     * `suppressHydrationWarning` is necessary since `<html>` element must be
     * updated by `next-themes` for dark mode. The property only applies one
     * level deep, so hydration warnings won't be blocked on children elements.
     *
     * @see {@link https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors}
     */
    <html suppressHydrationWarning className={lexend.variable} lang="en">
      <body>
        <AppProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
