import { ApiProperty } from '@nestjs/swagger';
import { LangCode } from '../../../../common/enums/lang.enum';

export class TagTranslationDto {
  @ApiProperty({ description: 'Ngôn ngữ', example: "vi", enum: LangCode })
  languageCode: LangCode;

  @ApiProperty({ description: 'Tên hiển thị', example: "Đầu tư FDI" })
  name: string;

  @ApiProperty({ description: 'Đường dẫn theo ngôn ngữ', example: "dau-tu-fdi" })
  slug: string;

  @ApiProperty({ description: 'Ngày sửa', example: "2026-11-24T00:00:00Z" })
  updatedAt: Date;
}

export class TagPublicDto {
  @ApiProperty({ description: 'UUID', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  id: string;

  @ApiProperty({ description: 'Tên hiển thị', example: "Đầu tư FDI" })
  name: string;

  @ApiProperty({ description: 'Đường dẫn theo ngôn ngữ', example: "dau-tu-fdi" })
  slug: string;

  @ApiProperty({ description: 'Màu thẻ', example: "#0284c7", type: String, nullable: true })
  colorHex: string | null;
}

export class TagAdminDto {
  @ApiProperty({ description: 'UUID', example: "a3da8be5-519e-4459-930f-ea3bd1eaf15c" })
  id: string;

  @ApiProperty({ description: 'Màu thẻ', example: "#0284c7", type: String, nullable: true })
  colorHex: string | null;

  @ApiProperty({ description: 'Ngày tạo', example: "2026-11-24T00:00:00Z" })
  createdAt: Date;

  @ApiProperty({ description: 'Ngày sửa', example: "2026-11-24T00:00:00Z" })
  updatedAt: Date;

  @ApiProperty({ type: [TagTranslationDto], description: 'Các bản dịch thẻ' })
  translations: TagTranslationDto[];
}
