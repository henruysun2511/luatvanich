import { Injectable } from '@nestjs/common';
import { ContentStatus } from '../../../common/enums/content-status.enum';
import { DEFAULT_LANG, LangCode } from '../../../common/enums/lang.enum';
import { LegalServiceMapper } from '../../legal-services/mapper/legal-service.mapper';
import { PostAdminDto } from '../dto/response/post-admin.dto';
import { PostDetailPublicDto } from '../dto/response/post-detail-public.dto';
import { PostPublicDto } from '../dto/response/post-public.dto';
import { Post } from '../entities/post.entity';
import { toPostContent } from '../utils/post-html.util';
import { selectTranslation } from './localized-translation';
import { PostCategoryMapper } from './post-category.mapper';
import { TagMapper } from './tag.mapper';

@Injectable()
export class PostMapper {
  constructor(
    private readonly categories: PostCategoryMapper,
    private readonly tags: TagMapper,
    private readonly services: LegalServiceMapper,
  ) {}

  private visibleTranslation(post: Post, lang: LangCode) {
    const translations = post.translations?.filter((item) => item.isComplete);
    return translations?.find((item) => item.languageCode === lang)
      ?? translations?.find((item) => item.languageCode === DEFAULT_LANG);
  }

  toPublicResponse(post: Post, lang: LangCode): PostPublicDto {
    const translation = this.visibleTranslation(post, lang);
    const authorLawyerId = post.author?.status === ContentStatus.PUBLISHED ? post.author.id : null;
    return {
      id: post.id,
      categoryId: post.categoryId,
      authorLawyerId,
      title: translation?.title ?? '',
      slug: translation?.slug ?? post.id,
      languageCode: translation?.languageCode ?? lang,
      summary: translation?.summary ?? null,
      thumbnailUrl: post.thumbnailUrl ?? null,
      isFeatured: post.isFeatured,
      viewsCount: post.viewsCount,
      publishAt: post.publishAt ?? null,
    };
  }

  toPublicDetail(post: Post, lang: LangCode): PostDetailPublicDto {
    const translation = this.visibleTranslation(post, lang);
    const author = post.author?.status === ContentStatus.PUBLISHED ? post.author : undefined;
    const localizedAuthor = selectTranslation(author?.translations, lang);
    return {
      ...this.toPublicResponse(post, lang),
      ...toPostContent(translation?.contentHtml ?? '', translation?.languageCode ?? lang),
      metaTitle: translation?.metaTitle ?? null,
      metaDescription: translation?.metaDescription ?? null,
      category: this.categories.toPublicResponse(post.category, lang),
      author: author && localizedAuthor ? {
        id: author.id,
        fullName: localizedAuthor.fullName,
        slug: localizedAuthor.slug,
        avatarUrl: author.avatarUrl ?? null,
      } : null,
      tags: (post.postTags ?? []).map(({ tag }) => this.tags.toPublicResponse(tag, lang)),
      services: (post.postServices ?? []).flatMap(({ service }) =>
        service?.status === ContentStatus.PUBLISHED ? [this.services.toPublicResponse(service, lang)] : [],
      ),
    };
  }

  toAdminResponse(post: Post): PostAdminDto {
    return {
      id: post.id,
      categoryId: post.categoryId,
      authorLawyerId: post.authorLawyerId ?? null,
      thumbnailUrl: post.thumbnailUrl ?? null,
      status: post.status,
      isFeatured: post.isFeatured,
      viewsCount: post.viewsCount,
      publishAt: post.publishAt ?? null,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      tagIds: post.postTags?.map(({ tagId }) => tagId),
      serviceIds: post.postServices?.map(({ serviceId }) => serviceId),
      translations: (post.translations ?? []).map((translation) => ({
        languageCode: translation.languageCode,
        title: translation.title,
        slug: translation.slug,
        summary: translation.summary ?? null,
        contentHtml: translation.contentHtml,
        metaTitle: translation.metaTitle ?? null,
        metaDescription: translation.metaDescription ?? null,
        isComplete: translation.isComplete,
        updatedAt: translation.updatedAt,
      })),
    };
  }
}
