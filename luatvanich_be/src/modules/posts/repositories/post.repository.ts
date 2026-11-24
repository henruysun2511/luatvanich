import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, LessThanOrEqual, Repository, SelectQueryBuilder } from 'typeorm';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { AdminPostQueryDto, PostQueryDto } from '../dto/request/post-query.dto';
import { PostService } from '../entities/post-service.entity';
import { PostTag } from '../entities/post-tag.entity';
import { Post } from '../entities/post.entity';
import { PostStatus } from '../enums/post-status.enum';

@Injectable()
export class PostRepository {
  constructor(@InjectRepository(Post) private readonly repo: Repository<Post>) {}

  private getRepo(manager?: EntityManager): Repository<Post> {
    return manager ? manager.getRepository(Post) : this.repo;
  }

  findById(id: string, manager?: EntityManager) {
    return this.getRepo(manager).findOne({
      where: { id },
      relations: { translations: true, postTags: true, postServices: true },
      relationLoadStrategy: 'query',
    });
  }

  findForWrite(id: string, manager: EntityManager) {
    return this.getRepo(manager).findOne({ where: { id }, lock: { mode: 'pessimistic_write' } });
  }

  countByCategory(categoryId: string, publishedOnly = false, manager?: EntityManager): Promise<number> {
    return this.getRepo(manager).count({
      where: {
        categoryId,
        ...(publishedOnly ? { status: PostStatus.PUBLISHED } : {}),
      },
    });
  }

  save(fields: Partial<Post>, manager?: EntityManager) {
    const repo = this.getRepo(manager);
    return repo.save(repo.create(fields));
  }

  async setTags(postId: string, tagIds: string[], manager: EntityManager) {
    await manager.delete(PostTag, { postId });
    if (tagIds.length) {
      await manager.insert(
        PostTag,
        tagIds.map((tagId) => ({ postId, tagId })),
      );
    }
  }

  async setServices(postId: string, serviceIds: string[], manager: EntityManager) {
    await manager.delete(PostService, { postId });
    if (serviceIds.length) {
      await manager.insert(
        PostService,
        serviceIds.map((serviceId) => ({ postId, serviceId })),
      );
    }
  }

  private listQuery() {
    return this.repo
      .createQueryBuilder('post')
      .leftJoin('post.translations', 'translation')
      .addSelect([
        'translation.postId',
        'translation.languageCode',
        'translation.title',
        'translation.slug',
        'translation.summary',
        'translation.isComplete',
        'translation.metaTitle',
        'translation.metaDescription',
        'translation.updatedAt',
      ]);
  }

  private withSearch(query: SelectQueryBuilder<Post>, raw?: string, lang?: LangCode) {
    const search = raw?.trim();
    if (!search) return;
    const term = search.replace(/[!%_]/g, (char) => '!' + char);
    if (lang) {
      query.andWhere(
        `EXISTS (
          SELECT 1 FROM post_translations searched
          WHERE searched.post_id = post.id
            AND (searched.title ILIKE :term ESCAPE '!' OR searched.summary ILIKE :term ESCAPE '!')
            AND searched.language_code IN (:lang, :fallback)
            AND searched.is_complete = true
        )`,
        { term: `%${term}%`, lang, fallback: DEFAULT_LANG },
      );
    } else {
      query.andWhere(
        `EXISTS (
          SELECT 1 FROM post_translations searched
          WHERE searched.post_id = post.id
            AND (searched.title ILIKE :term ESCAPE '!' OR searched.summary ILIKE :term ESCAPE '!')
        )`,
        { term: `%${term}%` },
      );
    }
  }

  private withDisplayedLanguage(query: SelectQueryBuilder<Post>, alias: string, lang: LangCode) {
    query
      .andWhere(
        `(${alias}.language_code = :lang OR (${alias}.language_code = :fallback AND NOT EXISTS (
          SELECT 1 FROM post_translations localized
          WHERE localized.post_id = ${alias}.post_id AND localized.language_code = :lang AND localized.is_complete = true
        )))`,
        { lang, fallback: DEFAULT_LANG },
      )
      .andWhere(`${alias}.is_complete = true`);
  }

  private publicQuery(lang: LangCode) {
    const query = this.listQuery()
      .innerJoin('post.category', 'category')
      .leftJoin('post.author', 'author', 'author.status = :authorStatus', { authorStatus: ContentStatus.PUBLISHED })
      .addSelect(['author.id', 'author.status'])
      .where('post.status = :published', { published: PostStatus.PUBLISHED });
    this.withDisplayedLanguage(query, 'translation', lang);
    return query;
  }

