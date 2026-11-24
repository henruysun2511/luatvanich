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
  useUpdateLawyer,
  useUpdateLawyerStatus,
  useReorderLawyers,
} from "../queries/useLawyersQuery";
import type { LawyerItem, LawyerTeamGroup } from "../types/lawyers.types";
import {
  User,
  Edit2,
  Trash2,
  Star,
  Loader2,
  Building2,
  Scale,
  Eye,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface LawyerListTableProps {
  lawyers: LawyerItem[];
  isLoading: boolean;
  onViewDetail: (item: LawyerItem) => void;
  onEdit: (item: LawyerItem) => void;
  onDelete: (item: LawyerItem) => void;
}

const TEAM_GROUP_LABELS: Record<LawyerTeamGroup, { label: string; color: string }> = {
  core_leadership: { label: "Ban Lãnh đạo", color: "bg-red-500/10 text-red-600 border-red-500/30" },
  chinese_team: { label: "LS Trung Quốc", color: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
  vietnamese_team: { label: "LS Việt Nam", color: "bg-blue-500/10 text-blue-600 border-blue-500/30" },
  senior_advisor: { label: "Cố vấn cao cấp", color: "bg-purple-500/10 text-purple-600 border-purple-500/30" },
};

export function LawyerListTable({
  lawyers,
  isLoading,
  onViewDetail,
  onEdit,
  onDelete,
}: LawyerListTableProps) {
  const updateMutation = useUpdateLawyer();
  const statusMutation = useUpdateLawyerStatus();
  const reorderMutation = useReorderLawyers();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= lawyers.length) return;

    const currentItem = lawyers[index];
    setReorderingId(currentItem.id);

    const reordered = [...lawyers];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    try {
      await reorderMutation.mutateAsync(reordered.map((item) => item.id));
    } finally {
      setReorderingId(null);
    }
  };

  const handleToggleStatus = async (item: LawyerItem) => {
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

  const handleToggleFeatured = async (item: LawyerItem) => {
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

  if (isLoading && lawyers.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">
          Đang tải danh sách hồ sơ luật sư...
        </span>
      </div>
    );
  }

  if (lawyers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <User className="size-12 text-muted-foreground/50 mb-3" />
        <h3 className="font-semibold text-foreground text-base">
          Chưa có hồ sơ luật sư nào
        </h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Bấm nút "Thêm mới luật sư" để thiết lập thông tin đội ngũ đối tác và chuyên gia của hãng luật.
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
            <TableHead className="w-16 text-center">Ảnh thẻ</TableHead>
            <TableHead className="min-w-[240px]">Họ và tên & Chức danh</TableHead>
            <TableHead className="min-w-[140px]">Phân nhóm</TableHead>
            <TableHead className="min-w-[160px]">Văn phòng & Kinh nghiệm</TableHead>
            <TableHead className="w-24 text-center">Nổi bật</TableHead>
            <TableHead className="w-20 text-center">Thứ tự</TableHead>
            <TableHead className="w-28 text-center">Trạng thái</TableHead>
            <TableHead className="w-24 text-right pr-4">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lawyers.map((item, idx) => {
            const vi = item.translations?.find((t) => t.languageCode === "vi");
            const zh = item.translations?.find((t) => t.languageCode === "zh-CN");
            const groupInfo = TEAM_GROUP_LABELS[item.teamGroup] || {
              label: item.teamGroup,
              color: "bg-muted text-muted-foreground",
            };
            const isUpdating =
              (updateMutation.isPending || statusMutation.isPending) &&
              updatingId === item.id;

            return (
              <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                {/* 1. STT */}
                <TableCell className="text-center text-xs text-muted-foreground font-mono">
                  {idx + 1}
                </TableCell>

                {/* 2. Ảnh thẻ 4:5 */}
                <TableCell className="text-center">
                  <div className="w-10 h-12 rounded border border-border bg-muted/40 flex items-center justify-center mx-auto overflow-hidden relative">
                    {item.avatarUrl ? (
                      <Image
                        src={item.avatarUrl}
                        alt={vi?.fullName || "Avatar"}
                        width={40}
                        height={48}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <User className="size-5 text-muted-foreground/60" />
                    )}
                  </div>
                </TableCell>

                {/* 3. Họ tên & Chức danh */}
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">
                        {vi?.fullName || "Chưa đặt tên"}
                      </span>
                      {vi?.academicTitle && (
                        <span className="text-[11px] font-medium text-primary">
                          ({vi.academicTitle})
                        </span>
                      )}
                    </div>

                    {(zh?.fullName || vi?.latinName) && (
                      <span className="text-xs text-muted-foreground font-serif">
                        {zh?.fullName}
                        {vi?.latinName && ` (${vi.latinName})`}
                      </span>
                    )}

                    {vi?.title && (
                      <span className="text-[11px] text-muted-foreground">
                        {vi.title}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* 4. Phân nhóm */}
                <TableCell>
                  <Badge variant="outline" className={`font-normal text-[11px] ${groupInfo.color}`}>
                    {groupInfo.label}
                  </Badge>
                </TableCell>

                {/* 5. Văn phòng & Kinh nghiệm */}
                <TableCell>
                  <div className="flex flex-col gap-1 text-xs">
                    {item.officeName ? (
                      <div className="flex items-center gap-1 text-foreground">
                        <Building2 className="size-3 text-muted-foreground shrink-0" />
                        <span>{item.officeName}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground italic text-[11px]">
                        Chưa gán văn phòng
                      </span>
                    )}

                    {item.experienceYears ? (
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Scale className="size-3 shrink-0" />
                        <span>{item.experienceYears} năm kinh nghiệm</span>
                      </div>
                    ) : null}
                  </div>
                </TableCell>

                {/* 6. Nổi bật */}
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

                {/* 7. Thứ tự */}
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
                        disabled={idx === lawyers.length - 1 || Boolean(reorderingId)}
                        onClick={() => handleMoveOrder(idx, "down")}
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="size-3" />
                      </Button>
                    </div>
                  </div>
                </TableCell>

                {/* 8. Trạng thái */}
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

                {/* 9. Thao tác */}
                <TableCell className="text-right pr-4">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 text-muted-foreground hover:text-foreground"
                      onClick={() => onViewDetail(item)}
                      title="Xem chi tiết hồ sơ"
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
