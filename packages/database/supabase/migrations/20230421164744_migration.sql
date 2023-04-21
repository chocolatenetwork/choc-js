create table "public"."typeorm_metadata" (
    "type" character varying not null,
    "database" character varying,
    "schema" character varying,
    "table" character varying,
    "name" character varying,
    "value" text
);


alter table "public"."project" drop column "ratingSum";

alter table "public"."project" drop column "reviewCount";

create or replace view "public"."project_view" as
SELECT project.*,
    count(review."projectId") AS "reviewCount",
    COALESCE(sum(review.rating), (0)::bigint) AS "ratingSum",
    COALESCE(avg(review.rating), (0)::numeric) AS "ratingAverage"
   FROM (project
     LEFT JOIN review ON ((project.id = review."projectId")))
  GROUP BY project.id;



