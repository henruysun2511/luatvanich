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
  ConsultationListTable,
  ConsultationDetailDialog,
  DeleteConsultationDialog,
  useAdminConsultations,
  type ConsultationItem,
  type LeadStatus,
  type ContactChannel,
} from "@/features/consultations";
import { useAdminPracticeAreas } from "@/features/practice-areas";
import { useAdminLawyers } from "@/features/lawyers";
import {
  MessageSquareText,
  Search,
  RotateCcw,
  AlertCircle,
  Clock,
  CheckCircle2,
  Ban,
} from "lucide-react";

export default function ConsultationsManagementPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [contactChannel, setContactChannel] = useState<string>("all");
  const [practiceAreaId, setPracticeAreaId] = useState<string>("all");
  const [lawyerId, setLawyerId] = useState<string>("all");

  // Dialog states
  const [viewingItem, setViewingItem] = useState<ConsultationItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<ConsultationItem | null>(null);

  // Dữ liệu cho các dropdown bộ lọc
  const { data: areasData } = useAdminPracticeAreas({ limit: 100 });
  const practiceAreas = areasData?.items || [];

  const { data: lawyersData } = useAdminLawyers({ limit: 100 });
  const lawyers = lawyersData?.items || [];

  // Query Params
  const queryParams = {
    page,
    limit,
    q: search.trim() || undefined,
    status: status !== "all" ? (status as LeadStatus) : undefined,
    contactChannel: contactChannel !== "all" ? (contactChannel as ContactChannel) : undefined,
    practiceAreaId: practiceAreaId !== "all" ? practiceAreaId : undefined,
    lawyerId: lawyerId !== "all" ? lawyerId : undefined,
  };

  const { data, isLoading } = useAdminConsultations(queryParams);
  const consultations = data?.items || [];
  const pagination = data?.pagination;

  const handleResetFilters = () => {
    setSearch("");
    setStatus("all");
    setContactChannel("all");
    setPracticeAreaId("all");
    setLawyerId("all");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <MessageSquareText className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-foreground leading-tight">
              Quản lý yêu cầu tư vấn & Leads
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tiếp nhận, phân loại và theo dõi tiến trình tư vấn khách hàng doanh nghiệp & cá nhân.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-card p-3 rounded-lg border border-border shadow-sm flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Tìm theo tên khách, SĐT, email, nội dung..."
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
              <SelectValue placeholder="Trạng thái lead" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="new">
                <span className="flex items-center gap-1.5 text-red-600">
                  <AlertCircle className="size-3.5" /> Mới tiếp nhận
                </span>
              </SelectItem>
              <SelectItem value="in_progress">
                <span className="flex items-center gap-1.5 text-blue-600">
                  <Clock className="size-3.5" /> Đang xử lý
                </span>
              </SelectItem>
              <SelectItem value="done">
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="size-3.5" /> Đã tư vấn
                </span>
              </SelectItem>
              <SelectItem value="spam">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Ban className="size-3.5" /> Tin rác / Spam
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contact Channel Filter */}
        <div className="w-full sm:w-40">
          <Select
            value={contactChannel}
            onValueChange={(val) => {
              setContactChannel(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Kênh liên hệ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả kênh</SelectItem>
              <SelectItem value="phone">Điện thoại</SelectItem>
              <SelectItem value="zalo">Zalo</SelectItem>
              <SelectItem value="wechat">WeChat</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Practice Area Filter */}
        <div className="w-full sm:w-44">
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

        {/* Lawyer Filter */}
        <div className="w-full sm:w-44">
          <Select
            value={lawyerId}
            onValueChange={(val) => {
              setLawyerId(val);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-9 text-xs">
              <SelectValue placeholder="Luật sư chỉ định" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả luật sư</SelectItem>
              {lawyers.map((l) => {
                const name =
                  l.translations?.find((t) => t.languageCode === "vi")?.fullName ||
                  "Chưa đặt tên";
                return (
                  <SelectItem key={l.id} value={l.id}>
                    {name}
                  </SelectItem>
                );
              })}
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
      <ConsultationListTable
        consultations={consultations}
        isLoading={isLoading}
        onViewDetail={(item) => setViewingItem(item)}
        onDelete={(item) => setDeletingItem(item)}
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

      {/* Modal Chi tiết Lead & Ghi chú nội bộ */}
      <ConsultationDetailDialog
        open={!!viewingItem}
        onOpenChange={(open) => {
          if (!open) setViewingItem(null);
        }}
        consultationId={viewingItem?.id}
      />

      {/* Modal Xác nhận Xóa */}
      <DeleteConsultationDialog
        open={!!deletingItem}
        onOpenChange={(open) => {
          if (!open) setDeletingItem(null);
        }}
        consultation={deletingItem}
      />
    </div>
  );
}
