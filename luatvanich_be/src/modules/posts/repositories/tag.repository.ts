import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { PostStatus } from '../enums/post-status.enum';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagRepository {
  constructor(@InjectRepository(Tag) private readonly repo: Repository<Tag>) {}

  create(fields: Partial<Tag>): Tag {
    return this.repo.create(fields);
  }

  save(fields: Tag | Partial<Tag>): Promise<Tag> {
    return this.repo.save(fields);
  }

  findById(id: string): Promise<Tag | null> {
    return this.repo.findOne({ where: { id }, relations: { translations: true } });
  }

  findIdsForLink(ids: string[]): Promise<Tag[]> {
    return this.repo.find({
      select: { id: true },
      where: { id: In(ids) },
      order: { id: 'ASC' },
    });
  }

  findPublicList(lang: LangCode): Promise<Tag[]> {
    return this.repo
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.translations', 'translation')
      .where(
        `EXISTS (
          SELECT 1 FROM post_tags link
          INNER JOIN posts post ON post.id = link.post_id AND post.status = :status AND post.deleted_at IS NULL
          INNER JOIN post_translations localized ON localized.post_id = post.id AND localized.is_complete = true
          WHERE link.tag_id = tag.id AND localized.language_code IN (:...locales)
        )`,
        { status: PostStatus.PUBLISHED, locales: [lang, DEFAULT_LANG] },
      )
      .orderBy('tag.createdAt', 'ASC')
      .addOrderBy('tag.id', 'ASC')
      .getMany();
  }

  async findBySlug(slug: string, lang: LangCode): Promise<Tag | null> {
    return this.repo
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.translations', 'translation')
      .innerJoin('tag.translations', 'match', 'match.slug = :slug', { slug })
      .orderBy('CASE WHEN match.languageCode = :lang THEN 0 ELSE 1 END', 'ASC')
      .getOne();
  }
}
