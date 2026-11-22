import { SESSION_INDICATOR_COOKIE } from "../constants/auth.constants";

export function setSessionCookie() {
  if (typeof document === "undefined") return;
  // Cookie có hiệu lực 7 ngày cho Next.js Middleware
  document.cookie = `${SESSION_INDICATOR_COOKIE}=1; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
}

export function clearSessionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_INDICATOR_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}
