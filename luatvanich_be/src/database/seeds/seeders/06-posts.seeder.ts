import { DataSource } from 'typeorm';
import { PostCategory } from '../../../modules/posts/entities/post-category.entity';
import { PostCategoryTranslation } from '../../../modules/posts/entities/post-category-translation.entity';
import { Post } from '../../../modules/posts/entities/post.entity';
import { PostTranslation } from '../../../modules/posts/entities/post-translation.entity';
import { Tag } from '../../../modules/posts/entities/tag.entity';
import { TagTranslation } from '../../../modules/posts/entities/tag-translation.entity';
import { PostTag } from '../../../modules/posts/entities/post-tag.entity';
import { Lawyer } from '../../../modules/lawyers/entities/lawyer.entity';
import { CATEGORIES_SEED_DATA, TAGS_SEED_DATA, POSTS_SEED_DATA } from '../data/posts.data';
import { LangCode } from '../../../common/enums/lang.enum';

export async function seedPostsAndCategories(
  dataSource: DataSource,
  lawyersMap: Record<string, Lawyer>,
): Promise<void> {
  console.log('  📌 [6/8] Bắt đầu seed Bài viết, Cây chuyên mục & Thẻ tag (Posts)...');
  const catRepo = dataSource.getRepository(PostCategory);
  const catTransRepo = dataSource.getRepository(PostCategoryTranslation);
  const tagRepo = dataSource.getRepository(Tag);
  const tagTransRepo = dataSource.getRepository(TagTranslation);
  const postRepo = dataSource.getRepository(Post);
  const postTransRepo = dataSource.getRepository(PostTranslation);
  const postTagRepo = dataSource.getRepository(PostTag);

  // 1. Chuyên mục phân cấp (cha trước, con sau)
  const categoriesMap: Record<string, PostCategory> = {};

  // Vòng 1: Tạo các chuyên mục không có parentCode (cha)
  for (const c of CATEGORIES_SEED_DATA.filter((i) => !i.parentCode)) {
    const viTrans = c.translations.find((t) => t.languageCode === LangCode.VI);
    let existingTrans = viTrans
      ? await catTransRepo.findOne({ where: { slug: viTrans.slug, languageCode: LangCode.VI } })
      : null;

    let category: PostCategory;
    if (existingTrans) {
      category = (await catRepo.findOne({ where: { id: existingTrans.categoryId } }))!;
      category.section = c.section;
      category.displayOrder = c.displayOrder;
      await catRepo.save(category);
    } else {
      category = catRepo.create({
        section: c.section,
        displayOrder: c.displayOrder,
      });
      await catRepo.save(category);
      console.log(`    + Đã tạo chuyên mục cha: ${viTrans?.name}`);
    }

    for (const t of c.translations) {
      let trans = await catTransRepo.findOne({
        where: { categoryId: category.id, languageCode: t.languageCode },
      });
      if (!trans) {
        trans = catTransRepo.create({
          categoryId: category.id,
          languageCode: t.languageCode,
          name: t.name,
          slug: t.slug,
          description: t.description,
        });
      } else {
        trans.name = t.name;
        trans.slug = t.slug;
        trans.description = t.description;
      }
      await catTransRepo.save(trans);
    }

    categoriesMap[c.code] = category;
  }

  // Vòng 2: Tạo các chuyên mục con có parentCode
  for (const c of CATEGORIES_SEED_DATA.filter((i) => !!i.parentCode)) {
    const parentCat = categoriesMap[c.parentCode!];
    const viTrans = c.translations.find((t) => t.languageCode === LangCode.VI);
    let existingTrans = viTrans
      ? await catTransRepo.findOne({ where: { slug: viTrans.slug, languageCode: LangCode.VI } })
      : null;

    let category: PostCategory;
    if (existingTrans) {
      category = (await catRepo.findOne({ where: { id: existingTrans.categoryId } }))!;
      category.parentId = parentCat?.id;
      category.section = c.section;
      category.displayOrder = c.displayOrder;
      await catRepo.save(category);
    } else {
      category = catRepo.create({
        parentId: parentCat?.id,
        section: c.section,
        displayOrder: c.displayOrder,
      });
      await catRepo.save(category);
      console.log(`    + Đã tạo chuyên mục con: ${viTrans?.name}`);
    }

    for (const t of c.translations) {
      let trans = await catTransRepo.findOne({
        where: { categoryId: category.id, languageCode: t.languageCode },
      });
      if (!trans) {
        trans = catTransRepo.create({
          categoryId: category.id,
          languageCode: t.languageCode,
          name: t.name,
          slug: t.slug,
          description: t.description,
        });
      } else {
        trans.name = t.name;
        trans.slug = t.slug;
        trans.description = t.description;
      }
      await catTransRepo.save(trans);
    }

    categoriesMap[c.code] = category;
  }

  // 2. Thẻ tags
  const tagsMap: Record<string, Tag> = {};
  for (const tagItem of TAGS_SEED_DATA) {
    const viTrans = tagItem.translations.find((t) => t.languageCode === LangCode.VI);
    let existingTrans = viTrans
      ? await tagTransRepo.findOne({ where: { slug: viTrans.slug, languageCode: LangCode.VI } })
      : null;

    let tag: Tag;
    if (existingTrans) {
      tag = (await tagRepo.findOne({ where: { id: existingTrans.tagId } }))!;
      tag.colorHex = tagItem.colorHex;
      await tagRepo.save(tag);
    } else {
      tag = tagRepo.create({ colorHex: tagItem.colorHex });
      await tagRepo.save(tag);
      console.log(`    + Đã tạo thẻ: ${viTrans?.name}`);
    }

    for (const t of tagItem.translations) {
      let trans = await tagTransRepo.findOne({
        where: { tagId: tag.id, languageCode: t.languageCode },
      });
      if (!trans) {
        trans = tagTransRepo.create({
          tagId: tag.id,
          languageCode: t.languageCode,
          name: t.name,
          slug: t.slug,
        });
      } else {
        trans.name = t.name;
        trans.slug = t.slug;
      }
      await tagTransRepo.save(trans);
    }

    if (viTrans) {
      tagsMap[viTrans.slug] = tag;
    }
  }

  // 3. Bài viết (Posts)
  for (const p of POSTS_SEED_DATA) {
    const category = categoriesMap[p.categoryCode] || Object.values(categoriesMap)[0];
    const author = p.authorSlugKey ? lawyersMap[p.authorSlugKey] : null;
    const viTrans = p.translations.find((t) => t.languageCode === LangCode.VI);

    let existingTrans = viTrans
      ? await postTransRepo.findOne({ where: { slug: viTrans.slug, languageCode: LangCode.VI } })
      : null;

    let post: Post;
    if (existingTrans) {
      post = (await postRepo.findOne({ where: { id: existingTrans.postId } }))!;
      post.categoryId = category.id;
      post.authorLawyerId = author?.id;
      post.thumbnailUrl = p.thumbnailUrl;
      post.status = p.status;
      post.isFeatured = p.isFeatured;
      post.viewsCount = p.viewsCount;
      await postRepo.save(post);
    } else {
      post = postRepo.create({
        categoryId: category.id,
        authorLawyerId: author?.id,
        thumbnailUrl: p.thumbnailUrl,
        status: p.status,
        isFeatured: p.isFeatured,
        viewsCount: p.viewsCount,
        publishAt: new Date(),
      });
      await postRepo.save(post);
      console.log(`    + Đã tạo bài viết: ${viTrans?.title}`);
    }

    // Bản dịch
    for (const t of p.translations) {
      let trans = await postTransRepo.findOne({
        where: { postId: post.id, languageCode: t.languageCode },
      });
      if (!trans) {
        trans = postTransRepo.create({
          postId: post.id,
          languageCode: t.languageCode,
          title: t.title,
          slug: t.slug,
          summary: t.summary,
          contentHtml: t.contentHtml,
          metaTitle: t.metaTitle,
          metaDescription: t.metaDescription,
          isComplete: true,
        });
      } else {
        trans.title = t.title;
        trans.slug = t.slug;
        trans.summary = t.summary;
        trans.contentHtml = t.contentHtml;
        trans.metaTitle = t.metaTitle;
        trans.metaDescription = t.metaDescription;
        trans.isComplete = true;
      }
      await postTransRepo.save(trans);
    }

    // Gán tags
    await postTagRepo.delete({ postId: post.id });
    for (const tagSlug of p.tagSlugs) {
      const tag = tagsMap[tagSlug];
      if (tag) {
        const pt = postTagRepo.create({ postId: post.id, tagId: tag.id });
        await postTagRepo.save(pt);
      }
    }
  }
}
