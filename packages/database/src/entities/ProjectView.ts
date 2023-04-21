import { ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
SELECT 
    project.*,
    count(review."projectId") AS "reviewCount",
    coalesce(sum(review.rating), 0) AS "ratingSum",
    coalesce(avg(review.rating), 0) AS "ratingAverage"
FROM 
    project
LEFT JOIN 
    review 
ON 
    project.id = review."projectId"
GROUP BY 
    project.id
  `,
})
export class ProjectView {}
