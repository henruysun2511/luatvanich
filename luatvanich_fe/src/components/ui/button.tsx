import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground font-semibold shadow hover:bg-accent/90",
        // BIẾN THỂ HOÀNG GIA VẠN ÍCH
        royal:
          "rounded-none bg-gradient-to-b from-[#c4252c] to-[#8f1218] text-white font-sans font-semibold uppercase tracking-[1.4px] shadow-[0_8px_20px_rgba(163,23,30,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] hover:from-[#d12d34] hover:to-[#a3171e] hover:gap-3",
        gold:
          "rounded-none bg-gradient-to-b from-[#f0d28a] via-[#c29a45] to-[#b08736] text-[#06122b] font-sans font-semibold uppercase tracking-[1.4px] shadow-[0_6px_18px_rgba(194,154,69,0.35),inset_0_1px_0_rgba(255,255,255,0.4)] hover:opacity-95 hover:gap-3",
        "royal-outline":
          "rounded-none border-2 border-[#a3171e] text-[#a3171e] font-sans font-semibold uppercase tracking-wider hover:bg-[#a3171e] hover:text-white transition-all",
        "gold-outline":
          "rounded-none border border-[#c29a45] text-[#c29a45] font-sans font-semibold uppercase tracking-wider hover:bg-[#c29a45]/10 transition-all",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
