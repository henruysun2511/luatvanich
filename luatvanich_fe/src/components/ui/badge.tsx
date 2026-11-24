import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-none",
  {
    variants: {
      variant: {
        default:
          "border-[#06122b] bg-[#06122b] text-white shadow-xs",
        secondary:
          "border-[#e7dcc3] bg-[#fbf7ee] text-[#06122b]",
        destructive:
          "border-[#b3201b]/40 bg-[#b3201b]/10 text-[#b3201b] shadow-xs",
        outline:
          "border-[#e7dcc3] bg-white text-[#06122b]",
        accent:
          "border-transparent bg-accent text-accent-foreground font-bold",
        royal:
          "border-[#c29a45]/40 bg-[#06122b] text-[#f0d28a] shadow-xs",
        gold:
          "border-[#c29a45]/50 bg-[#fbf7ee] text-[#855e14]",
        emerald:
          "border-emerald-600/30 bg-emerald-50 text-emerald-800",
        amber:
          "border-amber-600/30 bg-amber-50 text-amber-800",
        vermilion:
          "border-[#b3201b]/40 bg-[#b3201b]/10 text-[#b3201b] font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
