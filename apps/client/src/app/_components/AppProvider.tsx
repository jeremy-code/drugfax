"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000 } },
  });

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () =>
  isServer ? makeQueryClient() : (browserQueryClient ??= makeQueryClient());

/**
 * Provides global application context.
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};
