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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface PaginationProps {
  pagination?: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  pageSizeOptions?: number[];
  itemLabel?: string;
  showFirstLast?: boolean;
  className?: string;
}

export function Pagination({
  pagination,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [10, 20, 50],
  itemLabel = "bản ghi",
  showFirstLast = true,
  className,
}: PaginationProps) {
  if (!pagination || pagination.total === 0) return null;

  const { page, limit, total, totalPages } = pagination;
  const hasPrev = pagination.hasPrev ?? page > 1;
  const hasNext = pagination.hasNext ?? page < totalPages;

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-3 text-xs text-muted-foreground",
        className,
      )}
    >
      {/* Thông tin số lượng bản ghi */}
      <div className="select-none">
        Hiển thị <span className="font-semibold text-foreground">{startItem}</span> -{" "}
        <span className="font-semibold text-foreground">{endItem}</span> trên tổng số{" "}
        <span className="font-semibold text-foreground">{total}</span> {itemLabel}
      </div>

      <div className="flex items-center gap-3">
        {/* Chọn số dòng trên mỗi trang (nếu có onLimitChange) */}
        {onLimitChange && (
          <div className="flex items-center gap-1.5 select-none">
            <span>Hiển thị:</span>
            <Select
              value={limit.toString()}
              onValueChange={(val) => onLimitChange(Number(val))}
            >
              <SelectTrigger className="h-8 w-18 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()} className="text-xs">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Nút điều hướng trang */}
        <div className="flex items-center gap-1">
          {showFirstLast && (
            <Button
              variant="outline"
              size="icon"
              className="size-8 hidden sm:inline-flex"
              onClick={() => onPageChange(1)}
              disabled={page <= 1}
              aria-label="Về trang đầu"
              title="Về trang đầu"
            >
              <ChevronsLeft className="size-4" />
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev}
            aria-label="Trang trước"
            title="Trang trước"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <span className="px-2 font-medium text-foreground select-none">
            {page} / {totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext}
            aria-label="Trang sau"
            title="Trang sau"
          >
            <ChevronRight className="size-4" />
          </Button>

          {showFirstLast && (
            <Button
              variant="outline"
              size="icon"
              className="size-8 hidden sm:inline-flex"
              onClick={() => onPageChange(totalPages)}
              disabled={page >= totalPages}
              aria-label="Đến trang cuối"
              title="Đến trang cuối"
            >
              <ChevronsRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
