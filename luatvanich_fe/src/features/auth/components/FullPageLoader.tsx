import React from "react";
import { Loader2 } from "lucide-react";

export function FullPageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center gap-3 bg-muted/20"
    >
      <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
      <span className="text-sm font-medium text-muted-foreground">Đang xác thực hệ thống...</span>
    </div>
  );
}
