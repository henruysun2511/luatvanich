"use client";

import React, { useState } from "react";
import {
  usePartners,
  useCreatePartner,
  useUpdatePartner,
  useDeletePartner,
} from "../../queries/useSettingsQuery";
import type { PartnerItem } from "../../types/settings.types";
import { mediaService } from "@/features/media/services/media.service";
import { Input } from "@/components/ui/input";
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
import { Plus, Edit2, Trash2, Upload, Loader2, ExternalLink } from "lucide-react";

export function PartnersTab() {
  const { data: partners, isLoading } = usePartners();
  const createMutation = useCreatePartner();
  const updateMutation = useUpdatePartner();
  const deleteMutation = useDeletePartner();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<PartnerItem | null>(null);

  const [formName, setFormName] = useState("");
  const [formLogoUrl, setFormLogoUrl] = useState("");
  const [formWebsiteUrl, setFormWebsiteUrl] = useState("");
  const [formOrder, setFormOrder] = useState(0);
  const [formActive, setFormActive] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormName("");
    setFormLogoUrl("");
    setFormWebsiteUrl("");
    setFormOrder((partners?.length || 0) + 1);
    setFormActive(true);
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: PartnerItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormLogoUrl(item.logoUrl);
    setFormWebsiteUrl(item.websiteUrl || "");
    setFormOrder(item.displayOrder);
    setFormActive(item.isActive);
    setOpenDialog(true);
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingLogo(true);
      const res = await mediaService.upload(file, "partners");
      setFormLogoUrl(res.url);
    } catch (err) {
      console.error("Lỗi khi tải logo đối tác:", err);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formLogoUrl.trim()) return;

    if (editingItem) {
      await updateMutation.mutateAsync({
        id: editingItem.id,
        data: {
          name: formName,
          logoUrl: formLogoUrl,
          websiteUrl: formWebsiteUrl,
          displayOrder: formOrder,
          isActive: formActive,
        },
      });
    } else {
      await createMutation.mutateAsync({
        name: formName,
        logoUrl: formLogoUrl,
        websiteUrl: formWebsiteUrl,
        displayOrder: formOrder,
        isActive: formActive,
      });
    }
    setOpenDialog(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa đối tác "${name}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#06122b]">
            Danh sách đối tác & Khách hàng
          </h3>
          <p className="text-xs text-[#718096] mt-0.5">
            Quản lý các logo xuất hiện trên thanh đối tác chạy tự động (Slider) ngoài trang chủ.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="btn-royal !text-xs !py-1.5 !px-3">
          <Plus className="size-3.5 mr-1" /> Thêm đối tác
        </Button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-xs text-[#718096]">
          <Loader2 className="size-4 animate-spin mr-2" /> Đang tải danh sách...
        </div>
      ) : (
        <div className="border border-[#e7dcc3] bg-white rounded-none overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16 text-center">Thứ tự</TableHead>
                <TableHead className="w-24 text-center">Logo</TableHead>
                <TableHead>Tên đối tác / Tổ chức</TableHead>
                <TableHead>Website</TableHead>
                <TableHead className="w-28 text-center">Trạng thái</TableHead>
                <TableHead className="w-24 text-right pr-4">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partners && partners.length > 0 ? (
                partners.map((item) => (
                  <TableRow key={item.id} className="hover:bg-[#fbf7ee]">
                    <TableCell className="text-center font-mono text-xs">{item.displayOrder}</TableCell>
                    <TableCell className="text-center">
                      <div className="size-10 mx-auto border border-[#e7dcc3] bg-[#fcfbf9] flex items-center justify-center p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.logoUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-xs text-[#06122b]">{item.name}</TableCell>
                    <TableCell className="text-xs text-[#718096] font-mono">
                      {item.websiteUrl ? (
                        <a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:text-[#a3171e] hover:underline"
                        >
                          <span className="truncate max-w-[200px]">{item.websiteUrl}</span>
                          <ExternalLink className="size-3 shrink-0" />
                        </a>
                      ) : (
                        "—"
                      )}
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
                          onClick={() => handleDelete(item.id, item.name)}
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          title="Xóa"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-xs text-[#718096]">
                    Chưa có đối tác nào. Bấm "Thêm đối tác" để tải lên logo đầu tiên.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog Thêm/Sửa Đối tác */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="w-[95vw] sm:max-w-lg rounded-none p-0 overflow-hidden">
          <DialogHeader className="p-5 border-b border-[#e7dcc3] bg-[#fbf7ee]">
            <DialogTitle className="text-sm font-semibold text-[#06122b]">
              {editingItem ? "Chỉnh sửa thông tin đối tác" : "Thêm đối tác / Khách hàng mới"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="p-5 space-y-4 font-sans">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#06122b]">
                Tên đối tác / Tổ chức <span className="text-destructive">*</span>
              </label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="VD: Ngân hàng Công thương Trung Quốc (ICBC)"
                className="h-8 text-xs"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#06122b]">
                Ảnh Logo <span className="text-destructive">*</span>
              </label>
              <div className="flex items-center gap-3">
                {formLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={formLogoUrl}
                    alt="Logo preview"
                    className="size-12 object-contain border border-[#e7dcc3] bg-[#fcfbf9] p-1"
                  />
                ) : (
                  <div className="size-12 border border-dashed border-[#e7dcc3] flex items-center justify-center text-[10px] text-[#718096]">
                    Chưa có
                  </div>
                )}
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#e7dcc3] bg-[#fbf7ee] text-[#06122b] hover:bg-[#e7dcc3]/50 transition-colors">
                  <Upload className="size-3.5" />
                  <span>{uploadingLogo ? "Đang tải ảnh..." : "Chọn ảnh Logo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadLogo}
                    className="hidden"
                    disabled={uploadingLogo}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#06122b]">Đường dẫn Website</label>
              <Input
                value={formWebsiteUrl}
                onChange={(e) => setFormWebsiteUrl(e.target.value)}
                placeholder="VD: https://www.icbc.com.cn"
                className="h-8 text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#06122b]">Thứ tự hiển thị</label>
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
                  <option value="1">Hiển thị trên Slider</option>
                  <option value="0">Tạm ẩn</option>
                </select>
              </div>
            </div>

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
                disabled={createMutation.isPending || updateMutation.isPending || !formLogoUrl}
                className="btn-royal !h-8 !text-xs !py-0 !px-4"
              >
                {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : "Lưu đối tác"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
