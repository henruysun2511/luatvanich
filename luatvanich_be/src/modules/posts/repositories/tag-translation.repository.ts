import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { LangCode } from '../../../common/enums/lang.enum';
import { TagTranslation } from '../entities/tag-translation.entity';
import { PostSlugAlreadyExistsException } from '../exceptions/post.exception';

@Injectable()
export class TagTranslationRepository {
  constructor(@InjectRepository(TagTranslation) private readonly repo: Repository<TagTranslation>) {}

  find(tagId: string, languageCode: LangCode): Promise<TagTranslation | null> {
    return this.repo.findOneBy({ tagId, languageCode });
  }

  async save(
    fields: Partial<TagTranslation> & { tagId: string; languageCode: LangCode; slug: string },
  ): Promise<TagTranslation> {
    try {
      return await this.repo.save(this.repo.create(fields));
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).driverError?.code === '23505') {
        throw new PostSlugAlreadyExistsException(fields.slug);
      }
      throw error;
    }
  }
}
