import React from "react";
import { PageLoader } from "@/components/common";

export function FullPageLoader({ message = "Đang xác thực hệ thống..." }: { message?: string }) {
  return <PageLoader message={message} fullscreen />;
}
