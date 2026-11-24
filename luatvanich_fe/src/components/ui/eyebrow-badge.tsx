import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowBadgeProps {
  hz?: string;
  text: string;
  variant?: "red" | "gold" | "tag";
  className?: string;
}

export function EyebrowBadge({
  hz,
  text,
  variant = "red",
  className,
}: EyebrowBadgeProps) {
  if (variant === "tag") {
    return (
      <div
        className={cn(
          "inline-block bg-gradient-to-r from-[#a3171e] to-[#7c1015] text-[#f0d28a] px-5 py-1.5 border border-[#f0d28a]/50 text-xs italic tracking-[1.5px] font-sans",
          className,
        )}
      >
        {hz && <b className="font-hanzi font-bold text-sm not-italic mr-2">{hz}</b>}
        {text}
      </div>
    );
  }

  const textColor = variant === "gold" ? "text-[#c29a45]" : "text-[#a3171e]";

  return (
    <div
      className={cn(
        "font-sans font-medium text-xs tracking-[3px] uppercase flex items-center gap-2",
        textColor,
        className,
      )}
    >
      {hz && (
        <b className="font-hanzi font-bold text-sm tracking-[4px]">{hz}</b>
      )}
      <span>{text}</span>
    </div>
  );
}
