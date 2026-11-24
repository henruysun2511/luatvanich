import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { LangCode } from '../../../common/enums/lang.enum';
import { PostCategoryTranslation } from '../entities/post-category-translation.entity';
import { PostSlugAlreadyExistsException } from '../exceptions/post.exception';

@Injectable()
export class PostCategoryTranslationRepository {
  constructor(@InjectRepository(PostCategoryTranslation) private readonly repo: Repository<PostCategoryTranslation>) {}

  find(categoryId: string, languageCode: LangCode): Promise<PostCategoryTranslation | null> {
    return this.repo.findOneBy({ categoryId, languageCode });
  }

  async save(
    fields: Partial<PostCategoryTranslation> & { categoryId: string; languageCode: LangCode; slug: string },
  ): Promise<PostCategoryTranslation> {
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
