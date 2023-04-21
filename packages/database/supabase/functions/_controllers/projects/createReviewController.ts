import { httpErrors, Middleware } from 'oak';
import { toMessage } from '../../_shared/AppError.ts';
import { IBodyBase } from '../../_types/IBodyBase.ts';
import { IUserContext } from '../../_types/IUserContext.ts';

interface IBody extends IBodyBase {
  rating: number;
  projectId: number;
}
export function createReviewController(): Middleware {
  return async (context) => {
    const { user, client, hashHex } = context.state as IUserContext;
    const bodyPromise = context.request.body({ limit: 0, type: 'json' }).value;
    const { rating, signature, projectId }: IBody = await bodyPromise;

    const alreadyReview = await client
      .from('review')
      .select('*')
      .filter('userId', 'eq', user.id)
      .filter('projectId', 'eq', projectId)
      .limit(1);
    if (alreadyReview.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: alreadyReview.error,
      });
    }
    if (alreadyReview.data.length === 1) {
      context.response.body = alreadyReview.data;
      return;
    }
    const projectCheck = await client
      .from('project')
      .select('id')
      .filter('id', 'eq', projectId)
      .limit(1);

    if (projectCheck.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: projectCheck.error,
      });
    }
    if (projectCheck.data.length !== 1) {
      throw new httpErrors.NotFound(toMessage('Project does not exist'));
    }
    const createResult = await client
      .from('review')
      .insert({
        projectId,
        signature,
        datahash: hashHex,
        userId: user.id,
        rating,
      })
      .select();

    if (createResult.error) {
      throw new httpErrors.InternalServerError(undefined, {
        cause: createResult.error,
      });
    }
    const [review] = createResult.data;
    context.response.body = review;
  };
}
