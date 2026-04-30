import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1777520025351 implements MigrationInterface {
    name = 'Init1777520025351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_frequency" ADD "interval_value" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_frequency" DROP COLUMN "interval_value"`);
    }

}
