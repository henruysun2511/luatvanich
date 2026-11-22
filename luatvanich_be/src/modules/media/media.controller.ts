import {
  Controller,
  Post,
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
@Controller({ path: 'media', version: '1' })
export class MediaController {
  constructor(private readonly storageService: StorageService) {}

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
  @SwaggerDoc({ summary: 'Tải lên tệp', bearerAuth: true })
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ) {
    if (!file) throw new BadRequestException('Vui lòng chọn tệp để tải lên');
    const result = await this.storageService.uploadPublic(file, folder || 'general');
    return ApiResponse.created(result, 'Tải tệp lên thành công');
  }

  @Delete()
  @RequirePermission('media:delete')
  @SwaggerDoc({ summary: 'Xóa tệp khỏi kho lưu trữ', bearerAuth: true })
  async deleteFile(@Query('key') key: string) {
    if (!key) throw new BadRequestException('Thiếu tham số key');
    await this.storageService.deleteFile(key);
    return ApiResponse.noContent('Xóa tệp thành công');
  }
}
