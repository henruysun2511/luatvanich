"use client";

import React, { useEffect, useState } from "react";
import { Plus, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractErrorMessage } from "@/lib/axios";
import { useServiceFilter } from "../hooks/useServiceFilter";
import { useLegalServices } from "../queries/useServiceQuery";
import type {
  LegalServiceItem,
  ServiceSortField,
} from "../types/service.types";
import { ServiceFilters } from "./ServiceFilters";
import { ServiceTable } from "./ServiceTable";
import { ServicePagination } from "./ServicePagination";
import { ServiceFormDialog } from "./ServiceFormDialog";
import { DeleteServiceDialog } from "./DeleteServiceDialog";

export function ServiceList() {
  const { filters, setFilters, setPage, resetFilters, hasActiveFilters } =
    useServiceFilter();
  const { data, isLoading, isFetching, isError, error, refetch } =
    useLegalServices(filters);

  const [formDialogState, setFormDialogState] = useState<{
    open: boolean;
    service: LegalServiceItem | null;
  }>({
    open: false,
    service: null,
  });

  const [deleteDialogTarget, setDeleteDialogTarget] =
    useState<LegalServiceItem | null>(null);

  const serviceItems = data?.data ?? [];
  const metaInfo = data?.meta;

  // Tự động lùi về trang trước nếu xóa hết item ở trang cuối (Cải tiến tinh tế từ sample)
  useEffect(() => {
    if (metaInfo && serviceItems.length === 0 && (filters.page ?? 1) > 1) {
      setPage(Math.max(1, metaInfo.totalPages));
    }
  }, [metaInfo, serviceItems.length, filters.page, setPage]);

  const handleSortCycle = (field: ServiceSortField) => {
    if (filters.sortField !== field) {
      return setFilters({ sortField: field, sortDirection: "asc" });
    }
    if (filters.sortDirection === "asc") {
      return setFilters({ sortField: field, sortDirection: "desc" });
    }
    setFilters({ sortField: undefined, sortDirection: undefined });
  };

  const isListEmpty = !isLoading && !isError && serviceItems.length === 0;

  return (
    <section className="space-y-4">
      {/* Thanh công cụ: Bộ lọc & Nút tạo */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <ServiceFilters
          filters={filters}
          hasActiveFilters={hasActiveFilters}
          onFilterChange={setFilters}
          onResetFilters={resetFilters}
        />
        <Button
          onClick={() => setFormDialogState({ open: true, service: null })}
          variant="accent"
          size="sm"
          className="shrink-0"
        >
          <Plus className="size-4 mr-1" /> Thêm dịch vụ
        </Button>
      </div>

      {/* Hiển thị lỗi */}
      {isError ? (
        <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-md text-center space-y-3 bg-card">
          <p className="font-semibold text-destructive">
            Không thể tải danh sách dịch vụ pháp lý
          </p>
          <p className="text-xs text-muted-foreground">
            {extractErrorMessage(error)}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCcw className="size-3.5 mr-1" /> Thử lại
          </Button>
        </div>
      ) : isListEmpty ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-md text-center space-y-3 bg-card">
          <p className="font-semibold text-foreground">
            {hasActiveFilters
              ? "Không tìm thấy dịch vụ nào khớp với bộ lọc"
              : "Chưa có dịch vụ pháp lý nào"}
          </p>
          <p className="text-xs text-muted-foreground">
            {hasActiveFilters
              ? "Hãy thử tìm kiếm từ khóa khác hoặc xóa bộ lọc."
              : "Bấm nút 'Thêm dịch vụ' để bắt đầu tạo nội dung."}
          </p>
          {hasActiveFilters ? (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Xóa bộ lọc
            </Button>
          ) : (
            <Button
              variant="accent"
              size="sm"
              onClick={() => setFormDialogState({ open: true, service: null })}
            >
              Thêm dịch vụ đầu tiên
            </Button>
          )}
        </div>
      ) : (
        <div className={isFetching && !isLoading ? "opacity-60 transition-opacity" : ""}>
          <ServiceTable
            items={serviceItems}
            isLoading={isLoading}
            skeletonCount={filters.limit}
            sortField={filters.sortField}
            sortDirection={filters.sortDirection}
            onSortChange={handleSortCycle}
            onEditItem={(svc) => setFormDialogState({ open: true, service: svc })}
            onDeleteItem={(svc) => setDeleteDialogTarget(svc)}
          />
        </div>
      )}

      {/* Phân trang */}
      {metaInfo && !isError && !isListEmpty && (
        <ServicePagination
          meta={metaInfo}
          onPageChange={setPage}
          onPageSizeChange={(newLimit) => setFilters({ limit: newLimit })}
        />
      )}

      {/* Dialogs */}
      <ServiceFormDialog
        isOpen={formDialogState.open}
        selectedService={formDialogState.service}
        onDismiss={() => setFormDialogState((s) => ({ ...s, open: false }))}
      />

      <DeleteServiceDialog
        targetService={deleteDialogTarget}
        onDismiss={() => setDeleteDialogTarget(null)}
      />
    </section>
  );
}
