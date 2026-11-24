"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreatePostCategory,
  useUpdatePostCategory,
} from "../queries/usePostCategoriesQuery";
import { postCategoryFormSchema } from "../schemas/post-category.schema";
import type {
  PostCategoryItem,
  CreatePostCategoryInput,
  PostSection,
} from "../types/posts.types";
import { FolderTree, Loader2, Globe } from "lucide-react";

interface PostCategoryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryToEdit?: PostCategoryItem | null;
  categories: PostCategoryItem[];
}

export function PostCategoryFormDialog({
  open,
  onOpenChange,
  categoryToEdit,
  categories,
}: PostCategoryFormDialogProps) {
  const isEdit = Boolean(categoryToEdit);
  const [activeTab, setActiveTab] = useState<"vi" | "zh">("vi");

  // Form states
  const [section, setSection] = useState<PostSection>("news");
  const [parentId, setParentId] = useState<string>("root");
  const [displayOrder, setDisplayOrder] = useState<number>(0);

  // Tiếng Việt
  const [viName, setViName] = useState("");
  const [viSlug, setViSlug] = useState("");
  const [viDescription, setViDescription] = useState("");

  // Tiếng Trung
  const [zhName, setZhName] = useState("");
  const [zhSlug, setZhSlug] = useState("");
  const [zhDescription, setZhDescription] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreatePostCategory();
  const updateMutation = useUpdatePostCategory();

  // Reset form khi mở dialog
  useEffect(() => {
    if (!open) return;

    if (categoryToEdit) {
      setSection(categoryToEdit.section);
      setParentId(categoryToEdit.parentId || "root");
      setDisplayOrder(categoryToEdit.displayOrder || 0);

      const vi = categoryToEdit.translations.find((t) => t.languageCode === "vi");
      setViName(vi?.name || "");
      setViSlug(vi?.slug || "");
      setViDescription(vi?.description || "");

      const zh = categoryToEdit.translations.find((t) => t.languageCode === "zh-CN");
      setZhName(zh?.name || "");
      setZhSlug(zh?.slug || "");
      setZhDescription(zh?.description || "");
    } else {
      setSection("news");
      setParentId("root");
      setDisplayOrder(0);
      setViName("");
      setViSlug("");
      setViDescription("");
      setZhName("");
      setZhSlug("");
      setZhDescription("");
    }
    setErrors({});
    setActiveTab("vi");
  }, [open, categoryToEdit]);

  // Lọc danh sách chuyên mục cha hợp lệ (cùng section và không phải chính nó)
  const availableParents = categories.filter((c) => {
    if (c.section !== section) return false;
    if (isEdit && (c.id === categoryToEdit?.id || c.parentId === categoryToEdit?.id)) return false;
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Xây dựng mảng translations
    const translations = [];
    if (viName.trim()) {
      translations.push({
        languageCode: "vi" as const,
        name: viName.trim(),
        slug: viSlug.trim() || undefined,
        description: viDescription.trim() || null,
      });
    }
    if (zhName.trim()) {
      translations.push({
        languageCode: "zh-CN" as const,
        name: zhName.trim(),
        slug: zhSlug.trim() || undefined,
        description: zhDescription.trim() || null,
      });
    }

    const payloadRaw = {
      section,
      parentId: parentId === "root" ? null : parentId,
      displayOrder,
      translations,
    };

    const result = postCategoryFormSchema.safeParse(payloadRaw);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);

      // Nếu lỗi ở tab tiếng Trung thì chuyển tab
      if (Object.keys(fieldErrors).some((k) => k.includes("translations.1"))) {
        setActiveTab("zh");
      } else {
        setActiveTab("vi");
      }
      return;
    }

    const inputData: CreatePostCategoryInput = {
      section,
      parentId: parentId === "root" ? null : parentId,
      displayOrder,
      translations,
    };

    if (isEdit && categoryToEdit) {
      await updateMutation.mutateAsync({ id: categoryToEdit.id, payload: inputData });
    } else {
      await createMutation.mutateAsync(inputData);
    }

    onOpenChange(false);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <FolderTree className="size-5 text-primary" />
            {isEdit ? "Cập nhật chuyên mục bài viết" : "Tạo chuyên mục bài viết mới"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Chuyên mục dùng để phân loại tin tức, cẩm nang pháp lý và kiến thức chuyên môn.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Cấu hình chung: Phân vùng + Chuyên mục cha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-border bg-muted/20">
            {/* Phân vùng */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">
                Phân vùng nội dung <span className="text-destructive">*</span>
              </label>
              <Select
                value={section}
                onValueChange={(val) => {
                  setSection(val as PostSection);
                  setParentId("root"); // reset parent khi đổi section
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Chọn phân vùng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">Tin tức (News)</SelectItem>
                  <SelectItem value="handbook">Cẩm nang (Handbook)</SelectItem>
                  <SelectItem value="knowledge_base">Kiến thức (Knowledge Base)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Chuyên mục cha */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Chuyên mục cha</label>
              <Select value={parentId} onValueChange={setParentId}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Chuyên mục gốc (Không có cha)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="root">-- Là chuyên mục gốc --</SelectItem>
                  {availableParents.map((parent) => {
                    const name =
                      parent.translations.find((t) => t.languageCode === "vi")?.name ||
                      parent.translations[0]?.name ||
                      "Chuyên mục";
                    return (
                      <SelectItem key={parent.id} value={parent.id}>
                        {parent.parentId ? `— ${name}` : name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Thứ tự hiển thị */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-foreground">Thứ tự hiển thị</label>
              <Input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="h-8 text-xs w-32"
                min={0}
              />
            </div>
          </div>

          {/* TABS SONG NGỮ */}
          <div className="space-y-3 pt-1">
            <div className="flex border-b border-border">
              <button
                type="button"
                onClick={() => setActiveTab("vi")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-colors -mb-px cursor-pointer ${
                  activeTab === "vi"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="size-3.5" />
                Tiếng Việt (Mặc định)
                {viName.trim() && <span className="size-1.5 rounded-full bg-emerald-500" />}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("zh")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-colors -mb-px cursor-pointer ${
                  activeTab === "zh"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="size-3.5" />
                Tiếng Trung (Trung văn)
                {zhName.trim() && <span className="size-1.5 rounded-full bg-blue-500" />}
              </button>
            </div>

            {/* NỘI DUNG TAB TIẾNG VIỆT */}
            {activeTab === "vi" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    Tên chuyên mục (Tiếng Việt) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={viName}
                    onChange={(e) => setViName(e.target.value)}
                    placeholder="VD: Đầu tư FDI & Doanh nghiệp"
                    className="h-8 text-xs"
                  />
                  {errors["translations.0.name"] && (
                    <p className="text-[11px] text-destructive">{errors["translations.0.name"]}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    Đường dẫn tĩnh (Slug)
                  </label>
                  <Input
                    value={viSlug}
                    onChange={(e) => setViSlug(e.target.value)}
                    placeholder="Tự sinh từ tên nếu để trống (VD: dau-tu-fdi)"
                    className="h-8 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Mô tả chuyên mục</label>
                  <Textarea
                    value={viDescription}
                    onChange={(e) => setViDescription(e.target.value)}
                    placeholder="Mô tả ngắn gọn phạm vi nội dung..."
                    rows={2}
                    className="text-xs"
                  />
                </div>
              </div>
            )}

            {/* NỘI DUNG TAB TIẾNG TRUNG */}
            {activeTab === "zh" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    Tên chuyên mục (Tiếng Trung)
                  </label>
                  <Input
                    value={zhName}
                    onChange={(e) => setZhName(e.target.value)}
                    placeholder="VD: 外商直接投资与企业法"
                    className="h-8 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    Đường dẫn tĩnh (Slug)
                  </label>
                  <Input
                    value={zhSlug}
                    onChange={(e) => setZhSlug(e.target.value)}
                    placeholder="Tự sinh nếu để trống"
                    className="h-8 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Mô tả chuyên mục</label>
                  <Textarea
                    value={zhDescription}
                    onChange={(e) => setZhDescription(e.target.value)}
                    placeholder="Tiểu chuẩn tóm tắt tiếng Trung..."
                    rows={2}
                    className="text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Hủy
            </Button>
            <Button type="submit" variant="royal" size="sm" disabled={isPending} className="gap-1.5">
              {isPending && <Loader2 className="size-3.5 animate-spin" />}
              {isEdit ? "Lưu thay đổi" : "Tạo chuyên mục"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
