import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1682095631450 implements MigrationInterface {
    name = 'migration1682095631450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project" DROP COLUMN "reviewCount"
        `);
        await queryRunner.query(`
            ALTER TABLE "project" DROP COLUMN "ratingSum"
        `);
        await queryRunner.query(`
            CREATE VIEW "project_view" AS
            SELECT project.*,
                count(review."projectId") AS "reviewCount",
                coalesce(sum(review.rating), 0) AS "ratingSum",
                coalesce(avg(review.rating), 0) AS "ratingAverage"
            FROM project
                LEFT JOIN review ON project.id = review."projectId"
            GROUP BY project.id
        `);
        await queryRunner.query(`
            INSERT INTO "typeorm_metadata"(
                    "database",
                    "schema",
                    "table",
                    "type",
                    "name",
                    "value"
                )
            VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)
        `, ["public","VIEW","project_view","SELECT \n    project.*,\n    count(review.\"projectId\") AS \"reviewCount\",\n    coalesce(sum(review.rating), 0) AS \"ratingSum\",\n    coalesce(avg(review.rating), 0) AS \"ratingAverage\"\nFROM \n    project\nLEFT JOIN \n    review \nON \n    project.id = review.\"projectId\"\nGROUP BY \n    project.id"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "typeorm_metadata"
            WHERE "type" = $1
                AND "name" = $2
                AND "schema" = $3
        `, ["VIEW","project_view","public"]);
        await queryRunner.query(`
            DROP VIEW "project_view"
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD "ratingSum" integer NOT NULL DEFAULT '0'
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD "reviewCount" integer NOT NULL DEFAULT '0'
        `);
    }

}
