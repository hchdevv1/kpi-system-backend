import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1777449036828 implements MigrationInterface {
    name = 'Init1777449036828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "usercode" character varying(10) NOT NULL, "description" character varying(255) NOT NULL, "usersystem_role_id" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('Asia/Bangkok', now()), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_006e94e24df3edfb4a83cab7cd" ON "users" ("usercode") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_006e94e24df3edfb4a83cab7cd"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
