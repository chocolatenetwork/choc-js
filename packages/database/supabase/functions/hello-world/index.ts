// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
// Check: https://deno.land/manual@v1.32.4/references/vscode_deno#partially-deno-enabling-a-workspace for only enabling on this folder.

console.log('Hello from Functions!');
import { createClient } from '@supabase/supabase-js';
import { serve } from 'std/server';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://xyzcompany.supabase.co',
  'public-anon-key'
);

serve((req: Request) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  return new Response(JSON.stringify([]), {
    headers: { 'Content-Type': 'application/json' },
  }); // Handle your request here.
});

serve(async (req) => {
  // const supabase = createClient(supabaseURL, serviceKey);

  const { name } = await req.json();
  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
});


