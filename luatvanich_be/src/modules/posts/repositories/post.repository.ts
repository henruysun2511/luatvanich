import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, LessThanOrEqual, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { Lawyer } from '../../lawyers/entities/lawyer.entity';
import { LegalService } from '../../legal-services/entities/legal-service.entity';
import { AdminPostQueryDto, PostQueryDto } from '../dto/request/post-query.dto';
import { PostCategoryTranslation } from '../entities/post-category-translation.entity';
import { PostCategory } from '../entities/post-category.entity';
import { PostService } from '../entities/post-service.entity';
import { PostTag } from '../entities/post-tag.entity';
import { PostTranslation } from '../entities/post-translation.entity';
import { Post } from '../entities/post.entity';
import { TagTranslation } from '../entities/tag-translation.entity';
import { PostStatus } from '../enums/post-status.enum';

@Injectable()
export class PostRepository {
  constructor(@InjectRepository(Post) private readonly repo: Repository<Post>) {}

  private getRepo(manager?: EntityManager) {
    return manager?.getRepository(Post) ?? this.repo;
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

  findAuthor(id: string, manager: EntityManager) {
    return manager.getRepository(Lawyer).findOne({ where: { id }, lock: { mode: 'pessimistic_read' } });
  }

  findServiceIds(ids: string[], manager: EntityManager) {
    return manager.getRepository(LegalService).find({
      select: { id: true },
      where: { id: In(ids) },
      order: { id: 'ASC' },
      lock: { mode: 'pessimistic_read' },
    });
  }

  save(fields: Partial<Post>, manager?: EntityManager) {
    const repo = this.getRepo(manager);
    return repo.save(repo.create(fields));
  }

  async setTags(postId: string, tagIds: string[], manager: EntityManager) {
    await manager.delete(PostTag, { postId });
    if (tagIds.length) await manager.insert(PostTag, tagIds.map((tagId) => ({ postId, tagId })));
  }

  async setServices(postId: string, serviceIds: string[], manager: EntityManager) {
    await manager.delete(PostService, { postId });
    if (serviceIds.length) await manager.insert(PostService, serviceIds.map((serviceId) => ({ postId, serviceId })));
  }

  private listQuery() {
    return this.repo.createQueryBuilder('post')
      .leftJoin('post.translations', 'translation')
      .addSelect([
        'translation.postId', 'translation.languageCode', 'translation.title',
        'translation.slug', 'translation.summary', 'translation.isComplete',
        'translation.metaTitle', 'translation.metaDescription', 'translation.updatedAt',
      ]);
  }

  private withSearch(query: SelectQueryBuilder<Post>, raw?: string, lang?: LangCode) {
    const search = raw?.trim();
    if (!search) return;
    const term = search.replace(/[!%_]/g, (char) => '!' + char);
    const match = query.subQuery().select('1').from(PostTranslation, 'searched')
      .where('searched.postId = post.id')
      .andWhere("(searched.title ILIKE :term ESCAPE '!' OR searched.summary ILIKE :term ESCAPE '!')");
    if (lang) this.withDisplayedLanguage(match, 'searched', lang);
    query.andWhere('EXISTS ' + match.getQuery(), { ...match.getParameters(), term: '%' + term + '%' });
  }

  private withDisplayedLanguage<T extends ObjectLiteral>(query: SelectQueryBuilder<T>, alias: string, lang: LangCode) {
    const requested = query.subQuery().select('1').from(PostTranslation, 'localized')
      .where(`localized.postId = ${alias}.postId AND localized.languageCode = :lang AND localized.isComplete = true`);
    query.andWhere(`(${alias}.languageCode = :lang OR (${alias}.languageCode = :fallback AND NOT EXISTS ${requested.getQuery()}))`,
      { lang, fallback: DEFAULT_LANG }).andWhere(`${alias}.isComplete = true`);
  }

  private publicQuery(lang: LangCode) {
    const query = this.listQuery().innerJoin('post.category', 'category')
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
      const categoryId = query.subQuery().select('localizedCategory.categoryId')
        .from(PostCategoryTranslation, 'localizedCategory')
        .innerJoin(PostCategory, 'activeCategory', 'activeCategory.id = localizedCategory.categoryId')
        .where('localizedCategory.slug = :categorySlug AND localizedCategory.languageCode IN (:lang, :fallback)')
        .orderBy('CASE WHEN localizedCategory.languageCode = :lang THEN 0 ELSE 1 END').limit(1);
      query.andWhere('post.categoryId = ' + categoryId.getQuery(), { categorySlug: filters.categorySlug });
    }
    if (filters.tagSlug || tagId) {
      const tags = query.subQuery().select('1').from(PostTag, 'link').where('link.postId = post.id');
      if (tagId) {
        tags.andWhere('link.tagId = :tagId', { tagId });
      } else {
        const selectedTag = query.subQuery().select('localizedTag.tagId').from(TagTranslation, 'localizedTag')
          .where('localizedTag.slug = :tagSlug AND localizedTag.languageCode IN (:lang, :fallback)')
          .orderBy('CASE WHEN localizedTag.languageCode = :lang THEN 0 ELSE 1 END').limit(1);
        tags.andWhere('link.tagId = ' + selectedTag.getQuery(), { tagSlug: filters.tagSlug });
      }
      query.andWhere('EXISTS ' + tags.getQuery(), tags.getParameters());
    }
    if (filters.serviceId) {
      const services = query.subQuery().select('1').from(PostService, 'serviceLink')
        .innerJoin(LegalService, 'service', 'service.id = serviceLink.serviceId AND service.status = :serviceStatus')
        .where('serviceLink.postId = post.id AND serviceLink.serviceId = :serviceId');
      query.andWhere('EXISTS ' + services.getQuery(), { serviceId: filters.serviceId, serviceStatus: ContentStatus.PUBLISHED });
    }
    this.withSearch(query, filters.q, lang);
    return query.orderBy('post.publishAt', filters.sortOrder ?? 'DESC', 'NULLS LAST')
      .addOrderBy('post.createdAt', 'DESC').addOrderBy('post.id', 'ASC')
      .skip(skip).take(limit).getManyAndCount();
  }

