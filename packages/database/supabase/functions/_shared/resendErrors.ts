import { HttpError, Middleware } from 'oak';

export function resendErrors(): Middleware {
  return async (ctx, next) => {
    await next().catch((err) => {
      if (err instanceof HttpError) {
        ctx.response.status = err.status;
        ctx.response.body = err.message;
      } else {
        throw err;
      }
    });
  };
}
