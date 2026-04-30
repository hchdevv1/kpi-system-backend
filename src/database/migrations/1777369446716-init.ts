import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1777369446716 implements MigrationInterface {
    name = 'Init1777369446716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_kpi_roles" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_16f5b60fbb3813ebf2838af49a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e8e329a991e1c82f55336e53b8" ON "mst_kpi_roles" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_system_roles" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_7f77e2f03b0d318d4a63c860063" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9c45503c681370e708679e5ee3" ON "mst_system_roles" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9c45503c681370e708679e5ee3"`);
        await queryRunner.query(`DROP TABLE "mst_system_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8e329a991e1c82f55336e53b8"`);
        await queryRunner.query(`DROP TABLE "mst_kpi_roles"`);
    }

}
