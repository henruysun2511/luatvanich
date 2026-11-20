"use client";

import React, { type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { getSharedQueryClient } from "@/lib/query-client";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const activeQueryClient = getSharedQueryClient();

  return (
    <QueryClientProvider client={activeQueryClient}>
      <TooltipProvider delayDuration={150}>
        {children}
      </TooltipProvider>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  );
}
