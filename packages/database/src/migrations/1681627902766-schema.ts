import { MigrationInterface, QueryRunner } from "typeorm";

export class schema1681627902766 implements MigrationInterface {
    name = 'schema1681627902766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_verification" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user_verification" ADD CONSTRAINT "UQ_b98835ab0c83f27ff7c4c7de3db" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "picture" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_3122b4b8709577da50e89b68983" UNIQUE ("address")`);
        await queryRunner.query(`ALTER TABLE "review" ADD "signature" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD "logo" character varying`);
        await queryRunner.query(`ALTER TABLE "project" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "user_verification" ADD CONSTRAINT "UQ_32bd6596493132247acf065ddec" UNIQUE ("address")`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "points" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "REL_9884b2ee80eb70b7db4f12e8ae"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "ownerId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "UQ_9884b2ee80eb70b7db4f12e8aed" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "user_verification" ADD CONSTRAINT "FK_b98835ab0c83f27ff7c4c7de3db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "user_verification" DROP CONSTRAINT "FK_b98835ab0c83f27ff7c4c7de3db"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "UQ_9884b2ee80eb70b7db4f12e8aed"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "ownerId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "REL_9884b2ee80eb70b7db4f12e8ae" UNIQUE ("ownerId")`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "review" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "points" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_verification" DROP CONSTRAINT "UQ_32bd6596493132247acf065ddec"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "signature"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_3122b4b8709577da50e89b68983"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "picture"`);
        await queryRunner.query(`ALTER TABLE "user_verification" DROP CONSTRAINT "UQ_b98835ab0c83f27ff7c4c7de3db"`);
        await queryRunner.query(`ALTER TABLE "user_verification" DROP COLUMN "userId"`);
    }

}
