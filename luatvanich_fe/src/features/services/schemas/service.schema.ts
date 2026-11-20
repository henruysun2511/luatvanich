import { z } from "zod";

export const serviceValidationSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập mã nghiệp vụ (VD: FDI-01)")
    .max(30, "Mã tối đa 30 ký tự"),
  titleVi: z
    .string()
    .trim()
    .min(3, "Tên tiếng Việt tối thiểu 3 ký tự")
    .max(200, "Tên tối đa 200 ký tự"),
  titleZh: z.string().trim().max(200).optional(),
  slugVi: z
    .string()
    .trim()
    .min(2, "Đường dẫn slug tối thiểu 2 ký tự")
    .regex(/^[a-z0-9-]+$/, "Slug chỉ bao gồm chữ thường không dấu, số và dấu gạch nối"),
  slugZh: z.string().trim().optional(),
  practiceArea: z.string().min(1, "Vui lòng chọn lĩnh vực pháp lý"),
  summaryVi: z
    .string()
    .trim()
    .min(10, "Tóm tắt tối thiểu 10 ký tự")
    .max(500, "Tóm tắt tối đa 500 ký tự"),
  summaryZh: z.string().trim().max(500).optional(),
  displayOrder: z.number().int().min(1, "Thứ tự tối thiểu là 1"),
  status: z.enum(["published", "draft", "archived"]),
  isFeatured: z.boolean().default(false),
});

export type ServiceFormData = z.infer<typeof serviceValidationSchema>;
