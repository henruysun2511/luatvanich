import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from '../../../../common/dto/base-query.dto';
import { ContentStatus } from '../../../../common/enums/content-status.enum';

export class PracticeAreaQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({
    enum: ContentStatus,
    description: 'Lọc theo trạng thái nội dung (draft, published, archived)',
  })
  @IsOptional()
  @IsEnum(ContentStatus, { message: 'Trạng thái nội dung không hợp lệ' })
  status?: ContentStatus;

  @ApiPropertyOptional({
    description: 'Lọc các lĩnh vực nổi bật ở trang chủ: true hoặc false',
  })
  @IsOptional()
  @IsBoolean({ message: 'isFeatured phải là giá trị boolean' })
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  isFeatured?: boolean;
}

export class PublicPracticeAreaQueryDto {
  @ApiPropertyOptional({
    description: 'Lọc các lĩnh vực nổi bật ở trang chủ',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  featured?: boolean;

  @ApiPropertyOptional({ example: 'zh-CN', description: 'Mã ngôn ngữ: vi hoặc zh-CN' })
  @IsOptional()
  @IsString()
  lang?: string;
}
