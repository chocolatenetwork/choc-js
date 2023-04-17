import { httpErrors, Middleware } from 'oak';
import { polkaSignatureVerify } from '../polkaSignatureVerify.ts';
import { toMessage } from './AppError.ts';

export function verifyHash(): Middleware {
  return async (ctx, next) => {
    const { state } = ctx;
    const { hashHex } = state;
    const { address, signature } = await ctx.request.body({ type: 'json' })
      .value;

    const isValid = polkaSignatureVerify(address, hashHex, signature);
    if (!isValid) {
      throw new httpErrors.BadRequest(toMessage('Signature verify error'));
    }

    await next();
    return;
  };
}
