import { httpErrors, Middleware } from 'oak';
import { AccountType } from '../../_enums/AccountType.ts';
import { toMessage } from '../../_shared/AppError.ts';
import { IBodyBase } from '../../_types/IBodyBase.ts';
import { IContext } from '../../_types/IContext.ts';

export interface IVerifyBody extends IBodyBase {
  verificationId: number;
}
export function authVerifyController(): Middleware {
  return async (context) => {
    const body2: IVerifyBody = await context.request.body({
      limit: 0,
      type: 'json',
    }).value;
    const { verificationId } = body2;
    const { client } = context.state as IContext;


    const verification = await client
      .from('user_verification')
      .select('*')
      .filter('id', 'eq', verificationId)
      .limit(1);

    if (verification.error) {
      throw new httpErrors.InternalServerError();
    }
    if (verification.data?.length === 0) {
      throw new httpErrors.NotFound(
        toMessage('User verification does not exist')
      );
    }
    const userVerify = verification.data[0];
    const { accountType } = userVerify;
    const checkUser = await client
      .from('user')
      .select('*')
      .filter('address', 'eq', userVerify.address);

    if (checkUser.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: checkUser.error,
      });
    }
    if (checkUser.data.length !== 0) {
      throw new httpErrors.Conflict(
        toMessage('User with address already exists')
      );
    }
    const userRes = await client
      .from('user')
      .insert({
        accountType,
        address: userVerify.address,
        picture: userVerify.picture,
        name: userVerify.name,
      })
      .select();
    if (userRes.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: userRes.error,
      });
    }
    const user = userRes.data[0];

    // Should succeed, Update verification
    const verifyUpdate = await client
      .from('user_verification')
      .update({
        userId: user.id,
      })
      .filter('id', 'eq', userVerify.id);
    if (verifyUpdate.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: verifyUpdate.error,
      });
    }
    if (accountType === AccountType.User) {
      context.response.body = user;
      return;
    }

    // Check project
    const projectCheck = await client
      .from('project')
      .select('*')
      .filter('ownerId', 'eq', user.id)
      .select();
    if (projectCheck.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: projectCheck.error,
      });
    }
    if (projectCheck.data.length !== 0) {
      throw new httpErrors.Conflict(
        toMessage('Project with user already exists')
      );
    }
    // Create project optionally.
    const projectResponse = await client
      .from('project')
      .insert({
        name: userVerify.name,
        ownerId: user.id,
        description: userVerify.description,
        logo: userVerify.picture,
      })
      .select();
    if (projectResponse.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: projectResponse.error,
      });
    }

    const [project] = projectResponse.data;
    // Should succeed, Update verification
    const verifyUpdateProj = await client
      .from('user_verification')
      .update({
        projectId: project.id,
      })
      .filter('id', 'eq', userVerify.id);
    if (verifyUpdateProj.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: verifyUpdateProj.error,
      });
    }
    context.response.body = project;
  };
}
