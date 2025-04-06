import "@drugfax/ui/globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import { AppProvider } from "./_components/AppProvider";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  metadataBase: new URL("https://drugfax.io"),
  title: { default: "DrugFax", template: "%s | DrugFax" },
  description:
    "DrugFax is a tool to help you get the most out of your health insurance.",
  applicationName: "DrugFax",
  authors: { name: "Jeremy Nguyen", url: "https://jeremy.ng" },
  keywords: ["drugfax", "health", "denial", "insurance"],
  referrer: "origin-when-cross-origin",
  creator: "Jeremy Nguyen",
  publisher: "DrugFax",
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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
