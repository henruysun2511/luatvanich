import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/axios";
import { settingsService } from "../services/settings.service";
import type { PartnerItem, FaqItem } from "../types/settings.types";

export const settingsKeys = {
  all: ["settings"] as const,
  site: () => [...settingsKeys.all, "site"] as const,
  publicSite: () => [...settingsKeys.all, "public-site"] as const,
  partners: () => [...settingsKeys.all, "partners"] as const,
  faqs: () => [...settingsKeys.all, "faqs"] as const,
};

// 1. Site Settings
export function useAllSettings() {
  return useQuery({
    queryKey: settingsKeys.site(),
    queryFn: () => settingsService.getAllSettings(),
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ settings, group }: { settings: Record<string, string>; group?: string }) =>
      settingsService.updateSettings(settings, group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.site() });
      queryClient.invalidateQueries({ queryKey: settingsKeys.publicSite() });
      toast.success("Cập nhật cấu hình website thành công!");
    },
    onError: (err) => {
      toast.error("Không thể lưu cấu hình", {
        description: extractErrorMessage(err, "Vui lòng kiểm tra lại dữ liệu và thử lại."),
      });
    },
  });
}

// 2. Partners
export function usePartners() {
  return useQuery({
    queryKey: settingsKeys.partners(),
    queryFn: () => settingsService.getPartners(),
  });
}

export function useCreatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<PartnerItem>) => settingsService.createPartner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.partners() });
      toast.success("Thêm đối tác thành công!");
    },
    onError: (err) => {
      toast.error("Không thể thêm đối tác", {
        description: extractErrorMessage(err, "Có lỗi xảy ra, vui lòng thử lại."),
      });
    },
  });
}

export function useUpdatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PartnerItem> }) =>
      settingsService.updatePartner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.partners() });
      toast.success("Cập nhật thông tin đối tác thành công!");
    },
    onError: (err) => {
      toast.error("Không thể cập nhật đối tác", {
        description: extractErrorMessage(err, "Có lỗi xảy ra, vui lòng thử lại."),
      });
    },
  });
}

export function useDeletePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsService.deletePartner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.partners() });
      toast.success("Đã xóa đối tác thành công!");
    },
    onError: (err) => {
      toast.error("Không thể xóa đối tác", {
        description: extractErrorMessage(err, "Có lỗi xảy ra, vui lòng thử lại."),
      });
    },
  });
}

// 3. FAQs
export function useFaqs() {
  return useQuery({
    queryKey: settingsKeys.faqs(),
    queryFn: () => settingsService.getFaqs(),
  });
}

export function useCreateFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<FaqItem>) => settingsService.createFaq(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.faqs() });
      toast.success("Tạo câu hỏi thường gặp thành công!");
    },
    onError: (err) => {
      toast.error("Không thể tạo câu hỏi", {
        description: extractErrorMessage(err, "Có lỗi xảy ra, vui lòng thử lại."),
      });
    },
  });
}

export function useUpdateFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FaqItem> }) =>
      settingsService.updateFaq(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.faqs() });
      toast.success("Cập nhật câu hỏi thành công!");
    },
    onError: (err) => {
      toast.error("Không thể cập nhật câu hỏi", {
        description: extractErrorMessage(err, "Có lỗi xảy ra, vui lòng thử lại."),
      });
    },
  });
}

export function useDeleteFaq() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => settingsService.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.faqs() });
      toast.success("Đã xóa câu hỏi thành công!");
    },
    onError: (err) => {
      toast.error("Không thể xóa câu hỏi", {
        description: extractErrorMessage(err, "Có lỗi xảy ra, vui lòng thử lại."),
      });
    },
  });
}
