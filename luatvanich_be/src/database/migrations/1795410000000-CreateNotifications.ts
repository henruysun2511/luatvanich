import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotifications1795410000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE notifications (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        type varchar(50) NOT NULL DEFAULT 'consultation',
        title varchar(255) NOT NULL,
        message text NOT NULL,
        link varchar(255),
        is_read boolean NOT NULL DEFAULT false,
        metadata jsonb,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );

      CREATE INDEX idx_notifications_feed ON notifications (is_read, created_at DESC);
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS notifications;
    `);
  }
}
