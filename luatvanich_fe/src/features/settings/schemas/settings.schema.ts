import { z } from "zod";

export const siteSettingsSchema = z.object({
  hotline_vn: z.string().max(50, "Hotline tối đa 50 ký tự").optional(),
  hotline_cn: z.string().max(50, "Hotline tối đa 50 ký tự").optional(),
  email_contact: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  address_hq: z.string().max(500, "Địa chỉ tối đa 500 ký tự").optional(),
  working_hours: z.string().max(255, "Giờ làm việc tối đa 255 ký tự").optional(),
  wechat_id: z.string().max(100, "WeChat ID tối đa 100 ký tự").optional(),
  wechat_qr_url: z.string().optional(),
  zalo_url: z.string().optional(),
  facebook_url: z.string().optional(),
  youtube_url: z.string().optional(),
  seo_meta_title: z.string().max(200, "Tiêu đề SEO tối đa 200 ký tự").optional(),
  seo_meta_description: z.string().max(500, "Mô tả SEO tối đa 500 ký tự").optional(),
  script_ga_id: z.string().max(50, "Google Analytics ID tối đa 50 ký tự").optional(),
  script_pixel_id: z.string().max(50, "Facebook Pixel ID tối đa 50 ký tự").optional(),
});

export const partnerFormSchema = z.object({
  name: z.string().min(2, "Tên đối tác tối thiểu 2 ký tự").max(255, "Tên đối tác tối đa 255 ký tự"),
  logoUrl: z.string().min(1, "Vui lòng tải lên ảnh logo đối tác"),
  websiteUrl: z.string().optional().or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const faqTranslationSchema = z.object({
  languageCode: z.enum(["vi", "zh-CN"]),
  question: z.string().min(5, "Câu hỏi tối thiểu 5 ký tự").max(500, "Tối đa 500 ký tự"),
  answer: z.string().min(10, "Câu trả lời chi tiết tối thiểu 10 ký tự"),
  isComplete: z.boolean().default(true),
});

export const faqFormSchema = z.object({
  category: z.string().default("general"),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
  translations: z.array(faqTranslationSchema).min(1, "Cần ít nhất một bản dịch câu hỏi"),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;
export type PartnerFormValues = z.infer<typeof partnerFormSchema>;
export type FaqFormValues = z.infer<typeof faqFormSchema>;
