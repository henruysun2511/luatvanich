import { create } from "zustand";
import type { AuthStatus } from "../types/auth.types";

interface AuthState {
  accessToken: string | null;
  status: AuthStatus;
  setSession: (accessToken: string) => void;
  clearSession: () => void;
  setStatus: (status: AuthStatus) => void;
}

/**
 * Access token chỉ lưu trong RAM, không lưu localStorage/cookie để chống XSS.
 * Thông tin user nằm ở TanStack Query cache (useMe), không copy vào đây.
 */
export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  status: "loading",
  setSession: (accessToken) => set({ accessToken, status: "authenticated" }),
  clearSession: () => set({ accessToken: null, status: "unauthenticated" }),
  setStatus: (status) => set({ status }),
}));
