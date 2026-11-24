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
        "flex flex-col sm:flex-row items-center justify-between gap-3 px-3 py-3.5 text-xs text-muted-foreground bg-white rounded-lg border border-[#e7dcc3] shadow-sm",
        className,
      )}
    >
      {/* Thông tin số lượng bản ghi */}
      <div className="select-none font-sans">
        Hiển thị <span className="font-semibold text-[#06122b]">{startItem}</span> -{" "}
        <span className="font-semibold text-[#06122b]">{endItem}</span> trên tổng số{" "}
        <span className="font-semibold text-[#06122b]">{total}</span> {itemLabel}
      </div>

      <div className="flex items-center gap-3">
        {/* Chọn số dòng trên mỗi trang (nếu có onLimitChange) */}
        {onLimitChange && (
          <div className="flex items-center gap-1.5 select-none font-sans">
            <span>Hiển thị:</span>
            <Select
              value={limit.toString()}
              onValueChange={(val) => onLimitChange(Number(val))}
            >
              <SelectTrigger className="h-8 w-18 text-xs border-[#e7dcc3] focus:border-[#c29a45] bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()} className="text-xs">
                    {size} / trang
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Cụm nút điều hướng trang */}
        <div className="flex items-center gap-1">
          {showFirstLast && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[#e7dcc3] hover:bg-[#fbf7ee] text-[#06122b] disabled:opacity-40"
              onClick={() => onPageChange(1)}
              disabled={!hasPrev}
              title="Trang đầu"
            >
              <ChevronsLeft className="size-3.5" />
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-[#e7dcc3] hover:bg-[#fbf7ee] text-[#06122b] disabled:opacity-40"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev}
            title="Trang trước"
          >
            <ChevronLeft className="size-3.5" />
          </Button>

          {/* Hiển thị số trang hiện tại */}
          <div className="px-2.5 py-1 text-xs font-semibold bg-[#06122b] text-[#f0d28a] rounded border border-[#c29a45]/50 select-none shadow-xs">
            Trang {page} / {totalPages || 1}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-[#e7dcc3] hover:bg-[#fbf7ee] text-[#06122b] disabled:opacity-40"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext}
            title="Trang tiếp"
          >
            <ChevronRight className="size-3.5" />
          </Button>

          {showFirstLast && (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[#e7dcc3] hover:bg-[#fbf7ee] text-[#06122b] disabled:opacity-40"
              onClick={() => onPageChange(totalPages)}
              disabled={!hasNext}
              title="Trang cuối"
            >
              <ChevronsRight className="size-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
