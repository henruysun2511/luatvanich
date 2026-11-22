import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ROLE_CONFIG } from "../constants/roles.constants";

interface RoleBadgeProps {
  role: string;
  roleName?: string;
  className?: string;
}

export function RoleBadge({ role, roleName, className }: RoleBadgeProps) {
  const code = (role || "").toLowerCase();
  const config = ROLE_CONFIG[code] || {
    label: roleName || role,
    badgeClass: "bg-muted text-muted-foreground border-border",
  };

  return (
    <Badge
      variant="outline"
      className={cn("px-2 py-0.5 text-[11px] font-medium border", config.badgeClass, className)}
    >
      {config.label}
    </Badge>
  );
}
