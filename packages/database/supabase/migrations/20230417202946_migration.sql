CREATE UNIQUE INDEX user_can_only_review_once ON public.review USING btree ("userId", "projectId");

alter table "public"."review" add constraint "user_can_only_review_once" UNIQUE using index "user_can_only_review_once";


