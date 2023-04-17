import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1681736899113 implements MigrationInterface {
    name = 'migration1681736899113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "name" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "name"
        `);
    }

}
