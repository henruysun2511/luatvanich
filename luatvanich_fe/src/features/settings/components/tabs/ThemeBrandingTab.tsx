"use client";

import React, { useState, useEffect } from "react";
import { useAllSettings, useUpdateSettings } from "../../queries/useSettingsQuery";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mediaService } from "@/features/media/services/media.service";
import { Palette, Upload, Loader2, Check } from "lucide-react";
import { SealStamp } from "@/components/ui/seal-stamp";

export function ThemeBrandingTab() {
  const { data: allSettings, isLoading } = useAllSettings();
  const updateMutation = useUpdateSettings();

  const [formData, setFormData] = useState<Record<string, string>>({
    brand_logo_url: "",
    brand_favicon_url: "",
    brand_seal_char: "万",
  });

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (allSettings) {
      setFormData((prev) => ({
        ...prev,
        brand_logo_url: allSettings.branding?.brand_logo_url || prev.brand_logo_url,
        brand_favicon_url: allSettings.branding?.brand_favicon_url || prev.brand_favicon_url,
        brand_seal_char: allSettings.branding?.brand_seal_char || prev.brand_seal_char,
      }));
    }
  }, [allSettings]);

  const handleChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    setSavedSuccess(false);
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingLogo(true);
      const res = await mediaService.upload(file, "settings");
      handleChange("brand_logo_url", res.url);
    } catch (err) {
      console.error("Lỗi khi tải logo:", err);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleUploadFavicon = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingFavicon(true);
      const res = await mediaService.upload(file, "settings");
      handleChange("brand_favicon_url", res.url);
    } catch (err) {
      console.error("Lỗi khi tải favicon:", err);
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMutation.mutateAsync({ settings: formData, group: "branding" });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-xs text-[#718096]">
        <Loader2 className="size-4 animate-spin mr-2" /> Đang tải cấu hình thương hiệu...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Logo & Favicon */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <Palette className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            Logo & Biểu tượng nhận diện
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          {/* Logo chính */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#06122b]">Logo chính thức của Website</label>
            <div className="flex items-center gap-4">
              {formData.brand_logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.brand_logo_url}
                  alt="Logo chính"
                  className="h-14 max-w-[180px] object-contain border border-[#e7dcc3] bg-[#fcfbf9] p-2"
                />
              ) : (
                <div className="h-14 w-32 border border-dashed border-[#e7dcc3] flex items-center justify-center text-[10px] text-[#718096]">
                  Chưa tải logo
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#e7dcc3] bg-[#fbf7ee] text-[#06122b] hover:bg-[#e7dcc3]/50 transition-colors">
                <Upload className="size-3.5" />
                <span>{uploadingLogo ? "Đang tải..." : "Tải Logo mới"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadLogo}
                  className="hidden"
                  disabled={uploadingLogo}
                />
              </label>
            </div>
            <p className="text-[11px] text-[#718096]">Khuyến nghị: Ảnh PNG trong suốt, chiều cao từ 60px – 100px.</p>
          </div>

          {/* Favicon */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#06122b]">Favicon trình duyệt</label>
            <div className="flex items-center gap-4">
              {formData.brand_favicon_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.brand_favicon_url}
                  alt="Favicon"
                  className="size-10 object-contain border border-[#e7dcc3] bg-[#fcfbf9] p-1"
                />
              ) : (
                <div className="size-10 border border-dashed border-[#e7dcc3] flex items-center justify-center text-[10px] text-[#718096]">
                  .ico
                </div>
              )}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#e7dcc3] bg-[#fbf7ee] text-[#06122b] hover:bg-[#e7dcc3]/50 transition-colors">
                <Upload className="size-3.5" />
                <span>{uploadingFavicon ? "Đang tải..." : "Tải Favicon"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFavicon}
                  className="hidden"
                  disabled={uploadingFavicon}
                />
              </label>
            </div>
            <p className="text-[11px] text-[#718096]">Khuyến nghị: Kích thước 32x32 hoặc 64x64 pixel (PNG / ICO).</p>
          </div>
        </div>
      </div>

      {/* 2. Dấu ấn triện hoàng gia Vạn Ích */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <Palette className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            Dấu ấn Triện Hoàng Gia (Seal Stamp)
          </h3>
        </div>

        <div className="flex items-center gap-6 font-sans">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#06122b]">Ký tự chữ Hán triện</label>
            <Input
              value={formData.brand_seal_char}
              onChange={(e) => handleChange("brand_seal_char", e.target.value)}
              placeholder="万"
              maxLength={2}
              className="h-8 w-20 text-center font-hanzi font-bold text-base"
            />
          </div>

          <div className="flex items-center gap-3 pt-4">
            <div className="text-xs text-[#718096]">Xem trước dấu ấn:</div>
            <SealStamp char={formData.brand_seal_char || "万"} size="sm" variant="gold" />
            <SealStamp char={formData.brand_seal_char || "万"} size="sm" variant="red" />
          </div>
        </div>
      </div>

      {/* Nút Lưu */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium animate-in fade-in">
              <Check className="size-4" /> Đã lưu cài đặt thương hiệu thành công!
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
            "Lưu nhận diện thương hiệu"
          )}
        </Button>
      </div>
    </form>
  );
}
