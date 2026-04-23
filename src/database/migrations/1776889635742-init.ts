import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1776889635742 implements MigrationInterface {
    name = 'Init1776889635742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_strategy_group" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), CONSTRAINT "PK_b2078fe94fe967d0108e3382959" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mst_strategy_group" ADD CONSTRAINT "UQ_mst_strategy_group_code" UNIQUE ("code")`);
        await queryRunner.query(`CREATE TABLE "mst_strategy" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, "mst_strategy_group_id" integer NOT NULL, CONSTRAINT "PK_5ef80a70b0818cff6b0a4742fe4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mst_strategy" ADD CONSTRAINT "UQ_mst_strategy_code_group" UNIQUE ("code", "mst_strategy_group_id") `);
        await queryRunner.query(`ALTER TABLE "mst_strategy" ADD CONSTRAINT "FK_strategy_group" FOREIGN KEY ("mst_strategy_group_id") REFERENCES "mst_strategy_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_strategy" DROP CONSTRAINT "FK_strategy_group"`);
        await queryRunner.query(`ALTER TABLE "mst_strategy" DROP CONSTRAINT "UQ_mst_strategy_code_group"`);
        await queryRunner.query(`DROP TABLE "mst_strategy"`);
        await queryRunner.query(`ALTER TABLE "mst_strategy_group" DROP CONSTRAINT "UQ_mst_strategy_group_code"`);
        await queryRunner.query(`DROP TABLE "mst_strategy_group"`);
    }

}
