import { QueryClient } from "@tanstack/react-query";
import { LawFirmApiError } from "./axios";

export function initializeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (attempt, err) => {
          if (
            err instanceof LawFirmApiError &&
            err.statusCode &&
            err.statusCode >= 400 &&
            err.statusCode < 500
          ) {
            return false;
          }
          return attempt < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}

let activeBrowserQueryClient: QueryClient | undefined;

export function getSharedQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    return initializeQueryClient();
  }
  if (!activeBrowserQueryClient) {
    activeBrowserQueryClient = initializeQueryClient();
  }
  return activeBrowserQueryClient;
}
