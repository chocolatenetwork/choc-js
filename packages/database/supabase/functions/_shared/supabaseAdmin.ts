import { createClient } from '@supabase/supabase-js';
import { httpErrors, Middleware } from 'oak';
import { Database } from '../../../src/lib/schema.ts';

export function supabaseAdmin(): Middleware {
  return async (context, next) => {
    try {
      // Create a Supabase client with a service role
      const supabaseClient = createClient<Database>(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );
      context.state.client = supabaseClient;
    } catch {
      throw new httpErrors.InternalServerError();
    }
    await next();
    delete context.state.client;
  };
}
