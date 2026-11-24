import { z } from "zod";

/** Schema bản dịch chuyên mục */
export const postCategoryTranslationSchema = z.object({
  languageCode: z.enum(["vi", "zh-CN"], {
    required_error: "Vui lòng chọn ngôn ngữ",
  }),
  name: z
    .string()
    .trim()
    .min(2, "Tên chuyên mục tối thiểu 2 ký tự")
    .max(100, "Tên chuyên mục tối đa 100 ký tự"),
  slug: z
    .string()
    .trim()
    .max(120, "Slug tối đa 120 ký tự")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .max(500, "Mô tả tối đa 500 ký tự")
    .optional()
    .or(z.literal("")),
});

/** Schema form thêm/sửa chuyên mục */
export const postCategoryFormSchema = z.object({
  section: z.enum(["news", "handbook", "knowledge_base"], {
    required_error: "Vui lòng chọn phân vùng nội dung",
  }),
  parentId: z
    .string()
    .uuid("ID chuyên mục cha không hợp lệ")
    .optional()
    .nullable()
    .or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
  translations: z
    .array(postCategoryTranslationSchema)
    .min(1, "Cần ít nhất một bản dịch ngôn ngữ")
    .max(2, "Tối đa hai bản dịch song ngữ"),
});

export type PostCategoryFormValues = z.infer<typeof postCategoryFormSchema>;
export type PostCategoryTranslationFormValues = z.infer<typeof postCategoryTranslationSchema>;
