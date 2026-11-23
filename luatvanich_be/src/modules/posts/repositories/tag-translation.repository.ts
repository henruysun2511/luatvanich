import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { LangCode } from '../../../common/enums/lang.enum';
import { TagTranslation } from '../entities/tag-translation.entity';
import { PostSlugAlreadyExistsException } from '../exceptions/post.exception';

@Injectable()
export class TagTranslationRepository {
  constructor(@InjectRepository(TagTranslation) private readonly repo: Repository<TagTranslation>) {}

  private getRepo(manager?: EntityManager) {
    return manager?.getRepository(TagTranslation) ?? this.repo;
  }

  find(tagId: string, languageCode: LangCode, manager?: EntityManager) {
    return this.getRepo(manager).findOneBy({ tagId, languageCode });
  }

  async save(fields: Partial<TagTranslation> & { tagId: string; languageCode: LangCode; slug: string }, manager?: EntityManager) {
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
