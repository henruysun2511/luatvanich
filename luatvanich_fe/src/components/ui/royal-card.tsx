import React from "react";
import { cn } from "@/lib/utils";

interface RoyalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  withCorners?: boolean;
  withTopBorder?: boolean;
}

export function RoyalCard({
  children,
  className,
  withCorners = false,
  withTopBorder = true,
  ...props
}: RoyalCardProps) {
  return (
    <div
      className={cn(
        "relative bg-gradient-to-b from-white to-[#fffaf0] border border-[#e7dcc3] p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-[#c29a45]",
        withCorners && "corner-accents",
        withTopBorder &&
          "before:content-[''] before:absolute before:-top-px before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-[#c29a45] before:to-[#a3171e]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