  async findPublicBySlug(slug: string, lang: LangCode) {
    const query = this.repo.createQueryBuilder('post')
      .innerJoin('post.category', 'category')
      .innerJoin('post.translations', 'match', 'match.slug = :slug', { slug })
      .where('post.status = :published', { published: PostStatus.PUBLISHED });
    this.withDisplayedLanguage(query, 'match', lang);
    // An exact locale match takes precedence over a fallback with the same slug.
    query.addSelect('CASE WHEN match.languageCode = :lang THEN 0 ELSE 1 END', 'locale_priority')
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
      const sharedTags = query.subQuery().select('1').from(PostTag, 'shared')
        .where('shared.postId = post.id AND shared.tagId IN (:...tagIds)');
      query.andWhere(`(${sameCategory} OR EXISTS ${sharedTags.getQuery()})`, { tagIds });
    } else {
      query.andWhere(sameCategory);
    }
    return query.addSelect(`CASE WHEN ${sameCategory} THEN 0 ELSE 1 END`, 'category_priority')
      .orderBy('category_priority', 'ASC').addOrderBy('post.publishAt', 'DESC', 'NULLS LAST')
      .addOrderBy('post.id', 'ASC').take(limit).getMany();
  }

  findAdminList(filters: AdminPostQueryDto) {
    const { skip, limit } = normalizePagination(filters);
    const query = this.listQuery();
    if (filters.status) query.andWhere('post.status = :status', { status: filters.status });
    if (filters.categoryId) query.andWhere('post.categoryId = :categoryId', { categoryId: filters.categoryId });
    if (filters.authorLawyerId) query.andWhere('post.authorLawyerId = :authorLawyerId', { authorLawyerId: filters.authorLawyerId });
    if (filters.isFeatured !== undefined) query.andWhere('post.isFeatured = :isFeatured', { isFeatured: filters.isFeatured });
    if (filters.lang) {
      const language = query.subQuery().select('1').from(PostTranslation, 'localized')
        .where('localized.postId = post.id AND localized.languageCode = :lang');
      query.andWhere('EXISTS ' + language.getQuery(), { lang: filters.lang });
    }
    this.withSearch(query, filters.q);
    return query.orderBy('post.createdAt', filters.sortOrder ?? 'DESC')
      .addOrderBy('post.id', 'ASC').skip(skip).take(limit).getManyAndCount();
  }

  async countViews(id: string, manager?: EntityManager) {
    const result = await this.getRepo(manager).createQueryBuilder().update(Post)
      .set({ viewsCount: () => '"views_count" + 1', updatedAt: () => '"updated_at"' })
      .where({ id, status: PostStatus.PUBLISHED })
      .andWhere('"deleted_at" IS NULL')
      .returning('views_count').execute();
    return result.raw[0]?.views_count as number | undefined;
  }

  publishDue(now: Date, manager?: EntityManager) {
    return this.getRepo(manager).createQueryBuilder().update(Post)
      .set({ status: PostStatus.PUBLISHED })
      .where({ status: PostStatus.SCHEDULED, publishAt: LessThanOrEqual(now) })
      .andWhere('"deleted_at" IS NULL').execute();
  }

  softDelete(id: string, manager?: EntityManager) {
    return this.getRepo(manager).softDelete(id);
  }
}
