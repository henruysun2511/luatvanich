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
import { useUpdatePracticeArea } from "../queries/usePracticeAreasQuery";
import type { PracticeAreaItem } from "../types/practice-areas.types";
import {
  Scale,
  Edit2,
  Trash2,
  Star,
  Loader2,
  Layers,
} from "lucide-react";

interface PracticeAreaListTableProps {
  practiceAreas: PracticeAreaItem[];
  isLoading: boolean;
  onEdit: (item: PracticeAreaItem) => void;
  onDelete: (item: PracticeAreaItem) => void;
}

export function PracticeAreaListTable({
  practiceAreas,
  isLoading,
  onEdit,
  onDelete,
}: PracticeAreaListTableProps) {
  const updateMutation = useUpdatePracticeArea();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggleStatus = async (item: PracticeAreaItem) => {
    const nextStatus = item.status === "published" ? "draft" : "published";
    setUpdatingId(item.id);
    try {
      await updateMutation.mutateAsync({
        id: item.id,
        payload: { status: nextStatus },
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleFeatured = async (item: PracticeAreaItem) => {
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

  if (isLoading && practiceAreas.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">
          Đang tải danh sách lĩnh vực chuyên môn...
        </span>
      </div>
    );
  }

  if (practiceAreas.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <Scale className="size-12 text-muted-foreground/50 mb-3" />
        <h3 className="font-semibold text-foreground text-base">
          Chưa có lĩnh vực chuyên môn nào
        </h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Bấm nút "Thêm mới lĩnh vực" để thiết lập các nhóm chuyên môn trọng điểm cho văn phòng luật.
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
            <TableHead className="w-16 text-center">Biểu tượng</TableHead>
            <TableHead className="min-w-[240px]">Lĩnh vực chuyên môn</TableHead>
            <TableHead className="w-32 text-center">Dịch vụ</TableHead>
            <TableHead className="w-24 text-center">Nổi bật</TableHead>
            <TableHead className="w-24 text-center">Thứ tự</TableHead>
            <TableHead className="w-28 text-center">Trạng thái</TableHead>
            <TableHead className="w-24 text-right pr-4">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {practiceAreas.map((item, idx) => {
            const vi = item.translations?.find((t) => t.languageCode === "vi");
            const zh = item.translations?.find((t) => t.languageCode === "zh-CN");
            const isUpdating = updateMutation.isPending && updatingId === item.id;

            return (
              <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                {/* 1. STT */}
                <TableCell className="text-center text-xs text-muted-foreground font-mono">
                  {idx + 1}
                </TableCell>

                {/* 2. Biểu tượng */}
                <TableCell className="text-center">
                  <div className="size-10 rounded-md border border-border bg-muted/40 flex items-center justify-center mx-auto overflow-hidden relative">
                    {item.iconUrl ? (
                      <Image
                        src={item.iconUrl}
                        alt={vi?.name || "Icon"}
                        width={32}
                        height={32}
                        className="object-contain size-8"
                        unoptimized
                      />
                    ) : (
                      <Scale className="size-5 text-muted-foreground/60" />
                    )}
                  </div>
                </TableCell>

                {/* 3. Tên lĩnh vực & Slug */}
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">
                        {vi?.name || "Chưa đặt tên"}
                      </span>
                    </div>

                    {zh?.name && (
                      <span className="text-xs text-muted-foreground font-serif">
                        {zh.name}
                      </span>
                    )}

                    {vi?.slug && (
                      <span className="text-[11px] font-mono text-muted-foreground">
                        /{vi.slug}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* 4. Số lượng dịch vụ trực thuộc */}
                <TableCell className="text-center">
                  <Badge variant="outline" className="gap-1 font-normal text-xs">
                    <Layers className="size-3 text-muted-foreground" />
                    <span>{item.servicesCount} dịch vụ</span>
                  </Badge>
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

                {/* 6. Thứ tự hiển thị */}
                <TableCell className="text-center font-mono text-xs text-muted-foreground">
                  {item.displayOrder}
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
