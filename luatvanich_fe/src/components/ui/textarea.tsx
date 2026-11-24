import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-none border border-[#e7dcc3] bg-white px-3 py-2 text-xs shadow-2xs placeholder:text-[#7f8aa6] focus-visible:outline-none focus-visible:border-[#c29a45] focus-visible:ring-1 focus-visible:ring-[#c29a45]/30 disabled:cursor-not-allowed disabled:opacity-50 text-[#06122b]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
