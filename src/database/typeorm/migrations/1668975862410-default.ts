import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668975862410 implements MigrationInterface {
    name = 'default1668975862410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Accounts" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD "userUsername" character varying`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD CONSTRAINT "REL_eb8bb8d1f4a4f5ae119938804e" UNIQUE ("userId", "userUsername")`);
        await queryRunner.query(`ALTER TABLE "Accounts" ADD CONSTRAINT "FK_eb8bb8d1f4a4f5ae119938804ee" FOREIGN KEY ("userId", "userUsername") REFERENCES "Users"("id","username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Accounts" DROP CONSTRAINT "FK_eb8bb8d1f4a4f5ae119938804ee"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP CONSTRAINT "REL_eb8bb8d1f4a4f5ae119938804e"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP COLUMN "userUsername"`);
        await queryRunner.query(`ALTER TABLE "Accounts" DROP COLUMN "userId"`);
    }

}
