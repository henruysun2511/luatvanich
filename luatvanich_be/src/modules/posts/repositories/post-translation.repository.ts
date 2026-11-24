import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { LangCode } from '../../../common/enums/lang.enum';
import { PostTranslation } from '../entities/post-translation.entity';
import { PostSlugAlreadyExistsException } from '../exceptions/post.exception';

@Injectable()
export class PostTranslationRepository {
  constructor(@InjectRepository(PostTranslation) private readonly repo: Repository<PostTranslation>) {}

  find(postId: string, languageCode: LangCode): Promise<PostTranslation | null> {
    return this.repo.findOneBy({ postId, languageCode });
  }

  async save(fields: Partial<PostTranslation> & { postId: string; languageCode: LangCode; slug: string }): Promise<PostTranslation> {
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
