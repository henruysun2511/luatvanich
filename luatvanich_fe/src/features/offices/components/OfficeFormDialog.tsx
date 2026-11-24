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
import { useCreateOffice, useUpdateOffice } from "../queries/useOfficesQuery";
import { officeFormSchema } from "../schemas/office.schema";
import type { OfficeItem, CreateOfficeInput, OfficeStatus } from "../types/offices.types";
import { Building2, Loader2, Globe, MapPin, PhoneCall } from "lucide-react";
import { SingleImageUpload, useMediaLifecycle } from "@/features/media";

interface OfficeFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  officeToEdit?: OfficeItem | null;
}

export function OfficeFormDialog({ open, onOpenChange, officeToEdit }: OfficeFormDialogProps) {
  const isEdit = Boolean(officeToEdit);
  const [activeTab, setActiveTab] = useState<"vi" | "zh" | "general">("vi");

  // Form states
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [wechatId, setWechatId] = useState("");
  const [wechatQrUrl, setWechatQrUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();
  const [mapEmbedUrl, setMapEmbedUrl] = useState("");
  const [isHeadquarters, setIsHeadquarters] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const [status, setStatus] = useState<OfficeStatus>("published");

  // Vietnamese translation
  const [viName, setViName] = useState("");
  const [viAddress, setViAddress] = useState("");
  const [viWorkingHours, setViWorkingHours] = useState("");
  const [viDescription, setViDescription] = useState("");
  const [viComplete, setViComplete] = useState(true);

  // Chinese translation
  const [zhName, setZhName] = useState("");
  const [zhAddress, setZhAddress] = useState("");
  const [zhWorkingHours, setZhWorkingHours] = useState("");
  const [zhDescription, setZhDescription] = useState("");
  const [zhComplete, setZhComplete] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateOffice();
  const updateMutation = useUpdateOffice();

  // Media lifecycle controllers
  const imageController = useMediaLifecycle({
    initialUrl: officeToEdit?.imageUrl,
    onUrlChange: setImageUrl,
    folder: "offices",
  });

  const wechatQrController = useMediaLifecycle({
    initialUrl: officeToEdit?.wechatQrUrl,
    onUrlChange: setWechatQrUrl,
    folder: "offices",
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      void imageController.rollback();
      void wechatQrController.rollback();
    }
    onOpenChange(nextOpen);
  };

  // Populate data when editing
  useEffect(() => {
    if (officeToEdit) {
      setCode(officeToEdit.code || "");
      setPhone(officeToEdit.phone || "");
      setFax(officeToEdit.fax || "");
      setEmail(officeToEdit.email || "");
      setWechatId(officeToEdit.wechatId || "");
      setWechatQrUrl(officeToEdit.wechatQrUrl || "");
      setImageUrl(officeToEdit.imageUrl || "");
      setLatitude(officeToEdit.latitude);
      setLongitude(officeToEdit.longitude);
      setMapEmbedUrl(officeToEdit.mapEmbedUrl || "");
      setIsHeadquarters(Boolean(officeToEdit.isHeadquarters));
      setDisplayOrder(officeToEdit.displayOrder || 0);
      setStatus(officeToEdit.status || "published");

      const vi = officeToEdit.translations?.find((t) => t.languageCode === "vi");
      if (vi) {
        setViName(vi.name || "");
        setViAddress(vi.address || "");
        setViWorkingHours(vi.workingHours || "");
        setViDescription(vi.description || "");
        setViComplete(Boolean(vi.isComplete));
      } else {
        setViName("");
        setViAddress("");
        setViWorkingHours("");
        setViDescription("");
        setViComplete(true);
      }

      const zh = officeToEdit.translations?.find((t) => t.languageCode === "zh-CN");
      if (zh) {
        setZhName(zh.name || "");
        setZhAddress(zh.address || "");
        setZhWorkingHours(zh.workingHours || "");
        setZhDescription(zh.description || "");
        setZhComplete(Boolean(zh.isComplete));
      } else {
        setZhName("");
        setZhAddress("");
        setZhWorkingHours("");
        setZhDescription("");
        setZhComplete(false);
      }
    } else {
      // Reset form for create
      setCode("");
      setPhone("");
      setFax("");
      setEmail("");
      setWechatId("");
      setWechatQrUrl("");
      setImageUrl("");
      setLatitude(undefined);
      setLongitude(undefined);
      setMapEmbedUrl("");
      setIsHeadquarters(false);
      setDisplayOrder(0);
      setStatus("published");

      setViName("");
      setViAddress("");
      setViWorkingHours("Thứ 2 - Thứ 6: 08:00 - 17:30");
      setViDescription("");
      setViComplete(true);

      setZhName("");
      setZhAddress("");
      setZhWorkingHours("周一至周五: 08:00 - 17:30");
      setZhDescription("");
      setZhComplete(false);
    }
    setErrors({});
    setActiveTab("vi");
  }, [officeToEdit, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payloadData: CreateOfficeInput = {
      code,
      phone: phone || undefined,
      fax: fax || undefined,
      email: email || undefined,
      wechatId: wechatId || undefined,
      wechatQrUrl: wechatQrUrl || undefined,
      imageUrl: imageUrl || undefined,
      latitude: latitude || undefined,
      longitude: longitude || undefined,
      mapEmbedUrl: mapEmbedUrl || undefined,
      isHeadquarters,
      displayOrder,
      status,
      translations: [
        {
          languageCode: "vi",
          name: viName,
          address: viAddress,
          workingHours: viWorkingHours || undefined,
          description: viDescription || undefined,
          isComplete: viComplete,
        },
      ],
    };

    if (zhName.trim() || zhAddress.trim()) {
      payloadData.translations.push({
        languageCode: "zh-CN",
        name: zhName.trim() || viName,
        address: zhAddress.trim() || viAddress,
        workingHours: zhWorkingHours || undefined,
        description: zhDescription || undefined,
        isComplete: zhComplete,
      });
    }

    const validateResult = officeFormSchema.safeParse(payloadData);
    if (!validateResult.success) {
      const fieldErrors: Record<string, string> = {};
      validateResult.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      // Auto switch to tab containing error
      if (fieldErrors["translations.0.name"] || fieldErrors["translations.0.address"]) {
        setActiveTab("vi");
      } else if (fieldErrors["code"]) {
        setActiveTab("general");
      }
      return;
    }

    if (isEdit && officeToEdit) {
      await updateMutation.mutateAsync({
        id: officeToEdit.id,
        payload: payloadData,
      });
    } else {
      await createMutation.mutateAsync(payloadData);
    }

    await Promise.all([
      imageController.commit(),
      wechatQrController.commit(),
    ]);

    onOpenChange(false);
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary font-serif">
            <Building2 className="size-5 text-accent" />
            {isEdit ? `Chỉnh sửa văn phòng: ${officeToEdit?.code}` : "Thêm mới văn phòng đại diện"}
          </DialogTitle>
          <DialogDescription>
            Điền thông tin định danh, liên hệ và nội dung bản dịch song ngữ Việt - Trung.
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e7dcc3] gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("vi")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "vi"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="size-4" />
            Tiếng Việt (vi) *
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("zh")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "zh"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe className="size-4" />
            Tiếng Trung (zh-CN)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === "general"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <PhoneCall className="size-4" />
            Thông tin chung & Liên hệ
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 py-3">
          {/* TAB 1: TIẾNG VIỆT */}
          {activeTab === "vi" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tên văn phòng (Tiếng Việt) <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="VD: Văn phòng Hà Nội"
                  value={viName}
                  onChange={(e) => setViName(e.target.value)}
                  className="mt-1"
                />
                {errors["translations.0.name"] && (
                  <p className="text-xs text-destructive mt-1">{errors["translations.0.name"]}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Địa chỉ chi tiết (Tiếng Việt) <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="VD: Số 17 đường 23 KĐT Thành phố Giao Lưu, Bắc Từ Liêm, Hà Nội"
                  value={viAddress}
                  onChange={(e) => setViAddress(e.target.value)}
                  className="mt-1"
                />
                {errors["translations.0.address"] && (
                  <p className="text-xs text-destructive mt-1">{errors["translations.0.address"]}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Giờ làm việc
                </label>
                <Input
                  placeholder="VD: Thứ 2 - Thứ 6: 08:00 - 17:30"
                  value={viWorkingHours}
                  onChange={(e) => setViWorkingHours(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Mô tả / Giới thiệu văn phòng
                </label>
                <Textarea
                  placeholder="Giới thiệu tóm tắt quy mô hoặc vị trí chiến lược của văn phòng..."
                  value={viDescription}
                  onChange={(e) => setViDescription(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Switch checked={viComplete} onCheckedChange={setViComplete} />
                <span className="text-sm font-medium">Bản dịch tiếng Việt đã hoàn thiện</span>
              </div>
            </div>
          )}

          {/* TAB 2: TIẾNG TRUNG */}
          {activeTab === "zh" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Tên văn phòng (Tiếng Trung)
                </label>
                <Input
                  placeholder="VD: 河内办公室"
                  value={zhName}
                  onChange={(e) => setZhName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Địa chỉ chi tiết (Tiếng Trung)
                </label>
                <Input
                  placeholder="VD: 河内市交流城都市区联排别墅区23路17号"
                  value={zhAddress}
                  onChange={(e) => setZhAddress(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Giờ làm việc (Tiếng Trung)
                </label>
                <Input
                  placeholder="VD: 周一至周五: 08:00 - 17:30"
                  value={zhWorkingHours}
                  onChange={(e) => setZhWorkingHours(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Mô tả văn phòng (Tiếng Trung)
                </label>
                <Textarea
                  placeholder="中文办公室简介..."
                  value={zhDescription}
                  onChange={(e) => setZhDescription(e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Switch checked={zhComplete} onCheckedChange={setZhComplete} />
                <span className="text-sm font-medium">Bản dịch tiếng Trung đã hoàn thiện</span>
              </div>
            </div>
          )}

          {/* TAB 3: THÔNG TIN CHUNG */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Mã văn phòng <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="VD: hanoi_hq, chongzuo"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="mt-1"
                  />
                  {errors.code && <p className="text-xs text-destructive mt-1">{errors.code}</p>}
                </div>
                <div className="flex items-center justify-between p-3 rounded-none border border-[#e7dcc3] bg-[#fbf7ee]">
                  <div>
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Trạng thái công khai
                    </label>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {status === "published"
                        ? "Đang bật: Hiển thị công khai"
                        : "Đang tắt: Lưu bản nháp"}
                    </p>
                  </div>
                  <Switch
                    checked={status === "published"}
                    onCheckedChange={(checked) =>
                      setStatus(checked ? "published" : "draft")
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Hotline / Điện thoại
                  </label>
                  <Input
                    placeholder="+84 24 3792 0999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Fax
                  </label>
                  <Input
                    placeholder="+84 24 3792 0998"
                    value={fax}
                    onChange={(e) => setFax(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Email
                  </label>
                  <Input
                    placeholder="hanoi@luatvanich.vn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Media Section: Ảnh văn phòng & Mã QR WeChat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SingleImageUpload
                  label="Ảnh đại diện văn phòng"
                  value={imageUrl}
                  controller={imageController}
                  aspectRatio="video"
                  recommendedSize="Ảnh tỷ lệ 16:9, tối đa 5MB"
                />

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      WeChat ID
                    </label>
                    <Input
                      placeholder="VD: luatvanich_hanoi"
                      value={wechatId}
                      onChange={(e) => setWechatId(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <SingleImageUpload
                    label="Mã QR WeChat"
                    value={wechatQrUrl}
                    controller={wechatQrController}
                    aspectRatio="square"
                    recommendedSize="Ảnh vuông 1:1, tối đa 2MB"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Thứ tự hiển thị
                </label>
                <Input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                  className="mt-1 max-w-[200px]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                  Link nhúng bản đồ Google Maps / Baidu (embed iframe URL)
                </label>
                <Input
                  placeholder="https://www.google.com/maps/embed?..."
                  value={mapEmbedUrl}
                  onChange={(e) => setMapEmbedUrl(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Vĩ độ (Latitude)
                  </label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="21.053894"
                    value={latitude ?? ""}
                    onChange={(e) => setLatitude(e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    Kinh độ (Longitude)
                  </label>
                  <Input
                    type="number"
                    step="any"
                    placeholder="105.781845"
                    value={longitude ?? ""}
                    onChange={(e) => setLongitude(e.target.value ? parseFloat(e.target.value) : undefined)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Switch checked={isHeadquarters} onCheckedChange={setIsHeadquarters} />
                <div>
                  <p className="text-sm font-semibold text-foreground">Đặt làm Trụ sở chính (Headquarters)</p>
                  <p className="text-xs text-muted-foreground">Văn phòng này sẽ được ưu tiên hiển thị đầu tiên trên toàn site.</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 border-t border-[#e7dcc3]">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isPending} className="btn-royal !h-8 !text-xs !py-0 !px-4">
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              {isEdit ? "Lưu thay đổi" : "Tạo văn phòng"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
