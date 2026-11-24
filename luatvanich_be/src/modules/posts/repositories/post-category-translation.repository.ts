import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { LangCode } from '../../../common/enums/lang.enum';
import { PostCategoryTranslation } from '../entities/post-category-translation.entity';
import { PostSlugAlreadyExistsException } from '../exceptions/post.exception';

@Injectable()
export class PostCategoryTranslationRepository {
  constructor(@InjectRepository(PostCategoryTranslation) private readonly repo: Repository<PostCategoryTranslation>) {}

  private getRepo(manager?: EntityManager) {
    return manager?.getRepository(PostCategoryTranslation) ?? this.repo;
  }

  find(categoryId: string, languageCode: LangCode, manager?: EntityManager) {
    return this.getRepo(manager).findOneBy({ categoryId, languageCode });
  }

  async save(fields: Partial<PostCategoryTranslation> & { categoryId: string; languageCode: LangCode; slug: string }, manager?: EntityManager) {
    const repo = this.getRepo(manager);
    try {
      return await repo.save(repo.create(fields));
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new PostSlugAlreadyExistsException(fields.slug);
      }
      throw error;
    }
  }
}
