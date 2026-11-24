import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LegalServicesModule } from '../legal-services/legal-services.module';
import { LawyersModule } from '../lawyers/lawyers.module';
import { PostCategoriesAdminController } from './controllers/post-categories-admin.controller';
import { PostCategoriesController } from './controllers/post-categories.controller';
import { PostsAdminController } from './controllers/posts-admin.controller';
import { PostsController } from './controllers/posts.controller';
import { TagsController } from './controllers/tags.controller';
import { PostCategoryTranslation } from './entities/post-category-translation.entity';
import { PostCategory } from './entities/post-category.entity';
import { PostService } from './entities/post-service.entity';
import { PostTag } from './entities/post-tag.entity';
import { PostTranslation } from './entities/post-translation.entity';
import { Post } from './entities/post.entity';
import { TagTranslation } from './entities/tag-translation.entity';
import { Tag } from './entities/tag.entity';
import { PostCategoryMapper } from './mapper/post-category.mapper';
import { PostMapper } from './mapper/post.mapper';
import { TagMapper } from './mapper/tag.mapper';
import { PostCategoryTranslationRepository } from './repositories/post-category-translation.repository';
import { PostCategoryRepository } from './repositories/post-category.repository';
import { PostTranslationRepository } from './repositories/post-translation.repository';
import { PostRepository } from './repositories/post.repository';
import { TagTranslationRepository } from './repositories/tag-translation.repository';
import { TagRepository } from './repositories/tag.repository';
import { PostPublicationScheduler } from './schedulers/post-publication.scheduler';
import { PostCategoriesService } from './services/post-categories.service';
import { PostsService } from './services/posts.service';
import { TagsService } from './services/tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostCategory, PostCategoryTranslation, Post, PostTranslation,
      Tag, TagTranslation, PostTag, PostService,
    ]),
    LegalServicesModule,
    LawyersModule,
  ],
  controllers: [
    PostsController, PostsAdminController, PostCategoriesController, PostCategoriesAdminController,
    TagsController,
  ],
  providers: [
    PostsService, PostCategoriesService, TagsService, PostMapper, PostCategoryMapper, TagMapper,
    PostRepository, PostTranslationRepository, PostCategoryRepository, PostCategoryTranslationRepository,
    TagRepository, TagTranslationRepository,
    PostPublicationScheduler,
  ],
  exports: [TypeOrmModule],
})
export class PostsModule {}
