"use client";

import React, { useState, useEffect } from "react";
import { useAllSettings, useUpdateSettings } from "../../queries/useSettingsQuery";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Award, Building2, Check, Loader2 } from "lucide-react";

export function CompanyStatsTab() {
  const { data: allSettings, isLoading } = useAllSettings();
  const updateMutation = useUpdateSettings();

  const [formData, setFormData] = useState<Record<string, string>>({
    company_intro_vi: "",
    company_intro_zh: "",
    stat_years: "10+",
    stat_cases: "1,000+",
    stat_rate: "98%",
    stat_bilingual: "100%",
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (allSettings) {
      setFormData((prev) => ({
        ...prev,
        company_intro_vi: allSettings.company?.company_intro_vi || prev.company_intro_vi,
        company_intro_zh: allSettings.company?.company_intro_zh || prev.company_intro_zh,
        stat_years: allSettings.stats?.stat_years || prev.stat_years,
        stat_cases: allSettings.stats?.stat_cases || prev.stat_cases,
        stat_rate: allSettings.stats?.stat_rate || prev.stat_rate,
        stat_bilingual: allSettings.stats?.stat_bilingual || prev.stat_bilingual,
      }));
    }
  }, [allSettings]);

  const handleChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    setSavedSuccess(false);
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
        <Loader2 className="size-4 animate-spin mr-2" /> Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Giới thiệu câu chuyện thương hiệu */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <Building2 className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            Giới thiệu thương hiệu (Về chúng tôi)
          </h3>
        </div>

        <div className="space-y-4 font-sans">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#06122b]">
              Đoạn giới thiệu Tiếng Việt (Hiển thị trang chủ)
            </label>
            <Textarea
              value={formData.company_intro_vi}
              onChange={(e) => handleChange("company_intro_vi", e.target.value)}
              rows={3}
              placeholder="VD: Hãng luật Vạn Ích (万益律师事务所) là đơn vị tiên phong..."
              className="text-xs leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#06122b]">
              Đoạn giới thiệu Tiếng Trung (中文简介)
            </label>
            <Textarea
              value={formData.company_intro_zh}
              onChange={(e) => handleChange("company_intro_zh", e.target.value)}
              rows={3}
              placeholder="VD: 万益律师事务所是专注于中越两国跨境投资..."
              className="text-xs leading-relaxed font-hanzi"
            />
          </div>
        </div>
      </div>

      {/* 2. Dãy số liệu ấn tượng */}
      <div className="border border-[#e7dcc3] bg-white p-5 rounded-none space-y-4">
        <div className="pb-2 border-b border-[#e7dcc3]/60 flex items-center gap-2">
          <Award className="size-4 text-[#85151b]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            4 Con số ấn tượng trên Trang chủ (Numbers Ticker)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-sans">
          <div className="space-y-1.5 p-3 border border-[#e7dcc3]/60 bg-[#fcfbf9]">
            <label className="text-xs font-medium text-[#06122b]">Số năm kinh nghiệm</label>
            <Input
              value={formData.stat_years}
              onChange={(e) => handleChange("stat_years", e.target.value)}
              placeholder="30 năm"
              className="h-8 text-sm font-bold text-[#85151b] font-mono"
            />
            <span className="text-[10px] text-[#718096]">Thành lập từ 1996 (30 năm kinh nghiệm)</span>
          </div>

          <div className="space-y-1.5 p-3 border border-[#e7dcc3]/60 bg-[#fcfbf9]">
            <label className="text-xs font-medium text-[#06122b]">Hồ sơ & Trợ giúp</label>
            <Input
              value={formData.stat_cases}
              onChange={(e) => handleChange("stat_cases", e.target.value)}
              placeholder="4,000+"
              className="h-8 text-sm font-bold text-[#85151b] font-mono"
            />
            <span className="text-[10px] text-[#718096]">Lượt tư vấn & trợ giúp pháp lý</span>
          </div>

          <div className="space-y-1.5 p-3 border border-[#e7dcc3]/60 bg-[#fcfbf9]">
            <label className="text-xs font-medium text-[#06122b]">Quy mô nhân sự</label>
            <Input
              value={formData.stat_rate}
              onChange={(e) => handleChange("stat_rate", e.target.value)}
              placeholder="300+"
              className="h-8 text-sm font-bold text-[#85151b] font-mono"
            />
            <span className="text-[10px] text-[#718096]">Luật sư & chuyên gia pháp lý</span>
          </div>

          <div className="space-y-1.5 p-3 border border-[#e7dcc3]/60 bg-[#fcfbf9]">
            <label className="text-xs font-medium text-[#06122b]">Đội ngũ song ngữ</label>
            <Input
              value={formData.stat_bilingual}
              onChange={(e) => handleChange("stat_bilingual", e.target.value)}
              placeholder="100%"
              className="h-8 text-sm font-bold text-[#85151b] font-mono"
            />
            <span className="text-[10px] text-[#718096]">Luật sư thành thạo tiếng Trung</span>
          </div>
        </div>
      </div>

      {/* Nút Lưu */}
      <div className="flex items-center justify-between pt-2">
        <div>
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium animate-in fade-in">
              <Check className="size-4" /> Đã lưu thông tin giới thiệu và số liệu!
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
            "Lưu giới thiệu & số liệu"
          )}
        </Button>
      </div>
    </form>
  );
}
