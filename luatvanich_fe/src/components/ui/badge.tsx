import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-[#a3171e]/30 bg-[#a3171e]/10 text-[#a3171e] shadow-xs",
        outline: "text-foreground border-[#e7dcc3]",
        accent: "border-transparent bg-accent text-accent-foreground font-bold",
        royal: "border-[#c29a45]/40 bg-[#06122b] text-[#f0d28a] shadow-xs",
        gold: "border-[#c29a45]/50 bg-[#fbf7ee] text-[#855e14]",
        emerald: "border-emerald-300 bg-emerald-50 text-emerald-800",
        amber: "border-amber-300 bg-amber-50 text-amber-800",
        vermilion: "border-red-300 bg-red-50 text-[#a3171e]",
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
