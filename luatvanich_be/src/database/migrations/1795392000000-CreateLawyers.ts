import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLawyers1795392000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE lawyer_team_group AS ENUM ('core_leadership', 'chinese_team', 'vietnamese_team', 'senior_advisor');
      CREATE TYPE lawyer_content_status AS ENUM ('draft', 'published', 'archived');
      CREATE TYPE credential_kind AS ENUM ('education', 'certificate', 'membership', 'award', 'notable_case', 'publication');

      CREATE TABLE lawyers (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        team_group lawyer_team_group NOT NULL DEFAULT 'chinese_team',
        avatar_url varchar(500),
        license_number varchar(100),
        practice_start_date date,
        display_order int NOT NULL DEFAULT 0,
        is_featured boolean NOT NULL DEFAULT false,
        status lawyer_content_status NOT NULL DEFAULT 'draft',
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz
      );
      CREATE INDEX idx_lawyers_featured_order ON lawyers (status, is_featured, display_order);

      CREATE TABLE lawyer_translations (
        lawyer_id uuid NOT NULL CONSTRAINT fk_lawyer_translation_lawyer REFERENCES lawyers(id) ON DELETE CASCADE,
        language_code varchar(10) NOT NULL,
        full_name varchar(200) NOT NULL,
        latin_name varchar(150),
        slug varchar(220) NOT NULL,
        title varchar(200),
        academic_title varchar(150),
        bio text,
        updated_at timestamptz NOT NULL DEFAULT now(),
        PRIMARY KEY (lawyer_id, language_code),
        CONSTRAINT uq_lawyer_slug UNIQUE (slug, language_code)
      );

      CREATE TABLE lawyer_languages (
        lawyer_id uuid NOT NULL CONSTRAINT fk_lawyer_language_lawyer REFERENCES lawyers(id) ON DELETE CASCADE,
        language_code varchar(10) NOT NULL,
        is_native boolean NOT NULL DEFAULT false,
        PRIMARY KEY (lawyer_id, language_code)
      );

      CREATE TABLE lawyer_credentials (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        lawyer_id uuid NOT NULL CONSTRAINT fk_lawyer_credential_lawyer REFERENCES lawyers(id) ON DELETE CASCADE,
        kind credential_kind NOT NULL,
        year_start int,
        year_end int,
        display_order int NOT NULL DEFAULT 0,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX idx_lawyer_credentials_lawyer ON lawyer_credentials (lawyer_id, kind);

      CREATE TABLE lawyer_credential_translations (
        credential_id uuid NOT NULL CONSTRAINT fk_lawyer_credential_translation_credential REFERENCES lawyer_credentials(id) ON DELETE CASCADE,
        language_code varchar(10) NOT NULL,
        title varchar(255) NOT NULL,
        institution varchar(255),
        description text,
        PRIMARY KEY (credential_id, language_code)
      );
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE lawyer_credential_translations;
      DROP TABLE lawyer_credentials;
      DROP TABLE lawyer_languages;
      DROP TABLE lawyer_translations;
      DROP TABLE lawyers;
      DROP TYPE credential_kind;
      DROP TYPE lawyer_content_status;
      DROP TYPE lawyer_team_group;
    `);
  }
}
