"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostStatusBadge } from "./PostStatusBadge";
import { useAdminPostDetail } from "../queries/usePostsQuery";
import {
  Eye,
  Calendar,
  Tag as TagIcon,
  Globe,
  Edit2,
  Loader2,
  Star,
  ExternalLink,
  ImageIcon,
} from "lucide-react";

interface PostDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postId?: string | null;
  categoryName?: string;
  onEdit?: () => void;
}

export function PostDetailDialog({
  open,
  onOpenChange,
  postId,
  categoryName,
  onEdit,
}: PostDetailDialogProps) {
  const [activeTab, setActiveTab] = useState<"vi" | "zh-CN">("vi");
  const { data: post, isLoading } = useAdminPostDetail(open ? postId : null);

  const vi = post?.translations?.find((t) => t.languageCode === "vi");
  const zh = post?.translations?.find((t) => t.languageCode === "zh-CN");
  const currentTrans = activeTab === "vi" ? vi : zh;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border bg-muted/20 shrink-0">
          <div className="flex items-center justify-between gap-3 mr-6">
            <div className="flex items-center gap-2 flex-wrap">
              <DialogTitle className="text-base font-semibold">
                Chi tiết bài viết
              </DialogTitle>
              {post && <PostStatusBadge status={post.status} />}
              {post?.isFeatured && (
                <Badge variant="outline" className="gap-1 bg-amber-500/10 text-amber-600 border-amber-300 text-xs">
                  <Star className="size-3 fill-amber-500 text-amber-500" /> Nổi bật
                </Badge>
              )}
            </div>

            {post && (
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <Eye className="size-3.5" /> {post.viewsCount} lượt xem
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" />{" "}
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
            )}
          </div>

          {categoryName && (
            <p className="text-xs text-muted-foreground mt-1">
              Chuyên mục: <strong className="text-foreground">{categoryName}</strong>
            </p>
          )}
        </DialogHeader>

        {/* Nội dung chi tiết cuộn được */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2 text-sm">
              <Loader2 className="size-6 animate-spin text-primary" />
              Đang tải nội dung bài viết...
            </div>
          ) : !post ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Không tìm thấy thông tin bài viết.
            </div>
          ) : (
            <>
              {/* Ảnh bìa */}
              {post.thumbnailUrl ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border bg-muted/40">
                  <Image
                    src={post.thumbnailUrl}
                    alt={vi?.title || "Thumbnail"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-lg border border-dashed border-border flex flex-col items-center justify-center text-muted-foreground/60 gap-1 bg-muted/20">
                  <ImageIcon className="size-8" />
                  <span className="text-xs">Chưa có ảnh bìa</span>
                </div>
              )}

              {/* Tab song ngữ */}
              <Tabs
                value={activeTab}
                onValueChange={(val) => setActiveTab(val as "vi" | "zh-CN")}
                className="w-full"
              >
                <div className="flex items-center justify-between border-b border-border pb-2 mb-4">
                  <TabsList className="h-8">
                    <TabsTrigger value="vi" className="text-xs gap-1.5 px-3">
                      <Globe className="size-3.5 text-blue-500" /> Tiếng Việt
                      {vi?.isComplete && (
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="zh-CN" className="text-xs gap-1.5 px-3 font-serif">
                      <Globe className="size-3.5 text-red-500" /> 中文 (Tiếng Trung)
                      {zh?.isComplete && (
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                      )}
                    </TabsTrigger>
                  </TabsList>

                  {currentTrans?.slug && (
                    <span className="text-xs font-mono text-muted-foreground truncate max-w-[280px]">
                      /{currentTrans.slug}
                    </span>
                  )}
                </div>

                <TabsContent value={activeTab} className="space-y-4 m-0">
                  {currentTrans ? (
                    <>
                      {/* Tiêu đề */}
                      <div>
                        <h2 className="text-lg font-bold text-foreground leading-snug">
                          {currentTrans.title}
                        </h2>
                      </div>

                      {/* Tóm tắt */}
                      {currentTrans.summary && (
                        <div className="p-3.5 rounded-md bg-muted/40 border-l-4 border-primary text-xs text-foreground/90 italic leading-relaxed">
                          {currentTrans.summary}
                        </div>
                      )}

                      {/* Toàn bộ nội dung Rich HTML */}
                      {currentTrans.contentHtml ? (
                        <div className="border border-border/80 rounded-lg p-5 bg-card">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Nội dung chi tiết
                          </h4>
                          <div
                            className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed overflow-x-auto"
                            dangerouslySetInnerHTML={{ __html: currentTrans.contentHtml }}
                          />
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs text-muted-foreground border border-dashed rounded-md">
                          Chưa có nội dung chi tiết cho ngôn ngữ này.
                        </div>
                      )}

                      {/* Hộp SEO Meta */}
                      {(currentTrans.metaTitle || currentTrans.metaDescription) && (
                        <div className="rounded-lg border border-border p-4 bg-muted/20 space-y-2">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <ExternalLink className="size-3.5" /> Thẻ SEO Meta
                          </h4>
                          {currentTrans.metaTitle && (
                            <div className="text-xs">
                              <span className="text-muted-foreground">SEO Title: </span>
                              <span className="font-medium text-foreground">{currentTrans.metaTitle}</span>
                            </div>
                          )}
                          {currentTrans.metaDescription && (
                            <div className="text-xs">
                              <span className="text-muted-foreground">SEO Description: </span>
                              <span className="text-foreground">{currentTrans.metaDescription}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-6 text-center text-xs text-muted-foreground">
                      Chưa có bản dịch cho ngôn ngữ này.
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Danh sách Thẻ Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <TagIcon className="size-3" /> Thẻ từ khóa (Tags):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="secondary"
                        className="text-[11px] font-normal"
                        style={{
                          backgroundColor: tag.colorHex ? `${tag.colorHex}15` : undefined,
                          color: tag.colorHex || undefined,
                          borderColor: tag.colorHex ? `${tag.colorHex}30` : undefined,
                        }}
                      >
                        #{tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 border-t border-border bg-muted/10 shrink-0 flex items-center justify-between sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>

          {onEdit && post && (
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                onOpenChange(false);
                onEdit();
              }}
            >
              <Edit2 className="size-3.5" /> Chỉnh sửa bài viết
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
