import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { LangCode } from '../../../common/enums/lang.enum';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { PostCategoryQueryDto } from '../dto/request/post-category-query.dto';
import { PostCategory } from '../entities/post-category.entity';
import { PostSection } from '../enums/post-section.enum';

@Injectable()
export class PostCategoryRepository {
  constructor(@InjectRepository(PostCategory) private readonly repo: Repository<PostCategory>) {}

  create(fields: Partial<PostCategory>): PostCategory {
    return this.repo.create(fields);
  }

  save(fields: PostCategory | Partial<PostCategory>): Promise<PostCategory> {
    return this.repo.save(fields);
  }

  findById(id: string): Promise<PostCategory | null> {
    return this.repo.findOne({ where: { id }, relations: { translations: true } });
  }

  findPublicTree(section?: PostSection): Promise<PostCategory[]> {
    return this.repo.find({
      where: { section },
      relations: { translations: true },
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  findAdminList(filters: PostCategoryQueryDto): Promise<[PostCategory[], number]> {
    const { skip, limit } = normalizePagination(filters);
    const query = this.repo.createQueryBuilder('category').leftJoinAndSelect('category.translations', 'translation');
    if (filters.section) query.andWhere('category.section = :section', { section: filters.section });
    const search = filters.q?.trim();
    if (search) {
      const term = search.replace(/[!%_]/g, (char) => '!' + char);
      query.andWhere(
        'EXISTS (SELECT 1 FROM post_category_translations match WHERE match.category_id = category.id AND match.name ILIKE :term ESCAPE \'!\')',
        { term: `%${term}%` },
      );
    }
    return query
      .orderBy('category.displayOrder', 'ASC')
      .addOrderBy('category.createdAt', filters.sortOrder ?? 'DESC')
      .addOrderBy('category.id', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
  }

  countChildren(parentId: string): Promise<number> {
    return this.repo.countBy({ parentId });
  }

  updateOrder(id: string, displayOrder: number) {
    return this.repo.update({ id, deletedAt: IsNull() }, { displayOrder });
  }

  softDelete(id: string) {
    return this.repo.softDelete(id);
  }
}
