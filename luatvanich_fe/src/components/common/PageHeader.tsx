import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e7dcc3]",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="size-10 rounded-none bg-[#06122b] text-[#f0d28a] flex items-center justify-center shrink-0 border border-[#c29a45]/40 shadow-xs">
            <Icon className="size-5" />
          </div>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-royal text-[#06122b] tracking-wide leading-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs text-[#718096] mt-0.5 font-sans">
              {description}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          {actions}
        </div>
      )}
    </div>
  );
}
