import { execSync } from 'child_process';

const vars = [
  'SUPABASE_ACCESS_TOKEN',
  'SUPABASE_DB_PASSWORD',
  'SUPABASE_PROJECT_ID',
  'VITE_SUPABASE_API_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_SUPABASE_FUNCTIONS_API_URL',
  'SUPABASE_APP_ENV',
  'NETLIFY_SITE_ID',
  'NETLIFY_AUTH_TOKEN',
  'NX_CLOUD_DISTRIBUTED_EXECUTION',
];

const joined = vars.map((each) => {
  return `${each}=${process.env[each]}`;
});

const asString = joined.join('\n');

execSync(`echo "test=${asString}" >> "$GITHUB_OUTPUT"`);
