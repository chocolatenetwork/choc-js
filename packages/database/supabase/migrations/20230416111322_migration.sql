create type "public"."user_accounttype_enum" as enum ('project', 'user');

create type "public"."user_verification_accounttype_enum" as enum ('project', 'user');

create sequence "public"."migrations_id_seq";

create sequence "public"."project_id_seq";

create sequence "public"."review_id_seq";

create sequence "public"."user_verification_id_seq";

create table "public"."migrations" (
    "id" integer not null default nextval('migrations_id_seq'::regclass),
    "timestamp" bigint not null,
    "name" character varying not null
);


create table "public"."project" (
    "id" integer not null default nextval('project_id_seq'::regclass),
    "ratingSum" integer not null default 0,
    "reviewCount" integer not null default 0,
    "createdAt" timestamp without time zone not null default ('now'::text)::timestamp(0) with time zone,
    "updatedAt" timestamp without time zone not null default ('now'::text)::timestamp(0) with time zone,
    "name" character varying not null,
    "logo" character varying,
    "description" text,
    "ownerId" uuid not null
);


create table "public"."review" (
    "id" integer not null default nextval('review_id_seq'::regclass),
    "rating" integer not null default 0,
    "createdAt" timestamp without time zone not null default ('now'::text)::timestamp(0) with time zone,
    "updatedAt" timestamp without time zone not null default ('now'::text)::timestamp(0) with time zone,
    "projectId" integer not null,
    "signature" character varying not null,
    "userId" uuid not null,
    "datahash" character varying not null
);


create table "public"."user" (
    "accountType" user_accounttype_enum not null,
    "points" integer not null default 1,
    "createdAt" timestamp without time zone not null default ('now'::text)::timestamp(0) with time zone,
    "updatedAt" timestamp without time zone not null default ('now'::text)::timestamp(0) with time zone,
    "picture" character varying,
    "address" character varying not null,
    "id" uuid not null default uuid_generate_v4()
);


create table "public"."user_verification" (
    "id" integer not null default nextval('user_verification_id_seq'::regclass),
    "address" character varying not null,
    "signature" character varying not null,
    "accountType" user_verification_accounttype_enum not null,
    "picture" character varying,
    "description" text,
    "name" character varying not null,
    "twitter" character varying not null,
    "createdAt" timestamp without time zone not null default ('now'::text)::timestamp(0) with time zone,
    "updatedAt" timestamp without time zone not null default ('now'::text)::timestamp(0) with time zone,
    "userId" uuid,
    "datahash" character varying not null
);


alter sequence "public"."migrations_id_seq" owned by "public"."migrations"."id";

alter sequence "public"."project_id_seq" owned by "public"."project"."id";

alter sequence "public"."review_id_seq" owned by "public"."review"."id";

alter sequence "public"."user_verification_id_seq" owned by "public"."user_verification"."id";

CREATE UNIQUE INDEX "PK_2e4299a343a81574217255c00ca" ON public.review USING btree (id);

CREATE UNIQUE INDEX "PK_4d68b1358bb5b766d3e78f32f57" ON public.project USING btree (id);

CREATE UNIQUE INDEX "PK_679edeb6fcfcbc4c094573e27e7" ON public.user_verification USING btree (id);

CREATE UNIQUE INDEX "PK_8c82d7f526340ab734260ea46be" ON public.migrations USING btree (id);

CREATE UNIQUE INDEX "PK_cace4a159ff9f2512dd42373760" ON public."user" USING btree (id);

CREATE UNIQUE INDEX "UQ_3122b4b8709577da50e89b68983" ON public."user" USING btree (address);

CREATE UNIQUE INDEX "UQ_32bd6596493132247acf065ddec" ON public.user_verification USING btree (address);

CREATE UNIQUE INDEX "UQ_9884b2ee80eb70b7db4f12e8aed" ON public.project USING btree ("ownerId");

CREATE UNIQUE INDEX "UQ_b98835ab0c83f27ff7c4c7de3db" ON public.user_verification USING btree ("userId");

alter table "public"."migrations" add constraint "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY using index "PK_8c82d7f526340ab734260ea46be";

alter table "public"."project" add constraint "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY using index "PK_4d68b1358bb5b766d3e78f32f57";

alter table "public"."review" add constraint "PK_2e4299a343a81574217255c00ca" PRIMARY KEY using index "PK_2e4299a343a81574217255c00ca";

alter table "public"."user" add constraint "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY using index "PK_cace4a159ff9f2512dd42373760";

alter table "public"."user_verification" add constraint "PK_679edeb6fcfcbc4c094573e27e7" PRIMARY KEY using index "PK_679edeb6fcfcbc4c094573e27e7";

alter table "public"."project" add constraint "FK_9884b2ee80eb70b7db4f12e8aed" FOREIGN KEY ("ownerId") REFERENCES "user"(id) not valid;

alter table "public"."project" validate constraint "FK_9884b2ee80eb70b7db4f12e8aed";

alter table "public"."project" add constraint "UQ_9884b2ee80eb70b7db4f12e8aed" UNIQUE using index "UQ_9884b2ee80eb70b7db4f12e8aed";

alter table "public"."review" add constraint "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"(id) not valid;

alter table "public"."review" validate constraint "FK_1337f93918c70837d3cea105d39";

alter table "public"."review" add constraint "FK_2234d081468f1effcd04ee01dad" FOREIGN KEY ("projectId") REFERENCES project(id) not valid;

alter table "public"."review" validate constraint "FK_2234d081468f1effcd04ee01dad";

alter table "public"."user" add constraint "UQ_3122b4b8709577da50e89b68983" UNIQUE using index "UQ_3122b4b8709577da50e89b68983";

alter table "public"."user_verification" add constraint "FK_b98835ab0c83f27ff7c4c7de3db" FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE not valid;

alter table "public"."user_verification" validate constraint "FK_b98835ab0c83f27ff7c4c7de3db";

alter table "public"."user_verification" add constraint "UQ_32bd6596493132247acf065ddec" UNIQUE using index "UQ_32bd6596493132247acf065ddec";

alter table "public"."user_verification" add constraint "UQ_b98835ab0c83f27ff7c4c7de3db" UNIQUE using index "UQ_b98835ab0c83f27ff7c4c7de3db";


