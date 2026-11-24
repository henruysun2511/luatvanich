"use client";

import React, { useState, useEffect } from "react";
import { useAllSettings, useUpdateSettings } from "../../queries/useSettingsQuery";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mediaService } from "@/features/media/services/media.service";
import {
  Phone,
  Mail,
  MapPin,
  QrCode,
  Globe,
  Upload,
  Loader2,
  Check,
  Sparkles,
  Building2,
  ShieldCheck,
  User,
} from "lucide-react";

export function SiteSettingsTab() {
  const { data: allSettings, isLoading } = useAllSettings();
  const updateMutation = useUpdateSettings();

  const [formData, setFormData] = useState<Record<string, string>>({
    brand_slogan_vi: "",
    brand_slogan_zh: "",
    hotline_vn: "",
    hotline_cn: "",
    contact_person: "",
    hotline_mobile_cn: "",
    email_contact: "",
    working_hours: "",
    address_hq: "",
    address_hq_zh: "",
    address_directions: "",
    license_number: "",
    parent_firm_name: "",
    wechat_id: "",
    wechat_qr_url: "",
    zalo_url: "",
    facebook_url: "",
    youtube_url: "",
    seo_meta_title: "",
    seo_meta_description: "",
    script_ga_id: "",
    script_pixel_id: "",
  });

  const [uploadingQr, setUploadingQr] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (allSettings) {
      setFormData((prev) => ({
        ...prev,
        brand_slogan_vi: allSettings.branding?.brand_slogan_vi || allSettings.general?.brand_slogan_vi || prev.brand_slogan_vi,
        brand_slogan_zh: allSettings.branding?.brand_slogan_zh || allSettings.general?.brand_slogan_zh || prev.brand_slogan_zh,
        hotline_vn: allSettings.contact?.hotline_vn || prev.hotline_vn,
        hotline_cn: allSettings.contact?.hotline_cn || prev.hotline_cn,
        contact_person: allSettings.contact?.contact_person || prev.contact_person,
        hotline_mobile_cn: allSettings.contact?.hotline_mobile_cn || prev.hotline_mobile_cn,
        email_contact: allSettings.contact?.email_contact || prev.email_contact,
        working_hours: allSettings.contact?.working_hours || prev.working_hours,
        address_hq: allSettings.contact?.address_hq || prev.address_hq,
        address_hq_zh: allSettings.contact?.address_hq_zh || prev.address_hq_zh,
        address_directions: allSettings.contact?.address_directions || prev.address_directions,
        license_number: allSettings.contact?.license_number || prev.license_number,
        parent_firm_name: allSettings.contact?.parent_firm_name || prev.parent_firm_name,
        wechat_id: allSettings.social?.wechat_id || prev.wechat_id,
        wechat_qr_url: allSettings.social?.wechat_qr_url || prev.wechat_qr_url,
        zalo_url: allSettings.social?.zalo_url || prev.zalo_url,
        facebook_url: allSettings.social?.facebook_url || prev.facebook_url,
        youtube_url: allSettings.social?.youtube_url || prev.youtube_url,
        seo_meta_title: allSettings.seo?.seo_meta_title || prev.seo_meta_title,
        seo_meta_description: allSettings.seo?.seo_meta_description || prev.seo_meta_description,
        script_ga_id: allSettings.seo?.script_ga_id || prev.script_ga_id,
        script_pixel_id: allSettings.seo?.script_pixel_id || prev.script_pixel_id,
      }));
    }
  }, [allSettings]);

  const handleChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    setSavedSuccess(false);
  };

  const handleUploadQr = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingQr(true);
      const res = await mediaService.upload(file, "settings");
      handleChange("wechat_qr_url", res.url);
    } catch (err) {
      console.error("Lỗi khi tải ảnh WeChat QR:", err);
    } finally {
      setUploadingQr(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMutation.mutateAsync({ settings: formData });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-xs text-[#718096]">
        <Loader2 className="size-4 animate-spin mr-2" /> Đang tải cấu hình...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Slogan & Nhận diện cốt lõi */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <Sparkles className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            Khẩu hiệu thương hiệu & Slogan (Song ngữ)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Slogan Tiếng Việt (Header & Hero)</label>
            <Input
              value={formData.brand_slogan_vi}
              onChange={(e) => handleChange("brand_slogan_vi", e.target.value)}
              placeholder="VD: Kết nối Việt‑Trung, đồng hành pháp lý vững chắc"
              className="h-8 text-xs font-medium"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Slogan Tiếng Trung (中文标语)</label>
            <Input
              value={formData.brand_slogan_zh}
              onChange={(e) => handleChange("brand_slogan_zh", e.target.value)}
              placeholder="VD: 链接中越 · 法律护航"
              className="h-8 text-xs font-medium font-hanzi"
            />
          </div>
        </div>
      </div>

      {/* 2. Thông tin liên hệ & Hotline */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <Phone className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            Thông tin liên hệ & Hotline
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Hotline Việt Nam (Tổng đài)</label>
            <Input
              value={formData.hotline_vn}
              onChange={(e) => handleChange("hotline_vn", e.target.value)}
              placeholder="VD: 0987 654 321"
              className="h-8 text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Hotline Trung Quốc (Nam Ninh)</label>
            <Input
              value={formData.hotline_cn}
              onChange={(e) => handleChange("hotline_cn", e.target.value)}
              placeholder="VD: +86 771 588 8888"
              className="h-8 text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Người phụ trách liên hệ (Luật sư)</label>
            <Input
              value={formData.contact_person}
              onChange={(e) => handleChange("contact_person", e.target.value)}
              placeholder="VD: 蒋女贞律师 (Luật sư Tưởng Nữ Trinh)"
              className="h-8 text-xs"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Di động / Zalo / WeChat tiếp nhận</label>
            <Input
              value={formData.hotline_mobile_cn}
              onChange={(e) => handleChange("hotline_mobile_cn", e.target.value)}
              placeholder="VD: +86 152 7702 0681"
              className="h-8 text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Email tiếp nhận hồ sơ tư vấn</label>
            <Input
              type="email"
              value={formData.email_contact}
              onChange={(e) => handleChange("email_contact", e.target.value)}
              placeholder="VD: contact@luatvanich.vn"
              className="h-8 text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Thời gian làm việc hiển thị</label>
            <Input
              value={formData.working_hours}
              onChange={(e) => handleChange("working_hours", e.target.value)}
              placeholder="VD: Thứ 2 – Thứ 6: 08:30 – 17:30 (Cả giờ VN & TQ)"
              className="h-8 text-xs"
            />
          </div>
        </div>
      </div>

      {/* 3. Địa chỉ & Pháp lý văn phòng Hà Nội */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <Building2 className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            Địa chỉ & Pháp lý Văn phòng Hà Nội
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Địa chỉ trụ sở Hà Nội (Tiếng Việt - Footer & Liên hệ)</label>
            <Input
              value={formData.address_hq}
              onChange={(e) => handleChange("address_hq", e.target.value)}
              placeholder="VD: Số nhà 17, Đường 23, KĐT Thành phố Giao Lưu, Cổ Nhuế 2, Bắc Từ Liêm, Hà Nội"
              className="h-8 text-xs"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Địa chỉ trụ sở Hà Nội (Tiếng Trung - 中文地址)</label>
            <Input
              value={formData.address_hq_zh}
              onChange={(e) => handleChange("address_hq_zh", e.target.value)}
              placeholder="VD: 河内市交流城都市区联排别墅区23路17号（公安部附近，从范文同大道右转进入）"
              className="h-8 text-xs font-hanzi"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Chỉ dẫn đường đi & Vị trí nhận diện</label>
            <Input
              value={formData.address_directions}
              onChange={(e) => handleChange("address_directions", e.target.value)}
              placeholder="VD: Gần Bộ Công An, đi đường Phạm Văn Đồng rẽ phải vào"
              className="h-8 text-xs"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Giấy phép hoạt động tại Việt Nam</label>
            <Input
              value={formData.license_number}
              onChange={(e) => handleChange("license_number", e.target.value)}
              placeholder="VD: Phê duyệt Bộ Tư pháp Việt Nam (07/2026)"
              className="h-8 text-xs"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Hãng luật chủ quản (Tổng sở Trung Quốc)</label>
            <Input
              value={formData.parent_firm_name}
              onChange={(e) => handleChange("parent_firm_name", e.target.value)}
              placeholder="VD: 广西万益律师事务所 (Công ty Luật Vạn Ích Quảng Tây - thành lập 1996)"
              className="h-8 text-xs"
            />
          </div>
        </div>
      </div>

      {/* 2. Kênh kết nối & Mạng xã hội */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <QrCode className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            WeChat, Zalo & Mạng xã hội
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">WeChat ID chính thức</label>
            <Input
              value={formData.wechat_id}
              onChange={(e) => handleChange("wechat_id", e.target.value)}
              placeholder="VD: VanIchLaw_VN"
              className="h-8 text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Ảnh mã QR WeChat</label>
            <div className="flex items-center gap-3">
              {formData.wechat_qr_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.wechat_qr_url}
                  alt="WeChat QR"
                  className="size-10 object-contain border border-[#e7dcc3] bg-[#fcfbf9]"
                />
              ) : (
                <div className="size-10 border border-dashed border-[#e7dcc3] flex items-center justify-center text-[10px] text-[#718096]">
                  Chưa có
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#e7dcc3] bg-[#fbf7ee] text-[#06122b] hover:bg-[#e7dcc3]/50 transition-colors">
                <Upload className="size-3.5" />
                <span>{uploadingQr ? "Đang tải..." : "Tải mã QR mới"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadQr}
                  className="hidden"
                  disabled={uploadingQr}
                />
              </label>
            </div>
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Link Zalo Official Account</label>
            <Input
              value={formData.zalo_url}
              onChange={(e) => handleChange("zalo_url", e.target.value)}
              placeholder="VD: https://zalo.me/..."
              className="h-8 text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5 font-sans">
            <label className="text-xs font-medium text-[#06122b]">Link Fanpage Facebook</label>
            <Input
              value={formData.facebook_url}
              onChange={(e) => handleChange("facebook_url", e.target.value)}
              placeholder="VD: https://facebook.com/luatvanich"
              className="h-8 text-xs font-mono"
            />
          </div>

          <div className="space-y-1.5 font-sans md:col-span-2">
            <label className="text-xs font-medium text-[#06122b]">Link Kênh YouTube</label>
            <Input
              value={formData.youtube_url}
              onChange={(e) => handleChange("youtube_url", e.target.value)}
              placeholder="VD: https://youtube.com/@luatvanich"
              className="h-8 text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. SEO & Mã nhúng Tracking */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <Globe className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            SEO Mặc định & Mã đo lường (Tracking)
          </h3>
        </div>

        <div className="space-y-3 font-sans">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#06122b]">Meta Title trang chủ mặc định</label>
            <Input
              value={formData.seo_meta_title}
              onChange={(e) => handleChange("seo_meta_title", e.target.value)}
              placeholder="VD: Hãng Luật Vạn Ích | 万益律师事务所 - Hành Lang Pháp Lý Việt Trung"
              className="h-8 text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#06122b]">Meta Description mặc định</label>
            <Input
              value={formData.seo_meta_description}
              onChange={(e) => handleChange("seo_meta_description", e.target.value)}
              placeholder="VD: Tư vấn đầu tư FDI, hợp đồng song ngữ, tranh tụng trọng tài thương mại..."
              className="h-8 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#06122b]">Google Analytics ID (GA4)</label>
              <Input
                value={formData.script_ga_id}
                onChange={(e) => handleChange("script_ga_id", e.target.value)}
                placeholder="VD: G-XXXXXXXXXX"
                className="h-8 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#06122b]">Facebook Pixel ID</label>
              <Input
                value={formData.script_pixel_id}
                onChange={(e) => handleChange("script_pixel_id", e.target.value)}
                placeholder="VD: 123456789012345"
                className="h-8 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nút Lưu cấu hình */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium animate-in fade-in">
              <Check className="size-4" /> Đã lưu thành công toàn bộ cấu hình website!
            </span>
          )}
        </div>
        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="btn-royal !h-9 !text-xs !py-0 !px-6 gap-1.5"
        >
          {updateMutation.isPending ? (
            <>
              <Loader2 className="size-3.5 animate-spin mr-1.5" /> Đang lưu...
            </>
          ) : (
            "Lưu cấu hình website"
          )}
        </Button>
      </div>
    </form>
  );
}
