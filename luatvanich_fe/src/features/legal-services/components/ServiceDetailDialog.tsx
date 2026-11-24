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
import { useAdminLegalServiceDetail } from "../queries/useServiceQuery";
import {
  Briefcase,
  Layers,
  Globe,
  Edit2,
  Loader2,
  Star,
  ExternalLink,
  Calendar,
} from "lucide-react";

interface ServiceDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceId?: string | null;
  onEdit?: () => void;
}

export function ServiceDetailDialog({
  open,
  onOpenChange,
  serviceId,
  onEdit,
}: ServiceDetailDialogProps) {
  const [activeTab, setActiveTab] = useState<"vi" | "zh-CN">("vi");
  const { data: service, isLoading } = useAdminLegalServiceDetail(
    open && serviceId ? serviceId : "",
  );

  const vi = (service as any)?.translations?.find((t: any) => t.languageCode === "vi");
  const zh = (service as any)?.translations?.find((t: any) => t.languageCode === "zh-CN");
  const currentTrans = activeTab === "vi" ? vi : zh;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-4xl lg:max-w-5xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-[#e7dcc3] bg-[#fbf7ee] shrink-0">
          <div className="flex items-center justify-between gap-3 mr-6">
            <div className="flex items-center gap-2 flex-wrap">
              <DialogTitle className="text-base font-semibold">
                Chi tiết dịch vụ pháp lý
              </DialogTitle>
              {service && (
                <Badge
                  variant="outline"
                  className={
                    service.status === "published"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-300 text-xs"
                      : "bg-amber-500/10 text-amber-600 border-amber-300 text-xs"
                  }
                >
                  {service.status === "published" ? "Đang hiển thị" : "Bản nháp"}
                </Badge>
              )}
              {service?.isFeatured && (
                <Badge variant="outline" className="gap-1 bg-amber-500/10 text-amber-600 border-amber-300 text-xs">
                  <Star className="size-3 fill-amber-500 text-amber-500" /> Nổi bật
                </Badge>
              )}
            </div>

            {service && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Calendar className="size-3.5" />{" "}
                {new Date(service.createdAt).toLocaleDateString("vi-VN")}
              </span>
            )}
          </div>

          {service?.practiceArea?.name && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
              <Layers className="size-3 text-muted-foreground" />
              Lĩnh vực trực thuộc: <strong className="text-foreground">{service.practiceArea.name}</strong>
            </p>
          )}
        </DialogHeader>

        {/* Nội dung chi tiết cuộn được */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2 text-sm">
              <Loader2 className="size-6 animate-spin text-primary" />
              Đang tải nội dung dịch vụ...
            </div>
          ) : !service ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Không tìm thấy thông tin dịch vụ.
            </div>
          ) : (
            <>
              {/* Ảnh bìa */}
              {service.coverImageUrl ? (
                <div className="relative aspect-video w-full rounded-none overflow-hidden border border-[#e7dcc3] bg-[#fbf7ee] max-h-56">
                  <Image
                    src={service.coverImageUrl}
                    alt={vi?.title || "Cover"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full max-h-36 rounded-none border border-dashed border-[#e7dcc3] flex flex-col items-center justify-center text-muted-foreground/60 gap-1 bg-[#fbf7ee]">
                  <Briefcase className="size-6" />
                  <span className="text-xs">Chưa có ảnh bìa dịch vụ</span>
                </div>
              )}

              {/* Tab song ngữ */}
              <Tabs
                value={activeTab}
                onValueChange={(val) => setActiveTab(val as "vi" | "zh-CN")}
                className="w-full"
              >
                <div className="flex items-center justify-between border-b border-[#e7dcc3] pb-2 mb-4">
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
                    <span className="text-xs font-mono text-muted-foreground truncate max-w-[240px]">
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
                      {currentTrans.excerpt && (
                        <div className="p-3.5 rounded-none bg-[#fbf7ee] border-l-4 border-primary text-xs text-foreground/90 italic leading-relaxed">
                          {currentTrans.excerpt}
                        </div>
                      )}

                      {/* Nội dung Rich HTML */}
                      {currentTrans.contentHtml ? (
                        <div className="border border-[#e7dcc3]/80 rounded-none p-5 bg-[#fcfbf9]">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                            Nội dung chi tiết dịch vụ
                          </h4>
                          <div
                            className="prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed overflow-x-auto"
                            dangerouslySetInnerHTML={{ __html: currentTrans.contentHtml }}
                          />
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs text-muted-foreground border border-dashed rounded-none">
                          Chưa có bài viết chi tiết cho ngôn ngữ này.
                        </div>
                      )}

                      {/* Hộp SEO Meta */}
                      {(currentTrans.metaTitle || currentTrans.metaDescription) && (
                        <div className="rounded-none border border-[#e7dcc3] p-4 bg-[#fbf7ee] space-y-2">
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
            </>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 border-t border-[#e7dcc3] bg-muted/10 shrink-0 flex items-center justify-between sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Đóng
          </Button>

          {onEdit && service && (
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                onOpenChange(false);
                onEdit();
              }}
            >
              <Edit2 className="size-3.5" /> Chỉnh sửa dịch vụ
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
