import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConsultations1795400000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE lead_status AS ENUM ('new', 'in_progress', 'done', 'spam');
      CREATE TYPE contact_channel AS ENUM ('phone', 'email', 'zalo', 'wechat');

      CREATE TABLE consultation_requests (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name varchar(200) NOT NULL,
        company_name varchar(255),
        phone varchar(50) NOT NULL,
        email varchar(255),
        contact_channel contact_channel NOT NULL DEFAULT 'phone',
        contact_channel_id varchar(100),
        preferred_contact_time varchar(100),
        practice_area_id uuid REFERENCES practice_areas(id) ON DELETE SET NULL,
        lawyer_id uuid REFERENCES lawyers(id) ON DELETE SET NULL,
        assigned_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
        language_code varchar(10) NOT NULL DEFAULT 'vi',
        title varchar(255),
        content text NOT NULL,
        consent boolean NOT NULL DEFAULT false,
        status lead_status NOT NULL DEFAULT 'new',
        ip_address varchar(45),
        user_agent text,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz
      );

      CREATE INDEX idx_consultations_status ON consultation_requests (status);
      CREATE INDEX idx_consultations_practice_area ON consultation_requests (practice_area_id);
      CREATE INDEX idx_consultations_lawyer ON consultation_requests (lawyer_id);
      CREATE INDEX idx_consultations_assigned ON consultation_requests (assigned_user_id);
      CREATE INDEX idx_consultations_created_at ON consultation_requests (created_at DESC);

      CREATE TABLE consultation_attachments (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        consultation_request_id uuid NOT NULL CONSTRAINT fk_attachment_consultation REFERENCES consultation_requests(id) ON DELETE CASCADE,
        file_name varchar(255) NOT NULL,
        file_url varchar(500) NOT NULL,
        file_type varchar(100),
        file_size_bytes bigint,
        created_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX idx_attachments_consultation ON consultation_attachments (consultation_request_id);

      CREATE TABLE consultation_notes (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        consultation_request_id uuid NOT NULL CONSTRAINT fk_note_consultation REFERENCES consultation_requests(id) ON DELETE CASCADE,
        author_id uuid REFERENCES users(id) ON DELETE SET NULL,
        author_name varchar(150),
        note text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );
      CREATE INDEX idx_notes_consultation ON consultation_notes (consultation_request_id);
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS consultation_notes;
      DROP TABLE IF EXISTS consultation_attachments;
      DROP TABLE IF EXISTS consultation_requests;
      DROP TYPE IF EXISTS contact_channel;
      DROP TYPE IF EXISTS lead_status;
    `);
  }
}
