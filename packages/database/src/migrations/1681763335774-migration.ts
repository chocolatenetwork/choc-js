import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1681763335774 implements MigrationInterface {
    name = 'migration1681763335774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "review"
            ADD CONSTRAINT "user_can_only_review_once" UNIQUE ("userId", "projectId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "user_can_only_review_once"
        `);
    }

}
