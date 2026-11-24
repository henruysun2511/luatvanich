"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { mediaService } from "@/features/media/services/media.service";
import { useAdminLawyers } from "@/features/lawyers";
import { useAdminLegalServices } from "@/features/legal-services";
import {
  useCreatePost,
  useUpdatePost,
  useUpdatePostStatus,
  useAdminPostDetail,
} from "../queries/usePostsQuery";
import { postFormSchema } from "../schemas/post.schema";
import { RichTextEditor } from "./editor";
import { extractCloudinaryKeysFromHtml } from "../utils/html-image-parser.util";
import { toast } from "sonner";
import type {
  PostCategoryItem,
  CreatePostInput,
  PostStatus,
} from "../types/posts.types";
import {
  ArrowLeft,
  FileText,
  Loader2,
  Globe,
  Tag,
  X,
  Star,
  Calendar,
  CalendarClock,
  Sparkles,
  Save,
} from "lucide-react";

interface PostEditorFormProps {
  postIdToEdit?: string | null;
  categories: PostCategoryItem[];
  onSuccess?: () => void;
}

export function PostEditorForm({
  postIdToEdit,
  categories,
  onSuccess,
}: PostEditorFormProps) {
  const router = useRouter();
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
  const updateStatusMutation = useUpdatePostStatus();

  // Danh sách Luật sư & Dịch vụ liên quan
  const { data: lawyersData } = useAdminLawyers({ limit: 100 });
  const lawyers = lawyersData?.items || [];

  const { data: servicesData } = useAdminLegalServices({ limit: 100 });
  const legalServices = servicesData?.items || [];

  // Quản lý ảnh nhúng trong nội dung TipTap
  const sessionUploadedKeys = useRef<Set<string>>(new Set());
  const initialImageKeys = useRef<Set<string>>(new Set());

  // Vòng đời Media Cloudinary cho ảnh bìa
  const thumbnailController = useMediaLifecycle({
    initialUrl: postDetail?.thumbnailUrl || undefined,
    onUrlChange: setThumbnailUrl,
    folder: "posts",
  });

  // Đồng bộ form khi có postDetail hoặc tạo mới
  useEffect(() => {
    if (postDetail) {
      setCategoryId(postDetail.categoryId);
      setAuthorLawyerId(postDetail.authorLawyerId || "none");
      setThumbnailUrl(postDetail.thumbnailUrl || "");
      setIsFeatured(postDetail.isFeatured);
      setStatus(postDetail.status);
      setPublishAt(postDetail.publishAt ? postDetail.publishAt.slice(0, 16) : "");

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

      // Lưu trữ các key ảnh ban đầu để so sánh khi Lưu
      const initialKeys = [
        ...extractCloudinaryKeysFromHtml(vi?.contentHtml),
        ...extractCloudinaryKeysFromHtml(zh?.contentHtml),
      ];
      initialImageKeys.current = new Set(initialKeys);
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
      initialImageKeys.current = new Set();
    }
    setErrors({});
  }, [postDetail, categories]);

  // Xử lý khi ảnh được upload trong TipTap Editor
  const handleImageUploaded = (key: string) => {
    sessionUploadedKeys.current.add(key);
  };

  // Xử lý khi ảnh bị xóa khỏi TipTap Editor
  const handleImageRemoved = async (key: string) => {
    // Nếu là ảnh vừa upload trong phiên này, xóa ngay trên Cloudinary
    if (sessionUploadedKeys.current.has(key)) {
      sessionUploadedKeys.current.delete(key);
      try {
        await mediaService.delete(key);
        toast.info("Đã xóa ảnh khỏi bộ nhớ lưu trữ Cloudinary.");
      } catch (err) {
        console.error("Lỗi xóa ảnh Cloudinary:", err);
      }
    }
  };

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

  const handleCancel = async () => {
    // Rollback: Xóa tất cả các ảnh mới upload trong phiên này
    const keysToDelete = Array.from(sessionUploadedKeys.current);
    if (keysToDelete.length > 0) {
      const toastId = toast.loading("Đang dọn dẹp ảnh tạm trên Cloudinary...");
      await Promise.allSettled(keysToDelete.map((k) => mediaService.delete(k)));
      sessionUploadedKeys.current.clear();
      toast.dismiss(toastId);
    }
    void thumbnailController.rollback();
    router.push("/admin/posts");
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

    if (status === "scheduled") {
      const scheduledDate = new Date(publishAt);
      if (!publishAt || isNaN(scheduledDate.getTime()) || scheduledDate <= new Date()) {
        setErrors((prev) => ({ ...prev, publishAt: "Thời điểm hẹn giờ đăng bài phải ở tương lai." }));
        return;
      }
      if (!viComplete && !zhComplete) {
        setErrors((prev) => ({
          ...prev,
          publishAt: "Cần ít nhất một bản dịch được đánh dấu 'Hoàn thiện' trước khi lên lịch xuất bản.",
        }));
        return;
      }
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

    let targetPostId = postIdToEdit;
    if (isEdit && postIdToEdit) {
      await updateMutation.mutateAsync({ id: postIdToEdit, payload: inputData });
    } else {
      const created = await createMutation.mutateAsync(inputData);
      targetPostId = created.id;
    }

    // Cập nhật trạng thái xuất bản & lên lịch nếu có thay đổi
    if (targetPostId) {
      const isStatusChanged = !isEdit || status !== postDetail?.status;
      const isScheduleChanged =
        status === "scheduled" && publishAt !== (postDetail?.publishAt ? postDetail.publishAt.slice(0, 16) : "");

      if (isStatusChanged || isScheduleChanged) {
        await updateStatusMutation.mutateAsync({
          id: targetPostId,
          payload: {
            status,
            publishAt: status === "scheduled" ? new Date(publishAt).toISOString() : undefined,
          },
        });
      }
    }

    // Xóa các ảnh cũ đã bị gỡ khỏi bài viết trên Cloudinary
    const currentContentKeys = new Set([
      ...extractCloudinaryKeysFromHtml(viContentHtml),
      ...extractCloudinaryKeysFromHtml(zhContentHtml),
    ]);
    const removedOldKeys = Array.from(initialImageKeys.current).filter(
      (key) => !currentContentKeys.has(key),
    );
    if (removedOldKeys.length > 0) {
      await Promise.allSettled(removedOldKeys.map((key) => mediaService.delete(key)));
    }

    // Hoàn tất vòng đời media
    sessionUploadedKeys.current.clear();
    thumbnailController.commit();
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/admin/posts");
    }
  };

  const isPending =
    createMutation.isPending || updateMutation.isPending || updateStatusMutation.isPending;

  if (isLoadingDetail && isEdit) {
    return (
      <div className="p-16 flex flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Đang tải dữ liệu bài viết...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e7dcc3]">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="size-10 rounded-none bg-[#06122b]/5 hover:bg-[#06122b] text-[#06122b] hover:text-[#f0d28a] border border-[#e7dcc3] shrink-0 transition-colors"
            title="Quay lại danh sách bài viết"
          >
            <ArrowLeft className="size-4" />
          </Button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-royal text-[#06122b] tracking-wide leading-tight">
                {isEdit ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
              </h1>
              {isEdit && postDetail && (
                <Badge variant="outline" className="text-[11px] font-mono border-[#c29a45]/40 text-[#06122b] bg-[#fbf7ee]">
                  ID: {postDetail.id.slice(0, 8)}...
                </Badge>
              )}
            </div>
            <p className="text-xs text-[#718096] mt-0.5 font-sans">
              Soạn thảo nội dung cẩm nang pháp luật, liên kết chuyên mục, tác giả luật sư và dịch vụ.
            </p>
          </div>
        </div>

        {/* Nút Hủy và Lưu */}
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={isPending}
            className="text-xs h-9 px-4"
          >
            Hủy bỏ
          </Button>
          <Button
            type="submit"
            variant="royal"
            size="sm"
            disabled={isPending}
            className="text-xs h-9 px-5 gap-1.5 shadow-sm"
          >
            {isPending ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Save className="size-3.5" />
            )}
            <span>{isEdit ? "Lưu thay đổi" : "Xuất bản bài viết"}</span>
          </Button>
        </div>
      </div>

      {/* Main Layout 2 Cột: Cột Nội dung (8 phần) + Cột Thuộc tính Sidebar (4 phần) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* CỘT TRÁI: NỘI DUNG SOẠN THẢO (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* TABS SONG NGỮ NỘI DUNG */}
          <div className="bg-white border border-[#e7dcc3] rounded-none p-5 shadow-xs space-y-4">
            <div className="flex border-b border-[#e7dcc3] pb-1">
              <button
                type="button"
                onClick={() => setActiveTab("vi")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all -mb-px cursor-pointer ${
                  activeTab === "vi"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="size-3.5 text-blue-600" />
                Tiếng Việt (Mặc định)
                {viTitle.trim() && viContentHtml.trim() ? (
                  viComplete ? (
                    <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 h-4 py-0">
                      Đã hoàn thiện
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
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all -mb-px cursor-pointer font-serif ${
                  activeTab === "zh"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="size-3.5 text-red-600" />
                Tiếng Trung (中文)
                {zhTitle.trim() && zhContentHtml.trim() ? (
                  zhComplete ? (
                    <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 h-4 py-0">
                      Đã hoàn thiện
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
              <div className="space-y-4 pt-1">
                {/* Tiêu đề */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Tiêu đề bài viết (Tiếng Việt) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={viTitle}
                    onChange={(e) => setViTitle(e.target.value)}
                    placeholder="VD: Thủ tục cấp giấy phép đầu tư FDI mới nhất năm 2026..."
                    className="h-10 text-sm font-medium"
                  />
                  {errors["translations.0.title"] && (
                    <p className="text-[11px] text-destructive">{errors["translations.0.title"]}</p>
                  )}
                </div>

                {/* Slug & Hoàn thiện */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Đường dẫn SEO (Slug)</label>
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
                      Đánh dấu bản dịch tiếng Việt đã hoàn thiện
                    </label>
                  </div>
                </div>

                {/* Tóm tắt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Tóm tắt ngắn gọn bài viết</label>
                  <Textarea
                    value={viSummary}
                    onChange={(e) => setViSummary(e.target.value)}
                    placeholder="Mô tả súc tích nội dung bài viết, hiển thị trên thẻ xem trước và danh sách..."
                    rows={2}
                    className="text-xs leading-relaxed"
                  />
                </div>

                {/* Nội dung bài viết */}
                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-semibold text-foreground block">
                    Nội dung bài viết (Tiếng Việt) <span className="text-destructive">*</span>
                  </label>
                  <RichTextEditor
                    content={viContentHtml}
                    onChange={setViContentHtml}
                    onImageUploaded={handleImageUploaded}
                    onImageRemoved={handleImageRemoved}
                    placeholder="Soạn thảo nội dung bài viết..."
                    minHeight="400px"
                  />
                  {errors["translations.0.contentHtml"] && (
                    <p className="text-[11px] text-destructive">
                      {errors["translations.0.contentHtml"]}
                    </p>
                  )}
                </div>

                {/* Cấu hình SEO */}
                <div className="p-4 rounded-none border border-[#e7dcc3] bg-[#fcfbf9] space-y-3">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-amber-500" />
                    Tối ưu hóa SEO (Tiếng Việt)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-muted-foreground">Tiêu đề SEO (Meta Title)</label>
                      <Input
                        value={viMetaTitle}
                        onChange={(e) => setViMetaTitle(e.target.value)}
                        placeholder="Meta title (tối đa 70 ký tự)"
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-muted-foreground">Mô tả SEO (Meta Description)</label>
                      <Input
                        value={viMetaDescription}
                        onChange={(e) => setViMetaDescription(e.target.value)}
                        placeholder="Meta description (tối đa 160 ký tự)"
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB TIẾNG TRUNG */}
            {activeTab === "zh" && (
              <div className="space-y-4 pt-1 font-serif">
                {/* Tiêu đề */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Tiêu đề bài viết (Tiếng Trung)
                  </label>
                  <Input
                    value={zhTitle}
                    onChange={(e) => setZhTitle(e.target.value)}
                    placeholder="VD: 2026年最新外商直接投资许可证申请流程及合规要点..."
                    className="h-10 text-sm font-medium"
                  />
                </div>

                {/* Slug & Hoàn thiện */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 font-sans">
                    <label className="text-xs font-medium text-foreground">Đường dẫn SEO (Slug)</label>
                    <Input
                      value={zhSlug}
                      onChange={(e) => setZhSlug(e.target.value)}
                      placeholder="Tự sinh từ tiêu đề nếu để trống"
                      className="h-8 text-xs font-mono"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-6 font-sans">
                    <Switch checked={zhComplete} onCheckedChange={setZhComplete} id="zhComplete" />
                    <label htmlFor="zhComplete" className="text-xs text-foreground cursor-pointer">
                      Đánh dấu bản dịch tiếng Trung đã hoàn thiện
                    </label>
                  </div>
                </div>

                {/* Tóm tắt */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Tóm tắt bài viết (Tiếng Trung)</label>
                  <Textarea
                    value={zhSummary}
                    onChange={(e) => setZhSummary(e.target.value)}
                    placeholder="中文摘要内容..."
                    rows={2}
                    className="text-xs leading-relaxed"
                  />
                </div>

                {/* Nội dung bài viết */}
                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-semibold text-foreground block">
                    Nội dung bài viết (Tiếng Trung)
                  </label>
                  <RichTextEditor
                    content={zhContentHtml}
                    onChange={setZhContentHtml}
                    onImageUploaded={handleImageUploaded}
                    onImageRemoved={handleImageRemoved}
                    placeholder="请输入中文文章正文内容..."
                    minHeight="400px"
                  />
                </div>

                {/* Cấu hình SEO */}
                <div className="p-4 rounded-none border border-[#e7dcc3] bg-[#fcfbf9] space-y-3 font-sans">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-amber-500" />
                    Tối ưu hóa SEO (Tiếng Trung)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-muted-foreground">Tiêu đề SEO</label>
                      <Input
                        value={zhMetaTitle}
                        onChange={(e) => setZhMetaTitle(e.target.value)}
                        placeholder="中文Meta Title..."
                        className="h-8 text-xs font-serif"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-muted-foreground">Mô tả SEO</label>
                      <Input
                        value={zhMetaDescription}
                        onChange={(e) => setZhMetaDescription(e.target.value)}
                        placeholder="中文Meta Description..."
                        className="h-8 text-xs font-serif"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CỘT PHẢI: THUỘC TÍNH & CÀI ĐẶT SIDEBAR (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-5">
          {/* 1. Trạng thái xuất bản & Lên lịch */}
          <div className="bg-white border border-[#e7dcc3] rounded-none p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <CalendarClock className="size-3.5 text-primary" />
              Xuất bản & Lên lịch
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Trạng thái phát hành</label>
              <Select
                value={status}
                onValueChange={(val) => {
                  setStatus(val as PostStatus);
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.publishAt;
                    return next;
                  });
                }}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Bản nháp (Chưa công khai)</SelectItem>
                  <SelectItem value="scheduled">Lên lịch đăng bài (Hẹn giờ)</SelectItem>
                  <SelectItem value="published">Xuất bản ngay (Công khai)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {status === "scheduled" && (
              <div className="space-y-1.5 p-3 rounded-none border border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
                <label className="text-xs font-medium text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  Thời gian xuất bản dự kiến <span className="text-destructive">*</span>
                </label>
                <Input
                  type="datetime-local"
                  value={publishAt}
                  min={new Date(Date.now() + 5 * 60000).toISOString().slice(0, 16)}
                  onChange={(e) => {
                    setPublishAt(e.target.value);
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.publishAt;
                      return next;
                    });
                  }}
                  className="h-8 text-xs font-mono"
                />
                {errors.publishAt && (
                  <p className="text-[11px] text-destructive">{errors.publishAt}</p>
                )}
                <span className="block text-[10px] text-muted-foreground mt-1">
                  Hệ thống Cron Job sẽ tự động phát hành bài viết đúng thời điểm này.
                </span>
              </div>
            )}

            {/* Ghim tiêu điểm */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#e7dcc3]">
              <Switch checked={isFeatured} onCheckedChange={setIsFeatured} id="isFeatured" />
              <label
                htmlFor="isFeatured"
                className="text-xs font-medium text-foreground cursor-pointer flex items-center gap-1.5"
              >
                <Star className="size-3.5 text-amber-500 fill-amber-500" />
                Ghim bài viết tiêu điểm (Trang chủ)
              </label>
            </div>
          </div>

          {/* 2. Ảnh bìa đại diện */}
          <div className="bg-white border border-[#e7dcc3] rounded-none p-4 shadow-xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Ảnh bìa bài viết
            </h3>
            <SingleImageUpload
              label="Tải ảnh bìa"
              value={thumbnailUrl}
              controller={thumbnailController}
              aspectRatio="video"
              recommendedSize="Khuyến nghị 1200x630px (16:9), tối đa 5MB"
            />
          </div>

          {/* 3. Phân loại & Tác giả */}
          <div className="bg-white border border-[#e7dcc3] rounded-none p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Phân loại & Tác giả
            </h3>

            {/* Chuyên mục */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">
                Chuyên mục <span className="text-destructive">*</span>
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

            {/* Luật sư tác giả */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Luật sư tác giả</label>
              <Select value={authorLawyerId} onValueChange={setAuthorLawyerId}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Không gắn tác giả" />
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

            {/* Thẻ tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <Tag className="size-3.5 text-muted-foreground" />
                Thẻ tag (Gõ và nhấn Enter)
              </label>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="VD: FDI, Doanh nghiệp... (Enter)"
                className="h-8 text-xs"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none text-[11px] bg-[#fbf7ee] text-[#06122b] border border-[#e7dcc3]"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="size-3.5 rounded-none hover:bg-[#a3171e] hover:text-white flex items-center justify-center cursor-pointer"
                      >
                        <X className="size-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. Dịch vụ pháp lý liên quan */}
          {legalServices.length > 0 && (
            <div className="bg-white border border-[#e7dcc3] rounded-none p-4 shadow-xs space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Dịch vụ pháp lý liên kết
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Hiển thị gợi ý dưới chân bài viết để khách hàng liên hệ
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-1">
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
                      className={`text-[11px] px-2.5 py-1 rounded-none border transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary font-medium"
                          : "bg-[#fbf7ee] text-[#06122b] border-[#e7dcc3] hover:bg-[#f6f1e8]"
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
        </div>
      </div>
    </form>
  );
}
