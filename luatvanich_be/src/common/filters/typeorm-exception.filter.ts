import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeOrmExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const driverError = (exception as any).driverError;
    const code = driverError?.code;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'DATABASE_ERROR';
    let message = 'Lỗi cơ sở dữ liệu';

    if (code === '23505') {
      // unique_violation
      statusCode = HttpStatus.CONFLICT;
      errorCode = 'DUPLICATE_ENTRY';
      message = 'Dữ liệu đã tồn tại (trùng lặp)';
    } else if (code === '23503') {
      // foreign_key_violation
      statusCode = HttpStatus.BAD_REQUEST;
      errorCode = 'FOREIGN_KEY_VIOLATION';
      message = 'Dữ liệu tham chiếu không hợp lệ';
    }

    this.logger.error(`TypeORM error [${code}]: ${exception.message}`);

    response.status(statusCode).json({
      success: false,
      statusCode,
      code: errorCode,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
