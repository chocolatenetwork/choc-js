import { Database } from '../../../src/lib/schema.ts';
import { IContext } from './IContext.ts';

export interface IUserContext extends IContext {
  user: Database['public']['Tables']['user']['Row'];
}
