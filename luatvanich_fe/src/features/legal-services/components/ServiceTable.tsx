"use client";

import React, { useState } from "react";
import Image from "next/image";
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
import {
  useUpdateLegalService,
  useUpdateLegalServiceStatus,
  useReorderLegalServices,
} from "../queries/useServiceQuery";
import type { LegalServiceItem } from "../types/service.types";
import {
  Briefcase,
  Edit2,
  Trash2,
  Star,
  Loader2,
  Scale,
  Eye,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface ServiceTableProps {
  services: LegalServiceItem[];
  isLoading: boolean;
  onViewDetail: (item: LegalServiceItem) => void;
  onEdit: (item: LegalServiceItem) => void;
  onDelete: (item: LegalServiceItem) => void;
}

export function ServiceTable({
  services,
  isLoading,
  onViewDetail,
  onEdit,
  onDelete,
}: ServiceTableProps) {
  const updateMutation = useUpdateLegalService();
  const statusMutation = useUpdateLegalServiceStatus();
  const reorderMutation = useReorderLegalServices();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= services.length) return;

    const currentItem = services[index];
    setReorderingId(currentItem.id);

    const reordered = [...services];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    try {
      await reorderMutation.mutateAsync(reordered.map((item) => item.id));
    } finally {
      setReorderingId(null);
    }
  };

  const handleToggleStatus = async (item: LegalServiceItem) => {
    const nextStatus = item.status === "published" ? "draft" : "published";
    setUpdatingId(item.id);
    try {
      await statusMutation.mutateAsync({
        id: item.id,
        status: nextStatus,
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleFeatured = async (item: LegalServiceItem) => {
    setUpdatingId(item.id);
    try {
      await updateMutation.mutateAsync({
        id: item.id,
        payload: { isFeatured: !item.isFeatured },
      });
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading && services.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">
          Đang tải danh sách dịch vụ pháp lý...
        </span>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <Briefcase className="size-12 text-muted-foreground/50 mb-3" />
        <h3 className="font-semibold text-foreground text-base">
          Chưa có dịch vụ pháp lý nào
        </h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Bấm nút "Thêm mới dịch vụ" để bắt đầu đăng tải các gói tư vấn chuyên sâu cho khách hàng.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-none overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-14 text-center">#</TableHead>
            <TableHead className="w-20 text-center">Ảnh bìa</TableHead>
            <TableHead className="min-w-[260px]">Dịch vụ pháp lý</TableHead>
            <TableHead className="min-w-[180px]">Lĩnh vực chuyên môn</TableHead>
            <TableHead className="w-24 text-center">Nổi bật</TableHead>
            <TableHead className="w-20 text-center">Thứ tự</TableHead>
            <TableHead className="w-28 text-center">Trạng thái</TableHead>
            <TableHead className="w-24 text-right pr-4">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((item, idx) => {
            const vi = item.translations?.find((t) => t.languageCode === "vi");
            const zh = item.translations?.find((t) => t.languageCode === "zh-CN");
            const isUpdating =
              (updateMutation.isPending || statusMutation.isPending) &&
              updatingId === item.id;

            return (
              <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                {/* 1. STT */}
                <TableCell className="text-center text-xs text-muted-foreground font-mono">
                  {idx + 1}
                </TableCell>

                {/* 2. Ảnh bìa */}
                <TableCell className="text-center">
                  <div className="size-12 rounded-md border border-border bg-muted/40 flex items-center justify-center mx-auto overflow-hidden relative">
                    {item.coverImageUrl ? (
                      <Image
                        src={item.coverImageUrl}
                        alt={vi?.title || "Cover"}
                        width={48}
                        height={48}
                        className="object-cover size-12"
                        unoptimized
                      />
                    ) : (
                      <Briefcase className="size-5 text-muted-foreground/60" />
                    )}
                  </div>
                </TableCell>

                {/* 3. Tên dịch vụ & Slug */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-foreground text-sm">
                      {vi?.title || "Chưa đặt tên"}
                    </span>

                    {zh?.title && (
                      <span className="text-xs text-muted-foreground font-serif">
                        {zh.title}
                      </span>
                    )}

                    {vi?.slug && (
                      <span className="text-[11px] font-mono text-muted-foreground">
                        /{vi.slug}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* 4. Lĩnh vực chuyên môn */}
                <TableCell>
                  {item.practiceArea?.name ? (
                    <Badge variant="outline" className="gap-1 font-normal text-xs bg-primary/5 text-primary border-primary/20">
                      <Scale className="size-3 shrink-0" />
                      <span>{item.practiceArea.name}</span>
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">
                      Chưa phân nhóm
                    </span>
                  )}
                </TableCell>

                {/* 5. Nổi bật */}
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => handleToggleFeatured(item)}
                    disabled={isUpdating}
                    title={item.isFeatured ? "Đang nổi bật (Click để bỏ)" : "Đặt làm nổi bật"}
                  >
                    <Star
                      className={`size-4 ${
                        item.isFeatured
                          ? "fill-amber-400 text-amber-500"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  </Button>
                </TableCell>

                {/* 6. Thứ tự */}
                <TableCell className="text-center font-mono text-xs">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-5 text-muted-foreground">{item.displayOrder}</span>
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
                        disabled={idx === services.length - 1 || Boolean(reorderingId)}
                        onClick={() => handleMoveOrder(idx, "down")}
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="size-3" />
                      </Button>
                    </div>
                  </div>
                </TableCell>

                {/* 7. Trạng thái */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Switch
                      checked={item.status === "published"}
                      onCheckedChange={() => handleToggleStatus(item)}
                      disabled={isUpdating}
                    />
                    <span
                      className={`text-[11px] font-medium ${
                        item.status === "published"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {item.status === "published" ? "Hiển thị" : "Bản nháp"}
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
                      onClick={() => onViewDetail(item)}
                      title="Xem chi tiết dịch vụ"
                    >
                      <Eye className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-foreground"
                      onClick={() => onEdit(item)}
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(item)}
                    >
                      <Trash2 className="size-3.5" />
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
