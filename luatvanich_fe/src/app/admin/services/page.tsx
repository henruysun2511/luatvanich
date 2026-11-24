"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/common";
import {
  ServiceTable,
  ServiceDetailDialog,
  ServiceFormDialog,
  DeleteServiceDialog,
  useAdminLegalServices,
  type LegalServiceItem,
  type ServicePublishStatus,
} from "@/features/legal-services";
import { useAdminPracticeAreas } from "@/features/practice-areas";
import { Briefcase, Plus, Search, RotateCcw } from "lucide-react";

export default function ServicesManagementPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [practiceAreaId, setPracticeAreaId] = useState<string>("all");
  const [isFeatured, setIsFeatured] = useState<string>("all");

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<LegalServiceItem | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<LegalServiceItem | null>(null);
  const [serviceToView, setServiceToView] = useState<LegalServiceItem | null>(null);

  // Lấy danh sách lĩnh vực cho dropdown bộ lọc
  const { data: areasData } = useAdminPracticeAreas({ limit: 100 });
  const practiceAreas = areasData?.items || [];

  // Fetch Services
  const queryParams = {
    page,
    limit,
    q: search.trim() || undefined,
    status: status !== "all" ? (status as ServicePublishStatus) : undefined,
    practiceAreaId: practiceAreaId !== "all" ? practiceAreaId : undefined,
    isFeatured: isFeatured === "true" ? true : isFeatured === "false" ? false : undefined,
  };

  const { data, isLoading } = useAdminLegalServices(queryParams);
  const services = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const handleOpenCreate = () => {
    setServiceToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: LegalServiceItem) => {
    setServiceToEdit(item);
    setIsFormOpen(true);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setPracticeAreaId("all");
    setIsFeatured("all");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Briefcase className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-foreground leading-tight">
              Quản lý dịch vụ pháp lý
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Danh mục các gói tư vấn chuyên sâu của Hãng luật Vạn Ích (Việt Nam & Trung Quốc).
            </p>
          </div>
        </div>

        <Button onClick={handleOpenCreate} className="gap-2 shrink-0">
          <Plus className="size-4" />
          Thêm mới dịch vụ
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-card p-3 rounded-lg border border-border shadow-sm flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên dịch vụ..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Practice Area Filter */}
        <div className="w-full sm:w-48">
          <Select
            value={practiceAreaId}
            onValueChange={(val) => {
              setPracticeAreaId(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Lĩnh vực" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả lĩnh vực</SelectItem>
              {practiceAreas.map((pa) => {
                const viName =
                  pa.translations?.find((t) => t.languageCode === "vi")?.name ||
                  "Chưa đặt tên";
                return (
                  <SelectItem key={pa.id} value={pa.id}>
                    {viName}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-40">
          <Select
            value={status}
            onValueChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="published">Đã xuất bản (Công khai)</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Filter */}
        <div className="w-full sm:w-36">
          <Select
            value={isFeatured}
            onValueChange={(val) => {
              setIsFeatured(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Tiêu điểm nổi bật" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="true">Chỉ mục nổi bật</SelectItem>
              <SelectItem value="false">Không nổi bật</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        {(search || status !== "all" || practiceAreaId !== "all" || isFeatured !== "all") && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="h-9 px-3 text-xs gap-1.5 shrink-0"
          >
            <RotateCcw className="size-3.5" />
            Đặt lại
          </Button>
        )}
      </div>

      {/* Table */}
      <ServiceTable
        services={services}
        isLoading={isLoading}
        onViewDetail={setServiceToView}
        onEdit={handleOpenEdit}
        onDelete={(item) => setServiceToDelete(item)}
      />

      {/* Pagination */}
      {total > 0 && (
        <Pagination
          pagination={{ page, limit, total, totalPages }}
          onPageChange={setPage}
          onLimitChange={(newLimit: number) => {
            setLimit(newLimit);
            setPage(1);
          }}
          pageSizeOptions={[10, 20, 50]}
          itemLabel="dịch vụ"
        />
      )}

      {/* Detail Dialog */}
      <ServiceDetailDialog
        open={Boolean(serviceToView)}
        onOpenChange={(open) => !open && setServiceToView(null)}
        serviceId={serviceToView?.id}
        onEdit={() => {
          if (serviceToView) {
            handleOpenEdit(serviceToView);
          }
        }}
      />

      {/* Form Dialog: Create & Edit */}
      <ServiceFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        serviceToEdit={serviceToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteServiceDialog
        open={Boolean(serviceToDelete)}
        onOpenChange={(open) => !open && setServiceToDelete(null)}
        service={serviceToDelete}
      />
    </div>
  );
}
