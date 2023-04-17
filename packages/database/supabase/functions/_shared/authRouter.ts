import { SupabaseClient } from '@supabase/supabase-js';
import { httpErrors, Router } from 'oak';
import { isIn, isNumber, isString, required } from 'validasaur/src/rules.ts';
import { Database } from '../../../src/lib/schema.ts';
import { toMessage } from './utils/AppError.ts';
import { hashBody } from './utils/hashBody.ts';
import { requestValidator } from './utils/request-validator.ts';
import { supabaseAdmin } from './utils/supabaseAdmin.ts';
import { verifyHash } from './utils/verifyHash.ts';

export enum AccountType {
  Project = 'project',
  User = 'user',
}

export enum UserRole {
  admin = 'admin',
  normal = 'normal',
}
const router = new Router();

interface IBodyBase {
  address: string;
  signature: string;
}
interface IBody extends IBodyBase {
  accountType: AccountType;

  name: string;
  twitter: string;
  picture?: string;
  description?: string;
}
interface IContext {
  hashHex: string;
  client: SupabaseClient<Database>;
}
router.post(
  '/signup',
  requestValidator({
    bodyRules: {
      accountType: [required, isIn(Object.values(AccountType))],
      name: [required, isString],
      twitter: [required, isString],
      picture: [isString],
      description: [isString],
      address: [required, isString],
      signature: [required, isString],
    },
  }),
  hashBody(['name', 'twitter', 'picture', 'description', 'accountType']),
  verifyHash(),
  supabaseAdmin(),
  async (context) => {
    const body2: IBody = await context.request.body({ limit: 0, type: 'json' })
      .value;
    const { hashHex, client } = context.state as IContext;
    const userExisting = await client
      .from('user_verification')
      .select('id')
      .filter('address', 'eq', hashHex);
    if (Number(userExisting.data?.length) === 1) {
      throw new httpErrors.BadRequest(toMessage('Already signed up'));
    }
    // Run queries with full priviledge
    const result = await client
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

    if (result.error) {
      throw new httpErrors.InternalServerError(toMessage('Error saving user'));
    }

    context.response.body = result.data[0];
  }
);

interface IVerifyBody extends IBodyBase {
  verificationId: number;
}
router.put(
  '/verify',
  requestValidator({
    bodyRules: {
      verificationId: [required, isNumber],
      address: [required, isString],
      signature: [required, isString],
    },
  }),
  hashBody(['verificationId']),
  verifyHash(),
  supabaseAdmin(),

  async (context) => {
    const body2: IVerifyBody = await context.request.body({
      limit: 0,
      type: 'json',
    }).value;
    const { verificationId, address } = body2;
    const { hashHex, client } = context.state as IContext;

    // An address only belongs to one user, so using address to query user is fine here.
    const foundAdmin = await client
      .from('user')
      .select('userRole, address')
      .filter('address', 'eq', address)
      .filter('userRole', 'eq', UserRole.admin)
      .limit(1);
    // Todo: add logging.
    if (foundAdmin.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: foundAdmin.error,
      });
    }
    if (foundAdmin.data?.length === 0) {
      throw new httpErrors.Unauthorized(undefined, {
        cause: foundAdmin.error,
      });
    }
    const verification = await client
      .from('user_verification')
      .select('id')
      .filter('id', 'eq', verificationId)
      .limit(1);

    if (verification.error) {
      throw new httpErrors.InternalServerError();
    }
    if (verification.data?.length === 0) {
      throw new httpErrors.BadRequest(
        toMessage('User verification does not exist')
      );
    }

    context.response.body = verification.data[0];
  }
);

export default router;
