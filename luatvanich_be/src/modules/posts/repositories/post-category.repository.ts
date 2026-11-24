import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Repository } from 'typeorm';
import { LangCode } from '../../../common/enums/lang.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { PostCategoryQueryDto } from '../dto/request/post-category-query.dto';
import { PostCategoryTranslation } from '../entities/post-category-translation.entity';
import { PostCategory } from '../entities/post-category.entity';
import { Post } from '../entities/post.entity';
import { PostSection } from '../enums/post-section.enum';
import { PostStatus } from '../enums/post-status.enum';

@Injectable()
export class PostCategoryRepository {
  constructor(@InjectRepository(PostCategory) private readonly repo: Repository<PostCategory>) {}

  private getRepo(manager?: EntityManager) {
    return manager?.getRepository(PostCategory) ?? this.repo;
  }

  async lockHierarchy(manager: EntityManager) {
    await manager.query('LOCK TABLE post_categories IN SHARE ROW EXCLUSIVE MODE');
  }

  findById(id: string, manager?: EntityManager) {
    return this.getRepo(manager).findOne({ where: { id }, relations: { translations: true } });
  }

  findForWrite(id: string, manager: EntityManager) {
    return this.getRepo(manager).findOne({ where: { id }, lock: { mode: 'pessimistic_write' } });
  }

  findActiveReference(id: string, manager: EntityManager) {
    return this.getRepo(manager).findOne({ where: { id }, lock: { mode: 'pessimistic_read' } });
  }

  save(fields: Partial<PostCategory>, manager?: EntityManager) {
    const repo = this.getRepo(manager);
    return repo.save(repo.create(fields));
  }

  findPublicTree(section?: PostSection) {
    return this.repo.find({
      where: { section },
      relations: { translations: true },
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async findPublicBySlug(slug: string, lang: LangCode) {
    const match = await this.repo.manager.getRepository(PostCategoryTranslation).findOne({
      where: { slug, languageCode: lang },
      relations: { category: { translations: true } },
    });
    return match?.category ?? null;
  }

  findAdminList(filters: PostCategoryQueryDto) {
    const { skip, limit } = normalizePagination(filters);
    const query = this.repo.createQueryBuilder('category').leftJoinAndSelect('category.translations', 'translation');
    if (filters.section) query.andWhere('category.section = :section', { section: filters.section });
    const search = filters.q?.trim();
    if (search) {
      const term = search.replace(/[!%_]/g, (char) => '!' + char);
      const match = query.subQuery().select('1').from(PostCategoryTranslation, 'match')
        .where('match.categoryId = category.id').andWhere("match.name ILIKE :term ESCAPE '!'");
      query.andWhere('EXISTS ' + match.getQuery(), { term: '%' + term + '%' });
    }
    return query.orderBy('category.displayOrder', 'ASC')
      .addOrderBy('category.createdAt', filters.sortOrder ?? 'DESC').addOrderBy('category.id', 'ASC')
      .skip(skip).take(limit).getManyAndCount();
  }

  countPosts(categoryId: string, publishedOnly: boolean, manager?: EntityManager) {
    return this.getRepo(manager).manager.getRepository(Post).countBy({
      categoryId,
      ...(publishedOnly ? { status: PostStatus.PUBLISHED } : {}),
    });
  }

  countChildren(parentId: string, manager?: EntityManager) {
    return this.getRepo(manager).countBy({ parentId });
  }

  updateOrder(id: string, displayOrder: number, manager?: EntityManager) {
    return this.getRepo(manager).update({ id, deletedAt: IsNull() }, { displayOrder });
  }

  softDelete(id: string, manager?: EntityManager) {
    return this.getRepo(manager).softDelete(id);
  }
}
