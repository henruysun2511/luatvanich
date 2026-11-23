import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCategory } from './entities/post-category.entity';
import { PostCategoryTranslation } from './entities/post-category-translation.entity';
import { Post } from './entities/post.entity';
import { PostTranslation } from './entities/post-translation.entity';
import { Tag } from './entities/tag.entity';
import { TagTranslation } from './entities/tag-translation.entity';
import { PostTag } from './entities/post-tag.entity';
import { PostService } from './entities/post-service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostCategory,
      PostCategoryTranslation,
      Post,
      PostTranslation,
      Tag,
      TagTranslation,
      PostTag,
      PostService,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class PostsModule {}
