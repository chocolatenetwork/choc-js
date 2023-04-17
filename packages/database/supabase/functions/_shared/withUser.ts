import { httpErrors, Middleware } from 'oak';
import { UserRole } from '../_enums/UserRole.ts';
import { IBodyBase } from '../_types/IBodyBase.ts';
import { IContext } from '../_types/IContext.ts';

export function withUser(roles: UserRole[]): Middleware {
  return async (context, next) => {
    const bodyBase: IBodyBase = await context.request.body({
      limit: 0,
      type: 'json',
    }).value;
    const { address } = bodyBase;
    const { client } = context.state as IContext; // user is not set, will set.

    // An address only belongs to one user, so using address to query user is fine here.
    const foundUser = await client
      .from('user')
      .select('*')
      .filter('address', 'eq', address)
      .limit(1);
    if (foundUser.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: foundUser.error,
      });
    }
    const [user] = foundUser.data;

    if (!user || !roles.some((role) => user.userRole.includes(role))) {
      throw new httpErrors.Unauthorized();
    }

    context.state.user = user;
    await next();
  };
}
