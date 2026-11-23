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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreatePracticeArea,
  useUpdatePracticeArea,
} from "../queries/usePracticeAreasQuery";
import { practiceAreaFormSchema } from "../schemas/practice-area.schema";
import type {
  PracticeAreaItem,
  CreatePracticeAreaInput,
  UpsertPracticeAreaTranslationInput,
  PracticeAreaStatus,
} from "../types/practice-areas.types";
import { Scale, Loader2, Globe, Settings2, Sparkles } from "lucide-react";
import { SingleImageUpload, useMediaLifecycle } from "@/features/media";

interface PracticeAreaFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  practiceAreaToEdit?: PracticeAreaItem | null;
}

/** Chuyển tiếng Việt có dấu sang slug URL */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function PracticeAreaFormDialog({
  open,
  onOpenChange,
  practiceAreaToEdit,
}: PracticeAreaFormDialogProps) {
  const isEdit = Boolean(practiceAreaToEdit);
  const [activeTab, setActiveTab] = useState<"vi" | "zh" | "general">("vi");

  // Common fields
  const [iconUrl, setIconUrl] = useState<string>("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<PracticeAreaStatus>("published");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  // Vietnamese translation
  const [viName, setViName] = useState<string>("");
  const [viSlug, setViSlug] = useState<string>("");
  const [viDescription, setViDescription] = useState<string>("");
  const [viMetaTitle, setViMetaTitle] = useState<string>("");
  const [viMetaDescription, setViMetaDescription] = useState<string>("");
  const [viComplete, setViComplete] = useState<boolean>(true);
  const [isViSlugCustom, setIsViSlugCustom] = useState<boolean>(false);

  // Chinese translation
  const [zhName, setZhName] = useState<string>("");
  const [zhSlug, setZhSlug] = useState<string>("");
  const [zhDescription, setZhDescription] = useState<string>("");
  const [zhMetaTitle, setZhMetaTitle] = useState<string>("");
  const [zhMetaDescription, setZhMetaDescription] = useState<string>("");
  const [zhComplete, setZhComplete] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreatePracticeArea();
  const updateMutation = useUpdatePracticeArea();

  // Media lifecycle controller for Icon
  const iconController = useMediaLifecycle({
    initialUrl: practiceAreaToEdit?.iconUrl ?? undefined,
    onUrlChange: setIconUrl,
    folder: "practice-areas",
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      void iconController.rollback();
    }
    onOpenChange(nextOpen);
  };

  // Populate data when editing
  useEffect(() => {
    if (practiceAreaToEdit) {
      setIconUrl(practiceAreaToEdit.iconUrl || "");
      setDisplayOrder(practiceAreaToEdit.displayOrder || 0);
      setStatus(practiceAreaToEdit.status || "published");
      setIsFeatured(practiceAreaToEdit.isFeatured || false);

      const vi = practiceAreaToEdit.translations?.find(
        (t) => t.languageCode === "vi",
      );
      if (vi) {
        setViName(vi.name || "");
        setViSlug(vi.slug || "");
        setViDescription(vi.description || "");
        setViMetaTitle(vi.metaTitle || "");
        setViMetaDescription(vi.metaDescription || "");
        setViComplete(vi.isComplete !== undefined ? vi.isComplete : true);
        setIsViSlugCustom(true);
      } else {
        setViName("");
        setViSlug("");
        setViDescription("");
        setViMetaTitle("");
        setViMetaDescription("");
        setViComplete(true);
        setIsViSlugCustom(false);
      }

      const zh = practiceAreaToEdit.translations?.find(
        (t) => t.languageCode === "zh-CN",
      );
      if (zh) {
        setZhName(zh.name || "");
        setZhSlug(zh.slug || "");
        setZhDescription(zh.description || "");
        setZhMetaTitle(zh.metaTitle || "");
        setZhMetaDescription(zh.metaDescription || "");
        setZhComplete(zh.isComplete || false);
      } else {
        setZhName("");
        setZhSlug("");
        setZhDescription("");
        setZhMetaTitle("");
        setZhMetaDescription("");
        setZhComplete(false);
      }

      setErrors({});
      setActiveTab("vi");
    } else {
      // Reset when creating new
      setIconUrl("");
      setDisplayOrder(0);
      setStatus("published");
      setIsFeatured(false);

      setViName("");
      setViSlug("");
      setViDescription("");
      setViMetaTitle("");
      setViMetaDescription("");
      setViComplete(true);
      setIsViSlugCustom(false);

      setZhName("");
      setZhSlug("");
      setZhDescription("");
      setZhMetaTitle("");
      setZhMetaDescription("");
      setZhComplete(false);

      setErrors({});
      setActiveTab("vi");
    }
  }, [practiceAreaToEdit, open]);

  // Auto-generate Vietnamese slug when typing name
  const handleViNameChange = (val: string) => {
    setViName(val);
    if (!isViSlugCustom) {
      setViSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const translationsPayload: UpsertPracticeAreaTranslationInput[] = [
      {
        languageCode: "vi",
        name: viName.trim(),
        slug: viSlug.trim() || undefined,
        description: viDescription.trim() || null,
        metaTitle: viMetaTitle.trim() || null,
        metaDescription: viMetaDescription.trim() || null,
        isComplete: viComplete,
      },
    ];

    if (zhName.trim() || zhDescription.trim() || zhSlug.trim()) {
      translationsPayload.push({
        languageCode: "zh-CN",
        name: zhName.trim(),
        slug: zhSlug.trim() || undefined,
        description: zhDescription.trim() || null,
        metaTitle: zhMetaTitle.trim() || null,
        metaDescription: zhMetaDescription.trim() || null,
        isComplete: zhComplete,
      });
    }

    const payload: CreatePracticeAreaInput = {
      iconUrl: iconUrl?.trim() || null,
      displayOrder,
      status,
      isFeatured,
      translations: translationsPayload,
    };

    const parseResult = practiceAreaFormSchema.safeParse(payload);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);

      // Auto switch to tab with error
      if (
        fieldErrors["translations.0.name"] ||
        fieldErrors["translations.0.slug"]
      ) {
        setActiveTab("vi");
      } else if (
        fieldErrors["translations.1.name"] ||
        fieldErrors["translations.1.slug"]
      ) {
        setActiveTab("zh");
      }
      return;
    }

    try {
      if (isEdit && practiceAreaToEdit) {
        await updateMutation.mutateAsync({
          id: practiceAreaToEdit.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
      iconController.commit();
      onOpenChange(false);
    } catch {
      // Error handled by query onError toast
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Scale className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-serif">
                {isEdit
                  ? "Chỉnh sửa Lĩnh vực chuyên môn"
                  : "Thêm Lĩnh vực chuyên môn mới"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Quản lý thông tin lĩnh vực pháp lý, đường dẫn tĩnh SEO và nội dung
                song ngữ
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b border-border my-2">
          <button
            type="button"
            onClick={() => setActiveTab("vi")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "vi"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="size-3.5" />
            Tiếng Việt (Gốc)
            {viComplete && (
              <span className="size-1.5 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("zh")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "zh"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="size-3.5" />
            Tiếng Trung (中文)
            {zhComplete && (
              <span className="size-1.5 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "general"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Settings2 className="size-3.5" />
            Cài đặt chung
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* TAB 1: TIẾNG VIỆT */}
          {activeTab === "vi" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tên lĩnh vực chuyên môn (Tiếng Việt){" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="VD: Đầu tư nước ngoài (FDI)"
                  value={viName}
                  onChange={(e) => handleViNameChange(e.target.value)}
                  className="mt-1"
                />
                {errors["translations.0.name"] && (
                  <p className="text-xs text-destructive mt-1">
                    {errors["translations.0.name"]}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Đường dẫn tĩnh SEO (Slug)
                  </label>
                  {!isViSlugCustom && viName && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Sparkles className="size-3 text-amber-500" /> Tự động sinh
                    </span>
                  )}
                </div>
                <Input
                  placeholder="VD: dau-tu-nuoc-ngoai-fdi"
                  value={viSlug}
                  onChange={(e) => {
                    setViSlug(e.target.value);
                    setIsViSlugCustom(true);
                  }}
                  className="mt-1 font-mono text-xs"
                />
                {errors["translations.0.slug"] && (
                  <p className="text-xs text-destructive mt-1">
                    {errors["translations.0.slug"]}
                  </p>
                )}
                <p className="text-[11px] text-muted-foreground mt-1">
                  Đường dẫn hiển thị trên thanh địa chỉ URL. Chỉ dùng chữ thường,
                  số và gạch nối.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Mô tả khái quát lĩnh vực
                </label>
                <Textarea
                  placeholder="Giới thiệu tổng quan về phạm vi tư vấn và hỗ trợ pháp lý của lĩnh vực này..."
                  value={viDescription}
                  onChange={(e) => setViDescription(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    SEO Meta Title (Tối đa 70 ký tự)
                  </label>
                  <Input
                    placeholder="VD: Tư Vấn Đầu Tư FDI Chuyên Nghiệp | Hãng Luật Vạn Ích"
                    value={viMetaTitle}
                    onChange={(e) => setViMetaTitle(e.target.value)}
                    className="mt-1 text-xs"
                    maxLength={70}
                  />
                  <div className="text-[10px] text-muted-foreground text-right mt-0.5">
                    {viMetaTitle.length}/70
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    SEO Meta Description (Tối đa 160 ký tự)
                  </label>
                  <Input
                    placeholder="VD: Hãng luật Vạn Ích cung cấp dịch vụ tư vấn thành lập doanh nghiệp FDI..."
                    value={viMetaDescription}
                    onChange={(e) => setViMetaDescription(e.target.value)}
                    className="mt-1 text-xs"
                    maxLength={160}
                  />
                  <div className="text-[10px] text-muted-foreground text-right mt-0.5">
                    {viMetaDescription.length}/160
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Switch checked={viComplete} onCheckedChange={setViComplete} />
                <span className="text-xs font-medium">
                  Bản dịch tiếng Việt đã hoàn thiện
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: TIẾNG TRUNG */}
          {activeTab === "zh" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tên lĩnh vực chuyên môn (Tiếng Trung)
                </label>
                <Input
                  placeholder="VD: 外商直接投资 (FDI)"
                  value={zhName}
                  onChange={(e) => setZhName(e.target.value)}
                  className="mt-1"
                />
                {errors["translations.1.name"] && (
                  <p className="text-xs text-destructive mt-1">
                    {errors["translations.1.name"]}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Đường dẫn tĩnh SEO tiếng Trung (Slug)
                </label>
                <Input
                  placeholder="VD: wai-shang-zhi-jie-tou-zi"
                  value={zhSlug}
                  onChange={(e) => setZhSlug(e.target.value)}
                  className="mt-1 font-mono text-xs"
                />
                {errors["translations.1.slug"] && (
                  <p className="text-xs text-destructive mt-1">
                    {errors["translations.1.slug"]}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Mô tả khái quát lĩnh vực (Tiếng Trung)
                </label>
                <Textarea
                  placeholder="中文专业领域概述及法律咨询范围..."
                  value={zhDescription}
                  onChange={(e) => setZhDescription(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    SEO Meta Title (中文)
                  </label>
                  <Input
                    placeholder="VD: 越南外商投资专业法律咨询 | 万益律师事务所"
                    value={zhMetaTitle}
                    onChange={(e) => setZhMetaTitle(e.target.value)}
                    className="mt-1 text-xs"
                    maxLength={70}
                  />
                  <div className="text-[10px] text-muted-foreground text-right mt-0.5">
                    {zhMetaTitle.length}/70
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    SEO Meta Description (中文)
                  </label>
                  <Input
                    placeholder="VD: 万益律师事务所提供越南外商投资全方位法律咨询服务..."
                    value={zhMetaDescription}
                    onChange={(e) => setZhMetaDescription(e.target.value)}
                    className="mt-1 text-xs"
                    maxLength={160}
                  />
                  <div className="text-[10px] text-muted-foreground text-right mt-0.5">
                    {zhMetaDescription.length}/160
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Switch checked={zhComplete} onCheckedChange={setZhComplete} />
                <span className="text-xs font-medium">
                  Bản dịch tiếng Trung đã hoàn thiện
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: CÀI ĐẶT CHUNG */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                  <div>
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Trạng thái công khai
                    </label>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {status === "published"
                        ? "Đang bật: Hiển thị công khai trên website"
                        : "Đang tắt: Lưu dạng bản nháp nội bộ"}
                    </p>
                  </div>
                  <Switch
                    checked={status === "published"}
                    onCheckedChange={(checked) =>
                      setStatus(checked ? "published" : "draft")
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Thứ tự sắp xếp hiển thị
                  </label>
                  <Input
                    type="number"
                    value={displayOrder}
                    onChange={(e) =>
                      setDisplayOrder(parseInt(e.target.value) || 0)
                    }
                    className="mt-1"
                  />
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Số nhỏ hơn sẽ đứng trước trong danh mục.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <SingleImageUpload
                  label="Biểu tượng / Hình ảnh lĩnh vực"
                  value={iconUrl}
                  controller={iconController}
                  aspectRatio="square"
                  recommendedSize="Ảnh vuông 1:1 (PNG, SVG, JPG), tối đa 2MB"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Ghim nổi bật trang chủ
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Lĩnh vực này sẽ được hiển thị trong lưới lĩnh vực pháp lý trọng
                    tâm ở trang chủ
                  </p>
                </div>
                <Switch
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                />
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 border-t border-border flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Hủy bỏ
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isEdit ? "Lưu thay đổi" : "Tạo lĩnh vực mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
