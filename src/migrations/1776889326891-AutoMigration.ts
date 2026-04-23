import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1776889326891 implements MigrationInterface {
    name = 'AutoMigration1776889326891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_strategy_group" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), CONSTRAINT "PK_b2078fe94fe967d0108e3382959" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c90519c0ca5335fb813b713d75" ON "mst_strategy_group" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_strategy" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, "mst_strategy_group_id" integer NOT NULL, CONSTRAINT "PK_5ef80a70b0818cff6b0a4742fe4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7ffbfe3f441a045ccf9a8733d0" ON "mst_strategy" ("code", "mst_strategy_group_id") `);
        await queryRunner.query(`ALTER TABLE "mst_strategy" ADD CONSTRAINT "FK_0a7fdfe964049cac9fb8b6b2a75" FOREIGN KEY ("mst_strategy_group_id") REFERENCES "mst_strategy_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_strategy" DROP CONSTRAINT "FK_0a7fdfe964049cac9fb8b6b2a75"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ffbfe3f441a045ccf9a8733d0"`);
        await queryRunner.query(`DROP TABLE "mst_strategy"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c90519c0ca5335fb813b713d75"`);
        await queryRunner.query(`DROP TABLE "mst_strategy_group"`);
    }

}
