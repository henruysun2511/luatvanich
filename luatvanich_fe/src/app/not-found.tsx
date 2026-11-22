import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-6xl font-serif font-bold text-primary">404</h1>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Trang không tồn tại
        </h2>
        <p className="text-muted-foreground text-sm">
          Đường dẫn bạn yêu cầu không tìm thấy hoặc đã được di chuyển.
        </p>
        <div className="pt-2">
          <Button asChild>
            <Link href="/">Quay về trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
