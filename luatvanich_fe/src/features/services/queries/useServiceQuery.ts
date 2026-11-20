import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/axios";
import { legalServicesApi } from "../services/service.service";
import type {
  CreateServicePayload,
  ServiceFilterCriteria,
  UpdateServicePayload,
} from "../types/service.types";

/* ---------- Query Keys Factory ---------- */
export const serviceQueryKeys = {
  root: ["legal-services"] as const,
  lists: () => [...serviceQueryKeys.root, "list"] as const,
  listWithFilters: (criteria?: ServiceFilterCriteria) =>
    [...serviceQueryKeys.lists(), criteria || {}] as const,
  details: () => [...serviceQueryKeys.root, "detail"] as const,
  detailById: (id: string) => [...serviceQueryKeys.details(), id] as const,
};

/* ---------- Queries ---------- */
export function useLegalServices(criteria?: ServiceFilterCriteria) {
  return useQuery({
    queryKey: serviceQueryKeys.listWithFilters(criteria),
    queryFn: ({ signal }) => legalServicesApi.fetchList(criteria, signal),
    placeholderData: keepPreviousData,
  });
}

export function useLegalServiceDetail(serviceId?: string) {
  return useQuery({
    queryKey: serviceQueryKeys.detailById(serviceId || ""),
    queryFn: ({ signal }) => legalServicesApi.fetchById(serviceId as string, signal),
    enabled: Boolean(serviceId),
  });
}

/* ---------- Mutations ---------- */
export function useCreateLegalService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateServicePayload) => legalServicesApi.createItem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceQueryKeys.lists() });
      toast.success("Đã thêm dịch vụ pháp lý thành công");
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useUpdateLegalService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateServicePayload }) =>
      legalServicesApi.updateItem(id, payload),
    onSuccess: (updatedService) => {
      queryClient.setQueryData(
        serviceQueryKeys.detailById(updatedService.id),
        updatedService,
      );
      queryClient.invalidateQueries({ queryKey: serviceQueryKeys.lists() });
      toast.success("Đã cập nhật dịch vụ pháp lý");
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}

export function useDeleteLegalService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serviceId: string) => legalServicesApi.removeItem(serviceId),
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: serviceQueryKeys.lists() });
      // Xoá triệt để khỏi cache tránh stale reads
      queryClient.removeQueries({
        queryKey: serviceQueryKeys.detailById(deletedId),
        exact: true,
      });
      toast.success("Đã xóa dịch vụ pháp lý");
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err));
    },
  });
}
