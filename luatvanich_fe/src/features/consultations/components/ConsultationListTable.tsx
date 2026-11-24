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
  useUpdateConsultationStatus,
  useBulkStatusConsultations,
  useAssignConsultation,
} from "../queries/useConsultationsQuery";
import { useUsers } from "@/features/users";
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
  Building,
  User,
  UserCheck,
  Scale,
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
  const statusMutation = useUpdateConsultationStatus();
  const bulkMutation = useBulkStatusConsultations();
  const assignMutation = useAssignConsultation();
  const { data: usersData } = useUsers({ limit: 100, isActive: true });
  const users = usersData?.items || [];

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<string | null>(null);
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

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    setUpdatingId(id);
    try {
      await statusMutation.mutateAsync({ id, status });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAssignUser = async (id: string, assignedUserId: string | null) => {
    setAssigningId(id);
    try {
      await assignMutation.mutateAsync({ id, assignedUserId });
    } finally {
      setAssigningId(null);
    }
  };

  const handleBulkAction = async (status: LeadStatus) => {
    if (selectedIds.length === 0) return;
    await bulkMutation.mutateAsync({ ids: selectedIds, status });
    setSelectedIds([]);
  };

  if (isLoading && consultations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-card rounded-lg border border-border">
        <Loader2 className="size-6 animate-spin mb-2" />
        <span className="text-sm">Đang tải danh sách yêu cầu tư vấn...</span>
      </div>
    );
  }

  if (!isLoading && consultations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-muted-foreground bg-card rounded-lg border border-border">
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
        <div className="flex items-center justify-between p-2.5 px-4 bg-muted/60 border border-border rounded-lg text-xs transition-all">
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
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-10 text-center">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  aria-label="Chọn tất cả"
                />
              </TableHead>
              <TableHead className="w-56">Khách hàng</TableHead>
              <TableHead className="w-52">Kênh liên hệ</TableHead>
              <TableHead>Nhu cầu tư vấn</TableHead>
              <TableHead className="w-44">Lĩnh vực / Luật sư</TableHead>
              <TableHead className="w-40 text-center">Trạng thái</TableHead>
              <TableHead className="w-24 text-right pr-4">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.map((item) => {
              const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.new;
              const StatusIcon = statusCfg.icon;
              const channelCfg = CHANNEL_CONFIG[item.contactChannel] || CHANNEL_CONFIG.phone;
              const ChannelIcon = channelCfg.icon;
              const isSelected = selectedIds.includes(item.id);
              const isUpdating = updatingId === item.id;

              return (
                <TableRow
                  key={item.id}
                  className={`hover:bg-muted/30 transition-colors ${
                    isSelected ? "bg-primary/5" : ""
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

                  {/* 2. Khách hàng */}
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

                      {item.companyName && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Building className="size-3 shrink-0" />
                          <span className="truncate max-w-[180px]">{item.companyName}</span>
                        </span>
                      )}

                      <span className="text-[11px] text-muted-foreground font-mono">
                        {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </TableCell>

                  {/* 3. Kênh liên hệ */}
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-foreground">
                        <Phone className="size-3.5 text-muted-foreground shrink-0" />
                        <span className="font-mono">{item.phone}</span>
                      </div>

                      {item.email && (
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Mail className="size-3.5 shrink-0" />
                          <span className="truncate max-w-[170px]">{item.email}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-[11px]">
                        <ChannelIcon className={`size-3 shrink-0 ${channelCfg.color}`} />
                        <span className="text-muted-foreground">Ưu tiên:</span>
                        <strong className="text-foreground font-medium">
                          {channelCfg.label}
                          {item.contactChannelId ? ` (${item.contactChannelId})` : ""}
                        </strong>
                      </div>
                    </div>
                  </TableCell>

                  {/* 4. Nhu cầu tư vấn */}
                  <TableCell>
                    <div className="flex flex-col gap-1 max-w-sm">
                      {item.title && (
                        <span className="font-medium text-xs text-foreground line-clamp-1">
                          {item.title}
                        </span>
                      )}
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.content}
                      </p>
                      {item.preferredContactTime && (
                        <span className="text-[10px] text-muted-foreground/80 flex items-center gap-1">
                          <Clock className="size-2.5" />
                          Giờ tiện liên hệ: {item.preferredContactTime}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* 5. Lĩnh vực / Luật sư */}
                  <TableCell>
                    <div className="flex flex-col gap-1 text-xs">
                      {item.practiceAreaName ? (
                        <Badge variant="outline" className="w-fit text-[11px] gap-1 font-normal py-0">
                          <Scale className="size-3 text-primary shrink-0" />
                          <span className="truncate max-w-[130px]">{item.practiceAreaName}</span>
                        </Badge>
                      ) : (
                        <span className="text-[11px] text-muted-foreground/60 italic">
                          Chưa chọn lĩnh vực
                        </span>
                      )}

                      {item.lawyerName && (
                        <div className="flex items-center gap-1 text-[11px] text-foreground font-medium">
                          <User className="size-3 text-muted-foreground shrink-0" />
                          <span className="truncate max-w-[130px]">LS: {item.lawyerName}</span>
                        </div>
                      )}

                      {/* Dropdown phân công nhanh người phụ trách */}
                      <div className="flex items-center gap-1 mt-0.5">
                        <UserCheck className="size-3 text-primary shrink-0" />
                        <Select
                          value={item.assignedUserId || "unassigned"}
                          onValueChange={(val) =>
                            handleAssignUser(item.id, val === "unassigned" ? null : val)
                          }
                          disabled={assignMutation.isPending && assigningId === item.id}
                        >
                          <SelectTrigger className="h-5 text-[10px] px-1.5 py-0 border-dashed border-border/70 hover:border-border max-w-[140px] bg-muted/30">
                            <SelectValue placeholder="Chưa phân công" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unassigned" className="text-xs">
                              -- Chưa phân công --
                            </SelectItem>
                            {users.map((u) => (
                              <SelectItem key={u.id} value={u.id} className="text-xs">
                                {u.fullName || u.email}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TableCell>

                  {/* 6. Trạng thái */}
                  <TableCell className="text-center">
                    <Select
                      value={item.status}
                      onValueChange={(val) => handleStatusChange(item.id, val as LeadStatus)}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="h-8 text-xs justify-between gap-1 w-36 mx-auto">
                        <div className="flex items-center gap-1.5 truncate">
                          <StatusIcon className="size-3.5 shrink-0" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
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
                  </TableCell>

                  {/* 7. Thao tác */}
                  <TableCell className="text-right pr-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:text-foreground"
                        title="Xem chi tiết & Ghi chú"
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
