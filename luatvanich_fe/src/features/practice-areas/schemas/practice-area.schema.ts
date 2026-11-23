import { z } from "zod";

export const practiceAreaTranslationSchema = z.object({
  languageCode: z.enum(["vi", "zh-CN"]),
  name: z
    .string()
    .min(2, "Tên lĩnh vực phải có ít nhất 2 ký tự")
    .max(200, "Tên lĩnh vực tối đa 200 ký tự"),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Đường dẫn tĩnh slug chỉ gồm chữ thường, số và dấu gạch nối (VD: dau-tu-nuoc-ngoai-fdi)",
    )
    .max(220, "Đường dẫn slug tối đa 220 ký tự")
    .optional()
    .or(z.literal("")),
  description: z.string().optional().nullable().or(z.literal("")),
  metaTitle: z
    .string()
    .max(70, "SEO Meta Title tối đa 70 ký tự")
    .optional()
    .nullable()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .max(160, "SEO Meta Description tối đa 160 ký tự")
    .optional()
    .nullable()
    .or(z.literal("")),
  isComplete: z.boolean().default(false),
});

export const practiceAreaFormSchema = z.object({
  iconUrl: z
    .string()
    .max(500, "Đường dẫn Icon tối đa 500 ký tự")
    .optional()
    .nullable()
    .or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
  isFeatured: z.boolean().default(false),
  translations: z
    .array(practiceAreaTranslationSchema)
    .min(1, "Cần có ít nhất một bản dịch ngôn ngữ"),
});

export type PracticeAreaFormValues = z.infer<typeof practiceAreaFormSchema>;
