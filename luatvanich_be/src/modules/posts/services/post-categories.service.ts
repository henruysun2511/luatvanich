import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { PaginatedResponse } from '../../../common/response/api-response';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { CreatePostCategoryDto } from '../dto/request/create-post-category.dto';
import { PostCategoryQueryDto } from '../dto/request/post-category-query.dto';
import { ReorderPostCategoriesDto } from '../dto/request/reorder-post-categories.dto';
import { UpdatePostCategoryDto } from '../dto/request/update-post-category.dto';
import { UpsertPostCategoryTranslationDto } from '../dto/request/upsert-post-category-translation.dto';
import { PostSection } from '../enums/post-section.enum';
import {
  PostCategoryHasChildrenException, PostCategoryHasPostsException,
  PostCategoryHierarchyException, PostCategoryNotFoundException,
} from '../exceptions/post.exception';
import { PostCategoryMapper } from '../mapper/post-category.mapper';
import { PostCategoryTranslationRepository } from '../repositories/post-category-translation.repository';
import { PostCategoryRepository } from '../repositories/post-category.repository';
import { generatePostSlug, normalizePostSlug } from '../utils/post-slug.util';

@Injectable()
export class PostCategoriesService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly categories: PostCategoryRepository,
    private readonly translations: PostCategoryTranslationRepository,
    private readonly mapper: PostCategoryMapper,
  ) {}

  async findPublicTree(lang: LangCode, section?: PostSection) {
    return this.mapper.toTree(await this.categories.findPublicTree(section), lang);
  }

  async findPublicBySlug(slug: string, lang: LangCode) {
    const normalized = normalizePostSlug(slug);
    const category = await this.categories.findPublicBySlug(normalized, lang)
      ?? (lang !== DEFAULT_LANG ? await this.categories.findPublicBySlug(normalized, DEFAULT_LANG) : null);
    if (!category) throw new PostCategoryNotFoundException(slug);
    return {
      ...this.mapper.toPublicResponse(category, lang),
      postsCount: await this.categories.countPosts(category.id, true),
    };
  }

  async findAllAdmin(query: PostCategoryQueryDto) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.categories.findAdminList(query);
    return PaginatedResponse.of(items.map((category) => this.mapper.toAdminResponse(category)), total, page, limit);
  }

  async findByIdAdmin(id: string, manager?: EntityManager) {
    const category = await this.categories.findById(id, manager);
    if (!category) throw new PostCategoryNotFoundException(id);
    return this.mapper.toAdminResponse(category);
  }

  create(dto: CreatePostCategoryDto) {
    return this.dataSource.transaction(async (manager) => {
      await this.categories.lockHierarchy(manager);
      const { translations, ...fields } = dto;
      await this.validateParent(fields.section, fields.parentId, undefined, manager);
      const category = await this.categories.save(fields, manager);
      await this.saveTranslations(category.id, translations, manager);
      return this.findByIdAdmin(category.id, manager);
    });
  }

  update(id: string, dto: UpdatePostCategoryDto) {
    return this.dataSource.transaction(async (manager) => {
      await this.categories.lockHierarchy(manager);
      const current = await this.categories.findForWrite(id, manager);
      if (!current) throw new PostCategoryNotFoundException(id);
      const { translations, ...fields } = dto;
      const section = fields.section ?? current.section;
      if (section !== current.section && await this.categories.countChildren(id, manager)) {
        throw new PostCategoryHierarchyException('Không thể đổi phân vùng khi chuyên mục còn chuyên mục con');
      }
      const parentId = fields.parentId === undefined ? current.parentId : fields.parentId;
      await this.validateParent(section, parentId, id, manager);
      await this.categories.save({ ...current, ...fields }, manager);
      if (translations) await this.saveTranslations(id, translations, manager);
      return this.findByIdAdmin(id, manager);
    });
  }

  private async validateParent(
    section: PostSection, parentId: string | null | undefined, categoryId: string | undefined, manager: EntityManager,
  ) {
    const visited = new Set<string>();
    if (categoryId) visited.add(categoryId.toLowerCase());
    while (parentId) {
      const key = parentId.toLowerCase();
      if (visited.has(key)) throw new PostCategoryHierarchyException('Cây chuyên mục không được có vòng lặp');
      visited.add(key);
      const parent = await this.categories.findForWrite(parentId, manager);
      if (!parent) throw new PostCategoryNotFoundException(parentId);
      if (parent.section !== section) throw new PostCategoryHierarchyException('Chuyên mục cha và con phải cùng phân vùng');
      parentId = parent.parentId;
    }
  }

  private async saveTranslations(id: string, translations: UpsertPostCategoryTranslationDto[], manager: EntityManager) {
    for (const input of translations) {
      const current = await this.translations.find(id, input.languageCode, manager);
      const slug = input.slug ? normalizePostSlug(input.slug)
        : current?.slug ?? generatePostSlug(input.name, input.languageCode, 220, id);
      await this.translations.save({ ...current, ...input, categoryId: id, slug, updatedAt: new Date() }, manager);
    }
  }

  async reorder(dto: ReorderPostCategoriesDto) {
    await this.dataSource.transaction(async (manager) => {
      await this.categories.lockHierarchy(manager);
      for (const [index, id] of dto.ids.entries()) {
        const result = await this.categories.updateOrder(id, index + 1, manager);
        if (!result.affected) throw new PostCategoryNotFoundException(id);
      }
    });
  }

  async delete(id: string) {
    await this.dataSource.transaction(async (manager) => {
      await this.categories.lockHierarchy(manager);
      if (!await this.categories.findForWrite(id, manager)) throw new PostCategoryNotFoundException(id);
      const count = await this.categories.countPosts(id, false, manager);
      if (count) throw new PostCategoryHasPostsException(count);
      if (await this.categories.countChildren(id, manager)) throw new PostCategoryHasChildrenException();
      await this.categories.softDelete(id, manager);
    });
  }
}
