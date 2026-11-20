"use client";

import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedValue } from "@/hooks/useDebounce";
import {
  FILTER_ALL_VALUE,
  LEGAL_PRACTICE_AREAS,
  SERVICE_STATUS_BADGES,
} from "../constants/service.constants";
import type {
  ServiceFilterCriteria,
  ServicePublishStatus,
} from "../types/service.types";

interface ServiceFiltersProps {
  filters: ServiceFilterCriteria;
  hasActiveFilters: boolean;
  onFilterChange: (patch: Partial<ServiceFilterCriteria>) => void;
  onResetFilters: () => void;
}

export function ServiceFilters({
  filters,
  hasActiveFilters,
  onFilterChange,
  onResetFilters,
}: ServiceFiltersProps) {
  const [keywordInput, setKeywordInput] = useState(filters.searchTerm ?? "");
  const debouncedKeyword = useDebouncedValue(keywordInput, 350);

  // Sync 2 chiều từ URL ngược lại state local khi bấm reset hoặc Back trình duyệt (Cải tiến đã sửa từ review)
  useEffect(() => {
    setKeywordInput(filters.searchTerm ?? "");
  }, [filters.searchTerm]);

  useEffect(() => {
    const trimmed = debouncedKeyword.trim();
    if (trimmed !== (filters.searchTerm ?? "")) {
      onFilterChange({ searchTerm: trimmed || undefined });
    }
  }, [debouncedKeyword, filters.searchTerm, onFilterChange]);

  const handleManualReset = () => {
    setKeywordInput("");
    onResetFilters();
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Ô tìm kiếm */}
      <div className="relative flex-1 sm:w-64 sm:flex-none">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="Tìm theo tên dịch vụ, mã..."
          className="pl-9 h-9"
        />
      </div>

      {/* Lọc theo lĩnh vực */}
      <Select
        value={filters.practiceArea ?? FILTER_ALL_VALUE}
        onValueChange={(val) =>
          onFilterChange({
            practiceArea: val === FILTER_ALL_VALUE ? undefined : val,
          })
        }
      >
        <SelectTrigger className="w-full sm:w-48 h-9">
          <SelectValue placeholder="Lĩnh vực pháp lý" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FILTER_ALL_VALUE}>Tất cả lĩnh vực</SelectItem>
          {LEGAL_PRACTICE_AREAS.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Lọc theo trạng thái */}
      <Select
        value={filters.status ?? FILTER_ALL_VALUE}
        onValueChange={(val) =>
          onFilterChange({
            status:
              val === FILTER_ALL_VALUE
                ? undefined
                : (val as ServicePublishStatus),
          })
        }
      >
        <SelectTrigger className="w-full sm:w-40 h-9">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FILTER_ALL_VALUE}>Tất cả trạng thái</SelectItem>
          {SERVICE_STATUS_BADGES.map((badge) => (
            <SelectItem key={badge.value} value={badge.value}>
              {badge.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={handleManualReset} className="h-9">
          <X className="size-3.5 mr-1" /> Xóa bộ lọc
        </Button>
      )}
    </div>
  );
}