  findPublicList(filters: PostQueryDto, lang: LangCode, tagId?: string) {
    const { skip, limit } = normalizePagination(filters);
    const query = this.publicQuery(lang);
    if (filters.section) query.andWhere('category.section = :section', { section: filters.section });
    if (filters.lawyerId) query.andWhere('post.authorLawyerId = :lawyerId', { lawyerId: filters.lawyerId });

    if (filters.categorySlug) {
      query.andWhere(
        `post.categoryId IN (
          SELECT localizedCategory.category_id FROM post_category_translations localizedCategory
          WHERE localizedCategory.slug = :categorySlug AND localizedCategory.language_code IN (:lang, :fallback)
        )`,
        { categorySlug: filters.categorySlug, lang, fallback: DEFAULT_LANG },
      );
    }

    if (tagId) {
      query.andWhere('EXISTS (SELECT 1 FROM post_tags link WHERE link.post_id = post.id AND link.tag_id = :tagId)', { tagId });
    } else if (filters.tagSlug) {
      query.andWhere(
        `EXISTS (
          SELECT 1 FROM post_tags link
          INNER JOIN tag_translations localizedTag ON localizedTag.tag_id = link.tag_id
          WHERE link.post_id = post.id AND localizedTag.slug = :tagSlug AND localizedTag.language_code IN (:lang, :fallback)
        )`,
        { tagSlug: filters.tagSlug, lang, fallback: DEFAULT_LANG },
      );
    }

    if (filters.serviceId) {
      query.andWhere(
        `EXISTS (
          SELECT 1 FROM post_services serviceLink
          INNER JOIN services service ON service.id = serviceLink.service_id AND service.status = :serviceStatus
          WHERE serviceLink.post_id = post.id AND serviceLink.service_id = :serviceId
        )`,
        { serviceId: filters.serviceId, serviceStatus: ContentStatus.PUBLISHED },
      );
    }

    this.withSearch(query, filters.q, lang);
    return query
      .orderBy('post.publishAt', filters.sortOrder ?? 'DESC', 'NULLS LAST')
      .addOrderBy('post.createdAt', 'DESC')
      .addOrderBy('post.id', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }

  async findPublicBySlug(slug: string, lang: LangCode) {
    const query = this.repo
      .createQueryBuilder('post')
      .innerJoin('post.category', 'category')
      .innerJoin('post.translations', 'match', 'match.slug = :slug', { slug })
      .where('post.status = :published', { published: PostStatus.PUBLISHED });
    this.withDisplayedLanguage(query, 'match', lang);
    query
      .addSelect('CASE WHEN match.language_code = :lang THEN 0 ELSE 1 END', 'locale_priority')
      .orderBy('locale_priority', 'ASC');
    return query.getOne();
  }

  findPublicDetail(id: string) {
    return this.repo.findOne({
      where: { id, status: PostStatus.PUBLISHED },
      relationLoadStrategy: 'query',
      relations: {
        translations: true,
        category: { translations: true },
        author: { translations: true },
        postTags: { tag: { translations: true } },
        postServices: { service: { translations: true } },
      },
    });
  }

  findRelated(post: Post, tagIds: string[], lang: LangCode, limit: number) {
    const query = this.publicQuery(lang).andWhere('post.id <> :id', { id: post.id });
    const sameCategory = 'post.categoryId = :categoryId';
    query.setParameter('categoryId', post.categoryId);
    if (tagIds.length) {
      query.andWhere(
        `(${sameCategory} OR EXISTS (
          SELECT 1 FROM post_tags shared WHERE shared.post_id = post.id AND shared.tag_id IN (:...tagIds)
        ))`,
        { tagIds },
      );
    } else {
      query.andWhere(sameCategory);
    }
    return query
      .addSelect(`CASE WHEN ${sameCategory} THEN 0 ELSE 1 END`, 'category_priority')
      .orderBy('category_priority', 'ASC')
      .addOrderBy('post.publishAt', 'DESC', 'NULLS LAST')
      .addOrderBy('post.id', 'ASC')
      .take(limit)
      .getMany();
  }

  findAdminList(filters: AdminPostQueryDto) {
    const { skip, limit } = normalizePagination(filters);
    const query = this.listQuery();
    if (filters.status) query.andWhere('post.status = :status', { status: filters.status });
    if (filters.categoryId) query.andWhere('post.categoryId = :categoryId', { categoryId: filters.categoryId });
    if (filters.authorLawyerId) query.andWhere('post.authorLawyerId = :authorLawyerId', { authorLawyerId: filters.authorLawyerId });
    if (filters.isFeatured !== undefined) query.andWhere('post.isFeatured = :isFeatured', { isFeatured: filters.isFeatured });
    if (filters.lang) {
      query.andWhere(
        'EXISTS (SELECT 1 FROM post_translations localized WHERE localized.post_id = post.id AND localized.language_code = :lang)',
        { lang: filters.lang },
      );
    }
    this.withSearch(query, filters.q);
    return query
      .orderBy('post.createdAt', filters.sortOrder ?? 'DESC')
      .addOrderBy('post.id', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }

  async countViews(id: string, manager?: EntityManager) {
    const result = await this.getRepo(manager)
      .createQueryBuilder()
      .update(Post)
      .set({ viewsCount: () => '"views_count" + 1', updatedAt: () => '"updated_at"' })
      .where({ id, status: PostStatus.PUBLISHED })
      .andWhere('"deleted_at" IS NULL')
      .returning('views_count')
      .execute();
    return result.raw[0]?.views_count as number | undefined;
  }

  publishDue(now: Date, manager?: EntityManager) {
    return this.getRepo(manager)
      .createQueryBuilder()
      .update(Post)
      .set({ status: PostStatus.PUBLISHED })
      .where({ status: PostStatus.SCHEDULED, publishAt: LessThanOrEqual(now) })
      .andWhere('"deleted_at" IS NULL')
      .execute();
  }

  softDelete(id: string, manager?: EntityManager) {
    return this.getRepo(manager).softDelete(id);
  }
}
