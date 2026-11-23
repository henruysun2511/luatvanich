import { apiClient } from "@/lib/axios";
import type {
  PaginatedPracticeAreasResponse,
  PracticeAreaItem,
  PracticeAreaQueryParams,
  CreatePracticeAreaInput,
  UpdatePracticeAreaInput,
} from "../types/practice-areas.types";

const PRACTICE_AREAS_ADMIN_URL = "/admin/practice-areas";
const PRACTICE_AREAS_PUBLIC_URL = "/practice-areas";

export const practiceAreasService = {
  /** Admin: Lấy danh sách lĩnh vực chuyên môn (phân trang, lọc, tìm kiếm) */
  getAdminPracticeAreas: async (
    params?: PracticeAreaQueryParams,
  ): Promise<PaginatedPracticeAreasResponse> => {
    const res = await apiClient.get<{ data: PaginatedPracticeAreasResponse }>(
      PRACTICE_AREAS_ADMIN_URL,
      { params },
    );
    return res.data.data;
  },

  /** Admin: Chi tiết một lĩnh vực chuyên môn theo ID */
  getAdminPracticeAreaDetail: async (id: string): Promise<PracticeAreaItem> => {
    const res = await apiClient.get<{ data: PracticeAreaItem }>(
      `${PRACTICE_AREAS_ADMIN_URL}/${id}`,
    );
    return res.data.data;
  },

  /** Admin: Tạo mới lĩnh vực chuyên môn kèm các bản dịch */
  createPracticeArea: async (
    payload: CreatePracticeAreaInput,
  ): Promise<PracticeAreaItem> => {
    const res = await apiClient.post<{ data: PracticeAreaItem }>(
      PRACTICE_AREAS_ADMIN_URL,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Cập nhật thông tin lĩnh vực và bản dịch */
  updatePracticeArea: async (
    id: string,
    payload: UpdatePracticeAreaInput,
  ): Promise<PracticeAreaItem> => {
    const res = await apiClient.patch<{ data: PracticeAreaItem }>(
      `${PRACTICE_AREAS_ADMIN_URL}/${id}`,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Kéo thả cập nhật thứ tự hiển thị */
  reorderPracticeAreas: async (ids: string[]): Promise<void> => {
    await apiClient.patch(`${PRACTICE_AREAS_ADMIN_URL}/reorder`, { ids });
  },

  /** Admin: Xóa mềm lĩnh vực chuyên môn */
  deletePracticeArea: async (id: string): Promise<void> => {
    await apiClient.delete(`${PRACTICE_AREAS_ADMIN_URL}/${id}`);
  },

  /** Public: Lấy danh sách lĩnh vực đã xuất bản */
  getPublicPracticeAreas: async (
    lang = "vi",
    featured?: boolean,
  ): Promise<PracticeAreaItem[]> => {
    const res = await apiClient.get<{ data: PracticeAreaItem[] }>(
      PRACTICE_AREAS_PUBLIC_URL,
      {
        params: { lang, featured },
      },
    );
    return res.data.data;
  },

  /** Public: Chi tiết lĩnh vực theo slug */
  getPublicPracticeAreaDetail: async (
    slug: string,
    lang = "vi",
  ): Promise<PracticeAreaItem> => {
    const res = await apiClient.get<{ data: PracticeAreaItem }>(
      `${PRACTICE_AREAS_PUBLIC_URL}/${slug}`,
      {
        params: { lang },
      },
    );
    return res.data.data;
  },
};
