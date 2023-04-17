import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../src/lib/schema.ts';

export interface IContext {
  hashHex: string;
  client: SupabaseClient<Database>;
}
