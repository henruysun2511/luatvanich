import Link from "next/link";
import { Briefcase, MessageSquareText, FileText, Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight">
            Bảng điều khiển Quản trị
          </h1>
          <p className="text-xs text-muted-foreground">
            Tổng quan tình trạng website, yêu cầu tư vấn mới và nội dung xuất bản.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="accent" size="sm" asChild>
            <Link href="/admin/services">
              <Plus className="size-4 mr-1" /> Thêm dịch vụ mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Thẻ thống kê 4 cột */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border p-4 rounded-md shadow-sm space-y-1">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-xs font-medium">Yêu cầu tư vấn mới</span>
            <MessageSquareText className="size-4 text-accent" />
          </div>
          <div className="text-2xl font-bold text-foreground">12</div>
          <span className="text-[11px] text-green-600 font-medium">+3 yêu cầu hôm nay</span>
        </div>

        <div className="bg-card border p-4 rounded-md shadow-sm space-y-1">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-xs font-medium">Dịch vụ pháp lý</span>
            <Briefcase className="size-4 text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">12</div>
          <span className="text-[11px] text-muted-foreground">Đang hiển thị công khai</span>
        </div>

        <div className="bg-card border p-4 rounded-md shadow-sm space-y-1">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-xs font-medium">Bài viết cẩm nang</span>
            <FileText className="size-4 text-secondary" />
          </div>
          <div className="text-2xl font-bold text-foreground">48</div>
          <span className="text-[11px] text-muted-foreground">Song ngữ Việt - Trung</span>
        </div>

        <div className="bg-card border p-4 rounded-md shadow-sm space-y-1">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="text-xs font-medium">Trang dựng bằng Puck</span>
            <Layers className="size-4 text-accent" />
          </div>
          <div className="text-2xl font-bold text-foreground">6</div>
          <span className="text-[11px] text-muted-foreground">Trang chủ, Giới thiệu, Landing</span>
        </div>
      </div>
    </div>
  );
}
