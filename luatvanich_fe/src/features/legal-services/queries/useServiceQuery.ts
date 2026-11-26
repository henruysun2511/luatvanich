import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { legalServicesService } from "../services/service.service";
import type {
  LegalServiceQueryParams,
  PublicLegalServicesQuery,
  CreateLegalServiceInput,
  UpdateLegalServiceInput,
  ServicePublishStatus,
} from "../types/service.types";
import { extractErrorMessage } from "@/lib/axios";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export const legalServicesKeys = {
  all: ["legal-services"] as const,
  lists: () => [...legalServicesKeys.all, "list"] as const,
  list: (params?: LegalServiceQueryParams) =>
    [...legalServicesKeys.lists(), params] as const,
  details: () => [...legalServicesKeys.all, "detail"] as const,
  detail: (id: string) => [...legalServicesKeys.details(), id] as const,
  public: (params: PublicLegalServicesQuery) =>
    [...legalServicesKeys.all, "public", params] as const,
};

export const usePublicLegalServices = (params: PublicLegalServicesQuery) =>
  useQuery({
    queryKey: legalServicesKeys.public(params),
    queryFn: ({ signal }) => legalServicesService.getPublicServices(params, signal),
  });

/** Hook lấy danh sách dịch vụ Admin */
export const useAdminLegalServices = (params?: LegalServiceQueryParams) => {
  const status = useAuthStore((s) => s.status);
  return useQuery({
    queryKey: legalServicesKeys.list(params),
    queryFn: () => legalServicesService.getAdminServices(params),
    enabled: status === "authenticated",
    placeholderData: (prev) => prev,
  });
};

/** Hook lấy chi tiết một dịch vụ */
export const useAdminLegalServiceDetail = (id: string) => {
  return useQuery({
    queryKey: legalServicesKeys.detail(id),
    queryFn: () => legalServicesService.getAdminServiceDetail(id),
    enabled: Boolean(id),
  });
};

/** Hook tạo mới dịch vụ */
export const useCreateLegalService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateLegalServiceInput) =>
      legalServicesService.createService(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: legalServicesKeys.lists() });
      toast.success("Tạo dịch vụ pháp lý thành công!");
    },
    onError: (err) => {
      toast.error("Tạo dịch vụ thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể tạo dịch vụ pháp lý, vui lòng thử lại.",
        ),
      });
    },
  });
};

/** Hook cập nhật dịch vụ */
export const useUpdateLegalService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateLegalServiceInput;
    }) => legalServicesService.updateService(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: legalServicesKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: legalServicesKeys.detail(variables.id),
      });
      toast.success("Cập nhật dịch vụ pháp lý thành công!");
    },
    onError: (err) => {
      toast.error("Cập nhật dịch vụ thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể cập nhật dịch vụ pháp lý, vui lòng thử lại.",
        ),
      });
    },
  });
};

/** Hook cập nhật nhanh trạng thái */
export const useUpdateLegalServiceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: ServicePublishStatus;
    }) => legalServicesService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: legalServicesKeys.lists() });
      toast.success("Cập nhật trạng thái thành công!");
    },
    onError: (err) => {
      toast.error("Cập nhật trạng thái thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể cập nhật trạng thái dịch vụ.",
        ),
      });
    },
  });
};

/** Hook đổi thứ tự hiển thị */
export const useReorderLegalServices = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: string[]) => legalServicesService.reorderServices(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: legalServicesKeys.lists() });
      toast.success("Cập nhật thứ tự thành công!");
    },
    onError: (err) => {
      toast.error("Cập nhật thứ tự thất bại", {
        description: extractErrorMessage(err, "Không thể sắp xếp thứ tự."),
      });
    },
  });
};

/** Hook xóa mềm dịch vụ */
export const useDeleteLegalService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => legalServicesService.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: legalServicesKeys.lists() });
      toast.success("Xóa dịch vụ pháp lý thành công!");
    },
    onError: (err) => {
      toast.error("Xóa dịch vụ thất bại", {
        description: extractErrorMessage(
          err,
          "Không thể xóa dịch vụ. Dịch vụ đang xuất bản phải chuyển lưu trữ trước.",
        ),
      });
    },
  });
};
