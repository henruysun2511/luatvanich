import { z } from "zod";

export const assignRoleSchema = z.object({
  role: z.string().min(1, "Vui lòng chọn một vai trò"),
});

export type AssignRoleSchema = z.infer<typeof assignRoleSchema>;
