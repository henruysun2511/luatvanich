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
  PracticeAreaListTable,
  PracticeAreaDetailDialog,
  PracticeAreaFormDialog,
  DeletePracticeAreaDialog,
  useAdminPracticeAreas,
  type PracticeAreaItem,
  type PracticeAreaStatus,
} from "@/features/practice-areas";
import { Scale, Plus, Search, RotateCcw } from "lucide-react";

export default function PracticeAreasManagementPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [isFeatured, setIsFeatured] = useState<string>("all");

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [areaToEdit, setAreaToEdit] = useState<PracticeAreaItem | null>(null);
  const [areaToDelete, setAreaToDelete] = useState<PracticeAreaItem | null>(null);
  const [areaToView, setAreaToView] = useState<PracticeAreaItem | null>(null);

  // Fetch data
  const queryParams = {
    page,
    limit,
    q: search.trim() || undefined,
    status: status !== "all" ? (status as PracticeAreaStatus) : undefined,
    isFeatured: isFeatured === "true" ? true : isFeatured === "false" ? false : undefined,
  };

  const { data, isLoading } = useAdminPracticeAreas(queryParams);
  const practiceAreas = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const handleOpenCreate = () => {
    setAreaToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: PracticeAreaItem) => {
    setAreaToEdit(item);
    setIsFormOpen(true);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setIsFeatured("all");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Scale className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-foreground leading-tight">
              Quản lý lĩnh vực chuyên môn
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Danh mục lĩnh vực pháp lý trọng điểm để phân nhóm các dịch vụ tư vấn của Luật Vạn Ích.
            </p>
          </div>
        </div>

        <Button onClick={handleOpenCreate} className="gap-2 shrink-0">
          <Plus className="size-4" />
          Thêm mới lĩnh vực
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-card p-3 rounded-lg border border-border shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên lĩnh vực..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-44">
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
        <div className="w-full sm:w-44">
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
        {(search || status !== "all" || isFeatured !== "all") && (
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

      {/* Table List */}
      <PracticeAreaListTable
        practiceAreas={practiceAreas}
        isLoading={isLoading}
        onViewDetail={setAreaToView}
        onEdit={handleOpenEdit}
        onDelete={(item) => setAreaToDelete(item)}
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
          itemLabel="lĩnh vực"
        />
      )}

      {/* Detail Dialog */}
      <PracticeAreaDetailDialog
        open={Boolean(areaToView)}
        onOpenChange={(open) => !open && setAreaToView(null)}
        area={areaToView}
        onEdit={() => {
          if (areaToView) {
            handleOpenEdit(areaToView);
          }
        }}
      />

      {/* Form Dialog: Create & Edit */}
      <PracticeAreaFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        practiceAreaToEdit={areaToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeletePracticeAreaDialog
        open={Boolean(areaToDelete)}
        onOpenChange={(open) => !open && setAreaToDelete(null)}
        practiceArea={areaToDelete}
      />
    </div>
  );
}
