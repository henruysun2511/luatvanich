import { z } from "zod";

export const serviceFormSchema = z.object({
  // Thông tin chung
  practiceAreaId: z.string().optional().nullable().or(z.literal("")),
  coverImageUrl: z.string().optional().nullable().or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["published", "draft"]).default("draft"),
  isFeatured: z.boolean().default(false),

  // Tiếng Việt (bắt buộc)
  titleVi: z
    .string()
    .min(2, "Tên dịch vụ tiếng Việt tối thiểu 2 ký tự")
    .max(200, "Tên dịch vụ tối đa 200 ký tự"),
  slugVi: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug chỉ gồm chữ thường không dấu, số và gạch nối (VD: tu-van-dau-tu-fdi)",
    )
    .max(220, "Slug tối đa 220 ký tự")
    .optional()
    .or(z.literal("")),
  excerptVi: z.string().optional().nullable().or(z.literal("")),
  contentHtmlVi: z.string().optional().nullable().or(z.literal("")),

  // Tiếng Trung (tùy chọn)
  titleZh: z.string().max(200, "Tên tiếng Trung tối đa 200 ký tự").optional().nullable().or(z.literal("")),
  slugZh: z.string().max(220, "Slug tiếng Trung tối đa 220 ký tự").optional().nullable().or(z.literal("")),
  excerptZh: z.string().optional().nullable().or(z.literal("")),
});

export type ServiceFormValues = z.infer<typeof serviceFormSchema>;
