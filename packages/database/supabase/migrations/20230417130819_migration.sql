BEGIN;
ALTER TABLE "user"
ADD "name" character varying NOT NULL;
COMMIT;