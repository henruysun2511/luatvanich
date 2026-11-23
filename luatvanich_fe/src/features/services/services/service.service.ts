import { apiClient } from "@/lib/axios";
import type {
  PaginatedLegalServicesResponse,
  LegalServiceItem,
  LegalServiceQueryParams,
  CreateLegalServiceInput,
  UpdateLegalServiceInput,
  ServicePublishStatus,
} from "../types/service.types";

const SERVICES_ADMIN_URL = "/admin/services";
const SERVICES_PUBLIC_URL = "/services";

export const legalServicesService = {
  /** Admin: Lấy danh sách dịch vụ pháp lý phân trang */
  getAdminServices: async (
    params?: LegalServiceQueryParams,
  ): Promise<PaginatedLegalServicesResponse> => {
    const res = await apiClient.get<{ data: PaginatedLegalServicesResponse }>(
      SERVICES_ADMIN_URL,
      { params },
    );
    return res.data.data;
  },

  /** Admin: Chi tiết một dịch vụ */
  getAdminServiceDetail: async (id: string): Promise<LegalServiceItem> => {
    const res = await apiClient.get<{ data: LegalServiceItem }>(
      `${SERVICES_ADMIN_URL}/${id}`,
    );
    return res.data.data;
  },

  /** Admin: Tạo mới dịch vụ */
  createService: async (
    payload: CreateLegalServiceInput,
  ): Promise<LegalServiceItem> => {
    const res = await apiClient.post<{ data: LegalServiceItem }>(
      SERVICES_ADMIN_URL,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Cập nhật dịch vụ */
  updateService: async (
    id: string,
    payload: UpdateLegalServiceInput,
  ): Promise<LegalServiceItem> => {
    const res = await apiClient.patch<{ data: LegalServiceItem }>(
      `${SERVICES_ADMIN_URL}/${id}`,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Cập nhật nhanh trạng thái */
  updateStatus: async (
    id: string,
    status: ServicePublishStatus,
  ): Promise<LegalServiceItem> => {
    const res = await apiClient.patch<{ data: LegalServiceItem }>(
      `${SERVICES_ADMIN_URL}/${id}/status`,
      { status },
    );
    return res.data.data;
  },

  /** Admin: Đổi thứ tự hiển thị */
  reorderServices: async (ids: string[]): Promise<void> => {
    await apiClient.patch(`${SERVICES_ADMIN_URL}/reorder`, { ids });
  },

  /** Admin: Xóa mềm dịch vụ */
  deleteService: async (id: string): Promise<void> => {
    await apiClient.delete(`${SERVICES_ADMIN_URL}/${id}`);
  },

  /** Public: Lấy danh sách dịch vụ công khai */
  getPublicServices: async (
    lang = "vi",
    practiceAreaId?: string,
  ): Promise<LegalServiceItem[]> => {
    const res = await apiClient.get<{ data: LegalServiceItem[] }>(
      SERVICES_PUBLIC_URL,
      {
        params: { lang, practiceAreaId },
      },
    );
    return res.data.data;
  },
};
