import { Injectable } from '@nestjs/common';
import { LangCode } from '../../../common/enums/lang.enum';
import { PostCategoryAdminDto } from '../dto/response/post-category-admin.dto';
import { PostCategoryPublicDto, PostCategoryTreeDto } from '../dto/response/post-category-public.dto';
import { PostCategory } from '../entities/post-category.entity';
import { selectTranslation } from './localized-translation';

@Injectable()
export class PostCategoryMapper {
  toPublicResponse(category: PostCategory, lang: LangCode): PostCategoryPublicDto {
    const translation = selectTranslation(category.translations, lang);
    return {
      id: category.id,
      section: category.section,
      parentId: category.parentId ?? null,
      displayOrder: category.displayOrder,
      name: translation?.name ?? '',
      slug: translation?.slug ?? category.id,
      description: translation?.description ?? null,
    };
  }

  toTree(categories: PostCategory[], lang: LangCode): PostCategoryTreeDto[] {
    const nodes = categories.map((category): PostCategoryTreeDto => ({
      ...this.toPublicResponse(category, lang),
      children: [],
    }));
    const byId = new Map(nodes.map((node) => [node.id, node]));
    const roots: PostCategoryTreeDto[] = [];
    for (const node of nodes) {
      const parent = node.parentId ? byId.get(node.parentId) : undefined;
      if (parent) parent.children.push(node);
      else roots.push(node);
    }
    return roots;
  }

  toAdminResponse(category: PostCategory): PostCategoryAdminDto {
    return {
      id: category.id,
      section: category.section,
      parentId: category.parentId ?? null,
      displayOrder: category.displayOrder,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      translations: (category.translations ?? []).map(({ languageCode, name, slug, description, updatedAt }) => ({
        languageCode, name, slug, description: description ?? null, updatedAt,
      })),
    };
  }
}
