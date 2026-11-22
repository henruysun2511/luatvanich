"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationMeta } from "../types/users.types";

interface UserPaginationProps {
  pagination?: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function UserPagination({
  pagination,
  onPageChange,
  onLimitChange,
}: UserPaginationProps) {
  if (!pagination) return null;

  const { page, limit, total, totalPages, hasNext, hasPrev } = pagination;
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-3 text-xs text-muted-foreground">
      {/* Thông tin số lượng */}
      <div>
        Hiển thị <span className="font-semibold text-foreground">{startItem}</span> -{" "}
        <span className="font-semibold text-foreground">{endItem}</span> trên tổng số{" "}
        <span className="font-semibold text-foreground">{total}</span> tài khoản
      </div>

      <div className="flex items-center gap-3">
        {/* Chọn số dòng trên trang */}
        <div className="flex items-center gap-1.5">
          <span>Hiển thị:</span>
          <Select
            value={limit.toString()}
            onValueChange={(val) => onLimitChange(Number(val))}
          >
            <SelectTrigger className="h-8 w-18 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50].map((size) => (
                <SelectItem key={size} value={size.toString()} className="text-xs">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Nút lùi/tiến trang */}
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev}
            aria-label="Trang trước"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <span className="px-2 font-medium text-foreground">
            {page} / {totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext}
            aria-label="Trang tiếp theo"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
