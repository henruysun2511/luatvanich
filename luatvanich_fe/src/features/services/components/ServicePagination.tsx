"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaginationInfo } from "@/types/api";
import { ALLOWED_PAGE_SIZES } from "../constants/service.constants";

interface ServicePaginationProps {
  meta: PaginationInfo;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newLimit: number) => void;
}

export function ServicePagination({
  meta,
  onPageChange,
  onPageSizeChange,
}: ServicePaginationProps) {
  const { page, limit, total, totalPages } = meta;
  const startRecord = total === 0 ? 0 : (page - 1) * limit + 1;
  const endRecord = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
      <p className="text-xs text-muted-foreground">
        Hiển thị {startRecord}–{endRecord} trên tổng số {total} dịch vụ
      </p>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Số dòng:</span>
          <Select
            value={String(limit)}
            onValueChange={(val) => onPageSizeChange(Number(val))}
          >
            <SelectTrigger className="w-18 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALLOWED_PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={String(size)} className="text-xs">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Trang trước"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <span className="text-xs tabular-nums px-2">
            Trang {page} / {Math.max(totalPages, 1)}
          </span>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            aria-label="Trang sau"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
