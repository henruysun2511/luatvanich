import { Injectable } from '@nestjs/common';
import { LangCode } from '../../../common/enums/lang.enum';
import { TagPublicDto } from '../dto/response/tag-response.dto';
import { Tag } from '../entities/tag.entity';
import { selectTranslation } from './localized-translation';

@Injectable()
export class TagMapper {
  toPublicResponse(tag: Tag, lang: LangCode): TagPublicDto {
    const translation = selectTranslation(tag.translations, lang);
    return {
      id: tag.id,
      name: translation?.name ?? '',
      slug: translation?.slug ?? tag.id,
      colorHex: tag.colorHex ?? null,
    };
  }
}
