import type { LucideIcon } from "lucide-react";

export interface NavigationLinkItem {
  path: string;
  title: string;
  icon?: LucideIcon;
  isExact?: boolean;
  requiredRoles?: string[];
  counterBadge?: number | string;
}
