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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useUpdateOfficeStatus } from "../queries/useOfficesQuery";
import type { OfficeItem } from "../types/offices.types";
import {
  Building2,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Loader2,
  QrCode,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface OfficeListTableProps {
  offices: OfficeItem[];
  isLoading: boolean;
  onEdit: (office: OfficeItem) => void;
  onDelete: (office: OfficeItem) => void;
}

export function OfficeListTable({
  offices,
  isLoading,
  onEdit,
  onDelete,
}: OfficeListTableProps) {
  const statusMutation = useUpdateOfficeStatus();
  const [loadingOfficeId, setLoadingOfficeId] = useState<string | null>(null);

  const handleToggleStatus = async (office: OfficeItem) => {
    const nextStatus = office.status === "published" ? "draft" : "published";
    setLoadingOfficeId(office.id);
    try {
      await statusMutation.mutateAsync({ id: office.id, status: nextStatus });
    } finally {
      setLoadingOfficeId(null);
    }
  };

  if (isLoading && offices.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Đang tải danh sách văn phòng...</span>
      </div>
    );
  }

  if (offices.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <Building2 className="size-12 text-muted-foreground/50 mb-3" />
        <h3 className="font-semibold text-foreground text-base">Chưa có văn phòng đại diện nào</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Bấm nút "Thêm mới văn phòng" để tạo chi nhánh đầu tiên cho hệ sinh thái Luật Vạn Ích.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-14 text-center">#</TableHead>
            <TableHead className="min-w-[220px]">Văn phòng</TableHead>
            <TableHead className="min-w-[200px]">Địa chỉ</TableHead>
            <TableHead className="min-w-[160px]">Liên hệ</TableHead>
            <TableHead className="w-24 text-center">Thứ tự</TableHead>
            <TableHead className="w-28 text-center">Trạng thái</TableHead>
            <TableHead className="w-24 text-right pr-4">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offices.map((office, idx) => {
            const vi = office.translations?.find((t) => t.languageCode === "vi");
            const zh = office.translations?.find((t) => t.languageCode === "zh-CN");
            const isUpdating = statusMutation.isPending && loadingOfficeId === office.id;

            return (
              <TableRow key={office.id} className="hover:bg-muted/30 transition-colors">
                {/* 1. Số thứ tự */}
                <TableCell className="text-center text-xs text-muted-foreground font-mono">
                  {idx + 1}
                </TableCell>

                {/* 2. Tên văn phòng & Mã */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">
                        {vi?.name || office.code}
                      </span>
                      {office.isHeadquarters && (
                        <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30 font-semibold px-1.5 py-0">
                          Trụ sở chính
                        </Badge>
                      )}
                    </div>

                    {zh?.name && (
                      <span className="text-xs text-muted-foreground font-serif">
                        {zh.name}
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-muted-foreground">
                      Mã: <code>{office.code}</code>
                    </span>
                  </div>
                </TableCell>

                {/* 3. Địa chỉ */}
                <TableCell>
                  <div className="flex items-start gap-1.5 text-xs text-foreground/90">
                    <MapPin className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{vi?.address || "Chưa có địa chỉ"}</span>
                  </div>
                  {vi?.workingHours && (
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
                      <Clock className="size-3 shrink-0" />
                      <span>{vi.workingHours}</span>
                    </div>
                  )}
                </TableCell>

                {/* 4. Liên hệ */}
                <TableCell>
                  <div className="flex flex-col gap-1 text-xs">
                    {office.phone && (
                      <div className="flex items-center gap-1 text-foreground">
                        <Phone className="size-3 text-muted-foreground" />
                        <span>{office.phone}</span>
                      </div>
                    )}
                    {office.email && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="size-3" />
                        <span className="truncate max-w-[140px]">{office.email}</span>
                      </div>
                    )}
                    {office.wechatId && (
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px]">
                        <QrCode className="size-3" />
                        <span>WeChat: {office.wechatId}</span>
                      </div>
                    )}
                  </div>
                </TableCell>

                {/* 5. Thứ tự */}
                <TableCell className="text-center font-mono text-xs">
                  {office.displayOrder}
                </TableCell>

                {/* 6. Trạng thái (Switch) */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Switch
                      checked={office.status === "published"}
                      onCheckedChange={() => handleToggleStatus(office)}
                      disabled={isUpdating}
                    />
                    <span className="text-[11px] text-muted-foreground capitalize">
                      {office.status === "published" ? "Hiện" : "Nháp"}
                    </span>
                  </div>
                </TableCell>

                {/* 7. Thao tác */}
                <TableCell className="text-right pr-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      title="Chỉnh sửa văn phòng"
                      onClick={() => onEdit(office)}
                    >
                      <Edit2 className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      title="Xóa văn phòng"
                      onClick={() => onDelete(office)}
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
  );
}
