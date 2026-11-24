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
import type { OfficeItem } from "../types/offices.types";
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Printer,
  Globe,
  Edit2,
  Calendar,
  Navigation,
} from "lucide-react";

interface OfficeDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  office: OfficeItem | null;
  onEdit?: () => void;
}

export function OfficeDetailDialog({
  open,
  onOpenChange,
  office,
  onEdit,
}: OfficeDetailDialogProps) {
  const [activeTab, setActiveTab] = useState<"vi" | "zh-CN">("vi");

  const vi = office?.translations?.find((t) => t.languageCode === "vi");
  const zh = office?.translations?.find((t) => t.languageCode === "zh-CN");
  const currentTrans = activeTab === "vi" ? vi : zh;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-[#e7dcc3] bg-[#fbf7ee] shrink-0">
          <div className="flex items-center justify-between gap-3 mr-6">
            <div className="flex items-center gap-2 flex-wrap">
              <DialogTitle className="text-base font-semibold">
                Chi tiết văn phòng
              </DialogTitle>
              {office?.isHeadquarters && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs font-semibold">
                  Trụ sở chính
                </Badge>
              )}
              {office && (
                <Badge
                  variant="outline"
                  className={
                    office.status === "published"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-300 text-xs"
                      : "bg-amber-500/10 text-amber-600 border-amber-300 text-xs"
                  }
                >
                  {office.status === "published" ? "Đang hiển thị" : "Bản nháp"}
                </Badge>
              )}
            </div>

            {office && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Calendar className="size-3.5" />{" "}
                {new Date(office.createdAt).toLocaleDateString("vi-VN")}
              </span>
            )}
          </div>

          {office && (
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2 font-mono">
              <span>Mã văn phòng: <strong className="text-foreground">{office.code}</strong></span>
              <span className="text-border">&bull;</span>
              <span>Thứ tự hiển thị: <strong className="text-foreground">{office.displayOrder}</strong></span>
            </p>
          )}
        </DialogHeader>

        {/* Nội dung chi tiết cuộn được */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {!office ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Không tìm thấy thông tin văn phòng.
            </div>
          ) : (
            <>
              {/* Ảnh đại diện tòa nhà */}
              {office.imageUrl ? (
                <div className="relative aspect-video w-full rounded-none overflow-hidden border border-[#e7dcc3] bg-[#fbf7ee] max-h-52">
                  <Image
                    src={office.imageUrl}
                    alt={vi?.name || "Office"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full max-h-28 rounded-none border border-dashed border-[#e7dcc3] flex flex-col items-center justify-center text-muted-foreground/60 gap-1 bg-[#fbf7ee]">
                  <Building2 className="size-6" />
                  <span className="text-xs">Chưa có ảnh tòa nhà văn phòng</span>
                </div>
              )}

              {/* Tab song ngữ: Tên, Địa chỉ, Giờ làm việc, Mô tả */}
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
                </div>

                <TabsContent value={activeTab} className="space-y-4 m-0">
                  {currentTrans ? (
                    <>
                      {/* Tên văn phòng */}
                      <div>
                        <h2 className="text-lg font-bold text-foreground leading-snug">
                          {currentTrans.name}
                        </h2>
                      </div>

                      {/* Địa chỉ & Giờ làm việc */}
                      <div className="space-y-2.5 p-3.5 rounded-none border border-[#e7dcc3] bg-[#fbf7ee] text-xs">
                        <div className="flex items-start gap-2 text-foreground/90">
                          <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{currentTrans.address}</span>
                        </div>
                        {currentTrans.workingHours && (
                          <div className="flex items-center gap-2 text-muted-foreground pt-1 border-t border-[#e7dcc3]/60">
                            <Clock className="size-3.5 shrink-0" />
                            <span>{currentTrans.workingHours}</span>
                          </div>
                        )}
                      </div>

                      {/* Mô tả giới thiệu */}
                      {currentTrans.description && (
                        <div className="border border-[#e7dcc3]/80 rounded-none p-4 bg-[#fcfbf9]">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Giới thiệu văn phòng
                          </h4>
                          <p className="text-xs text-foreground/90 leading-relaxed whitespace-pre-line">
                            {currentTrans.description}
                          </p>
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

              {/* Thông tin liên hệ & WeChat */}
              <div className="p-4 rounded-none border border-[#e7dcc3] bg-[#fcfbf9] space-y-3">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="size-3.5 text-primary" /> Thông tin liên hệ trực tiếp
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {office.phone && (
                    <div className="flex items-center gap-2 text-foreground font-mono">
                      <Phone className="size-3.5 text-muted-foreground" />
                      <span>{office.phone}</span>
                    </div>
                  )}
                  {office.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="size-3.5 text-muted-foreground" />
                      <span className="truncate">{office.email}</span>
                    </div>
                  )}
                  {office.fax && (
                    <div className="flex items-center gap-2 text-muted-foreground font-mono">
                      <Printer className="size-3.5 text-muted-foreground" />
                      <span>Fax: {office.fax}</span>
                    </div>
                  )}
                  {office.wechatId && (
                    <div className="flex items-center gap-2 text-emerald-600 font-mono">
                      <span className="font-bold">WeChat ID:</span>
                      <span>{office.wechatId}</span>
                    </div>
                  )}
                </div>

                {/* QR Code WeChat */}
                {office.wechatQrUrl && (
                  <div className="pt-2 border-t border-[#e7dcc3] flex items-center gap-3">
                    <div className="size-16 relative rounded-none border border-[#e7dcc3] bg-white overflow-hidden p-1 shrink-0">
                      <Image
                        src={office.wechatQrUrl}
                        alt="WeChat QR"
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <strong className="text-foreground block">Mã QR WeChat</strong>
                      <span>Quét mã để kết nối trực tiếp với văn phòng</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tọa độ GPS & Bản đồ Google Maps */}
              {(office.latitude || office.mapEmbedUrl) && (
                <div className="p-4 rounded-none border border-[#e7dcc3] bg-[#fcfbf9] space-y-3">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Navigation className="size-3.5 text-primary" /> Vị trí bản đồ
                  </h4>
                  {office.latitude && office.longitude && (
                    <p className="text-xs font-mono text-muted-foreground">
                      Tọa độ GPS: {office.latitude}, {office.longitude}
                    </p>
                  )}
                  {office.mapEmbedUrl && (
                    <div className="w-full h-48 rounded-none overflow-hidden border border-[#e7dcc3] bg-[#fbf7ee]">
                      <iframe
                        src={office.mapEmbedUrl}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                </div>
              )}
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

          {onEdit && office && (
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                onOpenChange(false);
                onEdit();
              }}
            >
              <Edit2 className="size-3.5" /> Chỉnh sửa văn phòng
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
