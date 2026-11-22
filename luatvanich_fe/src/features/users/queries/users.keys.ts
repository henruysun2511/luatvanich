import type { UserQueryParams } from "../types/users.types";

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (params?: UserQueryParams) => [...usersKeys.lists(), params] as const,
};
