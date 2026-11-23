import { apiClient } from "@/lib/axios";
import type {
  PaginatedLawyersResponse,
  LawyerItem,
  LawyerQueryParams,
  CreateLawyerInput,
  UpdateLawyerInput,
  LawyerStatus,
} from "../types/lawyers.types";

const LAWYERS_ADMIN_URL = "/admin/lawyers";
const LAWYERS_PUBLIC_URL = "/lawyers";

export const lawyersService = {
  /** Admin: Lấy danh sách hồ sơ luật sư phân trang */
  getAdminLawyers: async (
    params?: LawyerQueryParams,
  ): Promise<PaginatedLawyersResponse> => {
    const res = await apiClient.get<{ data: PaginatedLawyersResponse }>(
      LAWYERS_ADMIN_URL,
      { params },
    );
    return res.data.data;
  },

  /** Admin: Chi tiết một hồ sơ luật sư */
  getAdminLawyerDetail: async (id: string): Promise<LawyerItem> => {
    const res = await apiClient.get<{ data: LawyerItem }>(
      `${LAWYERS_ADMIN_URL}/${id}`,
    );
    return res.data.data;
  },

  /** Admin: Tạo mới hồ sơ luật sư */
  createLawyer: async (payload: CreateLawyerInput): Promise<LawyerItem> => {
    const res = await apiClient.post<{ data: LawyerItem }>(
      LAWYERS_ADMIN_URL,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Cập nhật hồ sơ luật sư */
  updateLawyer: async (
    id: string,
    payload: UpdateLawyerInput,
  ): Promise<LawyerItem> => {
    const res = await apiClient.patch<{ data: LawyerItem }>(
      `${LAWYERS_ADMIN_URL}/${id}`,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Đổi nhanh trạng thái hiển thị */
  updateStatus: async (
    id: string,
    status: LawyerStatus,
  ): Promise<LawyerItem> => {
    const res = await apiClient.patch<{ data: LawyerItem }>(
      `${LAWYERS_ADMIN_URL}/${id}/status`,
      { status },
    );
    return res.data.data;
  },

  /** Admin: Đổi thứ tự hiển thị */
  reorderLawyers: async (ids: string[]): Promise<void> => {
    await apiClient.patch(`${LAWYERS_ADMIN_URL}/reorder`, { ids });
  },

  /** Admin: Xóa mềm hồ sơ luật sư */
  deleteLawyer: async (id: string): Promise<void> => {
    await apiClient.delete(`${LAWYERS_ADMIN_URL}/${id}`);
  },

  /** Public: Lấy danh sách luật sư công khai */
  getPublicLawyers: async (
    lang = "vi",
    group?: string,
  ): Promise<LawyerItem[]> => {
    const res = await apiClient.get<{ data: LawyerItem[] }>(
      LAWYERS_PUBLIC_URL,
      {
        params: { lang, teamGroup: group },
      },
    );
    return res.data.data;
  },

  /** Public: Chi tiết luật sư theo slug */
  getPublicLawyerDetail: async (
    slug: string,
    lang = "vi",
  ): Promise<LawyerItem> => {
    const res = await apiClient.get<{ data: LawyerItem }>(
      `${LAWYERS_PUBLIC_URL}/${slug}`,
      {
        params: { lang },
      },
    );
    return res.data.data;
  },
};
