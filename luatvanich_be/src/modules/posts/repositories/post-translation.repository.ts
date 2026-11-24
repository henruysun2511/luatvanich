import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { LangCode } from '../../../common/enums/lang.enum';
import { PostTranslation } from '../entities/post-translation.entity';
import { PostSlugAlreadyExistsException } from '../exceptions/post.exception';

@Injectable()
export class PostTranslationRepository {
  constructor(@InjectRepository(PostTranslation) private readonly repo: Repository<PostTranslation>) {}

  private getRepo(manager?: EntityManager) {
    return manager?.getRepository(PostTranslation) ?? this.repo;
  }

  find(postId: string, languageCode: LangCode, manager?: EntityManager) {
    return this.getRepo(manager).findOneBy({ postId, languageCode });
  }

  async save(fields: Partial<PostTranslation> & { postId: string; languageCode: LangCode; slug: string }, manager?: EntityManager) {
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
