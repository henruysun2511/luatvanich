import { Injectable } from '@nestjs/common';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { PaginatedResponse } from '../../../common/response/api-response';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { generateViSlug, generateZhSlug } from '../../../common/utils/slug.util';
import { CreatePostCategoryDto } from '../dto/request/create-post-category.dto';
import { PostCategoryQueryDto } from '../dto/request/post-category-query.dto';
import { ReorderPostCategoriesDto } from '../dto/request/reorder-post-categories.dto';
import { UpdatePostCategoryDto } from '../dto/request/update-post-category.dto';
import { UpsertPostCategoryTranslationDto } from '../dto/request/upsert-post-category-translation.dto';
import { PostSection } from '../enums/post-section.enum';
import {
  PostCategoryHasChildrenException,
  PostCategoryHasPostsException,
  PostCategoryHierarchyException,
  PostCategoryNotFoundException,
} from '../exceptions/post.exception';
import { PostCategoryMapper } from '../mapper/post-category.mapper';
import { PostCategoryTranslationRepository } from '../repositories/post-category-translation.repository';
import { PostCategoryRepository } from '../repositories/post-category.repository';
import { PostRepository } from '../repositories/post.repository';

@Injectable()
export class PostCategoriesService {
  constructor(
    private readonly categories: PostCategoryRepository,
    private readonly translations: PostCategoryTranslationRepository,
    private readonly posts: PostRepository,
    private readonly mapper: PostCategoryMapper,
  ) {}

  async findPublicTree(lang: LangCode, section?: PostSection) {
    return this.mapper.toTree(await this.categories.findPublicTree(section), lang);
  }

  async findPublicBySlug(slug: string, lang: LangCode) {
    const normalized = slug.trim().toLowerCase();
    const category =
      (await this.categories.findPublicBySlug(normalized, lang)) ??
      (lang !== DEFAULT_LANG ? await this.categories.findPublicBySlug(normalized, DEFAULT_LANG) : null);
    if (!category) throw new PostCategoryNotFoundException(slug);
    return {
      ...this.mapper.toPublicResponse(category, lang),
      postsCount: await this.posts.countByCategory(category.id, true),
    };
  }

  async findAllAdmin(query: PostCategoryQueryDto) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.categories.findAdminList(query);
    return PaginatedResponse.of(
      items.map((category) => this.mapper.toAdminResponse(category)),
      total,
      page,
      limit,
    );
  }

  async findByIdAdmin(id: string) {
    const category = await this.categories.findById(id);
    if (!category) throw new PostCategoryNotFoundException(id);
    return this.mapper.toAdminResponse(category);
  }

  async create(dto: CreatePostCategoryDto) {
    const { translations, ...fields } = dto;
    await this.validateParent(fields.section, fields.parentId);
    const category = await this.categories.save(fields);
    await this.saveTranslations(category.id, translations);
    return this.findByIdAdmin(category.id);
  }

  async update(id: string, dto: UpdatePostCategoryDto) {
    const current = await this.categories.findById(id);
    if (!current) throw new PostCategoryNotFoundException(id);
    const { translations, ...fields } = dto;
    const section = fields.section ?? current.section;
    if (section !== current.section && (await this.categories.countChildren(id))) {
      throw new PostCategoryHierarchyException('Không thể đổi phân vùng khi chuyên mục còn chuyên mục con');
    }
    const parentId = fields.parentId === undefined ? current.parentId : fields.parentId;
    await this.validateParent(section, parentId, id);
    await this.categories.save({ ...current, ...fields });
    if (translations) await this.saveTranslations(id, translations);
    return this.findByIdAdmin(id);
  }

  private async validateParent(
    section: PostSection,
    parentId: string | null | undefined,
    categoryId?: string,
  ) {
    const visited = new Set<string>();
    if (categoryId) visited.add(categoryId.toLowerCase());
    while (parentId) {
      const key = parentId.toLowerCase();
      if (visited.has(key)) throw new PostCategoryHierarchyException('Cây chuyên mục không được có vòng lặp');
      visited.add(key);
      const parent = await this.categories.findById(parentId);
      if (!parent) throw new PostCategoryNotFoundException(parentId);
      if (parent.section !== section) throw new PostCategoryHierarchyException('Chuyên mục cha và con phải cùng phân vùng');
      parentId = parent.parentId;
    }
  }

  private async saveTranslations(
    id: string,
    translations: UpsertPostCategoryTranslationDto[],
  ) {
    for (const input of translations) {
      const current = await this.translations.find(id, input.languageCode);
      let slug = input.slug ? input.slug.trim().toLowerCase() : current?.slug;
      if (!slug) {
        const generated = input.languageCode === LangCode.VI ? generateViSlug(input.name) : generateZhSlug(input.name);
        slug = generated || id;
      }
      await this.translations.save({ ...current, ...input, categoryId: id, slug, updatedAt: new Date() });
    }
  }

  async reorder(dto: ReorderPostCategoriesDto) {
    for (const [index, id] of dto.ids.entries()) {
      const result = await this.categories.updateOrder(id, index + 1);
      if (!result.affected) throw new PostCategoryNotFoundException(id);
    }
  }

  async delete(id: string) {
    const current = await this.categories.findById(id);
    if (!current) throw new PostCategoryNotFoundException(id);
    const count = await this.posts.countByCategory(id, false);
    if (count) throw new PostCategoryHasPostsException(count);
    if (await this.categories.countChildren(id)) throw new PostCategoryHasChildrenException();
    await this.categories.softDelete(id);
  }
}
