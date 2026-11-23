import { z } from "zod";

export const lawyerTranslationSchema = z.object({
  languageCode: z.enum(["vi", "zh-CN"]),
  fullName: z
    .string()
    .min(2, "Họ và tên luật sư tối thiểu 2 ký tự")
    .max(200, "Họ và tên tối đa 200 ký tự"),
  latinName: z.string().max(150, "Tên Latinh tối đa 150 ký tự").optional().nullable().or(z.literal("")),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Đường dẫn tĩnh slug chỉ gồm chữ thường không dấu, số và gạch nối (VD: luat-su-nguyen-van-a)",
    )
    .max(220, "Slug tối đa 220 ký tự")
    .optional()
    .or(z.literal("")),
  title: z.string().max(200).optional().nullable().or(z.literal("")),
  secondaryTitle: z.string().max(200).optional().nullable().or(z.literal("")),
  academicTitle: z.string().max(150).optional().nullable().or(z.literal("")),
  affiliatedOrganization: z.string().max(255).optional().nullable().or(z.literal("")),
  bio: z.string().optional().nullable().or(z.literal("")),
  metaTitle: z.string().max(70).optional().nullable().or(z.literal("")),
  metaDescription: z.string().max(160).optional().nullable().or(z.literal("")),
  isComplete: z.boolean().default(false),
});

export const lawyerFormSchema = z.object({
  officeId: z.string().optional().nullable().or(z.literal("")),
  teamGroup: z.enum([
    "core_leadership",
    "chinese_team",
    "vietnamese_team",
    "senior_advisor",
  ]).default("chinese_team"),
  avatarUrl: z.string().max(500).optional().nullable().or(z.literal("")),
  licenseNumber: z.string().max(100).optional().nullable().or(z.literal("")),
  licenseImageUrl: z.string().max(500).optional().nullable().or(z.literal("")),
  barAssociation: z.string().max(255).optional().nullable().or(z.literal("")),
  email: z.string().email("Email không hợp lệ").optional().nullable().or(z.literal("")),
  mobilePhone: z.string().max(50).optional().nullable().or(z.literal("")),
  officePhone: z.string().max(50).optional().nullable().or(z.literal("")),
  wechatId: z.string().max(100).optional().nullable().or(z.literal("")),
  wechatQrUrl: z.string().max(500).optional().nullable().or(z.literal("")),
  practiceStartDate: z.string().optional().nullable().or(z.literal("")),
  displayOrder: z.coerce.number().int().default(0),
  isFeatured: z.boolean().default(false),
  status: z.enum(["published", "draft", "archived"]).default("draft"),
  translations: z
    .array(lawyerTranslationSchema)
    .min(1, "Cần có ít nhất một bản dịch tiếng Việt"),
});

export type LawyerFormValues = z.infer<typeof lawyerFormSchema>;
