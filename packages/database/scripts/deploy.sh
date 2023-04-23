#!/usr/bin/env bash
set -e

function preDeploy(){
  supabase secrets set APP_ENV=$SUPABASE_APP_ENV
}
function pushMigrations(){
  nx run database:supabase link --project-ref $SUPABASE_PROJECT_ID
  nx run database:supabase db push
}
function deployFunctions(){
  nx run database:supabase functions deploy app --project-ref $SUPABASE_PROJECT_ID
}

preDeploy
pushMigrations
deployFunctions