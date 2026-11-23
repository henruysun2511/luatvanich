import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePosts1795500000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE post_categories_section_enum AS ENUM ('news', 'handbook', 'knowledge_base');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
      DO $$ BEGIN
        CREATE TYPE posts_status_enum AS ENUM ('draft', 'in_review', 'scheduled', 'published', 'archived');
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
      ALTER TYPE posts_status_enum ADD VALUE IF NOT EXISTS 'archived';

      CREATE TABLE IF NOT EXISTS post_categories (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        section post_categories_section_enum NOT NULL DEFAULT 'news',
        parent_id uuid REFERENCES post_categories(id) ON DELETE SET NULL,
        display_order int NOT NULL DEFAULT 0,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz
      );
      CREATE TABLE IF NOT EXISTS post_category_translations (
        category_id uuid NOT NULL REFERENCES post_categories(id) ON DELETE CASCADE,
        language_code varchar(10) NOT NULL,
        name varchar(200) NOT NULL,
        slug varchar(220) NOT NULL,
        description text,
        updated_at timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY (category_id, language_code)
      );
      CREATE TABLE IF NOT EXISTS posts (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        category_id uuid NOT NULL REFERENCES post_categories(id) ON DELETE RESTRICT,
        author_lawyer_id uuid,
        thumbnail_url varchar(500),
        status posts_status_enum NOT NULL DEFAULT 'draft',
        is_featured boolean NOT NULL DEFAULT false,
        publish_at timestamptz,
        views_count int NOT NULL DEFAULT 0,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz
      );
      DO $$ BEGIN
        ALTER TABLE posts ADD CONSTRAINT fk_posts_author_lawyer
          FOREIGN KEY (author_lawyer_id) REFERENCES lawyers(id) ON DELETE SET NULL;
      EXCEPTION WHEN duplicate_object THEN NULL;
      END $$;
      CREATE TABLE IF NOT EXISTS post_translations (
        post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        language_code varchar(10) NOT NULL,
        title varchar(300) NOT NULL,
        slug varchar(320) NOT NULL,
        summary text,
        content_html text NOT NULL,
        meta_title varchar(70),
        meta_description varchar(160),
        is_complete boolean NOT NULL DEFAULT false,
        updated_at timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY (post_id, language_code)
      );
      CREATE TABLE IF NOT EXISTS tags (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        color_hex varchar(20),
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS tag_translations (
        tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
        language_code varchar(10) NOT NULL,
        name varchar(100) NOT NULL,
        slug varchar(120) NOT NULL,
        updated_at timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY (tag_id, language_code)
      );
      CREATE TABLE IF NOT EXISTS post_tags (
        post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, tag_id)
      );
      CREATE TABLE IF NOT EXISTS post_services (
        post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        service_id uuid NOT NULL REFERENCES services(id) ON DELETE CASCADE,
        PRIMARY KEY (post_id, service_id)
      );

      CREATE UNIQUE INDEX IF NOT EXISTS uq_post_category_translations_slug_lang ON post_category_translations (language_code, slug);
      CREATE UNIQUE INDEX IF NOT EXISTS uq_post_translations_slug_lang ON post_translations (language_code, slug);
      CREATE UNIQUE INDEX IF NOT EXISTS uq_tag_translations_slug_lang ON tag_translations (language_code, slug);

      CREATE INDEX IF NOT EXISTS idx_post_categories_parent_id ON post_categories (parent_id);
      CREATE INDEX IF NOT EXISTS idx_posts_category_id ON posts (category_id);
      CREATE INDEX IF NOT EXISTS idx_posts_author_lawyer_id ON posts (author_lawyer_id);
      CREATE INDEX IF NOT EXISTS idx_posts_publication ON posts (status, publish_at);
      CREATE INDEX IF NOT EXISTS idx_post_tags_tag_id ON post_tags (tag_id);
      CREATE INDEX IF NOT EXISTS idx_post_services_service_id ON post_services (service_id);

      UPDATE roles
      SET permissions = concat_ws(',', NULLIF(permissions, ''), 'posts:manage')
      WHERE code = 'admin' AND is_system
        AND NOT ('posts:manage' = ANY(string_to_array(permissions, ',')));
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE roles
      SET permissions = array_to_string(array_remove(string_to_array(permissions, ','), 'posts:manage'), ',')
      WHERE code = 'admin' AND is_system;
      DROP TABLE post_services, post_tags, tag_translations, tags, post_translations,
        posts, post_category_translations, post_categories;
      DROP TYPE posts_status_enum, post_categories_section_enum;
    `);
  }
}
