import React from "react";
import { cn } from "@/lib/utils";

interface SealStampProps {
  char?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "gold" | "red" | "navy" | "outline";
  className?: string;
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: "w-8 h-8 text-base",
  md: "w-10 h-10 text-xl",
  lg: "w-12 h-12 text-2xl",
  xl: "w-16 h-16 text-3xl",
};

const variantClasses = {
  gold: "border-[1.5px] border-[#c29a45] text-[#f0d28a] bg-[#0b1d3f]",
  red: "border-[1.5px] border-[#c29a45] text-[#f0d28a] bg-[#a3171e]",
  navy: "border-[1.5px] border-[#c29a45] text-[#f0d28a] bg-[#06122b]",
  outline: "border-[1.5px] border-[#c29a45] text-[#c29a45] bg-transparent",
};

export function SealStamp({
  char = "万",
  size = "md",
  variant = "gold",
  className,
  children,
}: SealStampProps) {
  return (
    <span
      className={cn(
        "seal-stamp shrink-0",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {children || char}
    </span>
  );
}
