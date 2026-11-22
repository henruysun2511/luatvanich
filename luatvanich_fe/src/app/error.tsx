"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-6xl font-serif font-bold text-destructive">500</h1>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Đã có lỗi xảy ra
        </h2>
        <p className="text-muted-foreground text-sm">
          Hệ thống gặp sự cố trong quá trình xử lý yêu cầu. Vui lòng thử lại.
        </p>
        <div className="pt-2">
          <Button onClick={() => reset()}>Thử lại</Button>
        </div>
      </div>
    </div>
  );
}
