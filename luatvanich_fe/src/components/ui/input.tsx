import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-none border border-[#e7dcc3] bg-white px-3 py-1 text-xs shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-[#7f8aa6] focus-visible:outline-none focus-visible:border-[#c29a45] focus-visible:ring-1 focus-visible:ring-[#c29a45]/30 disabled:cursor-not-allowed disabled:opacity-50 text-[#06122b]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
