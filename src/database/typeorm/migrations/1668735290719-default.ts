import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668735290719 implements MigrationInterface {
    name = 'default1668735290719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "debitedAccountId" uuid, "creditedAccountId" uuid, CONSTRAINT "PK_7761bf9766670b894ff2fdb3700" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_8f0050abe277e9f24b93128f975" FOREIGN KEY ("debitedAccountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transactions" ADD CONSTRAINT "FK_76ade6f775352ef0eebcb78f16f" FOREIGN KEY ("creditedAccountId") REFERENCES "Accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_76ade6f775352ef0eebcb78f16f"`);
        await queryRunner.query(`ALTER TABLE "Transactions" DROP CONSTRAINT "FK_8f0050abe277e9f24b93128f975"`);
        await queryRunner.query(`DROP TABLE "Transactions"`);
    }

}
