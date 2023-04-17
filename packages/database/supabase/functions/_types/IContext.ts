import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../src/lib/schema.ts';
import { Context } from 'oak';

export interface IContext extends Context {
  hashHex: string;
  client: SupabaseClient<Database>;
}

export interface IUserContext extends IContext {
  user: Database['public']['Tables']['user']['Row'];
}
