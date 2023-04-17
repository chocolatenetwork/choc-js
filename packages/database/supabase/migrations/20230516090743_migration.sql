BEGIN;
ALTER TABLE public."user_verification"
ADD "projectId" integer;
ALTER TABLE public."user_verification"
ADD CONSTRAINT "UQ_cdd31ee6f6f0d359ba6a05b8a95" UNIQUE ("projectId");
ALTER TABLE public."user_verification"
ADD CONSTRAINT "FK_cdd31ee6f6f0d359ba6a05b8a95" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;