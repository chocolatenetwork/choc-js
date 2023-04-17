import { MigrationInterface, QueryRunner } from "typeorm";

export class schemaNew1681699854082 implements MigrationInterface {
    name = 'schemaNew1681699854082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_verification_accounttype_enum" AS ENUM('project', 'user')
        `);
        await queryRunner.query(`
            CREATE TABLE "user_verification" (
                "id" SERIAL NOT NULL,
                "address" character varying NOT NULL,
                "datahash" character varying NOT NULL,
                "signature" character varying NOT NULL,
                "accountType" "public"."user_verification_accounttype_enum" NOT NULL,
                "picture" character varying,
                "description" text,
                "name" character varying NOT NULL,
                "twitter" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone,
                "userId" uuid,
                CONSTRAINT "UQ_32bd6596493132247acf065ddec" UNIQUE ("address"),
                CONSTRAINT "REL_b98835ab0c83f27ff7c4c7de3d" UNIQUE ("userId"),
                CONSTRAINT "PK_679edeb6fcfcbc4c094573e27e7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_accounttype_enum" AS ENUM('project', 'user')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_userrole_enum" AS ENUM('admin', 'normal')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "accountType" "public"."user_accounttype_enum" NOT NULL,
                "points" integer NOT NULL DEFAULT '1',
                "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone,
                "picture" character varying,
                "address" character varying NOT NULL,
                "userRole" "public"."user_userrole_enum" NOT NULL DEFAULT 'normal',
                CONSTRAINT "UQ_3122b4b8709577da50e89b68983" UNIQUE ("address"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "review" (
                "id" SERIAL NOT NULL,
                "rating" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone,
                "datahash" character varying NOT NULL,
                "signature" character varying NOT NULL,
                "userId" uuid NOT NULL,
                "projectId" integer NOT NULL,
                CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "ratingSum" integer NOT NULL DEFAULT '0',
                "reviewCount" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(0) with time zone,
                "name" character varying NOT NULL,
                "logo" character varying,
                "description" text,
                "ownerId" uuid NOT NULL,
                CONSTRAINT "REL_9884b2ee80eb70b7db4f12e8ae" UNIQUE ("ownerId"),
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_verification"
            ADD CONSTRAINT "FK_b98835ab0c83f27ff7c4c7de3db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "review"
            ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "review"
            ADD CONSTRAINT "FK_2234d081468f1effcd04ee01dad" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"
        `);
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "FK_2234d081468f1effcd04ee01dad"
        `);
        await queryRunner.query(`
            ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_verification" DROP CONSTRAINT "FK_b98835ab0c83f27ff7c4c7de3db"
        `);
        await queryRunner.query(`
            DROP TABLE "project"
        `);
        await queryRunner.query(`
            DROP TABLE "review"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_userrole_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_accounttype_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user_verification"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_verification_accounttype_enum"
        `);
    }

}
