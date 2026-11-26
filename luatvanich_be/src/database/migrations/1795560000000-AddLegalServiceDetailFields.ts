import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLegalServiceDetailFields1795560000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE service_translations ADD COLUMN IF NOT EXISTS process_steps jsonb, ADD COLUMN IF NOT EXISTS reference_fees jsonb',
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE service_translations DROP COLUMN reference_fees, DROP COLUMN process_steps',
    );
  }
}
