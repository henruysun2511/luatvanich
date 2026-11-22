import React, { Suspense } from "react";
import type { Metadata } from "next";
import { ServiceList } from "@/features/services";

export const metadata: Metadata = {
  title: "Quản lý Dịch vụ Pháp lý",
  description: "Danh sách và quản trị 12 chuyên mục dịch vụ của Luật Vạn Ích",
};

export default function AdminServicesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight">
          Dịch vụ Pháp lý
        </h1>
        <p className="text-xs text-muted-foreground">
          Quản lý danh sách, thứ tự hiển thị và nội dung các dịch vụ song ngữ Việt - Trung.
        </p>
      </div>

      <Suspense fallback={<div className="text-xs text-muted-foreground">Đang tải...</div>}>
        <ServiceList />
      </Suspense>
    </div>
  );
}
