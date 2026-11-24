import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-none",
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
        // BIẾN THỂ HOÀNG GIA VẠN ÍCH (ĐỎ CHU SA CHUẨN TRANG CHỦ)
        royal:
          "bg-[#b3201b] hover:bg-[#8f1713] text-white font-sans font-semibold shadow-xs transition-colors active:scale-[0.98]",
        gold:
          "bg-gradient-to-b from-[#f0d28a] via-[#c29a45] to-[#b08736] text-[#06122b] font-sans font-semibold shadow-xs hover:opacity-95 transition-all",
        "royal-outline":
          "border border-[#b3201b] text-[#b3201b] font-sans font-semibold hover:bg-[#b3201b] hover:text-white transition-all shadow-xs",
        "gold-outline":
          "border border-[#c29a45] text-[#c29a45] font-sans font-semibold hover:bg-[#c29a45]/10 transition-all shadow-xs",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8 text-sm",
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
