#!/usr/bin/env bash
set -e


function pushMigrations(){
  nx run database:supabase link --project-ref $SUPABASE_PROJECT_ID
  nx run database:supabase db push
}

pushMigrations