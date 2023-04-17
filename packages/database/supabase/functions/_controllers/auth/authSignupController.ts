import { httpErrors, Middleware } from 'oak';
import { toMessage } from '../../_shared/AppError.ts';
import { AccountType } from '../../_enums/AccountType.ts';
import { IBodyBase } from '../../_types/IBodyBase.ts';
import { IContext } from '../../_types/IContext.ts';

export interface IBody extends IBodyBase {
  accountType: AccountType;

  name: string;
  twitter: string;
  picture?: string;
  description?: string;
}
export function authSignupController(): Middleware {
  return async (context) => {
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
  };
}
