import { NotFoundException } from '@nestjs/common';

/**
 * Helper shorthand để throw NotFoundException cho tài nguyên không tìm thấy.
 * Dùng khi không cần custom exception class riêng.
 */
export function notFound(resource: string): NotFoundException {
  return new NotFoundException({
    code: 'NOT_FOUND',
    message: `Không tìm thấy ${resource}`,
  });
}
