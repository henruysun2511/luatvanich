import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LangCode } from '../enums/lang.enum';

declare global {
  namespace Express {
    interface Request {
      lang: LangCode;
    }
  }
}

/**
 * LangMiddleware — Đọc ngôn ngữ từ ?lang query param hoặc Accept-Language header.
 * Inject vào req.lang để controller và service dùng thống nhất.
 * Mặc định: 'vi'. Chỉ chấp nhận 'vi' | 'zh-CN'.
 */
@Injectable()
export class LangMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const queryLang = req.query?.lang as string;
    const headerLang = req.headers['accept-language']?.split(',')[0]?.trim();
    const raw = queryLang || headerLang || 'vi';

    req.lang =
      raw.startsWith('zh') ? LangCode.ZH_CN : LangCode.VI;

    next();
  }
}
