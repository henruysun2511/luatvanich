import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { TagQueryDto } from '../dto/request/tag-query.dto';
import { PostTranslation } from '../entities/post-translation.entity';
import { PostTag } from '../entities/post-tag.entity';
import { Post } from '../entities/post.entity';
import { TagTranslation } from '../entities/tag-translation.entity';
import { Tag } from '../entities/tag.entity';
import { PostStatus } from '../enums/post-status.enum';

@Injectable()
export class TagRepository {
  constructor(@InjectRepository(Tag) private readonly repo: Repository<Tag>) {}

  private getRepo(manager?: EntityManager) {
    return manager?.getRepository(Tag) ?? this.repo;
  }

  findById(id: string, manager?: EntityManager) {
    return this.getRepo(manager).findOne({ where: { id }, relations: { translations: true } });
  }

  findForWrite(id: string, manager: EntityManager) {
    return this.getRepo(manager).findOne({ where: { id }, lock: { mode: 'pessimistic_write' } });
  }

  findIdsForLink(ids: string[], manager: EntityManager) {
    return this.getRepo(manager).find({
      select: { id: true },
      where: { id: In(ids) },
      order: { id: 'ASC' },
      lock: { mode: 'pessimistic_read' },
    });
  }

  save(fields: Partial<Tag>, manager?: EntityManager) {
    const repo = this.getRepo(manager);
    return repo.save(repo.create(fields));
  }

  findPublicList(lang: LangCode) {
    const query = this.repo.createQueryBuilder('tag').leftJoinAndSelect('tag.translations', 'translation');
    const visible = query.subQuery().select('1').from(PostTag, 'link')
      .innerJoin(Post, 'post', 'post.id = link.postId AND post.status = :status')
      .innerJoin(PostTranslation, 'localized', 'localized.postId = post.id AND localized.isComplete = true')
      .where('link.tagId = tag.id AND localized.languageCode IN (:...locales)');
    return query.where('EXISTS ' + visible.getQuery(), { status: PostStatus.PUBLISHED, locales: [lang, DEFAULT_LANG] })
      .orderBy('tag.createdAt', 'ASC').addOrderBy('tag.id', 'ASC').getMany();
  }

  async findBySlug(slug: string, lang: LangCode) {
    const match = await this.repo.manager.getRepository(TagTranslation).findOne({
      where: { slug, languageCode: lang },
      relations: { tag: { translations: true } },
    });
    return match?.tag ?? null;
  }

  findAdminList(filters: TagQueryDto) {
    const { skip, limit } = normalizePagination(filters);
    const query = this.repo.createQueryBuilder('tag').leftJoinAndSelect('tag.translations', 'translation');
    const search = filters.q?.trim();
    if (search) {
      const term = search.replace(/[!%_]/g, (char) => '!' + char);
      const match = query.subQuery().select('1').from(TagTranslation, 'match')
        .where('match.tagId = tag.id').andWhere("match.name ILIKE :term ESCAPE '!'");
      query.andWhere('EXISTS ' + match.getQuery(), { term: '%' + term + '%' });
    }
    return query.orderBy('tag.createdAt', filters.sortOrder ?? 'DESC').addOrderBy('tag.id', 'ASC')
      .skip(skip).take(limit).getManyAndCount();
  }

  delete(id: string, manager?: EntityManager) {
    return this.getRepo(manager).delete(id);
  }
}
