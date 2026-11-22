import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { officesService } from "../services/offices.service";
import type {
  OfficeQueryParams,
  CreateOfficeInput,
  UpdateOfficeInput,
} from "../types/offices.types";
import { extractErrorMessage } from "@/lib/axios";

export const officesKeys = {
  all: ["offices"] as const,
  lists: () => [...officesKeys.all, "list"] as const,
  list: (params?: OfficeQueryParams) => [...officesKeys.lists(), params] as const,
  details: () => [...officesKeys.all, "detail"] as const,
  detail: (id: string) => [...officesKeys.details(), id] as const,
  public: (lang?: string) => [...officesKeys.all, "public", lang] as const,
};

/** Hook lấy danh sách văn phòng Admin */
export const useAdminOffices = (params?: OfficeQueryParams) => {
  return useQuery({
    queryKey: officesKeys.list(params),
    queryFn: () => officesService.getAdminOffices(params),
    placeholderData: (prev) => prev,
  });
};

/** Hook lấy chi tiết văn phòng Admin */
export const useAdminOfficeDetail = (id: string) => {
  return useQuery({
    queryKey: officesKeys.detail(id),
    queryFn: () => officesService.getAdminOfficeDetail(id),
    enabled: Boolean(id),
  });
};

/** Hook tạo mới văn phòng */
export const useCreateOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateOfficeInput) => officesService.createOffice(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: officesKeys.lists() });
      toast.success("Tạo văn phòng thành công!", {
        description: `Văn phòng ${data.code} đã được tạo.`,
      });
    },
    onError: (err) => {
      toast.error("Tạo văn phòng thất bại", {
        description: extractErrorMessage(err, "Không thể tạo văn phòng, vui lòng thử lại."),
      });
    },
  });
};

/** Hook cập nhật văn phòng */
export const useUpdateOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOfficeInput }) =>
      officesService.updateOffice(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: officesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: officesKeys.detail(data.id) });
      toast.success("Cập nhật văn phòng thành công!", {
        description: `Thông tin văn phòng ${data.code} đã được lưu.`,
      });
    },
    onError: (err) => {
      toast.error("Cập nhật văn phòng thất bại", {
        description: extractErrorMessage(err, "Không thể cập nhật văn phòng, vui lòng thử lại."),
      });
    },
  });
};

/** Hook cập nhật trạng thái nhanh */
export const useUpdateOfficeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'draft' | 'published' | 'archived' }) =>
      officesService.updateOffice(id, { status }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: officesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: officesKeys.detail(data.id) });
      toast.success("Đổi trạng thái thành công!", {
        description: `Văn phòng ${data.code} chuyển sang ${data.status}.`,
      });
    },
    onError: (err) => {
      toast.error("Đổi trạng thái thất bại", {
        description: extractErrorMessage(err, "Không thể đổi trạng thái, vui lòng thử lại."),
      });
    },
  });
};

/** Hook xóa văn phòng */
export const useDeleteOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => officesService.deleteOffice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: officesKeys.lists() });
      toast.success("Xóa văn phòng thành công!");
    },
    onError: (err) => {
      toast.error("Xóa văn phòng thất bại", {
        description: extractErrorMessage(err, "Không thể xóa văn phòng. Vui lòng kiểm tra liên kết."),
      });
    },
  });
};

/** Hook reorder văn phòng */
export const useReorderOffices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => officesService.reorderOffices(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: officesKeys.lists() });
      toast.success("Cập nhật thứ tự hiển thị thành công!");
    },
    onError: (err) => {
      toast.error("Đổi thứ tự thất bại", {
        description: extractErrorMessage(err, "Không thể cập nhật thứ tự."),
      });
    },
  });
};
