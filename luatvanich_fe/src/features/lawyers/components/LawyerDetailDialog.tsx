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
import { useAdminLawyerDetail } from "../queries/useLawyersQuery";
import type { CredentialKind } from "../types/lawyers.types";
import {
  User,
  Phone,
  Mail,
  Building,
  Award,
  Globe,
  Edit2,
  Loader2,
  Star,
  ExternalLink,
  Layers,
  GraduationCap,
  BookOpen,
  Scale,
} from "lucide-react";

const CREDENTIAL_LABELS: Record<CredentialKind, { label: string; icon: any }> = {
  education: { label: "Học vấn", icon: GraduationCap },
  certificate: { label: "Chứng chỉ", icon: Award },
  membership: { label: "Hội viên / Tổ chức", icon: Building },
  award: { label: "Giải thưởng & Danh hiệu", icon: Star },
  notable_case: { label: "Vụ việc tiêu biểu", icon: Scale },
  publication: { label: "Ấn phẩm / Bài viết", icon: BookOpen },
};

interface LawyerDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lawyerId?: string | null;
  onEdit?: () => void;
}

export function LawyerDetailDialog({
  open,
  onOpenChange,
  lawyerId,
  onEdit,
}: LawyerDetailDialogProps) {
  const [activeTab, setActiveTab] = useState<"vi" | "zh-CN">("vi");
  const { data: lawyer, isLoading } = useAdminLawyerDetail(
    open && lawyerId ? lawyerId : "",
  );

  const vi = lawyer?.translations?.find((t) => t.languageCode === "vi");
  const zh = lawyer?.translations?.find((t) => t.languageCode === "zh-CN");
  const currentTrans = activeTab === "vi" ? vi : zh;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border bg-muted/20 shrink-0">
          <div className="flex items-center justify-between gap-3 mr-6">
            <div className="flex items-center gap-2 flex-wrap">
              <DialogTitle className="text-base font-semibold">
                Hồ sơ chi tiết luật sư
              </DialogTitle>
              {lawyer && (
                <Badge
                  variant="outline"
                  className={
                    lawyer.status === "published"
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-300 text-xs"
                      : "bg-amber-500/10 text-amber-600 border-amber-300 text-xs"
                  }
                >
                  {lawyer.status === "published" ? "Đang hiển thị" : "Bản nháp"}
                </Badge>
              )}
              {lawyer?.isFeatured && (
                <Badge variant="outline" className="gap-1 bg-amber-500/10 text-amber-600 border-amber-300 text-xs">
                  <Star className="size-3 fill-amber-500 text-amber-500" /> Nổi bật
                </Badge>
              )}
            </div>

            {lawyer?.experienceYears && (
              <span className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded border border-border">
                {lawyer.experienceYears} năm kinh nghiệm
              </span>
            )}
          </div>
        </DialogHeader>

        {/* Nội dung chi tiết cuộn được */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-muted-foreground gap-2 text-sm">
              <Loader2 className="size-6 animate-spin text-primary" />
              Đang tải hồ sơ luật sư...
            </div>
          ) : !lawyer ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              Không tìm thấy thông tin luật sư.
            </div>
          ) : (
            <>
              {/* Khối Thông tin tổng quan (Ảnh thẻ 4:5 + Liên hệ) */}
              <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl border border-border bg-card shadow-xs">
                {/* Ảnh thẻ 4:5 */}
                <div className="w-28 h-36 rounded-lg overflow-hidden border border-border bg-muted/40 shrink-0 relative shadow-xs">
                  {lawyer.avatarUrl ? (
                    <Image
                      src={lawyer.avatarUrl}
                      alt={vi?.fullName || "Avatar"}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/50">
                      <User className="size-10" />
                    </div>
                  )}
                </div>

                {/* Thông tin liên hệ & chức danh */}
                <div className="flex-1 space-y-2 text-xs">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {vi?.fullName || zh?.fullName}
                      {zh?.latinName && (
                        <span className="text-xs font-normal text-muted-foreground ml-2">
                          ({zh.latinName})
                        </span>
                      )}
                    </h3>
                    <p className="text-primary font-medium mt-0.5">
                      {vi?.title || zh?.title || "Luật sư"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border">
                    {lawyer.officeName && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Building className="size-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{lawyer.officeName}</span>
                      </div>
                    )}
                    {lawyer.email && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Mail className="size-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{lawyer.email}</span>
                      </div>
                    )}
                    {lawyer.mobilePhone && (
                      <div className="flex items-center gap-1.5 text-muted-foreground font-mono">
                        <Phone className="size-3.5 text-muted-foreground shrink-0" />
                        <span>{lawyer.mobilePhone}</span>
                      </div>
                    )}
                    {lawyer.wechatId && (
                      <div className="flex items-center gap-1.5 text-emerald-600 font-mono">
                        <span className="font-bold">WeChat:</span>
                        <span>{lawyer.wechatId}</span>
                      </div>
                    )}
                    {lawyer.licenseNumber && (
                      <div className="flex items-center gap-1.5 text-muted-foreground col-span-1 sm:col-span-2">
                        <Scale className="size-3.5 text-muted-foreground shrink-0" />
                        <span>Thẻ hành nghề: <strong>{lawyer.licenseNumber}</strong></span>
                        {lawyer.barAssociation && <span>({lawyer.barAssociation})</span>}
                      </div>
                    )}
                  </div>

                  {/* Lĩnh vực & Ngôn ngữ */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {lawyer.practiceAreas?.map((pa) => (
                      <Badge
                        key={pa.id}
                        variant="secondary"
                        className={`text-[10px] ${
                          pa.isPrimary
                            ? "bg-primary/10 text-primary border-primary/20 font-semibold"
                            : "font-normal"
                        }`}
                      >
                        <Layers className="size-2.5 mr-1" />
                        {pa.name}
                        {pa.isPrimary && " (Chính)"}
                      </Badge>
                    ))}

                    {lawyer.languages?.map((lang) => (
                      <Badge
                        key={lang.languageCode}
                        variant="outline"
                        className="text-[10px] font-mono text-muted-foreground"
                      >
                        {lang.languageCode.toUpperCase()}
                        {lang.isNative && " (Bản ngữ)"}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab song ngữ: Tiểu sử chi tiết */}
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
                    <span className="text-xs font-mono text-muted-foreground truncate max-w-[240px]">
                      /{currentTrans.slug}
                    </span>
                  )}
                </div>

                <TabsContent value={activeTab} className="space-y-4 m-0">
                  {currentTrans ? (
                    <>
                      {/* Chức vụ & Học vị */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs p-3.5 rounded-lg border border-border bg-muted/20">
                        {currentTrans.secondaryTitle && (
                          <div>
                            <span className="text-muted-foreground">Chức vụ kiêm nhiệm: </span>
                            <span className="font-medium text-foreground">{currentTrans.secondaryTitle}</span>
                          </div>
                        )}
                        {currentTrans.academicTitle && (
                          <div>
                            <span className="text-muted-foreground">Học hàm / học vị: </span>
                            <span className="font-medium text-foreground">{currentTrans.academicTitle}</span>
                          </div>
                        )}
                        {currentTrans.affiliatedOrganization && (
                          <div className="col-span-1 sm:col-span-2">
                            <span className="text-muted-foreground">Đơn vị công tác gốc: </span>
                            <span className="font-medium text-foreground">{currentTrans.affiliatedOrganization}</span>
                          </div>
                        )}
                      </div>

                      {/* Tiểu sử chi tiết */}
                      {currentTrans.bio ? (
                        <div className="border border-border/80 rounded-lg p-5 bg-card">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                            Tiểu sử & Quá trình công tác
                          </h4>
                          <p className="text-xs text-foreground/90 leading-relaxed whitespace-pre-line">
                            {currentTrans.bio}
                          </p>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-xs text-muted-foreground border border-dashed rounded-md">
                          Chưa có tiểu sử giới thiệu cho ngôn ngữ này.
                        </div>
                      )}

                      {/* SEO Meta */}
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

              {/* Danh sách Bằng cấp / Giải thưởng (Credentials) */}
              {lawyer.credentials && lawyer.credentials.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-border">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="size-4 text-primary" /> Bằng cấp, Chứng chỉ & Thành tích
                  </h4>
                  <div className="space-y-2">
                    {lawyer.credentials.map((cred, idx) => {
                      const cfg = CREDENTIAL_LABELS[cred.kind] || {
                        label: cred.kind,
                        icon: Award,
                      };
                      const CredIcon = cfg.icon;
                      const cTrans =
                        cred.translations?.find((t) => t.languageCode === activeTab) ||
                        cred.translations?.[0];

                      return (
                        <div
                          key={cred.id || idx}
                          className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card text-xs"
                        >
                          <div className="size-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                            <CredIcon className="size-3.5" />
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-foreground">
                                {cTrans?.title || "Thành tích"}
                              </span>
                              {cred.yearStart && (
                                <span className="font-mono text-muted-foreground text-[11px]">
                                  {cred.yearStart}
                                  {cred.yearEnd && ` - ${cred.yearEnd}`}
                                </span>
                              )}
                            </div>
                            {cTrans?.institution && (
                              <p className="text-muted-foreground text-[11px]">
                                {cTrans.institution}
                              </p>
                            )}
                            {cTrans?.description && (
                              <p className="text-foreground/80 text-[11px] pt-1">
                                {cTrans.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
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

          {onEdit && lawyer && (
            <Button
              type="button"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                onOpenChange(false);
                onEdit();
              }}
            >
              <Edit2 className="size-3.5" /> Chỉnh sửa hồ sơ
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
