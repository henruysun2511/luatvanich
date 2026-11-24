import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHomeFieldsToServicesAndPracticeAreas1795550000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    // 1. services (Legal Services): thêm hanzi_badge
    await queryRunner.query(`
      ALTER TABLE services ADD COLUMN IF NOT EXISTS hanzi_badge varchar(10);
    `);

    // 2. practice_areas (Practice Areas): thêm hanzi_badge
    await queryRunner.query(`
      ALTER TABLE practice_areas ADD COLUMN IF NOT EXISTS hanzi_badge varchar(10);
    `);

    // 3. practice_area_translations: thêm scope_points, estimated_time, fee_structure
    await queryRunner.query(`
      ALTER TABLE practice_area_translations ADD COLUMN IF NOT EXISTS scope_points jsonb DEFAULT '[]'::jsonb;
      ALTER TABLE practice_area_translations ADD COLUMN IF NOT EXISTS estimated_time varchar(100);
      ALTER TABLE practice_area_translations ADD COLUMN IF NOT EXISTS fee_structure varchar(100);
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE practice_area_translations DROP COLUMN IF EXISTS fee_structure;
      ALTER TABLE practice_area_translations DROP COLUMN IF EXISTS estimated_time;
      ALTER TABLE practice_area_translations DROP COLUMN IF EXISTS scope_points;
      ALTER TABLE practice_areas DROP COLUMN IF EXISTS hanzi_badge;
      ALTER TABLE services DROP COLUMN IF EXISTS hanzi_badge;
    `);
  }
}
