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
import { useReorderPostCategories } from "../queries/usePostCategoriesQuery";
import type { PostCategoryItem, PostSection } from "../types/posts.types";
import {
  FolderTree,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  CornerDownRight,
  Globe,
} from "lucide-react";

interface PostCategoryListTableProps {
  categories: PostCategoryItem[];
  isLoading: boolean;
  onEdit: (item: PostCategoryItem) => void;
  onDelete: (item: PostCategoryItem) => void;
}

const SECTION_LABELS: Record<PostSection, { label: string; color: string }> = {
  news: { label: "Tin tức", color: "bg-blue-50 text-blue-700 border-blue-200" },
  handbook: { label: "Cẩm nang", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  knowledge_base: { label: "Kiến thức", color: "bg-purple-50 text-purple-700 border-purple-200" },
};

export function PostCategoryListTable({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: PostCategoryListTableProps) {
  const reorderMutation = useReorderPostCategories();
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  // Sắp xếp phân cấp: Đưa con vào ngay dưới cha của nó
  const hierarchicalCategories = React.useMemo(() => {
    const parentMap = new Map<string | null, PostCategoryItem[]>();
    for (const item of categories) {
      const pid = item.parentId || null;
      if (!parentMap.has(pid)) parentMap.set(pid, []);
      parentMap.get(pid)!.push(item);
    }

    const result: { item: PostCategoryItem; depth: number }[] = [];
    const traverse = (parentId: string | null, depth: number) => {
      const children = parentMap.get(parentId) || [];
      // Sắp xếp theo displayOrder
      children.sort((a, b) => a.displayOrder - b.displayOrder);
      for (const child of children) {
        result.push({ item: child, depth });
        traverse(child.id, depth + 1);
      }
    };
    traverse(null, 0);

    // Nếu có chuyên mục mồ côi (parentId không tìm thấy trong list), append vào cuối
    const addedIds = new Set(result.map((r) => r.item.id));
    for (const item of categories) {
      if (!addedIds.has(item.id)) {
        result.push({ item, depth: 0 });
      }
    }

    return result;
  }, [categories]);

  const handleMoveOrder = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const currentItem = categories[index];
    setReorderingId(currentItem.id);

    // Tạo mảng ID mới sau khi hoán đổi
    const reordered = [...categories];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    try {
      await reorderMutation.mutateAsync({
        ids: reordered.map((item) => item.id),
      });
    } finally {
      setReorderingId(null);
    }
  };

  if (isLoading && categories.length === 0) {
    return (
      <div className="rounded-none border border-border bg-card p-12 flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-xs text-muted-foreground">Đang tải danh sách chuyên mục...</span>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-none border border-dashed border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <FolderTree className="size-10 text-muted-foreground/60 mb-2" />
        <h3 className="font-semibold text-foreground text-sm">Chưa có chuyên mục nào</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Nhấn &quot;Thêm chuyên mục&quot; để tạo danh mục phân loại bài viết theo phân vùng.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-none overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] text-center">Thứ tự</TableHead>
            <TableHead>Tên chuyên mục</TableHead>
            <TableHead className="w-[140px]">Phân vùng</TableHead>
            <TableHead className="w-[180px]">Bản dịch</TableHead>
            <TableHead className="w-[100px] text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hierarchicalCategories.map(({ item, depth }, index) => {
            const vi = item.translations.find((t) => t.languageCode === "vi");
            const zh = item.translations.find((t) => t.languageCode === "zh-CN");
            const sectionMeta = SECTION_LABELS[item.section] || {
              label: item.section,
              color: "bg-slate-50 text-slate-700 border-slate-200",
            };

            return (
              <TableRow key={item.id} className="hover:bg-muted/30">
                {/* Thứ tự & nút di chuyển */}
                <TableCell className="text-center font-mono text-xs">
                  <div className="flex items-center justify-center gap-1">
                    <span className="w-5 text-muted-foreground">{item.displayOrder}</span>
                    <div className="flex flex-col">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-5 h-4 hover:bg-muted text-muted-foreground hover:text-foreground"
                        disabled={index === 0 || Boolean(reorderingId)}
                        onClick={() => handleMoveOrder(index, "up")}
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-5 h-4 hover:bg-muted text-muted-foreground hover:text-foreground"
                        disabled={index === categories.length - 1 || Boolean(reorderingId)}
                        onClick={() => handleMoveOrder(index, "down")}
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="size-3" />
                      </Button>
                    </div>
                  </div>
                </TableCell>

                {/* Tên chuyên mục kèm phân tầng */}
                <TableCell>
                  <div
                    className="flex items-center gap-2"
                    style={{ paddingLeft: `${depth * 24}px` }}
                  >
                    {depth > 0 && (
                      <CornerDownRight className="size-4 text-muted-foreground/60 shrink-0" />
                    )}
                    <div className="size-7 rounded-none bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <FolderTree className="size-4" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-xs flex items-center gap-2">
                        <span>{vi?.name || zh?.name || "Chưa đặt tên"}</span>
                        {item.parentId === null && (
                          <Badge variant="outline" className="text-[10px] py-0 h-4 border-dashed">
                            Gốc
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        /{vi?.slug || zh?.slug}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Phân vùng (Section) */}
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-none text-[11px] font-medium border ${sectionMeta.color}`}
                  >
                    {sectionMeta.label}
                  </span>
                </TableCell>

                {/* Bản dịch */}
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs">
                    {vi ? (
                      <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                        VI: {vi.name.slice(0, 15)}...
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">
                        Thiếu VI
                      </Badge>
                    )}
                    {zh ? (
                      <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                        ZH: {zh.name.slice(0, 15)}...
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">
                        Thiếu ZH
                      </Badge>
                    )}
                  </div>
                </TableCell>

                {/* Thao tác */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => onEdit(item)}
                      title="Sửa chuyên mục"
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onDelete(item)}
                      title="Xóa chuyên mục"
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
