import React from "react";
import type { PostStatus } from "../types/posts.types";

interface PostStatusBadgeProps {
  status: PostStatus;
}

const STATUS_CONFIG: Record<PostStatus, { label: string; className: string }> = {
  draft: {
    label: "Bản nháp",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  scheduled: {
    label: "Đã lên lịch",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  published: {
    label: "Đã xuất bản",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    className: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${config.className}`}
    >
      <span className="size-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {config.label}
    </span>
  );
}
