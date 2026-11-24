import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatReadableDate(dateString: string, locale = "vi-VN"): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
  }).format(new Date(dateString));
}

export const formatDate = formatReadableDate;

export function scrollToAnchor(
  e: React.MouseEvent<HTMLElement> | null,
  targetId: string,
): boolean {
  if (typeof document === "undefined") return false;
  const el = document.getElementById(targetId);
  if (el) {
    if (e) e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${targetId}`);
    return true;
  }
  return false;
}

