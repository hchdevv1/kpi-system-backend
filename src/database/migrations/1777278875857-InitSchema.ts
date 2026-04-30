import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1777278875857 implements MigrationInterface {
    name = 'InitSchema1777278875857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mst_strategy_group" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), CONSTRAINT "PK_b2078fe94fe967d0108e3382959" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c90519c0ca5335fb813b713d75" ON "mst_strategy_group" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_strategy" ("id" SERIAL NOT NULL, "code" character varying(50) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, "mst_strategy_group_id" integer NOT NULL, CONSTRAINT "PK_5ef80a70b0818cff6b0a4742fe4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7ffbfe3f441a045ccf9a8733d0" ON "mst_strategy" ("code", "mst_strategy_group_id") `);
        await queryRunner.query(`CREATE TABLE "mst_organization_group" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), CONSTRAINT "PK_5b286ebd97f61c8b365c4fc6cda" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d09438ba42a19b851e993ba9cc" ON "mst_organization_group" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_organization" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, "mst_organization_group_id" integer NOT NULL, CONSTRAINT "PK_38baee48eaae8f83309c9482fd4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_05f5244bf5cc96dc4e6906c727" ON "mst_organization" ("code", "mst_organization_group_id") `);
        await queryRunner.query(`CREATE TABLE "mst_measure" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_2a2277a7be843150feccc2a94e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_56a74ceabd8b851347f13a0412" ON "mst_measure" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_benchmark" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c724fc896c183f19f913204cad6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_56419d86068186d9deb8ea8517" ON "mst_benchmark" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_topic" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, "alias_code" character varying(20), CONSTRAINT "PK_434bf019eee1f8edc913edff7a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2c2bf7565525d22a76ddb53744" ON "mst_topic" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_frequency" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_28b235544dd0aa75475eaff36f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3d2e45ac291cecf59344641a37" ON "mst_frequency" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_condition_operator" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "symbol" character varying(255), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_d6610877b8943f633d122045799" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d0274cd2531bc6b5c80823f3c6" ON "mst_condition_operator" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_kpi_unit" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "symbol" character varying(255), "scale_factor" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "is_percent" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6a91343c2582f198c01e6678ede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1ca0758900495c555466c89846" ON "mst_kpi_unit" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_service_units" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, "service_unit_group_id" integer NOT NULL, CONSTRAINT "PK_6296b45eee4a6f1b74403e8441d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_eb1f1600332005738ad1d35f25" ON "mst_service_units" ("code", "service_unit_group_id") `);
        await queryRunner.query(`CREATE TABLE "mst_service_units_group" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), CONSTRAINT "PK_9604fbc000121781258d33686ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9cd5a4f0073717442245462e8e" ON "mst_service_units_group" ("code") `);
        await queryRunner.query(`CREATE TABLE "mst_simple" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "is_active" boolean NOT NULL DEFAULT true, "simple_group_id" integer NOT NULL, CONSTRAINT "PK_5ca0e68c75dcc9c8afb6dc16925" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_1989b1d33bbdaa23269f38067f" ON "mst_simple" ("code", "simple_group_id") `);
        await queryRunner.query(`CREATE TABLE "mst_simple_group" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), CONSTRAINT "PK_eaedb58c504707c937bee2d25a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6ea616bf63a17d8717508dcd08" ON "mst_simple_group" ("code") `);
        await queryRunner.query(`ALTER TABLE "mst_strategy" ADD CONSTRAINT "FK_0a7fdfe964049cac9fb8b6b2a75" FOREIGN KEY ("mst_strategy_group_id") REFERENCES "mst_strategy_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mst_organization" ADD CONSTRAINT "FK_6d82aac7ffa5b3c1dbdeb848031" FOREIGN KEY ("mst_organization_group_id") REFERENCES "mst_organization_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mst_service_units" ADD CONSTRAINT "FK_180684bcd25f67f0d1bfcfb6c09" FOREIGN KEY ("service_unit_group_id") REFERENCES "mst_service_units_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mst_simple" ADD CONSTRAINT "FK_66ad38680548c9bfa53761606c3" FOREIGN KEY ("simple_group_id") REFERENCES "mst_simple_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mst_simple" DROP CONSTRAINT "FK_66ad38680548c9bfa53761606c3"`);
        await queryRunner.query(`ALTER TABLE "mst_service_units" DROP CONSTRAINT "FK_180684bcd25f67f0d1bfcfb6c09"`);
        await queryRunner.query(`ALTER TABLE "mst_organization" DROP CONSTRAINT "FK_6d82aac7ffa5b3c1dbdeb848031"`);
        await queryRunner.query(`ALTER TABLE "mst_strategy" DROP CONSTRAINT "FK_0a7fdfe964049cac9fb8b6b2a75"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ea616bf63a17d8717508dcd08"`);
        await queryRunner.query(`DROP TABLE "mst_simple_group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1989b1d33bbdaa23269f38067f"`);
        await queryRunner.query(`DROP TABLE "mst_simple"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9cd5a4f0073717442245462e8e"`);
        await queryRunner.query(`DROP TABLE "mst_service_units_group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb1f1600332005738ad1d35f25"`);
        await queryRunner.query(`DROP TABLE "mst_service_units"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ca0758900495c555466c89846"`);
        await queryRunner.query(`DROP TABLE "mst_kpi_unit"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d0274cd2531bc6b5c80823f3c6"`);
        await queryRunner.query(`DROP TABLE "mst_condition_operator"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2e45ac291cecf59344641a37"`);
        await queryRunner.query(`DROP TABLE "mst_frequency"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c2bf7565525d22a76ddb53744"`);
        await queryRunner.query(`DROP TABLE "mst_topic"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56419d86068186d9deb8ea8517"`);
        await queryRunner.query(`DROP TABLE "mst_benchmark"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_56a74ceabd8b851347f13a0412"`);
        await queryRunner.query(`DROP TABLE "mst_measure"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_05f5244bf5cc96dc4e6906c727"`);
        await queryRunner.query(`DROP TABLE "mst_organization"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d09438ba42a19b851e993ba9cc"`);
        await queryRunner.query(`DROP TABLE "mst_organization_group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ffbfe3f441a045ccf9a8733d0"`);
        await queryRunner.query(`DROP TABLE "mst_strategy"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c90519c0ca5335fb813b713d75"`);
        await queryRunner.query(`DROP TABLE "mst_strategy_group"`);
    }

}
