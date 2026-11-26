import { apiClient } from "@/lib/axios";
import { PUBLIC_SERVICES_PAGE_SIZE } from "../constants/public-services.constant";
import type { SupportedLocale } from "@/types/api";
import type {
  PublicLegalServiceDetail,
  PublicLegalServiceLawyer,
  PublicLegalServicesQuery,
  PublicLegalServicesResponse,
} from "../types/service.types";
import type {
  PaginatedLegalServicesResponse,
  LegalServiceItem,
  LegalServiceQueryParams,
  CreateLegalServiceInput,
  UpdateLegalServiceInput,
  ServicePublishStatus,
} from "../types/service.types";

const LEGAL_SERVICES_ADMIN_URL = "/admin/legal-services";
const LEGAL_SERVICES_PUBLIC_URL = "/legal-services";

export const legalServicesService = {
  /** Admin: Lấy danh sách dịch vụ pháp lý phân trang */
  getAdminServices: async (
    params?: LegalServiceQueryParams,
  ): Promise<PaginatedLegalServicesResponse> => {
    const res = await apiClient.get<{ data: PaginatedLegalServicesResponse }>(
      LEGAL_SERVICES_ADMIN_URL,
      { params },
    );
    return res.data.data;
  },

  /** Admin: Chi tiết một dịch vụ */
  getAdminServiceDetail: async (id: string): Promise<LegalServiceItem> => {
    const res = await apiClient.get<{ data: LegalServiceItem }>(
      `${LEGAL_SERVICES_ADMIN_URL}/${id}`,
    );
    return res.data.data;
  },

  /** Admin: Tạo mới dịch vụ */
  createService: async (
    payload: CreateLegalServiceInput,
  ): Promise<LegalServiceItem> => {
    const res = await apiClient.post<{ data: LegalServiceItem }>(
      LEGAL_SERVICES_ADMIN_URL,
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
      `${LEGAL_SERVICES_ADMIN_URL}/${id}`,
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
      `${LEGAL_SERVICES_ADMIN_URL}/${id}/status`,
      { status },
    );
    return res.data.data;
  },

  /** Admin: Đổi thứ tự hiển thị */
  reorderServices: async (ids: string[]): Promise<void> => {
    await apiClient.patch(`${LEGAL_SERVICES_ADMIN_URL}/reorder`, { ids });
  },

  /** Admin: Xóa mềm dịch vụ */
  deleteService: async (id: string): Promise<void> => {
    await apiClient.delete(`${LEGAL_SERVICES_ADMIN_URL}/${id}`);
  },

  async getPublicServiceDetail(lang: SupportedLocale, slug: string, signal?: AbortSignal) {
    const res = await apiClient.get<{ data: PublicLegalServiceDetail }>(
      `${LEGAL_SERVICES_PUBLIC_URL}/${encodeURIComponent(slug)}`,
      { params: { lang }, signal, skipAuthRefresh: true },
    );
    return res.data.data;
  },

  async getPublicServiceLawyers(lang: SupportedLocale, practiceAreaId: string, signal?: AbortSignal) {
    const res = await apiClient.get<{ data: { items: PublicLegalServiceLawyer[] } }>(
      "/lawyers",
      { params: { lang, practiceAreaId, limit: 100 }, signal, skipAuthRefresh: true },
    );
    return res.data.data;
  },

  /** Public: Lấy danh sách dịch vụ công khai */
  getPublicServices: async (
    params: PublicLegalServicesQuery,
    signal?: AbortSignal,
  ): Promise<PublicLegalServicesResponse> => {
    const res = await apiClient.get<{ data: PublicLegalServicesResponse }>(
      LEGAL_SERVICES_PUBLIC_URL,
      {
        params: { ...params, limit: PUBLIC_SERVICES_PAGE_SIZE },
        signal,
        skipAuthRefresh: true,
      },
    );
    return res.data.data;
  },
};
