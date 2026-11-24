import { Injectable } from '@nestjs/common';
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

  async findByIdAdmin(id: string) {
    const tag = await this.tags.findById(id);
    if (!tag) throw new TagNotFoundException(id);
    return this.mapper.toAdminResponse(tag);
  }

  async create(dto: CreateTagDto) {
    const { translations, ...fields } = dto;
    const tag = await this.tags.save(fields);
    await this.saveTranslations(tag.id, translations);
    return this.findByIdAdmin(tag.id);
  }

  async update(id: string, dto: UpdateTagDto) {
    const current = await this.tags.findById(id);
    if (!current) throw new TagNotFoundException(id);
    const { translations, ...fields } = dto;
    await this.tags.save({ ...current, ...fields });
    if (translations) await this.saveTranslations(id, translations);
    return this.findByIdAdmin(id);
  }

  private async saveTranslations(id: string, translations: UpsertTagTranslationDto[]) {
    for (const input of translations) {
      const current = await this.translations.find(id, input.languageCode);
      let slug = input.slug ? input.slug.trim().toLowerCase() : current?.slug;
      if (!slug) {
        const generated = input.languageCode === LangCode.VI ? generateViSlug(input.name) : generateZhSlug(input.name);
        slug = generated || id;
      }
      await this.translations.save({ ...current, ...input, tagId: id, slug, updatedAt: new Date() });
    }
  }

  async delete(id: string) {
    const result = await this.tags.delete(id);
    if (!result.affected) throw new TagNotFoundException(id);
  }
}
