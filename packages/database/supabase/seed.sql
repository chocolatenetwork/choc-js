BEGIN;
-- migrations
DELETE FROM public.migrations;
INSERT INTO public.migrations ("timestamp", "name")
VALUES (1681699854082, 'schemaNew1681699854082'),
  (1681736899113, 'migration1681736899113'),
  (1681743263989, 'migration1681743263989'),
(1681763335774, 'migration1681763335774'),
(1682095631450, 'migration1682095631450');

--typeorm_metadata
DELETE FROM public.typeorm_metadata;
INSERT INTO public.typeorm_metadata (
    "type",
    "database",
    "schema",
    "table",
    "name",
    value
  )
VALUES (
    'VIEW',
    NULL,
    'public',
    NULL,
    'project_view',
'SELECT
    project.*,
count(review."projectId") AS "reviewCount",
coalesce(sum(review.rating), 0) AS "ratingSum",
coalesce(avg(review.rating), 0) AS "ratingAverage"
FROM
    project
LEFT JOIN review ON
    project.id = review."projectId"
GROUP BY
    project.id'
  );
COMMIT;