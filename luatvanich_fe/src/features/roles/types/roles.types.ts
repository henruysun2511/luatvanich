export interface RoleItem {
  id: string;
  code: string;
  name: string;
  description?: string;
  permissions: string[];
  isSystem: boolean;
}

export interface AssignRoleInput {
  role: string;
}

export interface AssignUserRoleInput {
  userId: string;
  role: string;
}
