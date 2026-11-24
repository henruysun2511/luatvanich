import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { PaginatedResponse } from '../../../common/response/api-response';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { generateViSlug, generateZhSlug } from '../../../common/utils/slug.util';
import { CreateTagDto } from '../dto/request/create-tag.dto';
import { TagQueryDto } from '../dto/request/tag-query.dto';
import { UpdateTagDto } from '../dto/request/update-tag.dto';
import { UpsertTagTranslationDto } from '../dto/request/upsert-tag-translation.dto';
import { TagNotFoundException } from '../exceptions/post.exception';
import { TagMapper } from '../mapper/tag.mapper';
import { TagTranslationRepository } from '../repositories/tag-translation.repository';
import { TagRepository } from '../repositories/tag.repository';

@Injectable()
export class TagsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly tags: TagRepository,
    private readonly translations: TagTranslationRepository,
    private readonly mapper: TagMapper,
  ) {}

  async findAllPublic(lang: LangCode) {
    return (await this.tags.findPublicList(lang)).map((tag) => this.mapper.toPublicResponse(tag, lang));
  }

  async findPublicId(slug: string, lang: LangCode) {
    const normalized = slug.trim().toLowerCase();
    const tag =
      (await this.tags.findBySlug(normalized, lang)) ??
      (lang !== DEFAULT_LANG ? await this.tags.findBySlug(normalized, DEFAULT_LANG) : null);
    if (!tag) throw new TagNotFoundException(slug);
    return tag.id;
  }

  async findAllAdmin(query: TagQueryDto) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.tags.findAdminList(query);
    return PaginatedResponse.of(
      items.map((tag) => this.mapper.toAdminResponse(tag)),
      total,
      page,
      limit,
    );
  }

  async findByIdAdmin(id: string, manager?: EntityManager) {
    const tag = await this.tags.findById(id, manager);
    if (!tag) throw new TagNotFoundException(id);
    return this.mapper.toAdminResponse(tag);
  }

  create(dto: CreateTagDto) {
    return this.dataSource.transaction(async (manager) => {
      const { translations, ...fields } = dto;
      const tag = await this.tags.save(fields, manager);
      await this.saveTranslations(tag.id, translations, manager);
      return this.findByIdAdmin(tag.id, manager);
    });
  }

  update(id: string, dto: UpdateTagDto) {
    return this.dataSource.transaction(async (manager) => {
      const current = await this.tags.findForWrite(id, manager);
      if (!current) throw new TagNotFoundException(id);
      const { translations, ...fields } = dto;
      await this.tags.save({ ...current, ...fields }, manager);
      if (translations) await this.saveTranslations(id, translations, manager);
      return this.findByIdAdmin(id, manager);
    });
  }

  private async saveTranslations(id: string, translations: UpsertTagTranslationDto[], manager: EntityManager) {
    for (const input of translations) {
      const current = await this.translations.find(id, input.languageCode, manager);
      let slug = input.slug ? input.slug.trim().toLowerCase() : current?.slug;
      if (!slug) {
        const generated = input.languageCode === LangCode.VI ? generateViSlug(input.name) : generateZhSlug(input.name);
        slug = generated || id;
      }
      await this.translations.save({ ...current, ...input, tagId: id, slug, updatedAt: new Date() }, manager);
    }
  }

  async delete(id: string) {
    const result = await this.tags.delete(id);
    if (!result.affected) throw new TagNotFoundException(id);
  }
}
