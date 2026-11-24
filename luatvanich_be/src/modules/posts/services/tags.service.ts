import { Injectable } from '@nestjs/common';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { generateViSlug } from '../../../common/utils/slug.util';
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

  async findOrCreateByNames(names: string[]): Promise<string[]> {
    const trimmed = Array.from(new Set(names.map((n) => n.trim()).filter((n) => n.length > 0)));
    if (!trimmed.length) return [];

    const tagIds: string[] = [];
    for (const name of trimmed) {
      const slug = generateViSlug(name) || name.toLowerCase();
      const existing = await this.translations.findByNameOrSlug(name, slug);
      if (existing) {
        tagIds.push(existing.tagId);
      } else {
        const tag = await this.tags.save({});
        await this.translations.save({
          tagId: tag.id,
          languageCode: LangCode.VI,
          name,
          slug,
        });
        tagIds.push(tag.id);
      }
    }
    return tagIds;
  }
}
