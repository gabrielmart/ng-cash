import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668821800163 implements MigrationInterface {
    name = 'default1668821800163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "createdAt" date NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
