import { createClient } from '@supabase/supabase-js';
import { HttpError, httpErrors, Router } from 'oak';
import { isIn, isString, required } from 'validasaur/src/rules.ts';
import { Database } from '../../../src/lib/schema.ts';
import { PostgresErrors, toMessage } from './utils/AppError.ts';
import { hashBody } from './utils/hashBody.ts';
import { requestValidator } from './utils/request-validator.ts';
import { verifyHash } from './utils/verifyHash.ts';

enum AccountType {
  project = 'project',
  user = 'user',
}

const router = new Router();
const signupSchema = {
  accountType: [required, isIn(Object.values(AccountType))],
  address: [required, isString],
  signature: [required, isString],
  name: [required, isString],
  twitter: [required, isString],
  picture: [isString],
  description: [isString],
};
interface IBody {
  accountType: AccountType;
  address: string;
  signature: string;
  name: string;
  twitter: string;
  picture?: string;
  description?: string;
}

router.post(
  '/signup',
  requestValidator({ bodyRules: signupSchema }),
  hashBody(['name', 'twitter', 'picture', 'description', 'accountType']),
  verifyHash(),
  async (context) => {
    const body2: IBody = await context.request.body({ limit: 0, type: 'json' })
      .value;
    try {
      // Create a Supabase client with a service role
      const supabaseClient = createClient<Database>(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      // Run queries with full priviledge
      const result = await supabaseClient
        .from('user_verification')
        .insert({
          accountType: body2.accountType,
          address: body2.address,
          datahash: context.state.hashHex,
          name: body2.name,
          signature: body2.signature,
          twitter: body2.twitter,
          description: body2.description,
          picture: body2.picture,
        })
        .select();

      if (result.error?.code === PostgresErrors.UNIQUE_CONSTRAINT) {
        throw new httpErrors.BadRequest(toMessage('Already signed up'));
      }
      if (result.error) {
        throw new httpErrors.InternalServerError(
          toMessage('Error saving user')
        );
      }

      context.response.body = result.data[0];
    } catch (err) {
      if (err instanceof HttpError) {
        throw err;
      }
      throw new httpErrors.InternalServerError();
    }
  }
);

router.post('/verify', (context) => {
  context.response.body =
    'This is an example Oak server running on Edge Functions!, verify route';
});

export default router;
