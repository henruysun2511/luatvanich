import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @CurrentUser() — Lấy toàn bộ thông tin user từ JWT payload.
 * @CurrentUser('id') — Lấy một field cụ thể.
 */
export const CurrentUser = createParamDecorator(
  (field: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return field ? user?.[field] : user;
  },
);
