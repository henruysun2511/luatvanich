import { apiClient } from "@/lib/axios";
import type { RoleItem } from "../types/roles.types";

const ROLES_BASE_URL = "/admin/roles";

export const rolesService = {
  /** Lấy danh sách toàn bộ vai trò */
  getRoles: async (): Promise<RoleItem[]> => {
    const res = await apiClient.get<{ data: RoleItem[] }>(ROLES_BASE_URL);
    return res.data.data;
  },

  /** Gán vai trò cho người dùng */
  assignRole: async (userId: string, role: string): Promise<void> => {
    await apiClient.patch(`${ROLES_BASE_URL}/assign/${userId}`, { role });
  },
};
