export interface RoleStyleConfig {
  label: string;
  badgeClass: string;
  description: string;
}

export const ROLE_CONFIG: Record<string, RoleStyleConfig> = {
  superadmin: {
    label: "Super Admin",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
    description: "Toàn quyền quản trị cấp cao nhất của hệ thống",
  },
  admin: {
    label: "Quản trị viên",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    description: "Quản lý nội dung, tài khoản và dịch vụ",
  },
  editor: {
    label: "Biên tập viên",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
    description: "Biên soạn và xuất bản bài viết, dịch vụ",
  },
  viewer: {
    label: "Người xem",
    badgeClass: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800",
    description: "Chỉ có quyền xem thông tin nội bộ",
  },
};
