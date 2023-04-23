import { SupabaseClient } from '@supabase/supabase-js';
import { Context } from 'oak';
import { Database } from '../_shared/schema.ts';

export interface IContext extends Context {
  hashHex: string;
  client: SupabaseClient<Database>;
}
