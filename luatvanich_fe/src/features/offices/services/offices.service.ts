import { apiClient } from "@/lib/axios";
import type {
  PaginatedOfficesResponse,
  OfficeItem,
  OfficeQueryParams,
  CreateOfficeInput,
  UpdateOfficeInput,
} from "../types/offices.types";

const OFFICES_ADMIN_URL = "/admin/offices";
const OFFICES_PUBLIC_URL = "/offices";

export const officesService = {
  /** Admin: Lấy danh sách văn phòng */
  getAdminOffices: async (params?: OfficeQueryParams): Promise<PaginatedOfficesResponse> => {
    const res = await apiClient.get<{ data: PaginatedOfficesResponse }>(OFFICES_ADMIN_URL, {
      params,
    });
    return res.data.data;
  },

  /** Admin: Chi tiết văn phòng */
  getAdminOfficeDetail: async (id: string): Promise<OfficeItem> => {
    const res = await apiClient.get<{ data: OfficeItem }>(`${OFFICES_ADMIN_URL}/${id}`);
    return res.data.data;
  },

  /** Admin: Tạo mới văn phòng */
  createOffice: async (payload: CreateOfficeInput): Promise<OfficeItem> => {
    const res = await apiClient.post<{ data: OfficeItem }>(OFFICES_ADMIN_URL, payload);
    return res.data.data;
  },

  /** Admin: Cập nhật văn phòng */
  updateOffice: async (id: string, payload: UpdateOfficeInput): Promise<OfficeItem> => {
    const res = await apiClient.patch<{ data: OfficeItem }>(`${OFFICES_ADMIN_URL}/${id}`, payload);
    return res.data.data;
  },

  /** Admin: Cập nhật thứ tự sắp xếp */
  reorderOffices: async (ids: string[]): Promise<void> => {
    await apiClient.patch(`${OFFICES_ADMIN_URL}/reorder`, { ids });
  },

  /** Admin: Xóa văn phòng */
  deleteOffice: async (id: string): Promise<void> => {
    await apiClient.delete(`${OFFICES_ADMIN_URL}/${id}`);
  },

  /** Public: Lấy danh sách văn phòng đã xuất bản */
  getPublicOffices: async (lang = "vi"): Promise<OfficeItem[]> => {
    const res = await apiClient.get<{ data: OfficeItem[] }>(OFFICES_PUBLIC_URL, {
      params: { lang },
    });
    return res.data.data;
  },
};
