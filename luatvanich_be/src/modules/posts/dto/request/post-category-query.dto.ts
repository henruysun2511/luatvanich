import { ApiPropertyOptional } from '@nestjs/swagger';

import { BaseQueryDto } from '../../../../common/dto/base-query.dto';
import { LangCode } from '../../../../common/enums/lang.enum';
import { IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { PostSection } from '../../enums/post-section.enum';

export class PostCategoryQueryDto extends BaseQueryDto {
  @ApiPropertyOptional({ description: 'Phân vùng nội dung', example: "news", enum: PostSection })
  @ValidateIf((_, value) => value !== undefined)
  @IsEnum(PostSection, { message: 'Phân vùng phải là news, handbook hoặc knowledge_base' })
  section?: PostSection;
}

export class PublicPostCategoryQueryDto {
  @ApiPropertyOptional({ description: 'Phân vùng nội dung', example: "news", enum: PostSection })
  @ValidateIf((_, value) => value !== undefined)
  @IsEnum(PostSection, { message: 'Phân vùng phải là news, handbook hoặc knowledge_base' })
  section?: PostSection;

  @ApiPropertyOptional({ description: 'Ngôn ngữ nội dung', example: "vi", enum: LangCode })
  @IsOptional()
  @IsEnum(LangCode, { message: 'Ngôn ngữ phải là vi hoặc zh-CN' })
  lang?: LangCode;
}
