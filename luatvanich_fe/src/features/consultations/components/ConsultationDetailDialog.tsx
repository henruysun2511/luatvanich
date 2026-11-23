"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useConsultationDetail,
  useUpdateConsultationStatus,
  useAddConsultationNote,
  useDeleteConsultationNote,
} from "../queries/useConsultationsQuery";
import type {
  ConsultationItem,
  LeadStatus,
} from "../types/consultations.types";
import {
  User,
  Building,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Calendar,
  FileText,
  Paperclip,
  Download,
  ExternalLink,
  Send,
  Trash2,
  Scale,
  ShieldAlert,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

interface ConsultationDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consultationId?: string | null;
}

export function ConsultationDetailDialog({
  open,
  onOpenChange,
  consultationId,
}: ConsultationDetailDialogProps) {
  const { data: detail, isLoading } = useConsultationDetail(consultationId || undefined);
  const statusMutation = useUpdateConsultationStatus();
  const addNoteMutation = useAddConsultationNote();
  const deleteNoteMutation = useDeleteConsultationNote(consultationId || "");

  const [newNote, setNewNote] = useState("");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !consultationId) return;

    await addNoteMutation.mutateAsync({
      id: consultationId,
      note: newNote.trim(),
    });
    setNewNote("");
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNoteMutation.mutateAsync(noteId);
  };

  const handleStatusChange = async (status: LeadStatus) => {
    if (!consultationId) return;
    await statusMutation.mutateAsync({ id: consultationId, status });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-5 border-b border-border bg-card shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <DialogTitle className="text-lg font-serif font-bold text-foreground flex items-center gap-2">
                <span>Hồ sơ yêu cầu tư vấn</span>
                {detail?.status && (
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize font-semibold ${
                      detail.status === "new"
                        ? "bg-red-500/10 text-red-600 border-red-500/30"
                        : detail.status === "in_progress"
                        ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                        : detail.status === "done"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {detail.status === "new"
                      ? "Mới tiếp nhận"
                      : detail.status === "in_progress"
                      ? "Đang xử lý"
                      : detail.status === "done"
                      ? "Đã tư vấn"
                      : "Tin rác / Spam"}
                  </Badge>
                )}
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mã hồ sơ: <code className="text-foreground font-mono">{consultationId}</code>
              </p>
            </div>

            {/* Quick Status Select */}
            {detail && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Trạng thái:</span>
                <Select
                  value={detail.status}
                  onValueChange={(val) => handleStatusChange(val as LeadStatus)}
                  disabled={statusMutation.isPending}
                >
                  <SelectTrigger className="h-8 text-xs w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Mới tiếp nhận</SelectItem>
                    <SelectItem value="in_progress">Đang xử lý</SelectItem>
                    <SelectItem value="done">Đã tư vấn</SelectItem>
                    <SelectItem value="spam">Tin rác / Spam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </DialogHeader>

        {/* Content Body 2 Cột */}
        {isLoading ? (
          <div className="flex items-center justify-center p-16 text-muted-foreground">
            <Loader2 className="size-6 animate-spin mr-2" />
            <span className="text-sm">Đang tải chi tiết hồ sơ...</span>
          </div>
        ) : !detail ? (
          <div className="p-8 text-center text-muted-foreground text-sm">
            Không tìm thấy thông tin hồ sơ này.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* CỘT TRÁI (7 Cột): Thông tin khách hàng & Nội dung yêu cầu */}
            <div className="md:col-span-7 p-5 space-y-5">
              {/* Box Thông tin liên hệ */}
              <div className="bg-muted/30 p-4 rounded-lg border border-border space-y-3">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <User className="size-3.5 text-primary" />
                  Thông tin người gửi yêu cầu
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Họ và tên:</span>
                    <strong className="text-foreground text-sm font-semibold">{detail.fullName}</strong>
                  </div>

                  {detail.companyName && (
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Doanh nghiệp:</span>
                      <span className="text-foreground font-medium flex items-center gap-1">
                        <Building className="size-3" />
                        {detail.companyName}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-muted-foreground block text-[11px]">Số điện thoại:</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <strong className="text-foreground font-mono">{detail.phone}</strong>
                      <button
                        type="button"
                        onClick={() => handleCopy(detail.phone, "phone")}
                        className="text-muted-foreground hover:text-foreground p-0.5"
                        title="Sao chép SĐT"
                      >
                        {copiedText === "phone" ? (
                          <Check className="size-3 text-emerald-600" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {detail.email && (
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Email:</span>
                      <span className="text-foreground font-mono truncate block mt-0.5">
                        {detail.email}
                      </span>
                    </div>
                  )}
                </div>

                {/* Kênh ưu tiên & ID WeChat / Zalo */}
                <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-muted-foreground text-[11px]">Kênh muốn liên hệ:</span>
                    <Badge variant="outline" className="font-semibold text-[11px] capitalize">
                      {detail.contactChannel}
                    </Badge>
                  </div>

                  {detail.contactChannelId && (
                    <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded border border-border">
                      <span className="text-muted-foreground text-[11px]">ID kênh:</span>
                      <code className="text-foreground font-mono font-bold text-[11px]">
                        {detail.contactChannelId}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(detail.contactChannelId!, "channelId")}
                        className="text-muted-foreground hover:text-foreground"
                        title="Sao chép ID"
                      >
                        {copiedText === "channelId" ? (
                          <Check className="size-3 text-emerald-600" />
                        ) : (
                          <Copy className="size-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {detail.preferredContactTime && (
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
                    <Clock className="size-3 text-primary" />
                    <span>Khung giờ khách tiện nhận cuộc gọi: <strong>{detail.preferredContactTime}</strong></span>
                  </div>
                )}
              </div>

              {/* Lĩnh vực & Luật sư yêu cầu */}
              {(detail.practiceAreaName || detail.lawyerName) && (
                <div className="grid grid-cols-2 gap-3 text-xs bg-muted/20 p-3 rounded-lg border border-border">
                  {detail.practiceAreaName && (
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Lĩnh vực tư vấn:</span>
                      <span className="text-foreground font-semibold flex items-center gap-1 mt-0.5">
                        <Scale className="size-3 text-primary" />
                        {detail.practiceAreaName}
                      </span>
                    </div>
                  )}

                  {detail.lawyerName && (
                    <div>
                      <span className="text-muted-foreground block text-[11px]">Luật sư chỉ định:</span>
                      <span className="text-foreground font-semibold flex items-center gap-1 mt-0.5">
                        <User className="size-3 text-primary" />
                        {detail.lawyerName}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Nội dung chi tiết */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="size-3.5 text-primary" />
                  Nội dung vụ việc & Nhu cầu tư vấn
                </h3>

                {detail.title && (
                  <h4 className="font-semibold text-sm text-foreground bg-muted/40 p-2 rounded">
                    {detail.title}
                  </h4>
                )}

                <div className="p-3.5 rounded-lg border border-border bg-card text-xs text-foreground leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
                  {detail.content}
                </div>
              </div>

              {/* Hồ sơ tệp đính kèm */}
              {detail.attachments && detail.attachments.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Paperclip className="size-3.5 text-primary" />
                    Tài liệu hồ sơ đính kèm ({detail.attachments.length})
                  </h3>

                  <div className="space-y-1.5">
                    {detail.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center justify-between p-2 px-3 rounded-md border border-border bg-muted/20 hover:bg-muted/40 transition-colors text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Paperclip className="size-3.5 text-muted-foreground shrink-0" />
                          <span className="font-medium text-foreground truncate">{att.fileName}</span>
                          {att.fileSizeBytes && (
                            <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                              ({(att.fileSizeBytes / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          )}
                        </div>

                        <a
                          href={att.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] text-primary hover:underline font-semibold shrink-0 ml-2"
                        >
                          <ExternalLink className="size-3" />
                          Xem / Tải
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dấu vết kỹ thuật */}
              <div className="text-[10px] text-muted-foreground/80 flex items-center justify-between pt-2 border-t border-border">
                <span>Gửi lúc: {new Date(detail.createdAt).toLocaleString("vi-VN")}</span>
                {detail.ipAddress && <span>IP: {detail.ipAddress}</span>}
              </div>
            </div>

            {/* CỘT PHẢI (5 Cột): Ghi chú nội bộ CRM */}
            <div className="md:col-span-5 p-5 flex flex-col bg-muted/10 h-full">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-border shrink-0">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="size-3.5 text-primary" />
                  Tiến trình & Ghi chú nội bộ
                </h3>
                <span className="text-[10px] text-muted-foreground">
                  {detail.notes?.length || 0} ghi chú
                </span>
              </div>

              {/* Form Thêm ghi chú mới */}
              <form onSubmit={handleAddNote} className="space-y-2 mb-4 shrink-0">
                <Textarea
                  placeholder="Nhập tiến trình tư vấn (VD: Đã gọi lần 1 khách hẹn chiều gọi lại, đã gửi báo giá qua WeChat)..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="text-xs min-h-[75px] resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={!newNote.trim() || addNoteMutation.isPending}
                    className="h-7 text-xs gap-1.5 px-3"
                  >
                    {addNoteMutation.isPending ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <Send className="size-3" />
                    )}
                    Lưu ghi chú
                  </Button>
                </div>
              </form>

              {/* Danh sách Timeline Ghi chú */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[360px]">
                {!detail.notes || detail.notes.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-xs italic">
                    Chưa có ghi chú nội bộ nào cho hồ sơ này.
                  </div>
                ) : (
                  detail.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-lg border border-border bg-card text-xs space-y-1 relative group"
                    >
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <strong className="text-foreground font-semibold">
                          {note.authorName || "Thành viên nội bộ"}
                        </strong>
                        <span className="font-mono text-[10px]">
                          {new Date(note.createdAt).toLocaleDateString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                          })}
                        </span>
                      </div>

                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {note.note}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        disabled={deleteNoteMutation.isPending}
                        className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                        title="Xóa ghi chú này"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
