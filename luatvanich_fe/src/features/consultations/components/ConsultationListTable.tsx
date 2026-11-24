"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useBulkStatusConsultations,
} from "../queries/useConsultationsQuery";
import type {
  ConsultationItem,
  LeadStatus,
  ContactChannel,
} from "../types/consultations.types";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Eye,
  Trash2,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Ban,
  Loader2,
} from "lucide-react";

interface ConsultationListTableProps {
  consultations: ConsultationItem[];
  isLoading: boolean;
  onViewDetail: (item: ConsultationItem) => void;
  onDelete: (item: ConsultationItem) => void;
}

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; color: string; icon: React.ElementType }
> = {
  new: {
    label: "Mới tiếp nhận",
    color: "bg-red-500/10 text-red-600 border-red-500/30 dark:bg-red-950/30 dark:text-red-400",
    icon: AlertCircle,
  },
  in_progress: {
    label: "Đang xử lý",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:bg-blue-950/30 dark:text-blue-400",
    icon: Clock,
  },
  done: {
    label: "Đã tư vấn",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  spam: {
    label: "Tin rác / Spam",
    color: "bg-muted text-muted-foreground border-border",
    icon: Ban,
  },
};

const CHANNEL_CONFIG: Record<
  ContactChannel,
  { label: string; icon: React.ElementType; color: string }
> = {
  phone: { label: "Gọi điện", icon: Phone, color: "text-blue-600 dark:text-blue-400" },
  email: { label: "Email", icon: Mail, color: "text-amber-600 dark:text-amber-400" },
  zalo: { label: "Zalo", icon: MessageSquare, color: "text-sky-600 dark:text-sky-400" },
  wechat: { label: "WeChat", icon: MessageSquare, color: "text-emerald-600 dark:text-emerald-400" },
};

export function ConsultationListTable({
  consultations,
  isLoading,
  onViewDetail,
  onDelete,
}: ConsultationListTableProps) {
  const bulkMutation = useBulkStatusConsultations();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Chọn / bỏ chọn tất cả
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(consultations.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleBulkAction = async (status: LeadStatus) => {
    if (selectedIds.length === 0) return;
    await bulkMutation.mutateAsync({ ids: selectedIds, status });
    setSelectedIds([]);
  };

  if (isLoading && consultations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-card rounded-none border border-border">
        <Loader2 className="size-6 animate-spin mb-2" />
        <span className="text-sm">Đang tải danh sách yêu cầu tư vấn...</span>
      </div>
    );
  }

  if (!isLoading && consultations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-card rounded-none border border-border">
        <MessageSquare className="size-8 mb-2 opacity-50" />
        <span className="text-sm font-medium">Chưa có yêu cầu tư vấn nào</span>
        <span className="text-xs text-muted-foreground mt-1">
          Các yêu cầu do khách gửi qua website sẽ hiển thị tại đây.
        </span>
      </div>
    );
  }

  const isAllSelected =
    consultations.length > 0 && selectedIds.length === consultations.length;

  return (
    <div className="space-y-3">
      {/* Thanh Thao tác hàng loạt (Bulk Actions Bar) */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-2.5 px-4 bg-muted/60 border border-border rounded-none text-xs transition-all">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">
              Đã chọn {selectedIds.length} yêu cầu
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs gap-1 border-blue-500/30 text-blue-600 hover:bg-blue-50"
              onClick={() => handleBulkAction("in_progress")}
              disabled={bulkMutation.isPending}
            >
              <Clock className="size-3.5" />
              Chuyển Đang xử lý
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs gap-1 border-emerald-500/30 text-emerald-600 hover:bg-emerald-50"
              onClick={() => handleBulkAction("done")}
              disabled={bulkMutation.isPending}
            >
              <CheckCircle2 className="size-3.5" />
              Đánh dấu Đã tư vấn
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="h-8 text-xs gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => handleBulkAction("spam")}
              disabled={bulkMutation.isPending}
            >
              <Ban className="size-3.5" />
              Đánh dấu Spam
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs text-muted-foreground"
              onClick={() => setSelectedIds([])}
            >
              Bỏ chọn
            </Button>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="rounded-none overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Chọn tất cả"
                />
              </TableHead>
              <TableHead className="min-w-[170px]">Khách hàng</TableHead>
              <TableHead className="w-32">Kênh liên hệ</TableHead>
              <TableHead className="min-w-[200px]">Nhu cầu tư vấn</TableHead>
              <TableHead className="w-36">Phụ trách</TableHead>
              <TableHead className="w-28">Ngày gửi</TableHead>
              <TableHead className="w-36 text-center">Trạng thái</TableHead>
              <TableHead className="w-20 text-right pr-4">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.map((item) => {
              const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.new;
              const StatusIcon = statusCfg.icon;
              const channelCfg = CHANNEL_CONFIG[item.contactChannel] || CHANNEL_CONFIG.phone;
              const ChannelIcon = channelCfg.icon;
              const isSelected = selectedIds.includes(item.id);

              return (
                <TableRow
                  key={item.id}
                  className={`hover:bg-muted/30 transition-colors ${isSelected ? "bg-primary/5" : ""
                    }`}
                >
                  {/* 1. Checkbox */}
                  <TableCell className="text-center">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectRow(item.id, !!checked)}
                      aria-label={`Chọn ${item.fullName}`}
                    />
                  </TableCell>

                  {/* 2. Khách hàng (Tên + SĐT) */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                        {item.fullName}
                        {item.attachments && item.attachments.length > 0 && (
                          <span
                            title={`Có ${item.attachments.length} tệp tài liệu đính kèm`}
                            className="inline-flex items-center text-muted-foreground hover:text-foreground"
                          >
                            <Paperclip className="size-3 text-primary" />
                          </span>
                        )}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {item.phone}
                      </span>
                    </div>
                  </TableCell>

                  {/* 3. Kênh liên hệ */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-xs font-normal gap-1.5 px-2 py-0.5 w-fit"
                    >
                      <ChannelIcon className={`size-3 shrink-0 ${channelCfg.color}`} />
                      <span>{channelCfg.label}</span>
                    </Badge>
                  </TableCell>

                  {/* 4. Nhu cầu tư vấn (Lĩnh vực + Tóm tắt) */}
                  <TableCell>
                    <div className="flex flex-col gap-0.5 max-w-sm">
                      <span className="font-medium text-xs text-foreground truncate">
                        {item.practiceAreaName || item.title || "Yêu cầu tư vấn"}
                      </span>
                      <p className="text-xs text-muted-foreground line-clamp-1 truncate">
                        {item.content}
                      </p>
                    </div>
                  </TableCell>

                  {/* 5. Phụ trách */}
                  <TableCell>
                    {item.assignedUserName ? (
                      <span className="text-xs font-medium text-foreground">
                        {item.assignedUserName}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/60 italic">
                        Chưa phân công
                      </span>
                    )}
                  </TableCell>

                  {/* 6. Ngày gửi */}
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </TableCell>

                  {/* 7. Trạng thái */}
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={`text-xs gap-1 py-0.5 px-2 font-medium ${statusCfg.color}`}
                    >
                      <StatusIcon className="size-3 shrink-0" />
                      {statusCfg.label}
                    </Badge>
                  </TableCell>

                  {/* 8. Thao tác */}
                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-foreground"
                        title="Xem chi tiết & Xử lý hồ sơ"
                        onClick={() => onViewDetail(item)}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Xóa yêu cầu"
                        onClick={() => onDelete(item)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
