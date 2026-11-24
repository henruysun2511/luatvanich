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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdatePost, useUpdatePostStatus } from "../queries/usePostsQuery";
import { PostStatusBadge } from "./PostStatusBadge";
import { SchedulePostDialog } from "./SchedulePostDialog";
import type { PostItem, PostCategoryItem, PostStatus } from "../types/posts.types";
import {
  FileText,
  Edit2,
  Trash2,
  Star,
  Eye,
  Loader2,
  ImageIcon,
  CalendarClock,
} from "lucide-react";

interface PostListTableProps {
  posts: PostItem[];
  categories: PostCategoryItem[];
  isLoading: boolean;
  onViewDetail: (post: PostItem) => void;
  onEdit: (post: PostItem) => void;
  onDelete: (post: PostItem) => void;
}

export function PostListTable({
  posts,
  categories,
  isLoading,
  onViewDetail,
  onEdit,
  onDelete,
}: PostListTableProps) {
  const updatePostMutation = useUpdatePost();
  const updateStatusMutation = useUpdatePostStatus();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [schedulingPost, setSchedulingPost] = useState<PostItem | null>(null);

  // Tạo map id -> name cho category
  const categoryMap = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of categories) {
      const name =
        cat.translations.find((t) => t.languageCode === "vi")?.name ||
        cat.translations[0]?.name ||
        "Chuyên mục";
      map.set(cat.id, name);
    }
    return map;
  }, [categories]);

  const handleToggleFeatured = async (post: PostItem) => {
    setUpdatingId(post.id);
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        payload: { isFeatured: !post.isFeatured },
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleChangeStatus = async (post: PostItem, newStatus: PostStatus) => {
    if (newStatus === post.status) return;

    if (newStatus === "scheduled") {
      setSchedulingPost(post);
      return;
    }

    setUpdatingId(post.id);
    try {
      await updateStatusMutation.mutateAsync({
        id: post.id,
        payload: { status: newStatus },
      });
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading && posts.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-12 flex flex-col items-center justify-center gap-2">
        <Loader2 className="size-6 animate-spin text-primary" />
        <span className="text-xs text-muted-foreground">Đang tải danh sách bài viết...</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-12 flex flex-col items-center justify-center text-center">
        <FileText className="size-10 text-muted-foreground/60 mb-2" />
        <h3 className="font-semibold text-foreground text-sm">Chưa có bài viết nào</h3>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">
          Nhấn &quot;Thêm bài viết&quot; để biên tập và xuất bản cẩm nang, tin tức pháp lý.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-none overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Ảnh bìa</TableHead>
            <TableHead>Tiêu đề bài viết</TableHead>
            <TableHead className="w-[160px]">Chuyên mục</TableHead>
            <TableHead className="w-[140px] text-center">Thẻ Tags</TableHead>
            <TableHead className="w-[90px] text-center">Tiêu điểm</TableHead>
            <TableHead className="w-[80px] text-center">Lượt xem</TableHead>
            <TableHead className="w-[140px]">Trạng thái</TableHead>
            <TableHead className="w-[90px] text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => {
            const vi = post.translations.find((t) => t.languageCode === "vi");
            const zh = post.translations.find((t) => t.languageCode === "zh-CN");
            const categoryName = categoryMap.get(post.categoryId) || "Không xác định";
            const isRowUpdating = updatingId === post.id;

            return (
              <TableRow key={post.id} className="hover:bg-muted/30">
                {/* Ảnh bìa */}
                <TableCell>
                  <div className="relative size-12 rounded-md overflow-hidden bg-muted/60 border border-border flex items-center justify-center shrink-0">
                    {post.thumbnailUrl ? (
                      <Image
                        src={post.thumbnailUrl}
                        alt={vi?.title || "Thumbnail"}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <ImageIcon className="size-5 text-muted-foreground/40" />
                    )}
                  </div>
                </TableCell>

                {/* Tiêu đề & slug */}
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-foreground text-xs leading-snug line-clamp-2">
                      {vi?.title || zh?.title || "Chưa đặt tiêu đề"}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="font-mono truncate max-w-[200px]">/{vi?.slug || zh?.slug}</span>
                      {zh && (
                        <span className="text-[10px] text-blue-600 bg-blue-50 px-1 rounded border border-blue-200">
                          ZH
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Chuyên mục */}
                <TableCell>
                  <Badge variant="outline" className="text-[11px] font-normal truncate max-w-[150px]">
                    {categoryName}
                  </Badge>
                </TableCell>

                {/* Thẻ tags */}
                <TableCell className="text-center">
                  <div className="flex flex-wrap gap-1 justify-center max-w-[140px]">
                    {(post.tags || []).length > 0 ? (
                      post.tags!.slice(0, 2).map((t) => (
                        <span
                          key={t.id}
                          className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono"
                        >
                          #{t.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-muted-foreground/60">—</span>
                    )}
                    {(post.tags || []).length > 2 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{post.tags!.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Tiêu điểm (isFeatured) */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <Switch
                      checked={post.isFeatured}
                      disabled={isRowUpdating}
                      onCheckedChange={() => handleToggleFeatured(post)}
                      className="scale-75"
                    />
                  </div>
                </TableCell>

                {/* Lượt xem */}
                <TableCell className="text-center font-mono text-xs text-muted-foreground">
                  <div className="flex items-center justify-center gap-1">
                    <Eye className="size-3 text-muted-foreground/60" />
                    <span>{post.viewsCount}</span>
                  </div>
                </TableCell>

                {/* Đổi trạng thái nhanh */}
                <TableCell>
                  <div className="space-y-1">
                    <Select
                      value={post.status}
                      disabled={isRowUpdating}
                      onValueChange={(val) => handleChangeStatus(post, val as PostStatus)}
                    >
                      <SelectTrigger className="h-7 text-[11px] w-[125px] border-border">
                        <SelectValue>
                          <PostStatusBadge status={post.status} />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Bản nháp</SelectItem>
                        <SelectItem value="scheduled">Đã lên lịch</SelectItem>
                        <SelectItem value="published">Đã xuất bản</SelectItem>
                      </SelectContent>
                    </Select>

                    {post.status === "scheduled" && post.publishAt && (
                      <button
                        type="button"
                        onClick={() => setSchedulingPost(post)}
                        className="flex items-center gap-1 text-[10px] text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 font-mono hover:underline cursor-pointer pt-0.5"
                        title="Bấm để đổi giờ hẹn xuất bản"
                      >
                        <CalendarClock className="size-3 shrink-0" />
                        <span>
                          {new Date(post.publishAt).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </button>
                    )}
                  </div>
                </TableCell>

                {/* Thao tác */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-foreground"
                      onClick={() => onViewDetail(post)}
                      title="Xem chi tiết bài viết"
                    >
                      <Eye className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => onEdit(post)}
                      title="Sửa bài viết"
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onDelete(post)}
                      title="Xóa bài viết"
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

      {/* Dialog lên lịch đăng bài */}
      <SchedulePostDialog
        open={Boolean(schedulingPost)}
        onOpenChange={(open) => !open && setSchedulingPost(null)}
        post={schedulingPost}
      />
    </div>
  );
}
