create sequence "public"."migrations_id_seq";

create table "public"."migrations" (
    "id" integer not null default nextval('migrations_id_seq'::regclass),
    "timestamp" bigint not null,
    "name" character varying not null
);


alter sequence "public"."migrations_id_seq" owned by "public"."migrations"."id";

CREATE UNIQUE INDEX "PK_8c82d7f526340ab734260ea46be" ON public.migrations USING btree (id);

alter table "public"."migrations" add constraint "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY using index "PK_8c82d7f526340ab734260ea46be";


