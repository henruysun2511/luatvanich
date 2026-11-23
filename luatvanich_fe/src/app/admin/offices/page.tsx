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
  OfficeListTable,
  OfficeFormDialog,
  DeleteOfficeDialog,
  useAdminOffices,
  type OfficeItem,
  type OfficeStatus,
} from "@/features/offices";
import { Building2, Plus, Search, RotateCcw } from "lucide-react";

export default function OfficesManagementPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [isHq, setIsHq] = useState<string>("all");

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [officeToEdit, setOfficeToEdit] = useState<OfficeItem | null>(null);
  const [officeToDelete, setOfficeToDelete] = useState<OfficeItem | null>(null);

  // Fetch offices
  const queryParams = {
    page,
    limit,
    q: search.trim() || undefined,
    status: status !== "all" ? (status as OfficeStatus) : undefined,
    isHeadquarters: isHq === "true" ? true : isHq === "false" ? false : undefined,
  };

  const { data, isLoading } = useAdminOffices(queryParams);
  const offices = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit) || 1;

  const handleOpenCreate = () => {
    setOfficeToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (office: OfficeItem) => {
    setOfficeToEdit(office);
    setIsFormOpen(true);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setIsHq("all");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Building2 className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-foreground leading-tight">
              Quản lý văn phòng đại diện
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Danh sách trụ sở chính, chi nhánh và văn phòng liên lạc tại Việt Nam & Trung Quốc.
            </p>
          </div>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="gap-2 shrink-0 self-start sm:self-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="size-4" />
          Thêm văn phòng
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-card p-3 rounded-lg border border-border">
        <div className="flex flex-1 flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên, địa chỉ, mã..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <Select
            value={status}
            onValueChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[150px] h-9 text-xs">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="published">Đã xuất bản (Công khai)</SelectItem>
              <SelectItem value="draft">Bản nháp</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={isHq}
            onValueChange={(val) => {
              setIsHq(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[150px] h-9 text-xs">
              <SelectValue placeholder="Loại văn phòng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="true">Trụ sở chính</SelectItem>
              <SelectItem value="false">Chi nhánh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(search || status !== "all" || isHq !== "all") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground gap-1.5"
          >
            <RotateCcw className="size-3.5" />
            Đặt lại
          </Button>
        )}
      </div>

      {/* Office Table */}
      <OfficeListTable
        offices={offices}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={(office) => setOfficeToDelete(office)}
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
          itemLabel="văn phòng"
        />
      )}

      {/* Modal Form: Create / Edit */}
      <OfficeFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        officeToEdit={officeToEdit}
      />

      {/* Dialog Confirm Delete */}
      <DeleteOfficeDialog
        open={Boolean(officeToDelete)}
        onOpenChange={(open) => !open && setOfficeToDelete(null)}
        office={officeToDelete}
      />
    </div>
  );
}
