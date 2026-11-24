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
import type { PracticeAreaItem } from "../types/practice-areas.types";
import {
  Layers,
  Globe,
  Edit2,
  Star,
  ExternalLink,
  Calendar,
  Scale,
  Clock,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

interface PracticeAreaDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  area: PracticeAreaItem | null;
  onEdit?: () => void;
}

export function PracticeAreaDetailDialog({
  open,
  onOpenChange,
  area,
  onEdit,
}: PracticeAreaDetailDialogProps) {
  const [activeTab, setActiveTab] = useState<"vi" | "zh-CN">("vi");

  const vi = area?.translations?.find((t) => t.languageCode === "vi");
  const zh = area?.translations?.find((t) => t.languageCode === "zh-CN");
  const currentTrans = activeTab === "vi" ? vi : zh;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-[#e7dcc3] bg-[#fbf7ee] shrink-0">
          <div className="flex items-center justify-between gap-3 mr-6">
            <div className="flex items-center gap-2 flex-wrap">
              <DialogTitle className="text-base font-semibold">
                Chi tiết lĩnh vực hoạt động
              </DialogTitle>
              {area && (
                <Badge
                  variant="outline"
                  className={
                    area.status === "published"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-300 text-xs"
                      : "bg-amber-500/10 text-amber-600 border-amber-300 text-xs"
                  }
                >
                  {area.status === "published" ? "Đang hiển thị" : "Bản nháp"}
                </Badge>
              )}
              {area?.isFeatured && (
                <Badge variant="outline" className="gap-1 bg-amber-500/10 text-amber-600 border-amber-300 text-xs">
                  <Star className="size-3 fill-amber-500 text-amber-500" /> Nổi bật
                </Badge>
              )}
              {area?.hanziBadge && (
                <Badge variant="outline" className="border-[#c29a45] text-[#8a1c14] bg-[#fbf7ee] font-serif text-xs font-bold px-2">
                  Chữ Hán: {area.hanziBadge}
                </Badge>
              )}
            </div>

            {area && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Calendar className="size-3.5" />{" "}
                {new Date(area.createdAt).toLocaleDateString("vi-VN")}
              </span>
            )}
          </div>

          {area && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
              <Layers className="size-3 text-muted-foreground" />
              Quy mô: <strong className="text-foreground">{area.servicesCount} dịch vụ trực thuộc</strong>
              <span className="text-border">&bull;</span>
              <span>Thứ tự: <strong className="text-foreground font-mono">{area.displayOrder}</strong></span>
            </p>
          )}
        </DialogHeader>

        {/* Nội dung chi tiết cuộn được */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {!area ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Không tìm thấy thông tin lĩnh vực.
            </div>
          ) : (
            <>
              {/* Icon / Ảnh minh họa */}
              {area.iconUrl ? (
                <div className="relative aspect-video w-full rounded-none overflow-hidden border border-[#e7dcc3] bg-[#fbf7ee] max-h-48">
                  <Image
                    src={area.iconUrl}
                    alt={vi?.name || "Icon"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 560px"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full max-h-28 rounded-none border border-dashed border-[#e7dcc3] flex flex-col items-center justify-center text-muted-foreground/60 gap-1 bg-[#fbf7ee]">
                  <Scale className="size-6" />
                  <span className="text-xs">Chưa có hình ảnh minh họa</span>
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
                    <span className="text-xs font-mono text-muted-foreground truncate max-w-[200px]">
                      /{currentTrans.slug}
                    </span>
                  )}
                </div>

                <TabsContent value={activeTab} className="space-y-4 m-0">
                  {currentTrans ? (
                    <>
                      {/* Tên lĩnh vực */}
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-foreground leading-snug">
                          {currentTrans.name}
                        </h2>
                        {area.hanziBadge && (
                          <div className="shrink-0 size-9 rounded-none border border-[#c29a45]/50 bg-[#fbf7ee] flex items-center justify-center font-serif text-lg font-bold text-[#8a1c14] shadow-sm">
                            {area.hanziBadge}
                          </div>
                        )}
                      </div>

                      {/* Các điểm phạm vi dịch vụ nổi bật (Scope Points) */}
                      {currentTrans.scopePoints && currentTrans.scopePoints.length > 0 && (
                        <div className="border border-[#c29a45]/30 bg-[#fbf7ee]/60 rounded-none p-4 space-y-2.5">
                          <h4 className="text-xs font-semibold text-[#8a1c14] uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="size-3.5 text-[#c29a45]" /> Phạm vi công việc chi tiết (Scope Points)
                          </h4>
                          <ul className="space-y-1.5">
                            {currentTrans.scopePoints.map((point, idx) => (
                              <li key={idx} className="text-xs text-foreground/90 flex items-start gap-2">
                                <span className="text-[#8a1c14] font-bold">✦</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Thời gian & Hình thức phí */}
                      {(currentTrans.estimatedTime || currentTrans.feeStructure) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {currentTrans.estimatedTime && (
                            <div className="border border-[#e7dcc3] bg-[#fcfbf9] p-3 rounded-none">
                              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                                <Clock className="size-3 text-[#c29a45]" /> Thời gian ước tính
                              </span>
                              <p className="text-xs font-semibold text-foreground mt-0.5">
                                {currentTrans.estimatedTime}
                              </p>
                            </div>
                          )}
                          {currentTrans.feeStructure && (
                            <div className="border border-[#e7dcc3] bg-[#fcfbf9] p-3 rounded-none">
                              <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                                <DollarSign className="size-3 text-[#c29a45]" /> Hình thức phí
                              </span>
                              <p className="text-xs font-semibold text-foreground mt-0.5">
                                {currentTrans.feeStructure}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Mô tả phạm vi chuyên môn */}
                      {currentTrans.description ? (
                        <div className="border border-[#e7dcc3]/80 rounded-none p-4 bg-[#fcfbf9]">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Phạm vi tư vấn chuyên môn
                          </h4>
                          <p className="text-xs text-foreground/90 leading-relaxed whitespace-pre-line">
                            {currentTrans.description}
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs text-muted-foreground border border-dashed rounded-none">
                          Chưa có mô tả cho ngôn ngữ này.
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

          {onEdit && area && (
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                onOpenChange(false);
                onEdit();
              }}
            >
              <Edit2 className="size-3.5" /> Chỉnh sửa lĩnh vực
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
