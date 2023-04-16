import { MigrationInterface, QueryRunner } from "typeorm";

export class schema1681628751463 implements MigrationInterface {
    name = 'schema1681628751463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_verification" ADD "datahash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD "datahash" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "datahash"`);
        await queryRunner.query(`ALTER TABLE "user_verification" DROP COLUMN "datahash"`);
    }

}
