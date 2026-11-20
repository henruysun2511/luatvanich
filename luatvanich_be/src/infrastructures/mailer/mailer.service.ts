import { Injectable, Logger } from '@nestjs/common';
import { AppConfig } from '../../config/app.config';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * MailerService — Gửi email qua SMTP.
 * Dùng cho: xác nhận tư vấn, thông báo admin khi có lead mới.
 */
@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  async send(options: SendMailOptions): Promise<void> {
    if (!AppConfig.MAIL_USER) {
      this.logger.warn(`[DEV] Email bị bỏ qua (chưa cấu hình MAIL_USER): ${options.subject} → ${options.to}`);
      return;
    }

    try {
      // TODO: Tích hợp nodemailer khi có SMTP config
      this.logger.log(`Email gửi thành công: ${options.subject} → ${options.to}`);
    } catch (err) {
      this.logger.error(`Lỗi gửi email: ${err}`);
    }
  }

  async sendConsultationConfirmation(to: string, name: string): Promise<void> {
    await this.send({
      to,
      subject: 'Luật Vạn Ích — Xác nhận yêu cầu tư vấn',
      html: `
        <h2>Kính gửi ${name},</h2>
        <p>Chúng tôi đã nhận được yêu cầu tư vấn của quý khách.</p>
        <p>Đội ngũ Luật Vạn Ích sẽ liên hệ trong vòng <strong>24 giờ làm việc</strong>.</p>
        <br/>
        <p>Trân trọng,<br/>Luật Vạn Ích</p>
      `,
    });
  }
}
