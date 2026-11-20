"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LEGAL_PRACTICE_AREAS,
  SERVICE_STATUS_BADGES,
} from "../constants/service.constants";
import {
  serviceValidationSchema,
  type ServiceFormData,
} from "../schemas/service.schema";
import {
  useCreateLegalService,
  useUpdateLegalService,
} from "../queries/useServiceQuery";
import type { LegalServiceItem } from "../types/service.types";

interface ServiceFormDialogProps {
  isOpen: boolean;
  selectedService: LegalServiceItem | null;
  onDismiss: () => void;
}

const DEFAULT_FORM_VALUES: ServiceFormData = {
  code: "",
  titleVi: "",
  titleZh: "",
  slugVi: "",
  slugZh: "",
  practiceArea: "Đầu tư FDI",
  summaryVi: "",
  summaryZh: "",
  displayOrder: 1,
  status: "published",
  isFeatured: false,
};

export function ServiceFormDialog({
  isOpen,
  selectedService,
  onDismiss,
}: ServiceFormDialogProps) {
  const createMutation = useCreateLegalService();
  const updateMutation = useUpdateLegalService();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceValidationSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  // Reset form khi mở hoặc đổi selectedService
  useEffect(() => {
    if (selectedService) {
      reset({
        code: selectedService.code,
        titleVi: selectedService.titleVi,
        titleZh: selectedService.titleZh ?? "",
        slugVi: selectedService.slugVi,
        slugZh: selectedService.slugZh ?? "",
        practiceArea: selectedService.practiceArea,
        summaryVi: selectedService.summaryVi,
        summaryZh: selectedService.summaryZh ?? "",
        displayOrder: selectedService.displayOrder,
        status: selectedService.status,
        isFeatured: selectedService.isFeatured,
      });
    } else {
      reset(DEFAULT_FORM_VALUES);
    }
  }, [selectedService, reset, isOpen]);

  const handleFormSubmit = (formData: ServiceFormData) => {
    if (selectedService) {
      updateMutation.mutate(
        { id: selectedService.id, payload: formData },
        { onSuccess: onDismiss },
      );
    } else {
      createMutation.mutate(formData, { onSuccess: onDismiss });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && !isSubmitting && onDismiss()}
    >
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedService ? "Chỉnh sửa dịch vụ pháp lý" : "Thêm dịch vụ mới"}
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin tiêu đề, mã nghiệp vụ và mô tả song ngữ Việt - Trung.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold">Mã nghiệp vụ *</label>
              <Input
                {...register("code")}
                placeholder="VD: FDI-01"
                className="mt-1"
              />
              {errors.code && (
                <span className="text-[11px] text-destructive">
                  {errors.code.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold">Thứ tự hiển thị *</label>
              <Input
                type="number"
                {...register("displayOrder", { valueAsNumber: true })}
                className="mt-1"
              />
              {errors.displayOrder && (
                <span className="text-[11px] text-destructive">
                  {errors.displayOrder.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Tên dịch vụ (Tiếng Việt) *</label>
            <Input
              {...register("titleVi")}
              placeholder="VD: Tư vấn Đầu tư FDI"
              className="mt-1"
            />
            {errors.titleVi && (
              <span className="text-[11px] text-destructive">
                {errors.titleVi.message}
              </span>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold">Tên dịch vụ (Tiếng Trung - 中文)</label>
            <Input
              {...register("titleZh")}
              placeholder="VD: 外商直接投资法律咨询"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold">Đường dẫn slug (Tiếng Việt) *</label>
              <Input
                {...register("slugVi")}
                placeholder="tu-van-dau-tu-fdi"
                className="mt-1"
              />
              {errors.slugVi && (
                <span className="text-[11px] text-destructive">
                  {errors.slugVi.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold">Lĩnh vực pháp lý *</label>
              <Select
                value={watch("practiceArea")}
                onValueChange={(val) => setValue("practiceArea", val)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEGAL_PRACTICE_AREAS.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold">Tóm tắt ngắn (Tiếng Việt) *</label>
            <Textarea
              {...register("summaryVi")}
              rows={3}
              placeholder="Mô tả tóm tắt nội dung dịch vụ..."
              className="mt-1"
            />
            {errors.summaryVi && (
              <span className="text-[11px] text-destructive">
                {errors.summaryVi.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold">Trạng thái xuất bản</label>
              <Select
                value={watch("status")}
                onValueChange={(val: any) => setValue("status", val)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_STATUS_BADGES.map((b) => (
                    <SelectItem key={b.value} value={b.value}>
                      {b.text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onDismiss}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="size-4 animate-spin mr-1" />}
              {selectedService ? "Lưu thay đổi" : "Tạo dịch vụ"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
