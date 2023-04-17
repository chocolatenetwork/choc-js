# database

This library contains the current database schema for chocolate and handles (**model-changing**) schema migrations using typeorm.

## Generating migrations

Todo: Better migration workflow,

Migrations are created using typeorm to enable rollback over already-committed database versions, and saved in sql for supabase to pick up.

1. Make changes to entities in typeorm
2. Use migration-generate to add a new migration with the sql needed
3. Copy the sql to a migration.sql file in supabase/migrations with the same name.
