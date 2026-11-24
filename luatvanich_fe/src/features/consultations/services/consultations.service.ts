import { apiClient } from '@/lib/axios';
import type {
  ConsultationItem,
  PaginatedConsultationsResponse,
  ConsultationQueryParams,
  CreateConsultationInput,
  UpdateConsultationStatusInput,
  AssignConsultationInput,
  CreateConsultationNoteInput,
  ConsultationNoteItem,
  BulkStatusConsultationInput,
} from '../types/consultations.types';

const CONSULTATIONS_ADMIN_URL = "/admin/consultations";
const CONSULTATIONS_PUBLIC_URL = "/consultations";

export const consultationsService = {
  /** Public: Khách gửi yêu cầu tư vấn mới */
  createPublicConsultation: async (payload: CreateConsultationInput) => {
    const res = await apiClient.post<{ success: boolean; data: { id: string; message: string } }>(
      CONSULTATIONS_PUBLIC_URL,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Lấy danh sách leads kèm bộ lọc và phân trang */
  getAdminConsultations: async (params?: ConsultationQueryParams): Promise<PaginatedConsultationsResponse> => {
    const res = await apiClient.get<{ success: boolean; data: PaginatedConsultationsResponse }>(
      CONSULTATIONS_ADMIN_URL,
      { params },
    );
    return res.data.data;
  },

  /** Admin: Lấy chi tiết lead */
  getAdminConsultationDetail: async (id: string): Promise<ConsultationItem> => {
    const res = await apiClient.get<{ success: boolean; data: ConsultationItem }>(
      `${CONSULTATIONS_ADMIN_URL}/${id}`,
    );
    return res.data.data;
  },

  /** Admin: Cập nhật trạng thái lead */
  updateStatus: async (id: string, payload: UpdateConsultationStatusInput): Promise<ConsultationItem> => {
    const res = await apiClient.patch<{ success: boolean; data: ConsultationItem }>(
      `${CONSULTATIONS_ADMIN_URL}/${id}/status`,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Phân công người phụ trách */
  assignUser: async (id: string, payload: AssignConsultationInput): Promise<ConsultationItem> => {
    const res = await apiClient.patch<{ success: boolean; data: ConsultationItem }>(
      `${CONSULTATIONS_ADMIN_URL}/${id}/assign`,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Đổi trạng thái hàng loạt */
  bulkStatus: async (payload: BulkStatusConsultationInput): Promise<void> => {
    await apiClient.post(`${CONSULTATIONS_ADMIN_URL}/bulk-status`, payload);
  },

  /** Admin: Thêm ghi chú nội bộ */
  addNote: async (id: string, payload: CreateConsultationNoteInput): Promise<ConsultationNoteItem> => {
    const res = await apiClient.post<{ success: boolean; data: ConsultationNoteItem }>(
      `${CONSULTATIONS_ADMIN_URL}/${id}/notes`,
      payload,
    );
    return res.data.data;
  },

  /** Admin: Xóa ghi chú nội bộ */
  deleteNote: async (noteId: string): Promise<void> => {
    await apiClient.delete(`${CONSULTATIONS_ADMIN_URL}/notes/${noteId}`);
  },

  /** Admin: Xóa mềm yêu cầu tư vấn */
  deleteConsultation: async (id: string): Promise<void> => {
    await apiClient.delete(`${CONSULTATIONS_ADMIN_URL}/${id}`);
  },
};
