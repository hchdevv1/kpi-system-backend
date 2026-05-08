import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1778203745250 implements MigrationInterface {
    name = 'Init1778203745250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "kpi_data_entry" ("id" SERIAL NOT NULL, "kpi_definition_id" integer NOT NULL, "kpi_def_year" integer NOT NULL, "kpi_def_month" integer NOT NULL, "numerator_value" double precision NOT NULL, "denominator_value" double precision, "created_by" integer, "updated_by" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), CONSTRAINT "PK_b7358eebe4dbe469bb79512f010" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4055d290cd62afe8edb2256a4f" ON "kpi_data_entry" ("kpi_def_month") `);
        await queryRunner.query(`CREATE INDEX "IDX_76e8028667d8f192fa34db703f" ON "kpi_data_entry" ("kpi_def_year") `);
        await queryRunner.query(`CREATE INDEX "IDX_c68fe53f33bbe95deec053c878" ON "kpi_data_entry" ("kpi_definition_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "uq_kpi_data_entry_period" ON "kpi_data_entry" ("kpi_definition_id", "kpi_def_year", "kpi_def_month") `);
        await queryRunner.query(`ALTER TABLE "kpi_data_entry" ADD CONSTRAINT "FK_c68fe53f33bbe95deec053c8787" FOREIGN KEY ("kpi_definition_id") REFERENCES "kpi_definition"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi_data_entry" ADD CONSTRAINT "FK_2aa89938d8c4ca9cb8c856a1083" FOREIGN KEY ("created_by") REFERENCES "mst_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "kpi_data_entry" ADD CONSTRAINT "FK_b311ae7978fa49895e3f9d55636" FOREIGN KEY ("updated_by") REFERENCES "mst_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kpi_data_entry" DROP CONSTRAINT "FK_b311ae7978fa49895e3f9d55636"`);
        await queryRunner.query(`ALTER TABLE "kpi_data_entry" DROP CONSTRAINT "FK_2aa89938d8c4ca9cb8c856a1083"`);
        await queryRunner.query(`ALTER TABLE "kpi_data_entry" DROP CONSTRAINT "FK_c68fe53f33bbe95deec053c8787"`);
        await queryRunner.query(`DROP INDEX "public"."uq_kpi_data_entry_period"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c68fe53f33bbe95deec053c878"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76e8028667d8f192fa34db703f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4055d290cd62afe8edb2256a4f"`);
        await queryRunner.query(`DROP TABLE "kpi_data_entry"`);
    }

}
