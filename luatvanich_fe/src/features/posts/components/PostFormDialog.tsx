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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleImageUpload, useMediaLifecycle } from "@/features/media";
import { useAdminLawyers } from "@/features/lawyers";
import { useAdminLegalServices } from "@/features/legal-services";
import { useCreatePost, useUpdatePost, useAdminPostDetail } from "../queries/usePostsQuery";
import { postFormSchema } from "../schemas/post.schema";
import type {
  PostItem,
  PostCategoryItem,
  CreatePostInput,
  PostStatus,
} from "../types/posts.types";
import { FileText, Loader2, Globe, Tag, X, Star, Calendar } from "lucide-react";

interface PostFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postIdToEdit?: string | null;
  categories: PostCategoryItem[];
}

export function PostFormDialog({
  open,
  onOpenChange,
  postIdToEdit,
  categories,
}: PostFormDialogProps) {
  const isEdit = Boolean(postIdToEdit);
  const [activeTab, setActiveTab] = useState<"vi" | "zh">("vi");

  // Fetch chi tiết bài viết khi edit
  const { data: postDetail, isLoading: isLoadingDetail } = useAdminPostDetail(postIdToEdit);

  // Form states
  const [categoryId, setCategoryId] = useState<string>("");
  const [authorLawyerId, setAuthorLawyerId] = useState<string>("none");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [status, setStatus] = useState<PostStatus>("draft");
  const [publishAt, setPublishAt] = useState<string>("");

  // Thẻ Tags (Find or Create)
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // Dịch vụ liên quan
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // Bản dịch Tiếng Việt
  const [viTitle, setViTitle] = useState("");
  const [viSlug, setViSlug] = useState("");
  const [viSummary, setViSummary] = useState("");
  const [viContentHtml, setViContentHtml] = useState("");
  const [viMetaTitle, setViMetaTitle] = useState("");
  const [viMetaDescription, setViMetaDescription] = useState("");
  const [viComplete, setViComplete] = useState(false);

  // Bản dịch Tiếng Trung
  const [zhTitle, setZhTitle] = useState("");
  const [zhSlug, setZhSlug] = useState("");
  const [zhSummary, setZhSummary] = useState("");
  const [zhContentHtml, setZhContentHtml] = useState("");
  const [zhMetaTitle, setZhMetaTitle] = useState("");
  const [zhMetaDescription, setZhMetaDescription] = useState("");
  const [zhComplete, setZhComplete] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  // Danh sách Luật sư & Dịch vụ liên quan
  const { data: lawyersData } = useAdminLawyers({ limit: 100 });
  const lawyers = lawyersData?.items || [];

  const { data: servicesData } = useAdminLegalServices({ limit: 100 });
  const legalServices = servicesData?.items || [];

  // Vòng đời Media Cloudinary cho ảnh bìa
  const thumbnailController = useMediaLifecycle({
    initialUrl: postDetail?.thumbnailUrl || undefined,
    onUrlChange: setThumbnailUrl,
    folder: "posts",
  });

  // Đóng dialog an toàn: rollback ảnh tạm
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      void thumbnailController.rollback();
    }
    onOpenChange(nextOpen);
  };

  // Đồng bộ form khi có postDetail hoặc tạo mới
  useEffect(() => {
    if (!open) return;

    if (postDetail) {
      setCategoryId(postDetail.categoryId);
      setAuthorLawyerId(postDetail.authorLawyerId || "none");
      setThumbnailUrl(postDetail.thumbnailUrl || "");
      setIsFeatured(postDetail.isFeatured);
      setStatus(postDetail.status);
      setPublishAt(postDetail.publishAt ? postDetail.publishAt.slice(0, 16) : "");

      // Tags: Lấy từ tags kèm tên hoặc mảng cũ
      const existingTagNames = (postDetail.tags || []).map((t) => t.name);
      setTags(existingTagNames);

      setSelectedServiceIds(postDetail.serviceIds || []);

      const vi = postDetail.translations.find((t) => t.languageCode === "vi");
      setViTitle(vi?.title || "");
      setViSlug(vi?.slug || "");
      setViSummary(vi?.summary || "");
      setViContentHtml(vi?.contentHtml || "");
      setViMetaTitle(vi?.metaTitle || "");
      setViMetaDescription(vi?.metaDescription || "");
      setViComplete(vi?.isComplete ?? true);

      const zh = postDetail.translations.find((t) => t.languageCode === "zh-CN");
      setZhTitle(zh?.title || "");
      setZhSlug(zh?.slug || "");
      setZhSummary(zh?.summary || "");
      setZhContentHtml(zh?.contentHtml || "");
      setZhMetaTitle(zh?.metaTitle || "");
      setZhMetaDescription(zh?.metaDescription || "");
      setZhComplete(zh?.isComplete ?? false);
    } else {
      setCategoryId(categories[0]?.id || "");
      setAuthorLawyerId("none");
      setThumbnailUrl("");
      setIsFeatured(false);
      setStatus("draft");
      setPublishAt("");
      setTags([]);
      setSelectedServiceIds([]);
      setViTitle("");
      setViSlug("");
      setViSummary("");
      setViContentHtml("");
      setViMetaTitle("");
      setViMetaDescription("");
      setViComplete(false);
      setZhTitle("");
      setZhSlug("");
      setZhSummary("");
      setZhContentHtml("");
      setZhMetaTitle("");
      setZhMetaDescription("");
      setZhComplete(false);
    }
    setErrors({});
    setActiveTab("vi");
  }, [open, postDetail, categories]);

  // Xử lý thêm Tag dạng Chip
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim();
      if (val && !tags.includes(val)) {
        setTags([...tags, val]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Xây dựng mảng translations
    const translations = [];
    if (viTitle.trim()) {
      translations.push({
        languageCode: "vi" as const,
        title: viTitle.trim(),
        slug: viSlug.trim() || undefined,
        summary: viSummary.trim() || null,
        contentHtml: viContentHtml.trim(),
        metaTitle: viMetaTitle.trim() || null,
        metaDescription: viMetaDescription.trim() || null,
        isComplete: viComplete,
      });
    }
    if (zhTitle.trim()) {
      translations.push({
        languageCode: "zh-CN" as const,
        title: zhTitle.trim(),
        slug: zhSlug.trim() || undefined,
        summary: zhSummary.trim() || null,
        contentHtml: zhContentHtml.trim(),
        metaTitle: zhMetaTitle.trim() || null,
        metaDescription: zhMetaDescription.trim() || null,
        isComplete: zhComplete,
      });
    }

    const payloadRaw = {
      categoryId,
      authorLawyerId: authorLawyerId === "none" ? null : authorLawyerId,
      thumbnailUrl: thumbnailUrl || null,
      isFeatured,
      tags,
      serviceIds: selectedServiceIds,
      translations,
    };

    const result = postFormSchema.safeParse(payloadRaw);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);

      if (Object.keys(fieldErrors).some((k) => k.includes("translations.1"))) {
        setActiveTab("zh");
      } else {
        setActiveTab("vi");
      }
      return;
    }

    const inputData: CreatePostInput = {
      categoryId,
      authorLawyerId: authorLawyerId === "none" ? null : authorLawyerId,
      thumbnailUrl: thumbnailUrl || null,
      isFeatured,
      tags,
      serviceIds: selectedServiceIds,
      translations,
    };

    if (isEdit && postIdToEdit) {
      await updateMutation.mutateAsync({ id: postIdToEdit, payload: inputData });
    } else {
      await createMutation.mutateAsync(inputData);
    }

    // Hoàn tất vòng đời media
    thumbnailController.commit();
    onOpenChange(false);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <FileText className="size-5 text-primary" />
            {isEdit ? "Cập nhật bài viết" : "Tạo bài viết mới"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Soạn thảo bài viết, liên kết chuyên mục, tác giả luật sư và dịch vụ pháp lý liên quan.
          </DialogDescription>
        </DialogHeader>

        {isLoadingDetail && isEdit ? (
          <div className="p-12 flex flex-col items-center justify-center gap-2">
            <Loader2 className="size-6 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground">Đang tải dữ liệu bài viết...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 pt-1">
            {/* HÀNG 1: CHUYÊN MỤC + LUẬT SƯ + ẢNH BÌA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-border bg-muted/20">
              {/* Cột 1 & 2: Thuộc tính cơ bản */}
              <div className="md:col-span-2 space-y-3">
                {/* Chọn chuyên mục */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">
                    Chuyên mục bài viết <span className="text-destructive">*</span>
                  </label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Chọn chuyên mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => {
                        const name =
                          c.translations.find((t) => t.languageCode === "vi")?.name ||
                          c.translations[0]?.name ||
                          "Chuyên mục";
                        return (
                          <SelectItem key={c.id} value={c.id}>
                            {c.parentId ? `— ${name}` : name} ({c.section})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="text-[11px] text-destructive">{errors.categoryId}</p>
                  )}
                </div>

                {/* Chọn Luật sư tác giả */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Luật sư tác giả</label>
                  <Select value={authorLawyerId} onValueChange={setAuthorLawyerId}>
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Không gắn tác giả (Ban biên tập)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-- Ban biên tập Hãng luật --</SelectItem>
                      {lawyers.map((l) => {
                        const name =
                          l.translations.find((t) => t.languageCode === "vi")?.fullName ||
                          l.translations[0]?.fullName ||
                          "Luật sư";
                        return (
                          <SelectItem key={l.id} value={l.id}>
                            {name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Ô nhập Thẻ Tag (Find or Create) */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Tag className="size-3.5 text-muted-foreground" />
                    Thẻ tag bài viết (Gõ tên thẻ và bấm Enter)
                  </label>
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="VD: FDI, Doanh nghiệp, Luật thuế... (Enter để gắn thẻ)"
                    className="h-8 text-xs"
                  />
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-primary/10 text-primary border border-primary/20"
                        >
                          #{t}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(t)}
                            className="size-3.5 rounded-full hover:bg-primary/20 flex items-center justify-center cursor-pointer"
                          >
                            <X className="size-2.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ghim nổi bật */}
                <div className="flex items-center gap-2 pt-1">
                  <Switch checked={isFeatured} onCheckedChange={setIsFeatured} id="isFeatured" />
                  <label
                    htmlFor="isFeatured"
                    className="text-xs font-medium text-foreground cursor-pointer flex items-center gap-1.5"
                  >
                    <Star className="size-3.5 text-amber-500 fill-amber-500" />
                    Ghim bài viết tiêu điểm (Hiển thị trang chủ)
                  </label>
                </div>
              </div>

              {/* Cột 3: Upload Ảnh bìa Cloudinary */}
              <div className="space-y-1">
                <SingleImageUpload
                  label="Ảnh bìa bài viết"
                  value={thumbnailUrl}
                  controller={thumbnailController}
                  aspectRatio="video"
                  recommendedSize="Khuyến nghị 1200x630px (16:9), tối đa 5MB"
                />
              </div>
            </div>

            {/* DỊCH VỤ PHÁP LÝ LIÊN QUAN */}
            {legalServices.length > 0 && (
              <div className="space-y-1.5 p-3 rounded-lg border border-border bg-card">
                <label className="text-xs font-medium text-foreground">
                  Dịch vụ pháp lý liên kết (Hiển thị gợi ý dưới chân bài viết)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pt-1">
                  {legalServices.map((svc) => {
                    const name =
                      svc.translations.find((t) => t.languageCode === "vi")?.title ||
                      svc.translations[0]?.title ||
                      "Dịch vụ";
                    const isSelected = selectedServiceIds.includes(svc.id);
                    return (
                      <button
                        type="button"
                        key={svc.id}
                        onClick={() => toggleService(svc.id)}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary font-medium"
                            : "bg-muted/40 text-muted-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {isSelected && "✓ "}
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TABS SONG NGỮ NỘI DUNG */}
            <div className="space-y-3">
              <div className="flex border-b border-border">
                <button
                  type="button"
                  onClick={() => setActiveTab("vi")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-b-2 transition-colors -mb-px cursor-pointer ${
                    activeTab === "vi"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Globe className="size-3.5" />
                  Tiếng Việt (Mặc định)
                  {viTitle.trim() && viContentHtml.trim() ? (
                    viComplete ? (
                      <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 h-4 py-0">
                        Hoàn thiện
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-200 h-4 py-0">
                        Đang soạn
                      </Badge>
                    )
                  ) : null}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("zh")}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-b-2 transition-colors -mb-px cursor-pointer ${
                    activeTab === "zh"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Globe className="size-3.5" />
                  Tiếng Trung (Trung văn)
                  {zhTitle.trim() && zhContentHtml.trim() ? (
                    zhComplete ? (
                      <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 h-4 py-0">
                        Hoàn thiện
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-200 h-4 py-0">
                        Đang soạn
                      </Badge>
                    )
                  ) : null}
                </button>
              </div>

              {/* TAB TIẾNG VIỆT */}
              {activeTab === "vi" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">
                      Tiêu đề bài viết (Tiếng Việt) <span className="text-destructive">*</span>
                    </label>
                    <Input
                      value={viTitle}
                      onChange={(e) => setViTitle(e.target.value)}
                      placeholder="VD: Thủ tục cấp giấy phép đầu tư FDI mới nhất năm 2026"
                      className="h-8 text-xs font-medium"
                    />
                    {errors["translations.0.title"] && (
                      <p className="text-[11px] text-destructive">
                        {errors["translations.0.title"]}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">
                        Đường dẫn SEO (Slug)
                      </label>
                      <Input
                        value={viSlug}
                        onChange={(e) => setViSlug(e.target.value)}
                        placeholder="Tự sinh từ tiêu đề nếu để trống"
                        className="h-8 text-xs font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <Switch checked={viComplete} onCheckedChange={setViComplete} id="viComplete" />
                      <label htmlFor="viComplete" className="text-xs text-foreground cursor-pointer">
                        Đánh dấu bản dịch tiếng Việt đã hoàn thiện (Đủ điều kiện xuất bản)
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Tóm tắt bài viết</label>
                    <Textarea
                      value={viSummary}
                      onChange={(e) => setViSummary(e.target.value)}
                      placeholder="Mô tả ngắn gọn nội dung bài viết..."
                      rows={2}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">
                      Nội dung HTML bài viết <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      value={viContentHtml}
                      onChange={(e) => setViContentHtml(e.target.value)}
                      placeholder="Nhập nội dung bài viết (hỗ trợ định dạng HTML, tiêu đề <h2>, <h3>, <p>, <ul>...)"
                      rows={10}
                      className="text-xs font-mono"
                    />
                    {errors["translations.0.contentHtml"] && (
                      <p className="text-[11px] text-destructive">
                        {errors["translations.0.contentHtml"]}
                      </p>
                    )}
                  </div>

                  {/* SEO meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-border bg-muted/10">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Tiêu đề SEO</label>
                      <Input
                        value={viMetaTitle}
                        onChange={(e) => setViMetaTitle(e.target.value)}
                        placeholder="Meta title (tối đa 70 ký tự)"
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Mô tả SEO</label>
                      <Input
                        value={viMetaDescription}
                        onChange={(e) => setViMetaDescription(e.target.value)}
                        placeholder="Meta description (tối đa 160 ký tự)"
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB TIẾNG TRUNG */}
              {activeTab === "zh" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">
                      Tiêu đề bài viết (Tiếng Trung)
                    </label>
                    <Input
                      value={zhTitle}
                      onChange={(e) => setZhTitle(e.target.value)}
                      placeholder="VD: 2026年最新外商直接投资许可证申请流程"
                      className="h-8 text-xs font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">
                        Đường dẫn SEO (Slug)
                      </label>
                      <Input
                        value={zhSlug}
                        onChange={(e) => setZhSlug(e.target.value)}
                        placeholder="Tự sinh nếu để trống"
                        className="h-8 text-xs font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                      <Switch checked={zhComplete} onCheckedChange={setZhComplete} id="zhComplete" />
                      <label htmlFor="zhComplete" className="text-xs text-foreground cursor-pointer">
                        Đánh dấu bản dịch tiếng Trung đã hoàn thiện (Đủ điều kiện xuất bản)
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Tóm tắt bài viết</label>
                    <Textarea
                      value={zhSummary}
                      onChange={(e) => setZhSummary(e.target.value)}
                      placeholder="中文摘要..."
                      rows={2}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">
                      Nội dung HTML bài viết (Tiếng Trung)
                    </label>
                    <Textarea
                      value={zhContentHtml}
                      onChange={(e) => setZhContentHtml(e.target.value)}
                      placeholder="请输入文章HTML内容..."
                      rows={10}
                      className="text-xs font-mono"
                    />
                  </div>

                  {/* SEO meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg border border-border bg-muted/10">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Tiêu đề SEO</label>
                      <Input
                        value={zhMetaTitle}
                        onChange={(e) => setZhMetaTitle(e.target.value)}
                        placeholder="中文Meta Title..."
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Mô tả SEO</label>
                      <Input
                        value={zhMetaDescription}
                        onChange={(e) => setZhMetaDescription(e.target.value)}
                        placeholder="中文Meta Description..."
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button type="submit" size="sm" disabled={isPending} className="gap-1.5">
                {isPending && <Loader2 className="size-3.5 animate-spin" />}
                {isEdit ? "Lưu thay đổi" : "Tạo bài viết"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
