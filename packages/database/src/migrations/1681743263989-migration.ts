import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1681743263989 implements MigrationInterface {
    name = 'migration1681743263989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_verification"
            ADD "projectId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "user_verification"
            ADD CONSTRAINT "UQ_cdd31ee6f6f0d359ba6a05b8a95" UNIQUE ("projectId")
        `);
        await queryRunner.query(`
            ALTER TABLE "user_verification"
            ADD CONSTRAINT "FK_cdd31ee6f6f0d359ba6a05b8a95" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_verification" DROP CONSTRAINT "FK_cdd31ee6f6f0d359ba6a05b8a95"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_verification" DROP CONSTRAINT "UQ_cdd31ee6f6f0d359ba6a05b8a95"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_verification" DROP COLUMN "projectId"
        `);
    }

}
