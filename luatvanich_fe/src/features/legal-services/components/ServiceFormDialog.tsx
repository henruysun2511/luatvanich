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
  useCreateLegalService,
  useUpdateLegalService,
} from "../queries/useServiceQuery";
import { useAdminPracticeAreas } from "@/features/practice-areas";
import { serviceFormSchema } from "../schemas/service.schema";
import type {
  LegalServiceItem,
  CreateLegalServiceInput,
  ServicePublishStatus,
} from "../types/service.types";
import { Briefcase, Loader2, Globe, Settings2, Sparkles } from "lucide-react";
import { SingleImageUpload, useMediaLifecycle } from "@/features/media";

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceToEdit?: LegalServiceItem | null;
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

export function ServiceFormDialog({
  open,
  onOpenChange,
  serviceToEdit,
}: ServiceFormDialogProps) {
  const isEdit = Boolean(serviceToEdit);
  const [activeTab, setActiveTab] = useState<"vi" | "zh" | "general">("vi");

  // Common fields
  const [practiceAreaId, setPracticeAreaId] = useState<string>("none");
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<ServicePublishStatus>("published");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  // Vietnamese translation
  const [titleVi, setTitleVi] = useState<string>("");
  const [slugVi, setSlugVi] = useState<string>("");
  const [excerptVi, setExcerptVi] = useState<string>("");
  const [contentHtmlVi, setContentHtmlVi] = useState<string>("");
  const [isSlugCustom, setIsSlugCustom] = useState<boolean>(false);

  // Chinese translation
  const [titleZh, setTitleZh] = useState<string>("");
  const [slugZh, setSlugZh] = useState<string>("");
  const [excerptZh, setExcerptZh] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateLegalService();
  const updateMutation = useUpdateLegalService();

  // Danh sách Lĩnh vực chuyên môn để chọn
  const { data: practiceAreasData } = useAdminPracticeAreas({ limit: 100 });
  const practiceAreas = practiceAreasData?.items || [];

  // Media lifecycle controller for Cover Image
  const coverController = useMediaLifecycle({
    initialUrl: serviceToEdit?.coverImageUrl ?? undefined,
    onUrlChange: setCoverImageUrl,
    folder: "services",
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      void coverController.rollback();
    }
    onOpenChange(nextOpen);
  };

  // Populate data when editing
  useEffect(() => {
    if (serviceToEdit) {
      setPracticeAreaId(serviceToEdit.practiceAreaId || "none");
      setCoverImageUrl(serviceToEdit.coverImageUrl || "");
      setDisplayOrder(serviceToEdit.displayOrder || 0);
      setStatus(serviceToEdit.status || "published");
      setIsFeatured(serviceToEdit.isFeatured || false);

      const vi = serviceToEdit.translations?.find((t) => t.languageCode === "vi");
      if (vi) {
        setTitleVi(vi.title || "");
        setSlugVi(vi.slug || "");
        setExcerptVi("");
        setContentHtmlVi("");
        setIsSlugCustom(true);
      } else {
        setTitleVi("");
        setSlugVi("");
        setExcerptVi("");
        setContentHtmlVi("");
        setIsSlugCustom(false);
      }

      const zh = serviceToEdit.translations?.find((t) => t.languageCode === "zh-CN");
      if (zh) {
        setTitleZh(zh.title || "");
        setSlugZh(zh.slug || "");
        setExcerptZh("");
      } else {
        setTitleZh("");
        setSlugZh("");
        setExcerptZh("");
      }

      setErrors({});
      setActiveTab("vi");
    } else {
      // Reset form
      setPracticeAreaId("none");
      setCoverImageUrl("");
      setDisplayOrder(0);
      setStatus("published");
      setIsFeatured(false);

      setTitleVi("");
      setSlugVi("");
      setExcerptVi("");
      setContentHtmlVi("");
      setIsSlugCustom(false);

      setTitleZh("");
      setSlugZh("");
      setExcerptZh("");

      setErrors({});
      setActiveTab("vi");
    }
  }, [serviceToEdit, open]);

  // Auto generate slug when typing Vietnamese title
  const handleTitleViChange = (val: string) => {
    setTitleVi(val);
    if (!isSlugCustom) {
      setSlugVi(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const payload: CreateLegalServiceInput = {
      practiceAreaId: practiceAreaId !== "none" ? practiceAreaId : null,
      coverImageUrl: coverImageUrl?.trim() || null,
      displayOrder,
      isFeatured,
      titleVi: titleVi.trim(),
      slugVi: slugVi.trim() || undefined,
      excerptVi: excerptVi.trim() || null,
      contentHtmlVi: contentHtmlVi.trim() || null,
      titleZh: titleZh.trim() || null,
      slugZh: slugZh.trim() || null,
      excerptZh: excerptZh.trim() || null,
    };

    const parseResult = serviceFormSchema.safeParse({
      ...payload,
      status,
    });

    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);

      if (fieldErrors.titleVi || fieldErrors.slugVi) {
        setActiveTab("vi");
      } else if (fieldErrors.titleZh || fieldErrors.slugZh) {
        setActiveTab("zh");
      }
      return;
    }

    try {
      if (isEdit && serviceToEdit) {
        await updateMutation.mutateAsync({
          id: serviceToEdit.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
      coverController.commit();
      onOpenChange(false);
    } catch {
      // Handled by onError toast
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Briefcase className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-serif">
                {isEdit ? "Chỉnh sửa Dịch vụ Pháp lý" : "Thêm Dịch vụ Pháp lý Mới"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Quản lý thông tin dịch vụ, lĩnh vực liên kết và nội dung song ngữ
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
                  Tên dịch vụ pháp lý (Tiếng Việt){" "}
                  <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="VD: Thành lập doanh nghiệp có vốn đầu tư nước ngoài (FDI)"
                  value={titleVi}
                  onChange={(e) => handleTitleViChange(e.target.value)}
                  className="mt-1"
                />
                {errors.titleVi && (
                  <p className="text-xs text-destructive mt-1">{errors.titleVi}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Đường dẫn tĩnh SEO (Slug)
                  </label>
                  {!isSlugCustom && titleVi && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Sparkles className="size-3 text-amber-500" /> Tự động sinh
                    </span>
                  )}
                </div>
                <Input
                  placeholder="VD: thanh-lap-doanh-nghiep-fdi"
                  value={slugVi}
                  onChange={(e) => {
                    setSlugVi(e.target.value);
                    setIsSlugCustom(true);
                  }}
                  className="mt-1 font-mono text-xs"
                />
                {errors.slugVi && (
                  <p className="text-xs text-destructive mt-1">{errors.slugVi}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tóm tắt dịch vụ (Mô tả ngắn)
                </label>
                <Textarea
                  placeholder="Tóm tắt ngắn gọn phạm vi và giá trị tư vấn của dịch vụ này..."
                  value={excerptVi}
                  onChange={(e) => setExcerptVi(e.target.value)}
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Chi tiết nội dung dịch vụ
                </label>
                <Textarea
                  placeholder="Nội dung chi tiết, các bước thực hiện, hồ sơ khách hàng cần chuẩn bị..."
                  value={contentHtmlVi}
                  onChange={(e) => setContentHtmlVi(e.target.value)}
                  className="mt-1 font-mono text-xs"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* TAB 2: TIẾNG TRUNG */}
          {activeTab === "zh" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tên dịch vụ pháp lý (Tiếng Trung)
                </label>
                <Input
                  placeholder="VD: 外商直接投资企业设立咨询 (FDI)"
                  value={titleZh}
                  onChange={(e) => setTitleZh(e.target.value)}
                  className="mt-1"
                />
                {errors.titleZh && (
                  <p className="text-xs text-destructive mt-1">{errors.titleZh}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Đường dẫn tĩnh SEO tiếng Trung (Slug)
                </label>
                <Input
                  placeholder="VD: wai-shang-qi-ye-she-li"
                  value={slugZh}
                  onChange={(e) => setSlugZh(e.target.value)}
                  className="mt-1 font-mono text-xs"
                />
                {errors.slugZh && (
                  <p className="text-xs text-destructive mt-1">{errors.slugZh}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tóm tắt dịch vụ tiếng Trung
                </label>
                <Textarea
                  placeholder="外商投资设立全方位法律支持概述..."
                  value={excerptZh}
                  onChange={(e) => setExcerptZh(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* TAB 3: CÀI ĐẶT CHUNG */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Lĩnh vực chuyên môn trực thuộc
                </label>
                <Select
                  value={practiceAreaId}
                  onValueChange={setPracticeAreaId}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Chọn lĩnh vực chuyên môn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">-- Không chọn lĩnh vực --</SelectItem>
                    {practiceAreas.map((pa) => {
                      const viName =
                        pa.translations?.find((t) => t.languageCode === "vi")?.name ||
                        "Chưa đặt tên";
                      return (
                        <SelectItem key={pa.id} value={pa.id}>
                          {viName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Dịch vụ sẽ được nhóm vào lĩnh vực pháp lý này trên website.
                </p>
              </div>

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
                </div>
              </div>

              <div className="pt-2">
                <SingleImageUpload
                  label="Ảnh bìa / Ảnh đại diện dịch vụ"
                  value={coverImageUrl}
                  controller={coverController}
                  aspectRatio="video"
                  recommendedSize="Ảnh ngang 16:9 (1200x675px), tối đa 5MB"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Dịch vụ nổi bật trang chủ
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Ghim dịch vụ này lên khối dịch vụ trọng điểm tại trang chủ
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
              {isEdit ? "Lưu thay đổi" : "Tạo dịch vụ mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
