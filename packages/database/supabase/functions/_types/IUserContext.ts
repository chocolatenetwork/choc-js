import { Database } from '../_shared/schema.ts';
import { IContext } from './IContext.ts';

export interface IUserContext extends IContext {
  user: Database['public']['Tables']['user']['Row'];
}
