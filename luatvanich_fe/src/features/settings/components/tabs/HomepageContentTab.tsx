"use client";

import React, { useState, useEffect } from "react";
import { useAllSettings, useUpdateSettings } from "../../queries/useSettingsQuery";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  GitBranch,
  Sparkles,
  Plus,
  Trash2,
  Check,
  Loader2,
  HelpCircle,
} from "lucide-react";

interface GlossaryTerm {
  vi: string;
  zh: string;
  pinyin: string;
  note: string;
}

interface WorkflowStep {
  time: string;
  tag: string;
  title: string;
  desc: string;
}

interface MarqueeItem {
  vi: string;
  zh: string;
}

const DEFAULT_GLOSSARY: GlossaryTerm[] = [
  { vi: "Hợp đồng", zh: "合同", pinyin: "hétong", note: "Ghi rõ tên pháp nhân đầy đủ ở cả hai bản." },
  { vi: "Đầu tư", zh: "投资", pinyin: "tóuzī", note: "Phân biệt đầu tư trực tiếp và gián tiếp." },
  { vi: "Thanh toán", zh: "付款", pinyin: "fùkuǎn", note: "Nêu rõ tiền tệ, thời hạn và phương thức." },
  { vi: "Phạt vi phạm", zh: "违约金", pinyin: "wéiyuējīn", note: "Mức phạt có trần theo luật Việt Nam (tối đa 8%)." },
  { vi: "Bất khả kháng", zh: "不可抗力", pinyin: "bùkě kànglì", note: "Quy định rõ các sự kiện, thời hạn gửi thông báo." },
  { vi: "Trọng tài", zh: "仲裁", pinyin: "zhòngcái", note: "Chọn trung tâm trọng tài và luật áp dụng rõ ràng." },
  { vi: "Chủ sở hữu hưởng lợi", zh: "实益所有人", pinyin: "shíyì suǒyǒurén", note: "Chú ý nghĩa vụ kê khai thông tin theo quy định mới." },
  { vi: "Giấy phép lao động", zh: "工作许可", pinyin: "gōngzuò xǔkě", note: "Kiểm tra điều kiện bằng cấp, kinh nghiệm từng vị trí." },
  { vi: "Đặt cọc", zh: "定金", pinyin: "dìngjīn", note: "Phân biệt rõ đặt cọc và tiền trả trước trong hợp đồng." },
  { vi: "Thẩm quyền tài phán", zh: "管辖权", pinyin: "guǎnxiáquán", note: "Quy định rõ tòa án hoặc trọng tài có thẩm quyền giải quyết khi có tranh chấp." },
];

const DEFAULT_WORKFLOW: WorkflowStep[] = [
  { time: "Ngày 1", tag: "Tiếp nhận", title: "Nghe trình bày vụ việc", desc: "Luật sư chuyên trách xác định mục tiêu cốt lõi, đánh giá rủi ro sơ bộ và lập danh mục tài liệu cần thu thập." },
  { time: "Ngày 2 – 5", tag: "Rà soát", title: "Đọc hồ sơ ở cả hai ngôn ngữ", desc: "Đối chiếu tỉ mỉ bản Việt và bản Trung, đánh dấu các điều khoản bất lợi, lệch nghĩa hoặc tiềm ẩn tranh chấp." },
  { time: "Tuần 2", tag: "Phương án", title: "Đề xuất phương án & ký hợp đồng", desc: "Báo cáo pháp lý bằng văn bản kèm đề xuất xử lý tối ưu, thống nhất lộ trình và kinh phí với khách hàng." },
  { time: "Từ ngày 6", tag: "Thực hiện", title: "Báo cáo tiến độ định kỳ", desc: "Triển khai công việc, cập nhật tiến độ song ngữ hàng tuần và bàn giao kết quả pháp lý chuẩn xác." },
];

