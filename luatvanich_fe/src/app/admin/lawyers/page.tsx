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
  LawyerListTable,
  LawyerDetailDialog,
  LawyerFormDialog,
  DeleteLawyerDialog,
  useAdminLawyers,
  type LawyerItem,
  type LawyerTeamGroup,
  type LawyerStatus,
} from "@/features/lawyers";
import { useAdminOffices } from "@/features/offices";
import { useAdminPracticeAreas } from "@/features/practice-areas";
import { Users, Plus, Search, RotateCcw } from "lucide-react";

export default function LawyersManagementPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [teamGroup, setTeamGroup] = useState<string>("all");
  const [officeId, setOfficeId] = useState<string>("all");
  const [practiceAreaId, setPracticeAreaId] = useState<string>("all");
  const [isFeatured, setIsFeatured] = useState<string>("all");

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [lawyerToEdit, setLawyerToEdit] = useState<LawyerItem | null>(null);
  const [lawyerToDelete, setLawyerToDelete] = useState<LawyerItem | null>(null);
  const [lawyerToView, setLawyerToView] = useState<LawyerItem | null>(null);

  // Danh sách Văn phòng & Lĩnh vực phục vụ bộ lọc
  const { data: officesData } = useAdminOffices({ limit: 100 });
  const offices = officesData?.items || [];

  const { data: areasData } = useAdminPracticeAreas({ limit: 100 });
  const practiceAreas = areasData?.items || [];

  // Query Params
  const queryParams = {
    page,
    limit,
    q: search.trim() || undefined,
    status: status !== "all" ? (status as LawyerStatus) : undefined,
    teamGroup: teamGroup !== "all" ? (teamGroup as LawyerTeamGroup) : undefined,
    officeId: officeId !== "all" ? officeId : undefined,
    practiceAreaId: practiceAreaId !== "all" ? practiceAreaId : undefined,
    isFeatured: isFeatured === "true" ? true : isFeatured === "false" ? false : undefined,
  };

  const { data, isLoading } = useAdminLawyers(queryParams);
  const lawyers = data?.items || [];
  const pagination = data?.pagination;

  const handleOpenCreate = () => {
    setLawyerToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: LawyerItem) => {
    setLawyerToEdit(item);
    setIsFormOpen(true);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setTeamGroup("all");
    setOfficeId("all");
    setPracticeAreaId("all");
    setIsFeatured("all");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#e7dcc3]">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-[#06122b]/10 text-[#06122b] flex items-center justify-center shrink-0">
            <Users className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-royal text-[#06122b] leading-tight">
              Quản lý đội ngũ luật sư & chuyên gia
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 font-sans">
              Hồ sơ lý lịch, học vấn, kinh nghiệm và mạng lưới liên hệ của luật sư Vạn Ích{" "}
              <span className="font-hanzi text-[#c29a45] font-semibold hidden md:inline">
                &bull; 律师团队
              </span>
            </p>
          </div>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="gap-2 shrink-0 bg-[#06122b] hover:bg-[#11244d] text-[#f0d28a] border border-[#c29a45]/40 text-xs font-semibold h-9 px-4 shadow-sm"
        >
          <Plus className="size-4 text-[#f0d28a]" />
          Thêm hồ sơ luật sư
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 rounded-lg border border-[#e7dcc3] shadow-xs flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên, email, chức danh..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Team Group Filter */}
        <div className="w-full sm:w-44">
          <Select
            value={teamGroup}
            onValueChange={(val) => {
              setTeamGroup(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Phân nhóm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả phân nhóm</SelectItem>
              <SelectItem value="core_leadership">Ban Lãnh đạo</SelectItem>
              <SelectItem value="chinese_team">LS Trung Quốc</SelectItem>
              <SelectItem value="vietnamese_team">LS Việt Nam</SelectItem>
              <SelectItem value="senior_advisor">Cố vấn cao cấp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Office Filter */}
        <div className="w-full sm:w-48">
          <Select
            value={officeId}
            onValueChange={(val) => {
              setOfficeId(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Văn phòng" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả văn phòng</SelectItem>
              {offices.map((office) => {
                const name =
                  office.translations?.find((t) => t.languageCode === "vi")?.name ||
                  office.code;
                return (
                  <SelectItem key={office.id} value={office.id}>
                    {name} ({office.code})
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
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
                const name =
                  pa.translations?.find((t) => t.languageCode === "vi")?.name ||
                  "Chưa đặt tên";
                return (
                  <SelectItem key={pa.id} value={pa.id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-36">
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
              <SelectItem value="published">Công khai</SelectItem>
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
              <SelectValue placeholder="Nổi bật" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Nổi bật: Tất cả</SelectItem>
              <SelectItem value="true">Tiêu biểu</SelectItem>
              <SelectItem value="false">Thường</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Filters */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetFilters}
          className="h-9 px-3 gap-1.5 text-xs text-muted-foreground hover:text-foreground shrink-0"
        >
          <RotateCcw className="size-3.5" />
          Đặt lại
        </Button>
      </div>

      {/* Main Table */}
      <LawyerListTable
        lawyers={lawyers}
        isLoading={isLoading}
        onViewDetail={setLawyerToView}
        onEdit={handleOpenEdit}
        onDelete={(item) => setLawyerToDelete(item)}
      />

      {/* Pagination Bar */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          pagination={pagination}
          onPageChange={(p) => setPage(p)}
          onLimitChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
        />
      )}

      {/* Modal Xem chi tiết Hồ sơ */}
      <LawyerDetailDialog
        open={Boolean(lawyerToView)}
        onOpenChange={(open) => !open && setLawyerToView(null)}
        lawyerId={lawyerToView?.id}
        onEdit={() => {
          if (lawyerToView) {
            handleOpenEdit(lawyerToView);
          }
        }}
      />

      {/* Modal Thêm / Chỉnh sửa */}
      <LawyerFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setLawyerToEdit(null);
        }}
        lawyerToEdit={lawyerToEdit}
      />

      {/* Modal Xác nhận Xóa */}
      <DeleteLawyerDialog
        open={!!lawyerToDelete}
        onOpenChange={(open) => {
          if (!open) setLawyerToDelete(null);
        }}
        lawyer={lawyerToDelete}
      />
    </div>
  );
}
