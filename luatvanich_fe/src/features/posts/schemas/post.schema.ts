import { z } from "zod";

/** Schema bản dịch bài viết */
export const postTranslationSchema = z.object({
  languageCode: z.enum(["vi", "zh-CN"], {
    required_error: "Vui lòng chọn ngôn ngữ",
  }),
  title: z
    .string()
    .trim()
    .min(3, "Tiêu đề tối thiểu 3 ký tự")
    .max(300, "Tiêu đề tối đa 300 ký tự"),
  slug: z
    .string()
    .trim()
    .max(320, "Slug tối đa 320 ký tự")
    .optional()
    .or(z.literal("")),
  summary: z
    .string()
    .trim()
    .max(500, "Tóm tắt tối đa 500 ký tự")
    .optional()
    .or(z.literal("")),
  contentHtml: z
    .string()
    .trim()
    .min(10, "Nội dung bài viết tối thiểu 10 ký tự"),
  metaTitle: z
    .string()
    .trim()
    .max(70, "Tiêu đề SEO tối đa 70 ký tự")
    .optional()
    .or(z.literal("")),
  metaDescription: z
    .string()
    .trim()
    .max(160, "Mô tả SEO tối đa 160 ký tự")
    .optional()
    .or(z.literal("")),
  isComplete: z.boolean().default(false),
});

/** Schema form thêm/sửa bài viết */
export const postFormSchema = z.object({
  categoryId: z.string().uuid("Vui lòng chọn chuyên mục"),
  authorLawyerId: z
    .string()
    .uuid("ID luật sư không hợp lệ")
    .optional()
    .nullable()
    .or(z.literal("")),
  thumbnailUrl: z
    .string()
    .trim()
    .max(500, "URL ảnh bìa tối đa 500 ký tự")
    .optional()
    .nullable()
    .or(z.literal("")),
  isFeatured: z.boolean().default(false),
  tags: z
    .array(z.string().trim().min(1, "Tên thẻ không được rỗng").max(100, "Tên thẻ tối đa 100 ký tự"))
    .max(50, "Tối đa 50 thẻ")
    .default([]),
  serviceIds: z.array(z.string().uuid()).default([]),
  translations: z
    .array(postTranslationSchema)
    .min(1, "Cần ít nhất một bản dịch ngôn ngữ")
    .max(2, "Tối đa hai bản dịch song ngữ"),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
export type PostTranslationFormValues = z.infer<typeof postTranslationSchema>;
