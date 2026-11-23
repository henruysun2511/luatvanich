import { z } from "zod";

export const officeTranslationSchema = z.object({
  languageCode: z.enum(["vi", "zh-CN"]),
  name: z.string().min(2, "Tên văn phòng phải có ít nhất 2 ký tự").max(200, "Tối đa 200 ký tự"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự").max(500, "Tối đa 500 ký tự"),
  workingHours: z.string().max(255).optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  isComplete: z.boolean().default(false),
});

export const officeFormSchema = z.object({
  code: z
    .string()
    .min(2, "Mã văn phòng ít nhất 2 ký tự")
    .max(50, "Mã văn phòng tối đa 50 ký tự")
    .regex(/^[a-zA-Z0-9_-]+$/, "Mã văn phòng chỉ gồm chữ cái, số, gạch nối (-) hoặc gạch dưới (_)"),
  phone: z.string().max(50).optional().or(z.literal("")),
  fax: z.string().max(50).optional().or(z.literal("")),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  wechatId: z.string().max(100).optional().or(z.literal("")),
  wechatQrUrl: z.string().max(500).optional().or(z.literal("")),
  imageUrl: z.string().max(500).optional().or(z.literal("")),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
  mapEmbedUrl: z.string().optional().or(z.literal("")),
  isHeadquarters: z.boolean().default(false),
  displayOrder: z.coerce.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
  translations: z.array(officeTranslationSchema).min(1, "Cần ít nhất một bản dịch"),
});

export type OfficeFormValues = z.infer<typeof officeFormSchema>;
