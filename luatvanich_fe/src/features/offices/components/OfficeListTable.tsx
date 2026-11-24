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
import { useUpdateOfficeStatus, useReorderOffices } from "../queries/useOfficesQuery";
import type { OfficeItem } from "../types/offices.types";
import {
  Building2,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Loader2,
  Eye,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface OfficeListTableProps {
  offices: OfficeItem[];
  isLoading: boolean;
  onViewDetail: (office: OfficeItem) => void;
  onEdit: (office: OfficeItem) => void;
  onDelete: (office: OfficeItem) => void;
}

export function OfficeListTable({
  offices,
  isLoading,
  onViewDetail,
  onEdit,
  onDelete,
}: OfficeListTableProps) {
  const statusMutation = useUpdateOfficeStatus();
  const reorderMutation = useReorderOffices();
  const [loadingOfficeId, setLoadingOfficeId] = useState<string | null>(null);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= offices.length) return;

    const currentItem = offices[index];
    setReorderingId(currentItem.id);

    const reordered = [...offices];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    try {
      await reorderMutation.mutateAsync(reordered.map((item) => item.id));
    } finally {
      setReorderingId(null);
    }
  };

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
      <div className="rounded-none border border-border bg-card p-12 flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Đang tải danh sách văn phòng...</span>
      </div>
    );
  }

  if (offices.length === 0) {
    return (
      <div className="rounded-none border border-dashed border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <Building2 className="size-12 text-muted-foreground/50 mb-3" />
        <h3 className="font-semibold text-foreground text-base">Chưa có văn phòng đại diện nào</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Bấm nút "Thêm mới văn phòng" để tạo chi nhánh đầu tiên cho hệ sinh thái Luật Vạn Ích.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-none overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead className="w-28">Mã VP</TableHead>
            <TableHead className="min-w-[200px]">Tên văn phòng</TableHead>
            <TableHead className="min-w-[240px]">Địa chỉ</TableHead>
            <TableHead className="w-36">Hotline</TableHead>
            <TableHead className="w-24 text-center">Thứ tự</TableHead>
            <TableHead className="w-28 text-center">Trạng thái</TableHead>
            <TableHead className="w-28 text-right pr-4">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offices.map((office, idx) => {
            const vi = office.translations?.find((t) => t.languageCode === "vi");
            const isUpdating = statusMutation.isPending && loadingOfficeId === office.id;

            return (
              <TableRow key={office.id} className="hover:bg-muted/30 transition-colors">
                {/* 1. Số thứ tự */}
                <TableCell className="text-center text-xs text-muted-foreground font-mono">
                  {idx + 1}
                </TableCell>

                {/* 2. Mã văn phòng */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className="font-mono text-xs bg-muted/50 text-foreground border-border px-2 py-0.5"
                  >
                    {office.code}
                  </Badge>
                </TableCell>

                {/* 3. Tên văn phòng */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">
                      {vi?.name || office.code}
                    </span>
                    {office.isHeadquarters && (
                      <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30 font-semibold px-1.5 py-0 shrink-0">
                        Trụ sở chính
                      </Badge>
                    )}
                  </div>
                </TableCell>

                {/* 4. Địa chỉ */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/80 max-w-[320px]">
                    <MapPin className="size-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate" title={vi?.address || ""}>
                      {vi?.address || <span className="text-muted-foreground italic">Chưa có</span>}
                    </span>
                  </div>
                </TableCell>

                {/* 5. Hotline */}
                <TableCell>
                  {office.phone ? (
                    <div className="flex items-center gap-1.5 text-xs text-foreground font-mono">
                      <Phone className="size-3 text-muted-foreground shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">—</span>
                  )}
                </TableCell>

                {/* 6. Thứ tự */}
                <TableCell className="text-center font-mono text-xs">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-5 text-muted-foreground">{office.displayOrder}</span>
                    <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-5 h-4 hover:bg-muted text-muted-foreground hover:text-foreground"
                        disabled={idx === 0 || Boolean(reorderingId)}
                        onClick={() => handleMoveOrder(idx, "up")}
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-5 h-4 hover:bg-muted text-muted-foreground hover:text-foreground"
                        disabled={idx === offices.length - 1 || Boolean(reorderingId)}
                        onClick={() => handleMoveOrder(idx, "down")}
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="size-3" />
                      </Button>
                    </div>
                  </div>
                </TableCell>

                {/* 7. Trạng thái (Switch) */}
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

                {/* 8. Thao tác */}
                <TableCell className="text-right pr-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-foreground"
                      title="Xem chi tiết văn phòng"
                      onClick={() => onViewDetail(office)}
                    >
                      <Eye className="size-4" />
                    </Button>
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
