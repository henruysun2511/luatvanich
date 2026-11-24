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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateLawyer,
  useUpdateLawyer,
} from "../queries/useLawyersQuery";
import { useAdminOffices } from "@/features/offices";
import { useAdminPracticeAreas } from "@/features/practice-areas";
import { lawyerFormSchema } from "../schemas/lawyer.schema";
import type {
  LawyerItem,
  CreateLawyerInput,
  LawyerStatus,
  LawyerTeamGroup,
  UpsertLawyerTranslationInput,
} from "../types/lawyers.types";
import { User, Loader2, Globe, Settings2, Sparkles, Building2 } from "lucide-react";
import { SingleImageUpload, useMediaLifecycle } from "@/features/media";

interface LawyerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lawyerToEdit?: LawyerItem | null;
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

export function LawyerFormDialog({
  open,
  onOpenChange,
  lawyerToEdit,
}: LawyerFormDialogProps) {
  const isEdit = Boolean(lawyerToEdit);
  const [activeTab, setActiveTab] = useState<"vi" | "zh" | "admin" | "media">("vi");

  // Hành chính & Liên hệ
  const [officeId, setOfficeId] = useState<string>("none");
  const [teamGroup, setTeamGroup] = useState<LawyerTeamGroup>("chinese_team");
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [barAssociation, setBarAssociation] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobilePhone, setMobilePhone] = useState<string>("");
  const [officePhone, setOfficePhone] = useState<string>("");
  const [wechatId, setWechatId] = useState<string>("");
  const [practiceStartDate, setPracticeStartDate] = useState<string>("");
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [status, setStatus] = useState<LawyerStatus>("published");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  // Đa phương tiện
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [wechatQrUrl, setWechatQrUrl] = useState<string>("");

  // Chuyên môn & Ngôn ngữ
  const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>([]);
  const [selectedLangs, setSelectedLangs] = useState<string[]>(["vi", "zh-CN"]);

  // Tiếng Việt
  const [fullNameVi, setFullNameVi] = useState<string>("");
  const [latinNameVi, setLatinNameVi] = useState<string>("");
  const [slugVi, setSlugVi] = useState<string>("");
  const [titleVi, setTitleVi] = useState<string>("");
  const [secondaryTitleVi, setSecondaryTitleVi] = useState<string>("");
  const [academicTitleVi, setAcademicTitleVi] = useState<string>("");
  const [affiliatedOrgVi, setAffiliatedOrgVi] = useState<string>("");
  const [bioVi, setBioVi] = useState<string>("");
  const [isSlugCustom, setIsSlugCustom] = useState<boolean>(false);

  // Tiếng Trung
  const [fullNameZh, setFullNameZh] = useState<string>("");
  const [latinNameZh, setLatinNameZh] = useState<string>("");
  const [slugZh, setSlugZh] = useState<string>("");
  const [titleZh, setTitleZh] = useState<string>("");
  const [secondaryTitleZh, setSecondaryTitleZh] = useState<string>("");
  const [academicTitleZh, setAcademicTitleZh] = useState<string>("");
  const [affiliatedOrgZh, setAffiliatedOrgZh] = useState<string>("");
  const [bioZh, setBioZh] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateLawyer();
  const updateMutation = useUpdateLawyer();

  // Danh sách Văn phòng & Lĩnh vực
  const { data: officesData } = useAdminOffices({ limit: 100 });
  const offices = officesData?.items || [];

  const { data: areasData } = useAdminPracticeAreas({ limit: 100 });
  const practiceAreas = areasData?.items || [];

  // Media controllers
  const avatarController = useMediaLifecycle({
    initialUrl: lawyerToEdit?.avatarUrl ?? undefined,
    onUrlChange: setAvatarUrl,
    folder: "lawyers",
  });

  const wechatQrController = useMediaLifecycle({
    initialUrl: lawyerToEdit?.wechatQrUrl ?? undefined,
    onUrlChange: setWechatQrUrl,
    folder: "lawyers/qr",
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      void avatarController.rollback();
      void wechatQrController.rollback();
    }
    onOpenChange(nextOpen);
  };

  // Populate data when editing
  useEffect(() => {
    if (lawyerToEdit) {
      setOfficeId(lawyerToEdit.officeId || "none");
      setTeamGroup(lawyerToEdit.teamGroup || "chinese_team");
      setLicenseNumber(lawyerToEdit.licenseNumber || "");
      setBarAssociation(lawyerToEdit.barAssociation || "");
      setEmail(lawyerToEdit.email || "");
      setMobilePhone(lawyerToEdit.mobilePhone || "");
      setOfficePhone(lawyerToEdit.officePhone || "");
      setWechatId(lawyerToEdit.wechatId || "");
      setPracticeStartDate(lawyerToEdit.practiceStartDate || "");
      setDisplayOrder(lawyerToEdit.displayOrder || 0);
      setStatus(lawyerToEdit.status || "published");
      setIsFeatured(lawyerToEdit.isFeatured || false);

      setAvatarUrl(lawyerToEdit.avatarUrl || "");
      setWechatQrUrl(lawyerToEdit.wechatQrUrl || "");

      setSelectedAreaIds(lawyerToEdit.practiceAreas?.map((pa) => pa.id) || []);
      setSelectedLangs(lawyerToEdit.languages?.map((l) => l.languageCode) || ["vi", "zh-CN"]);

      const vi = lawyerToEdit.translations?.find((t) => t.languageCode === "vi");
      if (vi) {
        setFullNameVi(vi.fullName || "");
        setLatinNameVi(vi.latinName || "");
        setSlugVi(vi.slug || "");
        setTitleVi(vi.title || "");
        setSecondaryTitleVi(vi.secondaryTitle || "");
        setAcademicTitleVi(vi.academicTitle || "");
        setAffiliatedOrgVi(vi.affiliatedOrganization || "");
        setBioVi(vi.bio || "");
        setIsSlugCustom(true);
      } else {
        setFullNameVi("");
        setLatinNameVi("");
        setSlugVi("");
        setTitleVi("");
        setSecondaryTitleVi("");
        setAcademicTitleVi("");
        setAffiliatedOrgVi("");
        setBioVi("");
        setIsSlugCustom(false);
      }

      const zh = lawyerToEdit.translations?.find((t) => t.languageCode === "zh-CN");
      if (zh) {
        setFullNameZh(zh.fullName || "");
        setLatinNameZh(zh.latinName || "");
        setSlugZh(zh.slug || "");
        setTitleZh(zh.title || "");
        setSecondaryTitleZh(zh.secondaryTitle || "");
        setAcademicTitleZh(zh.academicTitle || "");
        setAffiliatedOrgZh(zh.affiliatedOrganization || "");
        setBioZh(zh.bio || "");
      } else {
        setFullNameZh("");
        setLatinNameZh("");
        setSlugZh("");
        setTitleZh("");
        setSecondaryTitleZh("");
        setAcademicTitleZh("");
        setAffiliatedOrgZh("");
        setBioZh("");
      }

      setErrors({});
      setActiveTab("vi");
    } else {
      // Reset form
      setOfficeId("none");
      setTeamGroup("chinese_team");
      setLicenseNumber("");
      setBarAssociation("");
      setEmail("");
      setMobilePhone("");
      setOfficePhone("");
      setWechatId("");
      setPracticeStartDate("");
      setDisplayOrder(0);
      setStatus("published");
      setIsFeatured(false);

      setAvatarUrl("");
      setWechatQrUrl("");

      setSelectedAreaIds([]);
      setSelectedLangs(["vi", "zh-CN"]);

      setFullNameVi("");
      setLatinNameVi("");
      setSlugVi("");
      setTitleVi("");
      setSecondaryTitleVi("");
      setAcademicTitleVi("");
      setAffiliatedOrgVi("");
      setBioVi("");
      setIsSlugCustom(false);

      setFullNameZh("");
      setLatinNameZh("");
      setSlugZh("");
      setTitleZh("");
      setSecondaryTitleZh("");
      setAcademicTitleZh("");
      setAffiliatedOrgZh("");
      setBioZh("");

      setErrors({});
      setActiveTab("vi");
    }
  }, [lawyerToEdit, open]);

  const handleFullNameViChange = (val: string) => {
    setFullNameVi(val);
    if (!isSlugCustom) {
      setSlugVi(slugify(val));
    }
  };

  const handleToggleArea = (areaId: string) => {
    setSelectedAreaIds((prev) =>
      prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId],
    );
  };

  const handleToggleLang = (langCode: string) => {
    setSelectedLangs((prev) =>
      prev.includes(langCode) ? prev.filter((c) => c !== langCode) : [...prev, langCode],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const translationsPayload: UpsertLawyerTranslationInput[] = [
      {
        languageCode: "vi",
        fullName: fullNameVi.trim(),
        latinName: latinNameVi.trim() || null,
        slug: slugVi.trim() || undefined,
        title: titleVi.trim() || null,
        secondaryTitle: secondaryTitleVi.trim() || null,
        academicTitle: academicTitleVi.trim() || null,
        affiliatedOrganization: affiliatedOrgVi.trim() || null,
        bio: bioVi.trim() || null,
        isComplete: true,
      },
    ];

    if (fullNameZh.trim() || titleZh.trim() || slugZh.trim()) {
      translationsPayload.push({
        languageCode: "zh-CN",
        fullName: fullNameZh.trim(),
        latinName: latinNameZh.trim() || null,
        slug: slugZh.trim() || undefined,
        title: titleZh.trim() || null,
        secondaryTitle: secondaryTitleZh.trim() || null,
        academicTitle: academicTitleZh.trim() || null,
        affiliatedOrganization: affiliatedOrgZh.trim() || null,
        bio: bioZh.trim() || null,
        isComplete: true,
      });
    }

    const payload: CreateLawyerInput = {
      officeId: officeId !== "none" ? officeId : null,
      teamGroup,
      avatarUrl: avatarUrl?.trim() || null,
      licenseNumber: licenseNumber.trim() || null,
      barAssociation: barAssociation.trim() || null,
      email: email.trim() || null,
      mobilePhone: mobilePhone.trim() || null,
      officePhone: officePhone.trim() || null,
      wechatId: wechatId.trim() || null,
      wechatQrUrl: wechatQrUrl?.trim() || null,
      practiceStartDate: practiceStartDate || null,
      displayOrder,
      isFeatured,
      status,
      translations: translationsPayload,
      practiceAreas: selectedAreaIds.map((id, idx) => ({
        practiceAreaId: id,
        isPrimary: idx === 0,
        displayOrder: idx,
      })),
      languages: selectedLangs.map((lang) => ({
        languageCode: lang,
        isNative: lang === "vi",
      })),
    };

    const parseResult = lawyerFormSchema.safeParse(payload);
    if (!parseResult.success) {
      const fieldErrors: Record<string, string> = {};
      parseResult.error.errors.forEach((err) => {
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);

      if (fieldErrors["translations.0.fullName"] || fieldErrors["translations.0.slug"]) {
        setActiveTab("vi");
      } else if (fieldErrors["translations.1.fullName"] || fieldErrors["translations.1.slug"]) {
        setActiveTab("zh");
      } else if (fieldErrors.email) {
        setActiveTab("admin");
      }
      return;
    }

    try {
      if (isEdit && lawyerToEdit) {
        await updateMutation.mutateAsync({
          id: lawyerToEdit.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
      avatarController.commit();
      wechatQrController.commit();
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
            <div className="p-2 rounded-none bg-primary/10 text-primary">
              <User className="size-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-serif">
                {isEdit ? "Chỉnh sửa Hồ sơ Luật sư" : "Thêm Hồ sơ Luật sư Mới"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Quản lý thông tin định danh, chuyên môn, chứng chỉ hành nghề và nội dung song ngữ
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e7dcc3] my-2">
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
            onClick={() => setActiveTab("admin")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "admin"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Building2 className="size-3.5" />
            Hành chính & Liên hệ
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("media")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "media"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Settings2 className="size-3.5" />
            Ảnh & Chuyên môn
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* TAB 1: TIẾNG VIỆT */}
          {activeTab === "vi" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Họ và tên (Tiếng Việt) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="VD: Nguyễn Văn A"
                    value={fullNameVi}
                    onChange={(e) => handleFullNameViChange(e.target.value)}
                    className="mt-1"
                  />
                  {errors["translations.0.fullName"] && (
                    <p className="text-xs text-destructive mt-1">
                      {errors["translations.0.fullName"]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Tên phiên âm Latinh / Pinyin
                  </label>
                  <Input
                    placeholder="VD: Nguyen Van A / Ling Bin"
                    value={latinNameVi}
                    onChange={(e) => setLatinNameVi(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Đường dẫn tĩnh SEO (Slug)
                  </label>
                  {!isSlugCustom && fullNameVi && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Sparkles className="size-3 text-amber-500" /> Tự động sinh
                    </span>
                  )}
                </div>
                <Input
                  placeholder="VD: luat-su-nguyen-van-a"
                  value={slugVi}
                  onChange={(e) => {
                    setSlugVi(e.target.value);
                    setIsSlugCustom(true);
                  }}
                  className="mt-1 font-mono text-xs"
                />
                {errors["translations.0.slug"] && (
                  <p className="text-xs text-destructive mt-1">
                    {errors["translations.0.slug"]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Chức danh chính
                  </label>
                  <Input
                    placeholder="VD: Luật sư điều hành / Giám đốc"
                    value={titleVi}
                    onChange={(e) => setTitleVi(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Học hàm / Học vị
                  </label>
                  <Input
                    placeholder="VD: Tiến sĩ Luật / Thạc sĩ"
                    value={academicTitleVi}
                    onChange={(e) => setAcademicTitleVi(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Chức vụ kiêm nhiệm / Đảng thể
                </label>
                <Input
                  placeholder="VD: Bí thư Đảng ủy / Trọng tài viên VIAC"
                  value={secondaryTitleVi}
                  onChange={(e) => setSecondaryTitleVi(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Đơn vị công tác gốc / Hãng luật hợp tác
                </label>
                <Input
                  placeholder="VD: Hãng luật Viễn Dương / Đại học Luật"
                  value={affiliatedOrgVi}
                  onChange={(e) => setAffiliatedOrgVi(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tiểu sử & Phong cách hành nghề
                </label>
                <Textarea
                  placeholder="Giới thiệu tóm tắt quá trình công tác, thành tựu nổi bật và triết lý hành nghề..."
                  value={bioVi}
                  onChange={(e) => setBioVi(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* TAB 2: TIẾNG TRUNG */}
          {activeTab === "zh" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Họ và tên chữ Hán (Tiếng Trung)
                  </label>
                  <Input
                    placeholder="VD: 凌斌 / 凌辰"
                    value={fullNameZh}
                    onChange={(e) => setFullNameZh(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Tên Pinyin tiếng Trung
                  </label>
                  <Input
                    placeholder="VD: Ling Bin"
                    value={latinNameZh}
                    onChange={(e) => setLatinNameZh(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Đường dẫn tĩnh SEO tiếng Trung (Slug)
                </label>
                <Input
                  placeholder="VD: ling-bin"
                  value={slugZh}
                  onChange={(e) => setSlugZh(e.target.value)}
                  className="mt-1 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Chức danh tiếng Trung
                  </label>
                  <Input
                    placeholder="VD: 执行主任 / 高级合伙人"
                    value={titleZh}
                    onChange={(e) => setTitleZh(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Học hàm / Cấp bậc tiếng Trung
                  </label>
                  <Input
                    placeholder="VD: 一级律师 / 法学博士"
                    value={academicTitleZh}
                    onChange={(e) => setAcademicTitleZh(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tiểu sử tóm tắt (Tiếng Trung)
                </label>
                <Textarea
                  placeholder="律师专业背景介绍，执业经历及代表性案件..."
                  value={bioZh}
                  onChange={(e) => setBioZh(e.target.value)}
                  className="mt-1"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* TAB 3: HÀNH CHÍNH & LIÊN HỆ */}
          {activeTab === "admin" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Phân nhóm đội ngũ luật sư <span className="text-destructive">*</span>
                  </label>
                  <Select
                    value={teamGroup}
                    onValueChange={(val) => setTeamGroup(val as LawyerTeamGroup)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Chọn nhóm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core_leadership">Ban Lãnh đạo cốt lõi</SelectItem>
                      <SelectItem value="chinese_team">Đội ngũ Luật sư Trung Quốc</SelectItem>
                      <SelectItem value="vietnamese_team">Đội ngũ Luật sư Đối tác VN</SelectItem>
                      <SelectItem value="senior_advisor">Ban Cố vấn cấp cao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Văn phòng trực thuộc chính
                  </label>
                  <Select
                    value={officeId}
                    onValueChange={setOfficeId}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Chọn văn phòng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">-- Không chọn văn phòng --</SelectItem>
                      {offices.map((off) => {
                        const name =
                          off.translations?.find((t) => t.languageCode === "vi")?.name ||
                          off.code;
                        return (
                          <SelectItem key={off.id} value={off.id}>
                            {name} ({off.code})
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Số thẻ hành nghề / Giấy phép Bộ Tư pháp
                  </label>
                  <Input
                    placeholder="VD: 12345/TP/LS-CCHN"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Đoàn luật sư trực thuộc
                  </label>
                  <Input
                    placeholder="VD: Đoàn Luật sư TP. Hà Nội"
                    value={barAssociation}
                    onChange={(e) => setBarAssociation(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Email công việc
                  </label>
                  <Input
                    type="email"
                    placeholder="VD: lawyer@wanyimail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 text-xs"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Ngày bắt đầu hành nghề
                  </label>
                  <Input
                    type="date"
                    value={practiceStartDate}
                    onChange={(e) => setPracticeStartDate(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Số di động
                  </label>
                  <Input
                    placeholder="VD: 0901234567"
                    value={mobilePhone}
                    onChange={(e) => setMobilePhone(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Điện thoại bàn
                  </label>
                  <Input
                    placeholder="VD: 024-38258888"
                    value={officePhone}
                    onChange={(e) => setOfficePhone(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    ID WeChat
                  </label>
                  <Input
                    placeholder="VD: lawyer_wechat"
                    value={wechatId}
                    onChange={(e) => setWechatId(e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ĐA PHƯƠNG TIỆN & CHUYÊN MÔN */}
          {activeTab === "media" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <SingleImageUpload
                    label="Ảnh chân dung (Tỷ lệ 4:5)"
                    value={avatarUrl}
                    controller={avatarController}
                    aspectRatio="portrait"
                    recommendedSize="Khuyến nghị 800x1000px, tối đa 5MB"
                  />
                </div>

                <div>
                  <SingleImageUpload
                    label="Mã QR WeChat kết bạn"
                    value={wechatQrUrl}
                    controller={wechatQrController}
                    aspectRatio="square"
                    recommendedSize="Ảnh vuông 1:1, tối đa 2MB"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                  Lĩnh vực chuyên môn phụ trách
                </label>
                <div className="grid grid-cols-2 gap-2 p-3 rounded-none border border-[#e7dcc3] bg-[#fcfbf9] max-h-44 overflow-y-auto">
                  {practiceAreas.map((pa) => {
                    const name =
                      pa.translations?.find((t) => t.languageCode === "vi")?.name ||
                      "Chưa đặt tên";
                    const isChecked = selectedAreaIds.includes(pa.id);
                    return (
                      <label
                        key={pa.id}
                        className="flex items-center gap-2 text-xs cursor-pointer hover:text-foreground"
                      >
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => handleToggleArea(pa.id)}
                        />
                        <span>{name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
                  Ngôn ngữ làm việc
                </label>
                <div className="flex gap-4">
                  {[
                    { code: "vi", label: "Tiếng Việt" },
                    { code: "zh-CN", label: "Tiếng Trung (中文)" },
                    { code: "en", label: "Tiếng Anh (English)" },
                  ].map((l) => (
                    <label
                      key={l.code}
                      className="flex items-center gap-2 text-xs cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedLangs.includes(l.code)}
                        onCheckedChange={() => handleToggleLang(l.code)}
                      />
                      <span>{l.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-none border border-[#e7dcc3] bg-[#fbf7ee]">
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
                    Thứ tự sắp xếp
                  </label>
                  <Input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-none border border-[#e7dcc3] bg-[#fbf7ee]">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Ghim nổi bật trang chủ
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Luật sư sẽ được hiển thị ở khối luật sư tiêu biểu trên trang chủ
                  </p>
                </div>
                <Switch
                  checked={isFeatured}
                  onCheckedChange={setIsFeatured}
                />
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 border-t border-[#e7dcc3] flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Hủy bỏ
            </Button>
            <Button type="submit" variant="royal" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isEdit ? "Lưu thay đổi" : "Tạo hồ sơ luật sư"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
