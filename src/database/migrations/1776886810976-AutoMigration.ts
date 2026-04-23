import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1776886810976 implements MigrationInterface {
    name = 'AutoMigration1776886810976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test_table" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a706f019496a4c4023f327c6880" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test_table"`);
    }

}
