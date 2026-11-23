import { z } from 'zod';

export const consultationFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Họ và tên không được để trống')
    .max(200, 'Họ và tên không vượt quá 200 ký tự'),
  companyName: z
    .string()
    .max(255, 'Tên công ty không vượt quá 255 ký tự')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .min(1, 'Số điện thoại không được để trống')
    .max(50, 'Số điện thoại không vượt quá 50 ký tự')
    .regex(/^[0-9+() -]+$/, 'Số điện thoại chứa ký tự không hợp lệ'),
  email: z
    .string()
    .email('Định dạng email không hợp lệ')
    .max(255)
    .optional()
    .or(z.literal('')),
  contactChannel: z.enum(['phone', 'email', 'zalo', 'wechat']).default('phone'),
  contactChannelId: z.string().max(100).optional().or(z.literal('')),
  preferredContactTime: z.string().max(100).optional().or(z.literal('')),
  practiceAreaId: z.string().uuid().optional().or(z.literal('')),
  lawyerId: z.string().uuid().optional().or(z.literal('')),
  languageCode: z.string().default('vi'),
  title: z.string().max(255).optional().or(z.literal('')),
  content: z
    .string()
    .min(5, 'Nội dung yêu cầu cần ít nhất 5 ký tự')
    .max(5000, 'Nội dung yêu cầu không vượt quá 5000 ký tự'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Bạn cần đồng ý với chính sách bảo vệ dữ liệu cá nhân' }),
  }),
});

export type ConsultationFormValues = z.infer<typeof consultationFormSchema>;

export const consultationNoteSchema = z.object({
  note: z
    .string()
    .min(1, 'Nội dung ghi chú không được để trống')
    .max(2000, 'Ghi chú không vượt quá 2000 ký tự'),
});

export type ConsultationNoteFormValues = z.infer<typeof consultationNoteSchema>;
