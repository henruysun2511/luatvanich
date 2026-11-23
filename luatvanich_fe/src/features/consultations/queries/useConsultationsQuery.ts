import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { consultationsService } from "../services/consultations.service";
import type {
  ConsultationQueryParams,
  CreateConsultationInput,
  LeadStatus,
} from "../types/consultations.types";
import { extractErrorMessage } from "@/lib/axios";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const consultationsKeys = {
  all: ["consultations"] as const,
  lists: () => [...consultationsKeys.all, "list"] as const,
  list: (params?: ConsultationQueryParams) => [...consultationsKeys.lists(), params] as const,
  details: () => [...consultationsKeys.all, "detail"] as const,
  detail: (id: string) => [...consultationsKeys.details(), id] as const,
};

/** Hook lấy danh sách leads phía Admin */
export const useAdminConsultations = (params?: ConsultationQueryParams) => {
  const status = useAuthStore((s) => s.status);
  return useQuery({
    queryKey: consultationsKeys.list(params),
    queryFn: () => consultationsService.getAdminConsultations(params),
    enabled: status === "authenticated",
    placeholderData: (prev) => prev,
  });
};

/** Hook lấy chi tiết 1 lead */
export const useConsultationDetail = (id?: string) => {
  const status = useAuthStore((s) => s.status);
  return useQuery({
    queryKey: consultationsKeys.detail(id || ""),
    queryFn: () => consultationsService.getAdminConsultationDetail(id!),
    enabled: status === "authenticated" && !!id,
  });
};

/** Hook cập nhật trạng thái lead */
export const useUpdateConsultationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      consultationsService.updateStatus(id, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: consultationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: consultationsKeys.detail(data.id) });
      toast.success("Cập nhật trạng thái thành công!", {
        description: `Yêu cầu của ${data.fullName} chuyển sang trạng thái: ${data.status}.`,
      });
    },
    onError: (err) => {
      toast.error("Cập nhật trạng thái thất bại", {
        description: extractErrorMessage(err, "Không thể cập nhật trạng thái, vui lòng thử lại."),
      });
    },
  });
};

/** Hook phân công người phụ trách */
export const useAssignConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, assignedUserId }: { id: string; assignedUserId: string | null }) =>
      consultationsService.assignUser(id, { assignedUserId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: consultationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: consultationsKeys.detail(data.id) });
      toast.success("Phân công người phụ trách thành công!");
    },
    onError: (err) => {
      toast.error("Phân công thất bại", {
        description: extractErrorMessage(err, "Vui lòng thử lại sau."),
      });
    },
  });
};

/** Hook đổi trạng thái hàng loạt */
export const useBulkStatusConsultations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids, status }: { ids: string[]; status: LeadStatus }) =>
      consultationsService.bulkStatus({ ids, status }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: consultationsKeys.lists() });
      toast.success("Cập nhật hàng loạt thành công!", {
        description: `Đã áp dụng trạng thái "${variables.status}" cho ${variables.ids.length} yêu cầu tư vấn.`,
      });
    },
    onError: (err) => {
      toast.error("Thao tác thất bại", {
        description: extractErrorMessage(err, "Vui lòng thử lại sau."),
      });
    },
  });
};

/** Hook thêm ghi chú nội bộ */
export const useAddConsultationNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      consultationsService.addNote(id, { note }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: consultationsKeys.detail(variables.id) });
      toast.success("Đã thêm ghi chú nội bộ!");
    },
    onError: (err) => {
      toast.error("Thêm ghi chú thất bại", {
        description: extractErrorMessage(err, "Vui lòng thử lại."),
      });
    },
  });
};

/** Hook xóa ghi chú nội bộ */
export const useDeleteConsultationNote = (consultationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: string) => consultationsService.deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultationsKeys.detail(consultationId) });
      toast.success("Đã xóa ghi chú!");
    },
    onError: (err) => {
      toast.error("Xóa ghi chú thất bại", {
        description: extractErrorMessage(err, "Bạn không thể xóa ghi chú này."),
      });
    },
  });
};

/** Hook xóa mềm yêu cầu tư vấn */
export const useDeleteConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => consultationsService.deleteConsultation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultationsKeys.lists() });
      toast.success("Đã xóa yêu cầu tư vấn thành công!", {
        description: "Dữ liệu đã được gỡ bỏ khỏi danh sách quản trị.",
      });
    },
    onError: (err) => {
      toast.error("Xóa yêu cầu tư vấn thất bại", {
        description: extractErrorMessage(err, "Vui lòng thử lại sau."),
      });
    },
  });
};

/** Hook công khai: Khách hàng gửi form yêu cầu tư vấn */
export const useCreatePublicConsultation = () => {
  return useMutation({
    mutationFn: (payload: CreateConsultationInput) =>
      consultationsService.createPublicConsultation(payload),
    onSuccess: (data) => {
      toast.success("Gửi yêu cầu tư vấn thành công!", {
        description: data.message,
      });
    },
    onError: (err) => {
      toast.error("Gửi yêu cầu thất bại", {
        description: extractErrorMessage(err, "Vui lòng kiểm tra lại thông tin và thử lại."),
      });
    },
  });
};
