import { httpErrors, Middleware } from 'oak';
import { polkaSignatureVerify } from '../polkaSignatureVerify.ts';

export function verifyHash(): Middleware {
  return async (ctx, next) => {
    const { state } = ctx;
    const { hashHex } = state;
    const { address, signature } = await ctx.request.body({ type: 'json' })
      .value;

    const isValid = polkaSignatureVerify(address, hashHex, signature);
    if (!isValid) {
      const mesage = JSON.stringify({ message: 'Signature verify error' });
      throw new httpErrors.BadRequest(mesage);
    }

    await next();
    return;
  };
}
