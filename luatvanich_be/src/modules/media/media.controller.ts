import {
  Controller,
  Post,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { StorageService } from '../../infrastructures/storage/storage.service';
import { SwaggerDoc } from '../../common/swagger/swagger-doc';
import { ApiResponse } from '../../common/response/api-response';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';

@ApiTags('Media')
@Controller({ path: 'admin/media', version: '1' })
export class MediaController {
  constructor(private readonly storageService: StorageService) { }


  @Post('upload')
  @RequirePermission('media:write')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'services' },
      },
    },
  })
  @SwaggerDoc({ summary: 'Admin: Tải lên tệp công khai', bearerAuth: true })
  async uploadPublic(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ) {
    if (!file) throw new BadRequestException('Vui lòng chọn tệp để tải lên');
    const result = await this.storageService.uploadPublic(file, folder || 'general');
    return ApiResponse.created(result, 'Tải tệp lên thành công');
  }


  @Post('upload-private')
  @RequirePermission('media:write')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        folder: { type: 'string', example: 'consultations' },
      },
    },
  })
  @SwaggerDoc({ summary: 'Admin: Tải lên tệp bảo mật (riêng tư)', bearerAuth: true })
  async uploadPrivate(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ) {
    if (!file) throw new BadRequestException('Vui lòng chọn tệp để tải lên');
    const result = await this.storageService.uploadPrivate(file, folder || 'consultations');
    return ApiResponse.created(result, 'Tải tệp bảo mật lên thành công');
  }

  /**
   * GET /api/v1/admin/media/presigned-url?key=...
   * Tạo liên kết tạm thời để xem/tải tệp bảo mật
   */
  @Get('presigned-url')
  @RequirePermission('media:read')
  @SwaggerDoc({ summary: 'Admin: Tạo liên kết truy cập tạm thời cho tệp bảo mật', bearerAuth: true })
  async getPresignedUrl(@Query('key') key: string) {
    if (!key) throw new BadRequestException('Thiếu tham số key');
    const url = await this.storageService.getPresignedUrl(key, 3600); // 1 giờ
    return ApiResponse.success({ url, expiresIn: 3600 }, 'Tạo liên kết thành công');
  }


  @Delete()
  @RequirePermission('media:delete')
  @SwaggerDoc({ summary: 'Admin: Xóa tệp khỏi kho lưu trữ', bearerAuth: true })
  async deleteFile(
    @Query('key') key: string,
    @Query('isPrivate') isPrivate?: string,
  ) {
    if (!key) throw new BadRequestException('Thiếu tham số key');
    await this.storageService.deleteFile(key, isPrivate === 'true');
    return ApiResponse.noContent('Xóa tệp thành công');
  }
}
