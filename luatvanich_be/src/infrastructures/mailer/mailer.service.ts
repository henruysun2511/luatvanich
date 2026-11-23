import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { AppConfig } from '../../config/app.config';
import { SendMailOptions } from './interfaces/send-mail-options.interface';

/**
 * MailerService — Tầng hạ tầng gửi email qua SMTP (Nodemailer).
 */
@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initTransporter();
  }

  private initTransporter() {
    if (!AppConfig.MAIL_USER || !AppConfig.MAIL_PASS) {
      this.logger.warn(
        '[Mailer] Chưa cấu hình MAIL_USER hoặc MAIL_PASS trong .env. Email sẽ được ghi log mô phỏng.',
      );
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: AppConfig.MAIL_HOST,
        port: AppConfig.MAIL_PORT,
        secure: AppConfig.MAIL_PORT === 465,
        auth: {
          user: AppConfig.MAIL_USER,
          pass: AppConfig.MAIL_PASS,
        },
      });
      this.logger.log(`[Mailer] Khởi tạo kết nối SMTP thành công tới: ${AppConfig.MAIL_HOST}:${AppConfig.MAIL_PORT}`);
    } catch (err) {
      this.logger.error(`[Mailer] Lỗi khởi tạo SMTP Transporter: ${err}`);
    }
  }

  /**
   * Gửi email chung
   */
  async send(options: SendMailOptions): Promise<boolean> {
    const recipients = Array.isArray(options.to) ? options.to.join(', ') : options.to;

    if (!this.transporter) {
      this.logger.log(
        `[Mailer MÔ PHỎNG] Bắn email tới: [${recipients}] | Tiêu đề: "${options.subject}"`,
      );
      return true;
    }

    try {
      const info = await this.transporter.sendMail({
        from: AppConfig.MAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
      });

      this.logger.log(`[Mailer] Đã gửi email thành công: ${info.messageId} → [${recipients}]`);
      return true;
    } catch (err: any) {
      this.logger.error(`[Mailer] Gửi email thất bại tới [${recipients}]: ${err.message || err}`);
      return false;
    }
  }
}
