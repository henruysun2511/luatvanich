"use client";

import React, { useState } from "react";
import {
  useFaqs,
  useCreateFaq,
  useUpdateFaq,
  useDeleteFaq,
} from "../../queries/useSettingsQuery";
import type { FaqItem } from "../../types/settings.types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Plus, Edit2, Trash2, HelpCircle, Loader2 } from "lucide-react";

const CATEGORIES = [
  { value: "general", label: "Chung / Tổng quan" },
  { value: "investment", label: "Đầu tư nước ngoài (FDI)" },
  { value: "contracts", label: "Hợp đồng song ngữ" },
  { value: "dispute", label: "Tranh tụng & Trọng tài" },
  { value: "labor", label: "Lao động & Giấy phép" },
];

export function FaqsTab() {
  const { data: faqs, isLoading } = useFaqs();
  const createMutation = useCreateFaq();
  const updateMutation = useUpdateFaq();
  const deleteMutation = useDeleteFaq();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<"vi" | "zh-CN">("vi");

  const [formCategory, setFormCategory] = useState("general");
  const [formOrder, setFormOrder] = useState(0);
  const [formActive, setFormActive] = useState(true);

  const [viQuestion, setViQuestion] = useState("");
  const [viAnswer, setViAnswer] = useState("");
  const [zhQuestion, setZhQuestion] = useState("");
  const [zhAnswer, setZhAnswer] = useState("");

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormCategory("general");
    setFormOrder((faqs?.length || 0) + 1);
    setFormActive(true);
    setViQuestion("");
    setViAnswer("");
    setZhQuestion("");
    setZhAnswer("");
    setActiveLangTab("vi");
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: FaqItem) => {
    setEditingItem(item);
    setFormCategory(item.category);
    setFormOrder(item.displayOrder);
    setFormActive(item.isActive);

    const vi = item.translations?.find((t) => t.languageCode === "vi");
    const zh = item.translations?.find((t) => t.languageCode === "zh-CN");

    setViQuestion(vi?.question || "");
    setViAnswer(vi?.answer || "");
    setZhQuestion(zh?.question || "");
    setZhAnswer(zh?.answer || "");
    setActiveLangTab("vi");
    setOpenDialog(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!viQuestion.trim() || !viAnswer.trim()) return;

    const translations = [
      {
        languageCode: "vi" as const,
        question: viQuestion,
        answer: viAnswer,
        isComplete: true,
      },
      {
        languageCode: "zh-CN" as const,
        question: zhQuestion || viQuestion,
        answer: zhAnswer || viAnswer,
        isComplete: !!(zhQuestion && zhAnswer),
      },
    ];

    if (editingItem) {
      await updateMutation.mutateAsync({
        id: editingItem.id,
        data: {
          category: formCategory,
          displayOrder: formOrder,
          isActive: formActive,
          translations,
        },
      });
    } else {
      await createMutation.mutateAsync({
        category: formCategory,
        displayOrder: formOrder,
        isActive: formActive,
        translations,
      });
    }
    setOpenDialog(false);
  };

  const handleDelete = async (id: string, question: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa câu hỏi: "${question}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            Câu hỏi pháp lý thường gặp (FAQs)
          </h3>
          <p className="text-xs text-[#718096] mt-0.5">
            Quản lý các câu hỏi và câu trả lời song ngữ Việt – Trung giải đáp thắc mắc cho khách hàng.
          </p>
        </div>
        <Button onClick={handleOpenAdd} variant="royal" className="gap-1.5 text-xs font-semibold h-8 px-3">
          <Plus className="size-3.5 mr-1" /> Thêm câu hỏi
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-xs text-[#718096]">
          <Loader2 className="size-4 animate-spin mr-2" /> Đang tải danh sách câu hỏi...
        </div>
      ) : (
        <div className="border border-[#e7dcc3] bg-white rounded-none overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">Thứ tự</TableHead>
                <TableHead className="w-32">Chuyên mục</TableHead>
                <TableHead>Câu hỏi</TableHead>
                <TableHead className="w-24 text-center">Bản dịch</TableHead>
                <TableHead className="w-28 text-center">Trạng thái</TableHead>
                <TableHead className="w-24 text-right pr-4">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs && faqs.length > 0 ? (
                faqs.map((item) => {
                  const vi = item.translations?.find((t) => t.languageCode === "vi");
                  const zh = item.translations?.find((t) => t.languageCode === "zh-CN");
                  const catLabel =
                    CATEGORIES.find((c) => c.value === item.category)?.label || item.category;

                  return (
                    <TableRow key={item.id} className="hover:bg-[#fbf7ee]">
                      <TableCell className="text-center font-mono text-xs">{item.displayOrder}</TableCell>
                      <TableCell className="text-xs font-medium text-[#718096]">{catLabel}</TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-xs text-[#06122b]">
                            {vi?.question || "Chưa có câu hỏi tiếng Việt"}
                          </p>
                          <p className="text-[11px] text-[#718096] line-clamp-1">
                            {vi?.answer || ""}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-[10px] bg-red-50 text-red-700 px-1 font-semibold border border-red-200">
                            VI
                          </span>
                          {zh && zh.isComplete ? (
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-1 font-semibold border border-blue-200">
                              ZH
                            </span>
                          ) : (
                            <span className="text-[10px] bg-gray-100 text-gray-400 px-1 border border-gray-200">
                              ZH
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`text-[11px] px-2 py-0.5 font-medium ${
                            item.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          {item.isActive ? "Hiển thị" : "Ẩn"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(item)}
                            className="h-7 w-7 p-0 text-[#06122b] hover:text-[#a3171e]"
                            title="Sửa"
                          >
                            <Edit2 className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id, vi?.question || "câu hỏi")}
                            className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                            title="Xóa"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-xs text-[#718096]">
                    Chưa có câu hỏi nào. Bấm "Thêm câu hỏi" để tạo câu hỏi đầu tiên.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog Thêm/Sửa FAQ */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-[95vw] sm:max-w-2xl rounded-none p-0 overflow-hidden">
          <DialogHeader className="p-5 border-b border-[#e7dcc3] bg-[#fbf7ee]">
            <DialogTitle className="text-sm font-semibold text-[#06122b] flex items-center gap-2">
              <HelpCircle className="size-4 text-[#85151b]" />
              {editingItem ? "Chỉnh sửa câu hỏi thường gặp" : "Tạo câu hỏi thường gặp mới"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="p-5 space-y-4 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#06122b]">Chuyên mục</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="h-8 w-full border border-[#e7dcc3] bg-white px-2 text-xs rounded-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#06122b]">Thứ tự</label>
                <Input
                  type="number"
                  value={formOrder}
                  onChange={(e) => setFormOrder(Number(e.target.value))}
                  className="h-8 text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#06122b]">Trạng thái</label>
                <select
                  value={formActive ? "1" : "0"}
                  onChange={(e) => setFormActive(e.target.value === "1")}
                  className="h-8 w-full border border-[#e7dcc3] bg-white px-2 text-xs rounded-none"
                >
                  <option value="1">Hiển thị công khai</option>
                  <option value="0">Tạm ẩn</option>
                </select>
              </div>
            </div>

            {/* Language Switch Tab */}
            <div className="flex border-b border-[#e7dcc3] gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveLangTab("vi")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border-b-2 transition-all -mb-px ${
                  activeLangTab === "vi"
                    ? "border-[#85151b] text-[#85151b]"
                    : "border-transparent text-[#718096] hover:text-[#06122b]"
                }`}
              >
                <span>Tiếng Việt</span>
                <span className="text-destructive">*</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveLangTab("zh-CN")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border-b-2 transition-all -mb-px ${
                  activeLangTab === "zh-CN"
                    ? "border-[#85151b] text-[#85151b]"
                    : "border-transparent text-[#718096] hover:text-[#06122b]"
                }`}
              >
                <span>Tiếng Trung (中文)</span>
              </button>
            </div>

            {/* Form Fields for Selected Language */}
            {activeLangTab === "vi" ? (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#06122b]">
                    Câu hỏi (Tiếng Việt) <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={viQuestion}
                    onChange={(e) => setViQuestion(e.target.value)}
                    placeholder="VD: Thủ tục thành lập công ty FDI tại Việt Nam mất bao lâu?"
                    className="h-8 text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#06122b]">
                    Câu trả lời chi tiết (Tiếng Việt) <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    value={viAnswer}
                    onChange={(e) => setViAnswer(e.target.value)}
                    rows={4}
                    placeholder="VD: Thông thường quy trình cấp IRC và ERC mất từ 25 - 45 ngày làm việc..."
                    className="text-xs leading-relaxed"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#06122b]">
                    Câu hỏi (Tiếng Trung - 常见问题)
                  </label>
                  <Input
                    value={zhQuestion}
                    onChange={(e) => setZhQuestion(e.target.value)}
                    placeholder="VD: 在越南设立外商独资企业需要多长时间？"
                    className="h-8 text-xs font-hanzi"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#06122b]">
                    Câu trả lời chi tiết (Tiếng Trung - 中文详细解答)
                  </label>
                  <Textarea
                    value={zhAnswer}
                    onChange={(e) => setZhAnswer(e.target.value)}
                    rows={4}
                    placeholder="VD: 通常申请投资登记证（IRC）与企业登记证（ERC）需25至45个工作日..."
                    className="text-xs leading-relaxed font-hanzi"
                  />
                </div>
              </div>
            )}

            <DialogFooter className="pt-3 border-t border-[#e7dcc3]/60 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
                className="h-8 text-xs"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                variant="royal"
                size="sm"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="h-8 text-xs px-4"
              >
                {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu câu hỏi"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
