import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1777833545223 implements MigrationInterface {
    name = 'Init1777833545223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpi_directory" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "kpi_directory" ADD "deletedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('Asia/Bangkok', now())`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpi_directory" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "kpi_directory" DROP COLUMN "is_active"`);
    }

}
