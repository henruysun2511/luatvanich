import { Injectable, Logger } from '@nestjs/common';
import { LangCode } from '../../../common/enums/lang.enum';
import { PaginatedResponse } from '../../../common/response/api-response';
import { normalizePagination } from '../../../common/utils/pagination.util';
import { generateViSlug, generateZhSlug } from '../../../common/utils/slug.util';
import { LawyerRepository } from '../../lawyers/repositories/lawyer.repository';
import { LegalServiceRepository } from '../../legal-services/repositories/legal-service.repository';
import { CreatePostDto } from '../dto/request/create-post.dto';
import { AdminPostQueryDto, LatestPostQueryDto, PostQueryDto } from '../dto/request/post-query.dto';
import { UpdatePostStatusDto } from '../dto/request/update-post-status.dto';
import { UpdatePostDto } from '../dto/request/update-post.dto';
import { UpsertPostTranslationDto } from '../dto/request/upsert-post-translation.dto';
import { PostStatus } from '../enums/post-status.enum';
import {
  PostCategoryNotFoundException,
  PostNotFoundException,
  PostPublicationException,
  PostRelationException,
  PostSlugAlreadyExistsException,
} from '../exceptions/post.exception';
import { PostMapper } from '../mapper/post.mapper';
import { PostCategoryRepository } from '../repositories/post-category.repository';
import { PostTranslationRepository } from '../repositories/post-translation.repository';
import { PostRepository } from '../repositories/post.repository';
import { TagRepository } from '../repositories/tag.repository';
import { TagsService } from './tags.service';
import { hasPostContent, sanitizePostHtml } from '../utils/post-html.util';
import { validatePostThumbnail } from '../utils/post-thumbnail.util';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    private readonly posts: PostRepository,
    private readonly categories: PostCategoryRepository,
    private readonly tags: TagRepository,
    private readonly tagsService: TagsService,
    private readonly translations: PostTranslationRepository,
    private readonly lawyerRepo: LawyerRepository,
    private readonly legalServiceRepo: LegalServiceRepository,
    private readonly mapper: PostMapper,
  ) {}

  async findAllPublic(query: PostQueryDto, lang: LangCode, tagId?: string) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.posts.findPublicList(
      {
        ...query,
        categorySlug: query.categorySlug ? query.categorySlug.trim().toLowerCase() : undefined,
        tagSlug: query.tagSlug ? query.tagSlug.trim().toLowerCase() : undefined,
      },
      lang,
      tagId,
    );
    return PaginatedResponse.of(
      items.map((post) => this.mapper.toPublicResponse(post, lang)),
      total,
      page,
      limit,
    );
  }

  async findLatest(query: LatestPostQueryDto, lang: LangCode) {
    const result = await this.findAllPublic({ limit: query.limit ?? 5, categorySlug: query.category }, lang);
    return result.items;
  }

  async findBySlug(slug: string, lang: LangCode) {
    const match = await this.requirePublicPost(slug, lang);
    const post = await this.posts.findPublicDetail(match.id);
    const normalizedSlug = slug.trim().toLowerCase();
    if (!post?.category || !post.translations.some((item) => item.isComplete && item.slug === normalizedSlug)) {
      throw new PostNotFoundException(slug);
    }
    return this.mapper.toPublicDetail(post, lang);
  }

  async findRelated(slug: string, lang: LangCode, limit: number) {
    const match = await this.requirePublicPost(slug, lang);
    const source = await this.posts.findById(match.id);
    if (source?.status !== PostStatus.PUBLISHED) throw new PostNotFoundException(slug);
    const tagIds = (source.postTags ?? []).map(({ tagId }) => tagId);
    const related = await this.posts.findRelated(source, tagIds, lang, limit);
    return related.map((post) => this.mapper.toPublicResponse(post, lang));
  }

  async countView(slug: string, lang: LangCode) {
    const post = await this.requirePublicPost(slug, lang);
    const viewsCount = await this.posts.countViews(post.id);
    if (viewsCount === undefined) throw new PostNotFoundException(slug);
    return { viewsCount };
  }

  private async requirePublicPost(slug: string, lang: LangCode) {
    const post = await this.posts.findPublicBySlug(slug.trim().toLowerCase(), lang);
    if (!post) throw new PostNotFoundException(slug);
    return post;
  }

  async findAllAdmin(query: AdminPostQueryDto) {
    const { page, limit } = normalizePagination(query);
    const [items, total] = await this.posts.findAdminList(query);
    return PaginatedResponse.of(
      items.map((post) => this.mapper.toAdminResponse(post)),
      total,
      page,
      limit,
    );
  }

  async findByIdAdmin(id: string) {
    const post = await this.posts.findById(id);
    if (!post) throw new PostNotFoundException(id);
    return this.mapper.toAdminResponse(post);
  }

  async create(dto: CreatePostDto) {
    if (dto.thumbnailUrl) validatePostThumbnail(dto.thumbnailUrl);
    const { translations, tags, tagIds, serviceIds, ...fields } = dto;
    await this.validateReferences(fields.categoryId, fields.authorLawyerId);
    const post = await this.posts.save(fields);
    await this.saveTranslations(post.id, translations);
    const resolvedTagIds = await this.resolveTags(tags, tagIds);
    await this.updateLinks(post.id, resolvedTagIds, serviceIds);
    return this.findByIdAdmin(post.id);
  }

  async update(id: string, dto: UpdatePostDto) {
    const post = await this.posts.findById(id);
    if (!post) throw new PostNotFoundException(id);

    if (dto.thumbnailUrl && dto.thumbnailUrl !== post.thumbnailUrl) {
      validatePostThumbnail(dto.thumbnailUrl);
    }

    const { translations, tags, tagIds, serviceIds, ...fields } = dto;
    await this.validateReferences(fields.categoryId, fields.authorLawyerId);
    await this.posts.save({ ...post, ...fields });
    if (translations) await this.saveTranslations(id, translations);
    const hasTagUpdates = tags !== undefined || tagIds !== undefined;
    const resolvedTagIds = hasTagUpdates ? await this.resolveTags(tags, tagIds) : undefined;
    await this.updateLinks(id, resolvedTagIds, serviceIds);
    const result = await this.findByIdAdmin(id);
    if (result.status === PostStatus.PUBLISHED || result.status === PostStatus.SCHEDULED) {
      this.assertCompleteTranslation(result.translations);
    }
    return result;
  }

  async updateStatus(id: string, dto: UpdatePostStatusDto) {
    const post = await this.posts.findById(id);
    if (!post) throw new PostNotFoundException(id);

    const now = new Date();
    let publishAt: Date | null = null;
    if (dto.status === PostStatus.SCHEDULED) {
      const scheduled = dto.publishAt ? new Date(dto.publishAt) : null;
      if (!scheduled || !Number.isFinite(scheduled.getTime()) || scheduled <= now) {
        throw new PostPublicationException('Thời điểm đăng theo lịch phải ở tương lai');
      }
      publishAt = scheduled;
    }
    if (dto.status === PostStatus.PUBLISHED) {
      publishAt = post.status === PostStatus.PUBLISHED ? post.publishAt ?? now : now;
    }
    if (dto.status === PostStatus.PUBLISHED || dto.status === PostStatus.SCHEDULED) {
      const detail = await this.findByIdAdmin(id);
      this.assertCompleteTranslation(detail.translations);
    }
    await this.posts.save({ ...post, status: dto.status, publishAt });
    return this.findByIdAdmin(id);
  }

  async delete(id: string) {
    const post = await this.posts.findById(id);
    if (!post) throw new PostNotFoundException(id);
    await this.posts.softDelete(id);
  }

  private async validateReferences(
    categoryId: string | undefined,
    authorId: string | null | undefined,
  ) {
    if (categoryId) {
      const cat = await this.categories.findById(categoryId);
      if (!cat) throw new PostCategoryNotFoundException(categoryId);
    }
    if (authorId) {
      const lawyer = await this.lawyerRepo.findById(authorId);
      if (!lawyer) {
        throw new PostRelationException('Luật sư tác giả không tồn tại');
      }
    }
  }

  private async resolveTags(tags?: string[], tagIds?: string[]): Promise<string[]> {
    const ids = new Set<string>();
    if (tagIds?.length) {
      tagIds.forEach((id) => ids.add(id));
    }
    if (tags?.length) {
      const createdIds = await this.tagsService.findOrCreateByNames(tags);
      createdIds.forEach((id) => ids.add(id));
    }
    return Array.from(ids);
  }

  private async updateLinks(
    id: string,
    tagIds: string[] | undefined,
    serviceIds: string[] | undefined,
  ) {
    if (tagIds) {
      if (tagIds.length && (await this.tags.findIdsForLink(tagIds)).length !== tagIds.length) {
        throw new PostRelationException('Có thẻ bài viết không tồn tại');
      }
      await this.posts.setTags(id, tagIds);
    }
    if (serviceIds) {
      if (serviceIds.length) {
        const foundServices = await this.legalServiceRepo.findByIds(serviceIds);
        if (foundServices.length !== serviceIds.length) {
          throw new PostRelationException('Có dịch vụ pháp lý không tồn tại');
        }
      }
      await this.posts.setServices(id, serviceIds);
    }
  }

  private async saveTranslations(id: string, translations: UpsertPostTranslationDto[]) {
    for (const input of translations) {
      const current = await this.translations.find(id, input.languageCode);
      let slug = input.slug ? input.slug.trim().toLowerCase() : current?.slug;
      if (!slug) {
        const generated = input.languageCode === LangCode.VI ? generateViSlug(input.title) : generateZhSlug(input.title);
        slug = generated || id;
      }
      if (slug === 'latest') throw new PostSlugAlreadyExistsException(slug);
      const contentHtml = sanitizePostHtml(input.contentHtml);
      if (!hasPostContent(contentHtml)) {
        throw new PostPublicationException('Nội dung bản dịch không có văn bản hoặc ảnh hợp lệ');
      }
      await this.translations.save(
        { ...current, ...input, postId: id, slug, contentHtml, updatedAt: new Date() },
      );
    }
  }

  private assertCompleteTranslation(translations: { isComplete: boolean }[]) {
    if (!translations.some((item) => item.isComplete)) {
      throw new PostPublicationException('Cần ít nhất một bản dịch hoàn thiện trước khi xuất bản');
    }
  }
}