const DEFAULT_MARQUEE: MarqueeItem[] = [
  { vi: "Hợp đồng", zh: "合同" },
  { vi: "Đầu tư", zh: "投资" },
  { vi: "Trọng tài", zh: "仲裁" },
  { vi: "Thu hồi nợ", zh: "债务追收" },
  { vi: "Sở hữu trí tuệ", zh: "知识产权" },
  { vi: "Lao động", zh: "劳动" },
  { vi: "M&A", zh: "并购" },
  { vi: "Thuế", zh: "税务" },
];

export function HomepageContentTab() {
  const { data: allSettings, isLoading } = useAllSettings();
  const updateMutation = useUpdateSettings();

  const [glossary, setGlossary] = useState<GlossaryTerm[]>(DEFAULT_GLOSSARY);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>(DEFAULT_WORKFLOW);
  const [marquee, setMarquee] = useState<MarqueeItem[]>(DEFAULT_MARQUEE);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (allSettings) {
      const contentGroup = allSettings.content || {};

      if (contentGroup.homepage_legal_glossary) {
        try {
          const parsed = JSON.parse(contentGroup.homepage_legal_glossary);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setGlossary(parsed);
          }
        } catch {
          // fallback to default
        }
      }

      if (contentGroup.homepage_legal_workflow) {
        try {
          const parsed = JSON.parse(contentGroup.homepage_legal_workflow);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setWorkflow(parsed);
          }
        } catch {
          // fallback to default
        }
      }

      if (contentGroup.homepage_marquee_keywords) {
        try {
          const parsed = JSON.parse(contentGroup.homepage_marquee_keywords);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMarquee(parsed);
          }
        } catch {
          // fallback to default
        }
      }
    }
  }, [allSettings]);

  // Handlers for Glossary
  const handleGlossaryChange = (index: number, field: keyof GlossaryTerm, value: string) => {
    setGlossary((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setSavedSuccess(false);
  };

  const handleAddGlossary = () => {
    setGlossary((prev) => [
      ...prev,
      { vi: "", zh: "", pinyin: "", note: "" },
    ]);
    setSavedSuccess(false);
  };

  const handleRemoveGlossary = (index: number) => {
    setGlossary((prev) => prev.filter((_, idx) => idx !== index));
    setSavedSuccess(false);
  };

  // Handlers for Workflow
  const handleWorkflowChange = (index: number, field: keyof WorkflowStep, value: string) => {
    setWorkflow((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setSavedSuccess(false);
  };

  const handleAddWorkflow = () => {
    setWorkflow((prev) => [
      ...prev,
      { time: `Bước ${prev.length + 1}`, tag: "Giai đoạn", title: "", desc: "" },
    ]);
    setSavedSuccess(false);
  };

  const handleRemoveWorkflow = (index: number) => {
    setWorkflow((prev) => prev.filter((_, idx) => idx !== index));
    setSavedSuccess(false);
  };

  // Handlers for Marquee
  const handleMarqueeChange = (index: number, field: keyof MarqueeItem, value: string) => {
    setMarquee((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setSavedSuccess(false);
  };

  const handleAddMarquee = () => {
    setMarquee((prev) => [...prev, { vi: "", zh: "" }]);
    setSavedSuccess(false);
  };

  const handleRemoveMarquee = (index: number) => {
    setMarquee((prev) => prev.filter((_, idx) => idx !== index));
    setSavedSuccess(false);
  };

  // Submit all content settings
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      homepage_legal_glossary: JSON.stringify(glossary),
      homepage_legal_workflow: JSON.stringify(workflow),
      homepage_marquee_keywords: JSON.stringify(marquee),
    };

    await updateMutation.mutateAsync({
      settings: payload,
      group: "content",
    });

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
    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-[#e7dcc3] shadow-sm">
        <div>
          <h3 className="font-royal font-bold text-lg text-[#06122b]">
            Cấu hình Từ điển, Quy trình &amp; Dải từ khóa
          </h3>
          <p className="text-xs text-[#718096] mt-0.5">
            Quản trị danh mục 10 thuật ngữ song ngữ, quy trình làm việc 4 bước và từ khóa chạy trên thanh Ticker.
          </p>
        </div>

        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="btn-royal !px-6 !py-2.5 !text-xs shrink-0"
        >
          {updateMutation.isPending ? (
            <>
              <Loader2 className="size-3.5 animate-spin mr-1.5" /> Đang lưu...
            </>
          ) : savedSuccess ? (
            <>
              <Check className="size-3.5 mr-1.5" /> Đã lưu thành công
            </>
          ) : (
            "Lưu cấu hình"
          )}
        </Button>
      </div>

      {/* 1. DẢI TỪ KHÓA CHẠY VÔ TẬN (MARQUEE TICKER) */}
      <div className="bg-white border border-[#e7dcc3] p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-[#e7dcc3]">
          <div className="flex items-center gap-2.5">
            <Sparkles className="size-4 text-[#85151b]" />
            <h4 className="font-semibold text-sm text-[#06122b]">
              Dải từ khóa chạy vô tận (Marquee Ticker)
            </h4>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddMarquee}
            className="text-xs h-8 border-[#c29a45] text-[#85151b] hover:bg-[#fbf7ee]"
          >
            <Plus className="size-3.5 mr-1" /> Thêm từ khóa
          </Button>
        </div>

        <p className="text-xs text-[#718096]">
          Các cặp từ khóa song ngữ Việt – Trung hiển thị lặp vô tận ở thanh màu đỏ đỉnh trang chủ.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {marquee.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2.5 bg-[#fbf7ee] border border-[#e7dcc3]"
            >
              <div className="flex-1 space-y-1.5">
                <Input
                  value={item.vi}
                  onChange={(e) => handleMarqueeChange(idx, "vi", e.target.value)}
                  placeholder="Tiếng Việt (ví dụ: Hợp đồng)"
                  className="h-7 text-xs bg-white rounded-none border-[#e7dcc3]"
                />
                <Input
                  value={item.zh}
                  onChange={(e) => handleMarqueeChange(idx, "zh", e.target.value)}
                  placeholder="Tiếng Trung (ví dụ: 合同)"
                  className="h-7 text-xs bg-white font-hanzi font-semibold text-[#85151b] rounded-none border-[#e7dcc3]"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMarquee(idx)}
                title="Xóa cặp từ khóa"
                className="p-1.5 text-[#a0aec0] hover:text-[#e53e3e] transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TỪ ĐIỂN THUẬT NGỮ PHÁP LÝ VIỆT – TRUNG */}
      <div className="bg-white border border-[#e7dcc3] p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-[#e7dcc3]">
          <div className="flex items-center gap-2.5">
            <BookOpen className="size-4 text-[#85151b]" />
            <h4 className="font-semibold text-sm text-[#06122b]">
              Từ điển thuật ngữ pháp lý Việt – Trung (Legal Glossary)
            </h4>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddGlossary}
            className="text-xs h-8 border-[#c29a45] text-[#85151b] hover:bg-[#fbf7ee]"
          >
            <Plus className="size-3.5 mr-1" /> Thêm thuật ngữ
          </Button>
        </div>

        <p className="text-xs text-[#718096]">
          Quản lý danh sách 10 thuật ngữ song ngữ kèm phiên âm Pinyin và ghi chú lưu ý thực chiến của luật sư.
        </p>

        <div className="space-y-3 pt-2">
          {glossary.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-[#fcfbf9] border border-[#e7dcc3] grid grid-cols-1 lg:grid-cols-12 gap-3 items-center"
            >
              <div className="lg:col-span-1 text-center font-royal font-bold text-xs text-[#c29a45]">
                #{idx + 1}
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] text-[#718096] mb-1 font-medium">Tiếng Việt</label>
                <Input
                  value={item.vi}
                  onChange={(e) => handleGlossaryChange(idx, "vi", e.target.value)}
                  placeholder="Thuật ngữ Tiếng Việt"
                  className="h-8 text-xs bg-white rounded-none border-[#e7dcc3]"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-[11px] text-[#718096] mb-1 font-medium">Tiếng Trung (Hán tự)</label>
                <Input
                  value={item.zh}
                  onChange={(e) => handleGlossaryChange(idx, "zh", e.target.value)}
                  placeholder="Chữ Hán"
                  className="h-8 text-xs bg-white font-hanzi font-semibold text-[#85151b] rounded-none border-[#e7dcc3]"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-[11px] text-[#718096] mb-1 font-medium">Phiên âm Pinyin</label>
                <Input
                  value={item.pinyin}
                  onChange={(e) => handleGlossaryChange(idx, "pinyin", e.target.value)}
                  placeholder="Pinyin (ví dụ: hétong)"
                  className="h-8 text-xs bg-white font-serif rounded-none border-[#e7dcc3]"
                />
              </div>

              <div className="lg:col-span-3">
                <label className="block text-[11px] text-[#718096] mb-1 font-medium">Ghi chú nghiệp vụ luật sư</label>
                <Input
                  value={item.note}
                  onChange={(e) => handleGlossaryChange(idx, "note", e.target.value)}
                  placeholder="Lưu ý pháp lý / điểm cốt lõi..."
                  className="h-8 text-xs bg-white rounded-none border-[#e7dcc3]"
                />
              </div>

              <div className="lg:col-span-1 text-right">
                <button
                  type="button"
                  onClick={() => handleRemoveGlossary(idx)}
                  title="Xóa thuật ngữ"
                  className="p-1.5 text-[#a0aec0] hover:text-[#e53e3e] transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. QUY TRÌNH THỤ LÝ HỒ SƠ 4 BƯỚC */}
      <div className="bg-white border border-[#e7dcc3] p-6 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-[#e7dcc3]">
          <div className="flex items-center gap-2.5">
            <GitBranch className="size-4 text-[#85151b]" />
            <h4 className="font-semibold text-sm text-[#06122b]">
              Quy trình thụ lý hồ sơ 4 bước (Legal Workflow)
            </h4>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddWorkflow}
            className="text-xs h-8 border-[#c29a45] text-[#85151b] hover:bg-[#fbf7ee]"
          >
            <Plus className="size-3.5 mr-1" /> Thêm bước quy trình
          </Button>
        </div>

        <p className="text-xs text-[#718096]">
          4 bước làm việc tiêu chuẩn minh bạch giúp khách hàng nắm rõ tiến độ vụ việc.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {workflow.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#fbf7ee] border border-[#e7dcc3] relative space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-royal font-bold text-sm text-[#85151b]">
                  Bước 0{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveWorkflow(idx)}
                  title="Xóa bước này"
                  className="p-1 text-[#a0aec0] hover:text-[#e53e3e] transition-colors"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-[#718096] mb-1 font-medium">Thời gian</label>
                  <Input
                    value={item.time}
                    onChange={(e) => handleWorkflowChange(idx, "time", e.target.value)}
                    placeholder="Ví dụ: Ngày 1, Tuần 2"
                    className="h-8 text-xs bg-white rounded-none border-[#e7dcc3]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#718096] mb-1 font-medium">Nhãn thẻ</label>
                  <Input
                    value={item.tag}
                    onChange={(e) => handleWorkflowChange(idx, "tag", e.target.value)}
                    placeholder="Ví dụ: Tiếp nhận, Rà soát"
                    className="h-8 text-xs bg-white rounded-none border-[#e7dcc3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#718096] mb-1 font-medium">Tiêu đề bước</label>
                <Input
                  value={item.title}
                  onChange={(e) => handleWorkflowChange(idx, "title", e.target.value)}
                  placeholder="Tiêu đề quy trình"
                  className="h-8 text-xs bg-white font-medium rounded-none border-[#e7dcc3]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#718096] mb-1 font-medium">Mô tả công việc</label>
                <Textarea
                  value={item.desc}
                  onChange={(e) => handleWorkflowChange(idx, "desc", e.target.value)}
                  placeholder="Mô tả các nội dung luật sư thực hiện..."
                  rows={2}
                  className="text-xs bg-white rounded-none border-[#e7dcc3]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
